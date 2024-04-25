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
`

let exported = {
  LOGIN_USER,
  REGISTER_USER,
  GET_USER
};

export default exported;
