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
  ) {
    registerUser(
      fname: $fname
      lname: $lname
      email: $email
      password: $password
    ) {
      _id
      email
      fname
      lname
    }
  }
`;

let exported = {
  LOGIN_USER,
  REGISTER_USER,
};

export default exported;
