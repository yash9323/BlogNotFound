import { GraphQLError } from "graphql";
import { validate } from "uuid";
import { v4 as uuid } from "uuid";
import {
  users as userCollection,
  blogs as blogCollection,
  comments as commentCollection,
} from "./config/mongoCollections.js";

export const resolvers = {
  Query: {
    loginUser: async (_, args) => {
      let { email, password } = args;

      //validate

      const users = await userCollection();
      const user = await users.findOne({ email: email, password: password });
      if (!user) {
        throw new GraphQLError(
          "Could not find the user with provided email/password",
          {
            extensions: { code: "NOT_FOUND", statusCode: 404 },
          }
        );
      }

      return user;
    },
    getUser: async (_, args) => {
      let { userId } = args;

      // validate

      const users = await userCollection();
      const user = await users.findOne({ _id: userId });
      if (!user) {
        throw new GraphQLError("Could not find the user with provided id", {
          extensions: { code: "NOT_FOUND", statusCode: 404 },
        });
      }

      return user;
    },
    searchUserByName: async (_, args) => {
      // validate

      let { searchTerm } = args;

      searchTerm = searchTerm.toLowerCase();

      const users = await userCollection();

      const allUsers = await users.find().toArray();

      const matchedUsersSet = new Set();

      allUsers.forEach((user) => {
        const fnameLower = user.fname.toLowerCase();
        const lnameLower = user.lname.toLowerCase();
        if (
          fnameLower.includes(searchTerm) ||
          lnameLower.includes(searchTerm)
        ) {
          matchedUsersSet.add(user);
        }
      });
      const matchedUsers = Array.from(matchedUsersSet);
      return matchedUsers;
    },
    getAllBlogs: async (_,args) => {
      const blogs = await blogCollection()
      return await blogs.find().toArray()
    },
    getBlog: async (_, args) => {
      let { blogId } = args;

      //validate

      const blogs = await blogCollection();

      const blog = await blogs.findOne({ _id: blogId });
      if (!blog) {
        throw new GraphQLError("Could not find blog with provided id", {
          extensions: { code: "NOT_FOUND", statusCode: 404 },
        });
      }

      return blog;
    },
    getBlogsByUserId: async (_, args) => {
      let { userId } = args;

      //validate

      const blogs = await blogCollection();
      const allBlogs = await blogs.find().toArray();

      const blogsWithUserId = allBlogs.filter((blog) => {
        return blog.userId === userId;
      });

      return blogsWithUserId;
    },
    getBlogsByFollowing: async (_, args) => {
      let { userId } = args;

      // validate

      const users = await userCollection();
      const user = await users.findOne({ _id: userId });
      if (!user) {
        throw new GraphQLError(
          "Could not find the user with provided email/password",
          {
            extensions: { code: "NOT_FOUND", statusCode: 404 },
          }
        );
      }
      const blogs = await blogCollection();

      const matchedBlogs = await blogs
        .find({ userId: { $in: user.following } })
        .toArray();

      return matchedBlogs;
    },
    getSavedBlogs: async (_, args) => {
      let { userId } = args;

      // validate

      const users = await userCollection();
      const user = await users.findOne({ _id: userId });
      if (!user) {
        throw new GraphQLError("Could not find the user with provided id", {
          extensions: { code: "NOT_FOUND", statusCode: 404 },
        });
      }
      const blogs = await blogCollection();

      const savedBlogs = await blogs
        .find({ _id: { $in: user.saved } })
        .toArray();

      return savedBlogs;
    },
    getCommentsByBlogId: async (_, args) => {
      let { blogId } = args;

      //validate

      const comments = await commentCollection();
      const allComments = await comments.find().toArray();

      const commentsWithBlogId = allComments.filter((comment) => {
        return comment.blogId === blogId;
      });

      return commentsWithBlogId;
    },
  },
  Mutation: {
    registerUser: async (_, args) => {
      let { fname, lname, email, password, bio } = args;

      //validate
      const users = await userCollection();
      const user = await users.findOne({ email: email });
      if (user) {
        throw new GraphQLError(`registerUser: This email already exists`, {
          extensions: { code: "INTERNAL_SERVER_ERROR", statusCode: 400 },
        });
      }
      const newUser = {
        _id: uuid(),
        fname,
        lname,
        email,
        password,
        bio,
        followers: [],
        following: [],
        saved: [],
      };
      let insertedUser = await users.insertOne(newUser);
      if (!insertedUser.acknowledged || !insertedUser.insertedId) {
        throw new GraphQLError(`registerUser: Could not register user`, {
          extensions: { statusCode: 400, code: "INTERNAL_SERVER_ERROR" },
        });
      }
      return newUser;
    },
    editUser: async (_, args) => {
      let { _id, fname, lname, email, password, bio } = args;

      // validate

      let updateFields = {};

      const users = await userCollection();
      const userToEdit = await users.findOne({ _id: _id });

      if (fname !== undefined && fname !== null) {
        updateFields.fname = fname;
      }
      if (lname !== undefined && lname !== null) {
        updateFields.lname = lname;
      }
      if (email !== undefined && email !== null) {
        if (userToEdit.email !== email) {
          const existingUserWithEmail = await users.findOne({ email: email });

          if (existingUserWithEmail) {
            throw new GraphQLError(`editUser: This email already exists`, {
              extensions: { code: "INTERNAL_SERVER_ERROR", statusCode: 400 },
            });
          }
        }

        updateFields.email = email;
      }
      if (password !== undefined && password !== null) {
        updateFields.password = password;
      }
      if (bio !== undefined && bio !== null) {
        updateFields.bio = bio;
      }

      const updateResult = await users.updateOne(
        { _id: _id },
        { $set: updateFields }
      );

      if (updateResult.modifiedCount === 0) {
        throw new GraphQLError("editUser: Nothing updated", {
          extensions: { code: "BAD_USER_INPUT", statusCode: 400 },
        });
      }

      const updatedUser = await users.findOne({ _id: _id });

      return updatedUser;
    },
    followUser: async (_, args) => {
      let { selfId, userToFollowId } = args;

      const users = await userCollection();

      const self = await users.findOne({ _id: selfId });

      if (!self) {
        throw new GraphQLError(
          "followUser: User with provided ID does not exist",
          {
            extensions: { code: "BAD_USER_INPUT" },
          }
        );
      }
      const userToFollow = await users.findOne({ _id: userToFollowId });

      if (!userToFollow) {
        throw new GraphQLError(
          "followUser: ID for User to follow does not exist",
          {
            extensions: { code: "BAD_USER_INPUT" },
          }
        );
      }

      if (self.following.includes(userToFollowId)) {
        throw new GraphQLError(
          "followUser: You are already following the given user",
          {
            extensions: { code: "BAD_USER_INPUT" },
          }
        );
      }

      if (userToFollow.followers.includes(selfId)) {
        throw new GraphQLError(
          "followUser: You are already in the given user followers list",
          {
            extensions: { code: "BAD_USER_INPUT" },
          }
        );
      }

      const updateSelf = await users.updateOne(
        { _id: selfId },
        {
          $push: { following: userToFollowId },
        }
      );

      const updateToFollowUser = await users.updateOne(
        { _id: userToFollowId },
        {
          $push: { followers: selfId },
        }
      );

      const updateSelfAfter = await users.findOne({ _id: selfId });

      return updateSelfAfter;
    },
    unfollowUser: async (_, args) => {
      let { selfId, userToUnfollowId } = args;

      const users = await userCollection();

      const self = await users.findOne({ _id: selfId });

      if (!self) {
        throw new GraphQLError(
          "followUser: User with provided ID does not exist",
          {
            extensions: { code: "BAD_USER_INPUT" },
          }
        );
      }
      const userToUnfollow = await users.findOne({ _id: userToUnfollowId });

      if (!userToUnfollow) {
        throw new GraphQLError(
          "followUser: ID for User to unfollow does not exist",
          {
            extensions: { code: "BAD_USER_INPUT" },
          }
        );
      }

      if (!self.following.includes(userToUnfollowId)) {
        throw new GraphQLError(
          "followUser: You are already not following the given user",
          {
            extensions: { code: "BAD_USER_INPUT" },
          }
        );
      }

      if (!userToUnfollow.followers.includes(selfId)) {
        throw new GraphQLError(
          "followUser: You are already NOT in the given user followers list",
          {
            extensions: { code: "BAD_USER_INPUT" },
          }
        );
      }

      const updateSelf = await users.updateOne(
        { _id: selfId },
        {
          $pull: { following: userToUnfollowId },
        }
      );

      const updateToUnfollowUser = await users.updateOne(
        { _id: userToUnfollowId },
        {
          $pull: { followers: selfId },
        }
      );

      const updateSelfAfter = await users.findOne({ _id: selfId });

      return updateSelfAfter;
    },
    createBlog: async (_, args) => {
      let { title, content, userId } = args;
      // validate

      const blogs = await blogCollection();

      const newBlog = {
        _id: uuid(),
        title,
        content,
        date: new Date(),
        likes: [],
        userId,
      };

      let insertedBlog = await blogs.insertOne(newBlog);
      if (!insertedBlog.acknowledged || !insertedBlog.insertedId) {
        throw new GraphQLError(`createBlog: Could not create blog`, {
          extensions: { statusCode: 400, code: "INTERNAL_SERVER_ERROR" },
        });
      }
      return newBlog;
    },
    editBlog: async (_, args) => {
      let { _id, userId, title, content } = args;

      // validate

      const blogs = await blogCollection();
      const blog = await blogs.findOne({ _id: _id });

      if (blog.userId !== userId) {
        throw new GraphQLError(
          "editBlog: You do not have the permission to edit this blog",
          {
            extensions: { code: "BAD_USER_INPUT", statusCode: 403 },
          }
        );
      }

      let updateFields = {};

      if (title !== undefined && title !== null) {
        updateFields.title = title;
      }
      if (content !== undefined && content !== null) {
        updateFields.content = content;
      }

      updateFields.date = new Date();

      const updateResult = await blogs.updateOne(
        { _id: _id },
        { $set: updateFields }
      );

      if (updateResult.modifiedCount === 0) {
        throw new GraphQLError("editBlog: Nothing updated", {
          extensions: { code: "BAD_USER_INPUT", statusCode: 400 },
        });
      }

      const updatedBlog = await blogs.findOne({ _id: _id });

      return updatedBlog;
    },
    removeBlog: async (_, args) => {
      let { _id } = args;

      const blogs = await blogCollection();

      const blog = await blogs.findOne({ _id: _id });
      if (!blog) {
        throw new GraphQLError(
          "removeBlog: could not find blog with given id",
          {
            extensions: { code: "NOT_FOUND", statusCode: 404 },
          }
        );
      }
      const removeBlog = await blogs.deleteOne({ _id: _id });

      if (removeBlog.deletedCount === 0) {
        throw new GraphQLError("removeBlog: Could not remove blog", {
          extensions: { code: "INTERNAL_SERVER_ERROR", statusCode: 500 },
        });
      }

      return blog;
    },
    saveBlog: async (_, args) => {
      let { blogId, userId } = args;

      // validate

      const users = await userCollection();
      const user = await users.findOne({ _id: userId });
      if (!user) {
        throw new GraphQLError("Could not find the user with provided id", {
          extensions: { code: "NOT_FOUND", statusCode: 404 },
        });
      }

      const blogs = await blogCollection();
      const blog = await blogs.findOne({ _id: blogId });
      if (!blog) {
        throw new GraphQLError("Could not find the blog with provided id", {
          extensions: { code: "NOT_FOUND", statusCode: 404 },
        });
      }

      if (user.saved.includes(blogId)) {
        throw new GraphQLError(
          "saveBlog: You have already saved the given blog",
          {
            extensions: { code: "BAD_USER_INPUT" },
          }
        );
      }

      const updateUser = await users.updateOne(
        { _id: userId },
        {
          $push: { saved: blogId },
        }
      );

      const updateUserAfter = await users.findOne({ _id: userId });

      return updateUserAfter;
    },
    unsaveBlog: async (_, args) => {
      let { blogId, userId } = args;

      // validate

      const users = await userCollection();
      const user = await users.findOne({ _id: userId });
      if (!user) {
        throw new GraphQLError("Could not find the user with provided id", {
          extensions: { code: "NOT_FOUND", statusCode: 404 },
        });
      }

      const blogs = await blogCollection();
      const blog = await blogs.findOne({ _id: blogId });
      if (!blog) {
        throw new GraphQLError("Could not find the blog with provided id", {
          extensions: { code: "NOT_FOUND", statusCode: 404 },
        });
      }

      if (!user.saved.includes(blogId)) {
        throw new GraphQLError(
          "unsaveBlog: You have not saved the given blog already",
          {
            extensions: { code: "BAD_USER_INPUT" },
          }
        );
      }

      const updateUser = await users.updateOne(
        { _id: userId },
        {
          $pull: { saved: blogId },
        }
      );

      const updateUserAfter = await users.findOne({ _id: userId });

      return updateUserAfter;
    },
    likeBlog: async (_, args) => {
      let { blogId, userId } = args;

      //validate

      const users = await userCollection();
      const user = await users.findOne({ _id: userId });
      if (!user) {
        throw new GraphQLError("Could not find the user with provided id", {
          extensions: { code: "NOT_FOUND", statusCode: 404 },
        });
      }

      const blogs = await blogCollection();
      const blog = await blogs.findOne({ _id: blogId });
      if (!blog) {
        throw new GraphQLError("Could not find the blog with provided id", {
          extensions: { code: "NOT_FOUND", statusCode: 404 },
        });
      }

      if (blog.likes.includes(userId)) {
        throw new GraphQLError(
          "likeBlog: You have already liked the given blog",
          {
            extensions: { code: "BAD_USER_INPUT" },
          }
        );
      }

      const updateBlog = await blogs.updateOne(
        { _id: blogId },
        {
          $push: { likes: userId },
        }
      );

      const updateBlogAfter = await blogs.findOne({ _id: blogId });

      return updateBlogAfter;
    },
    unlikeBlog: async (_, args) => {
      let { blogId, userId } = args;

      //validate

      const users = await userCollection();
      const user = await users.findOne({ _id: userId });
      if (!user) {
        throw new GraphQLError("Could not find the user with provided id", {
          extensions: { code: "NOT_FOUND", statusCode: 404 },
        });
      }

      const blogs = await blogCollection();
      const blog = await blogs.findOne({ _id: blogId });
      if (!blog) {
        throw new GraphQLError("Could not find the blog with provided id", {
          extensions: { code: "NOT_FOUND", statusCode: 404 },
        });
      }

      if (!blog.likes.includes(userId)) {
        throw new GraphQLError(
          "unlikeBlog: You already unliked the given blog",
          {
            extensions: { code: "BAD_USER_INPUT" },
          }
        );
      }

      const updateBlog = await blogs.updateOne(
        { _id: blogId },
        {
          $pull: { likes: userId },
        }
      );

      const updateBlogAfter = await blogs.findOne({ _id: blogId });

      return updateBlogAfter;
    },
    createComment: async (_, args) => {
      let { blogId, userId, comment } = args;

      //validate

      const comments = await commentCollection();

      const newComment = {
        _id: uuid(),
        blogId,
        userId,
        comment,
        date: new Date(),
      };

      let insertedComment = await comments.insertOne(newComment);
      if (!insertedComment.acknowledged || !insertedComment.insertedId) {
        throw new GraphQLError(`createComment: Could not create comment`, {
          extensions: { statusCode: 400, code: "INTERNAL_SERVER_ERROR" },
        });
      }
      return newComment;
    },
    removeComment: async (_, args) => {
      let { commentId } = args;

      const comments = await commentCollection();

      const comment = await comments.findOne({ _id: commentId });
      if (!comment) {
        throw new GraphQLError(
          "removeComment: could not find comment with given id",
          {
            extensions: { code: "NOT_FOUND", statusCode: 404 },
          }
        );
      }

      const removeComment = await comments.deleteOne({ _id: commentId });
      if (removeComment.deletedCount === 0) {
        throw new GraphQLError("removeComment: Could not remove comment", {
          extensions: { code: "INTERNAL_SERVER_ERROR", statusCode: 500 },
        });
      }

      return comment;
    },
  },
};
