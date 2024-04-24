export const typeDefs = `#graphql

type User {
    _id: String!
    fname: String!
    lname: String!
    email: String!
    password: String!
    followers: [String!]
    following: [String!]
    saved: [String!]
  }

  type Query {
    loginUser(email: String!, password: String): User
  }

  type Mutation {
    registerUser(
    fname: String!
    lname: String!
    email: String!
    password: String!): User
  }




`;
