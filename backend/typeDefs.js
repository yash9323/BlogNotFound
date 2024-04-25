export const typeDefs = `#graphql

type User {
    _id: String!
    fname: String!
    lname: String!
    email: String!
    password: String!
    bio: String!
    followers: [String!]
    following: [String!]
    saved: [String!]
  }

  type Query {
    loginUser(email: String!, password: String): User
    getUser(userId: String!): User
    searchUserByName(searchTerm: String!): [User]
  }

  type Mutation {
    registerUser(
    fname: String!
    lname: String!
    email: String!
    password: String!
    bio: String!): User

    editUser(
      _id: String!
      fname: String
      lname: String
      email: String
      password: String
      bio: String
    ): User
  }
`;
