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
  },
  Mutation: {
    registerUser: async (_, args) => {
      let { fname, lname, email, password } = args;

      //validate
      const users = await userCollection();
      const user = await users.findOne({ email: email });
      if (user) {
        throw new GraphQLError(`registerUser: This email already exists`, {
          extensions: { statusCode: 400, code: "INTERNAL_SERVER_ERROR" },
        });
      }
      const newUser = {
        _id: uuid(),
        fname,
        lname,
        email,
        password,
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
  },
};
