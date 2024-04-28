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
const GET_BLOG = gql`
  query GetBlog($blogId: String!) {
    getBlog(blogId: $blogId) {
      _id
      content
      date
      likes
      title
      userId
    }
  }
`;

const CREATE_BLOG = gql`
  mutation Mutation($title: String!, $content: String!, $userId: String!) {
    createBlog(title: $title, content: $content, userId: $userId) {
      _id
      content
      date
      likes
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
    $password: String
    $bio: String
  ) {
    editUser(
      _id: $id
      fname: $fname
      lname: $lname
      email: $email
      password: $password
      bio: $bio
    ) {
      _id
      bio
      email
      fname
      lname
      password
      followers
      following
      saved
    }
  }
`;

const GET_ALL_BLOGS = gql`
  query Query {
    getAllBlogs {
      _id
      title
      content
      date
      likes
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

const CREATE_COMMENT = gql`
  mutation Mutation($blogId: String!, $userId: String!, $comment: String!) {
    createComment(blogId: $blogId, userId: $userId, comment: $comment) {
      _id
      blogId
      comment
      date
      userId
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
      userId
    }
  }
`;

let exported = {
  LOGIN_USER,
  REGISTER_USER,
  GET_USER,
  GET_BLOG,
  GET_ALL_BLOGS,
  LIKE_BLOG,
  UNLIKE_BLOG,
  CREATE_BLOG,
  EDIT_USER,
  CREATE_COMMENT,
  GET_COMMENTS_BY_BLOG_ID,
};

export default exported;
