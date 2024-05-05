export const typeDefs = `#graphql

scalar Date

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

  type Blog {
    _id: String!
    image: String!
    title: String!
    content: String!
    date: Date!
    likes: [String!]
    userId: String!
  }
  
  type Comment{
    _id: String
    blogId: String!
    user: User
    comment: String!
    date: Date!
  }

  type Query {
    loginUser(email: String!, password: String): User
    getUser(userId: String!): User
    searchUserByName(selfId: String!, searchTerm: String!): [User]
    getAllBlogs: [Blog]
    getBlog(blogId: String!): Blog
    getBlogsByUserId(userId: String!): [Blog]
    getBlogsByFollowing(userId: String!): [Blog]
    getSavedBlogs(userId: String!): [Blog]
    getCommentsByBlogId( blogId: String!): [Comment]
    searchBlogs(searchTerm: String!): [Blog]
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
      bio: String): User

    followUser(
      selfId: String!
      userToFollowId: String!): User
    
    unfollowUser(
      selfId: String!
      userToUnfollowId: String!): User
    
    createBlog(
      title: String!
      image: String!
      content: String!
      userId: String! ): Blog
    
    editBlog(
      _id: String!
      userId: String!
      image: String
      title: String
      content: String): Blog
    
    removeBlog( 
      _id: String!): Blog
    
    saveBlog(
      blogId: String!
      userId: String!): User

    unsaveBlog(
      blogId: String!
      userId: String!): User
    
    likeBlog(
      blogId: String!
      userId: String!): Blog

    unlikeBlog(
      blogId: String!
      userId: String!): Blog
    
    createComment(
      blogId: String!
      userId: String!
      comment: String!): Comment
    
    removeComment(
      commentId: String!): Comment
  }
`;
