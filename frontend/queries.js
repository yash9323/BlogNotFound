import { gql } from "@apollo/client";

const LOGIN_USER = gql`
  query Query($email: String!, $password: String) {
    loginUser(email: $email, password: $password) {
      _id
      email
      fname
      lname
    }
  }
`;

const REGISTER_USER = gql`
  mutation Mutation(
    $fname: String!
    $lname: String!
    $email: String!
    $password: String!
    $bio: String!
  ) {
    registerUser(
      fname: $fname
      lname: $lname
      email: $email
      password: $password
      bio: $bio
    ) {
      _id
      email
      fname
      lname
      bio
    }
  }
`;

const GET_USER = gql`
  query Query($userId: String!) {
    getUser(userId: $userId) {
      bio
      _id
      email
      fname
      followers
      following
      lname
      saved
    }
  }
`;

const REMOVE_USER = gql`
  mutation Mutation($id: String!) {
    removeUser(_id: $id) {
      _id
      bio
      email
      fname
      followers
      following
      lname
      saved
    }
  }
`;

const GET_BLOG = gql`
  query Query($blogId: String!) {
    getBlog(blogId: $blogId) {
      _id
      content
      date
      image
      likes
      tag
      title
      userId
    }
  }
`;

const CREATE_BLOG = gql`
  mutation Mutation(
    $title: String!
    $image: String!
    $content: String!
    $userId: String!
    $tag: String
  ) {
    createBlog(
      title: $title
      image: $image
      content: $content
      userId: $userId
      tag: $tag
    ) {
      _id
      content
      date
      image
      likes
      tag
      title
      userId
    }
  }
`;

const EDIT_BLOG = gql`
  mutation Mutation(
    $id: String!
    $userId: String!
    $image: String
    $title: String
    $content: String
    $tag: String
  ) {
    editBlog(
      _id: $id
      userId: $userId
      image: $image
      title: $title
      content: $content
      tag: $tag
    ) {
      _id
      content
      date
      image
      likes
      tag
      title
      userId
    }
  }
`;

const EDIT_USER = gql`
  mutation Mutation(
    $id: String!
    $fname: String
    $lname: String
    $email: String
    $bio: String
  ) {
    editUser(_id: $id, fname: $fname, lname: $lname, email: $email, bio: $bio) {
      _id
      bio
      email
      fname
      lname
      followers
      following
      saved
    }
  }
`;

const GET_ALL_BLOGS = gql`
  query GetAllBlogs {
    getAllBlogs {
      userId
      title
      image
      likes
      date
      content
      _id
    }
  }
`;

const SEARCH_BLOGS = gql`
  query SearchBlogs($searchTerm: String!) {
    searchBlogs(searchTerm: $searchTerm) {
      _id
      content
      date
      image
      likes
      title
      userId
    }
  }
`;

const GET_SAVED_BLOGS = gql`
  query Query($userId: String!) {
    getSavedBlogs(userId: $userId) {
      _id
      content
      date
      likes
      title
      userId
      image
    }
  }
`;

const GET_BLOGS_BY_USER_ID = gql`
  query Query($userId: String!) {
    getBlogsByUserId(userId: $userId) {
      _id
      content
      date
      likes
      title
      userId
      image
    }
  }
`;

const GET_BLOGS_BY_FOLLOWING = gql`
  query Query($userId: String!) {
    getBlogsByFollowing(userId: $userId) {
      _id
      content
      date
      image
      likes
      title
      userId
    }
  }
`;

const LIKE_BLOG = gql`
  mutation Mutation($blogId: String!, $userId: String!) {
    likeBlog(blogId: $blogId, userId: $userId) {
      _id
      content
      date
      likes
      title
      userId
    }
  }
`;

const UNLIKE_BLOG = gql`
  mutation Mutation($blogId: String!, $userId: String!) {
    unlikeBlog(blogId: $blogId, userId: $userId) {
      _id
      content
      date
      likes
      title
      userId
    }
  }
`;

const SAVE_BLOG = gql`
  mutation Mutation($blogId: String!, $userId: String!) {
    saveBlog(blogId: $blogId, userId: $userId) {
      _id
      bio
      email
      fname
      followers
      following
      lname
      saved
    }
  }
`;

const UNSAVE_BLOG = gql`
  mutation Mutation($blogId: String!, $userId: String!) {
    unsaveBlog(blogId: $blogId, userId: $userId) {
      _id
      bio
      email
      fname
      followers
      following
      lname
      saved
    }
  }
`;

const DELETE_BLOG = gql`
  mutation Mutation($id: String!) {
    removeBlog(_id: $id) {
      _id
      content
      date
      image
      likes
      title
      userId
    }
  }
`;

const CREATE_COMMENT = gql`
  mutation Mutation($blogId: String!, $userId: String!, $comment: String!) {
    createComment(blogId: $blogId, userId: $userId, comment: $comment) {
      _id
      blogId
      comment
      date
      user {
        _id
        bio
        email
        fname
        followers
        following
        lname
        saved
      }
    }
  }
`;

const GET_COMMENTS_BY_BLOG_ID = gql`
  query Query($blogId: String!) {
    getCommentsByBlogId(blogId: $blogId) {
      _id
      blogId
      comment
      date
      user {
        _id
        bio
        email
        fname
        followers
        following
        lname
        saved
      }
    }
  }
`;

const DELETE_COMMMENT = gql`
  mutation Mutation($commentId: String!) {
    removeComment(commentId: $commentId) {
      _id
      blogId
      comment
      date
      user {
        _id
        bio
        email
        fname
        followers
        following
        lname
        saved
      }
    }
  }
`;

const FOLLOW_USER = gql`
  mutation Mutation($selfId: String!, $userToFollowId: String!) {
    followUser(selfId: $selfId, userToFollowId: $userToFollowId) {
      _id
      bio
      email
      fname
      followers
      following
      lname
      saved
    }
  }
`;

const UNFOLLOW_USER = gql`
  mutation Mutation($selfId: String!, $userToUnfollowId: String!) {
    unfollowUser(selfId: $selfId, userToUnfollowId: $userToUnfollowId) {
      _id
      bio
      email
      fname
      followers
      following
      lname
      saved
    }
  }
`;

const SEARCH_USER_BY_NAME = gql`
  query Query($selfId: String!, $searchTerm: String!) {
    searchUserByName(selfId: $selfId, searchTerm: $searchTerm) {
      _id
      bio
      email
      fname
      followers
      following
      lname
      saved
    }
  }
`;

const GET_BLOGS_BY_TAG = gql`
  query Query($tag: String!) {
    getBlogsByTag(tag: $tag) {
      _id
      content
      date
      image
      likes
      tag
      title
      userId
    }
  }
`;

const GET_TAGS = gql`
  query Query {
    getTags
  }
`;

let exported = {
  LOGIN_USER,
  REGISTER_USER,
  REMOVE_USER,
  FOLLOW_USER,
  UNFOLLOW_USER,
  GET_USER,
  GET_BLOG,
  GET_ALL_BLOGS,
  GET_SAVED_BLOGS,
  GET_BLOGS_BY_USER_ID,
  GET_BLOGS_BY_FOLLOWING,
  EDIT_BLOG,
  LIKE_BLOG,
  UNLIKE_BLOG,
  SAVE_BLOG,
  UNSAVE_BLOG,
  CREATE_BLOG,
  DELETE_BLOG,
  EDIT_USER,
  CREATE_COMMENT,
  GET_COMMENTS_BY_BLOG_ID,
  DELETE_COMMMENT,
  SEARCH_USER_BY_NAME,
  SEARCH_BLOGS,
  GET_BLOGS_BY_TAG,
  GET_TAGS,
};

export default exported;
