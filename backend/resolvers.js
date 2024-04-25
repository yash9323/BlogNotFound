import { GraphQLError } from "graphql";
import { validate } from "uuid";
import { v4 as uuid } from "uuid";
import { users as userCollection } from "./config/mongoCollections.js";

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
  },
};
