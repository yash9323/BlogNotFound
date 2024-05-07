import { GraphQLError } from "graphql";

const checkPassword = (password) => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (!passwordRegex.test(password)) {
    throw new GraphQLError(
      "Password must contain at least one digit, one lowercase letter, one uppercase letter, and have a minimum length of 8 characters",
      { code: "BAD_INPUT" }
    );
  }
  return password.trim();
};

const checkEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    throw new GraphQLError("Enter a valid email ID", { code: "BAD_INPUT" });
  }
  if (email.length > 30 || email.length < 0) {
    throw new GraphQLError("Email can be max of 30 characters", {
      code: "BAD_INPUT",
    });
  }
  return email.trim().toLowerCase();
};

const validateBio = (bio) => {
  const minBioLength = 3;
  const maxBioLength = 150;
  const bioRegex = /[a-zA-Z]/;

  if (bio.length < minBioLength) {
    throw new GraphQLError(
      `registerUser: Biography must be at least ${minBioLength} characters long`,
      {
        extensions: { code: "INVALID_BIO_LENGTH", statusCode: 400 },
      }
    );
  }
  if (bio.length > maxBioLength) {
    throw new GraphQLError(
      `registerUser: Biography exceeds maximum length of ${maxBioLength} characters`,
      {
        extensions: { code: "INVALID_BIO_LENGTH", statusCode: 400 },
      }
    );
  }
  if (!bio.match(bioRegex)) {
    throw new GraphQLError(
      `registerUser: Biography cannot contain all numbers or special characters`,
      {
        extensions: { code: "INVALID_BIO_CONTENT", statusCode: 400 },
      }
    );
  }
  return bio;
};

const validateName = (fname, lname) => {
  if (
    fname === undefined ||
    fname === null ||
    lname === undefined ||
    lname === null
  ) {
    throw new GraphQLError(`first name or last name not supplied`, {
      extensions: { code: "INVALID_NAME", statusCode: 400 },
    });
  }
  const nameRegex = /^[A-Za-z]+$/;
  if (!nameRegex.test(fname) || !nameRegex.test(lname)) {
    throw new GraphQLError(`Invalid first name or last name`, {
      extensions: { code: "INVALID_NAME", statusCode: 400 },
    });
  }
};

const validateFirstName = (fname) => {
  if (fname === undefined || fname === null) {
    throw new GraphQLError(`first name not supplied`, {
      extensions: { code: "INVALID_NAME", statusCode: 400 },
    });
  }
  const nameRegex = /^[A-Za-z]+$/;
  if (!nameRegex.test(fname)) {
    throw new GraphQLError(`Invalid first name`, {
      extensions: { code: "INVALID_NAME", statusCode: 400 },
    });
  }
};

const validateLasttName = (lname) => {
  if (lname === undefined || lname === null) {
    throw new GraphQLError(`last name not supplied`, {
      extensions: { code: "INVALID_NAME", statusCode: 400 },
    });
  }
  const nameRegex = /^[A-Za-z]+$/;
  if (!nameRegex.test(lname)) {
    throw new GraphQLError(`Invalid last name`, {
      extensions: { code: "INVALID_NAME", statusCode: 400 },
    });
  }
};

const validateContent = (content) => {
  const minContentLength = 20;
  const maxContentLength = 2500;

  const ContentRegex = /[a-zA-Z]/;

  if (content.length < minContentLength) {
    throw new GraphQLError(
      `Content must be at least ${minContentLength} characters long`,
      {
        extensions: { code: "INVALID_CONTENT_LENGTH", statusCode: 400 },
      }
    );
  }
  if (content.length > maxContentLength) {
    throw new GraphQLError(
      `Content exceeds maximum length of ${maxContentLength} characters`,
      {
        extensions: { code: "INVALID_CONTENT_LENGTH", statusCode: 400 },
      }
    );
  }

  if (!content.match(ContentRegex)) {
    throw new GraphQLError(
      `Content cannot contain all numbers or special characters`,
      {
        extensions: { code: "INVALID_BIO_CONTENT", statusCode: 400 },
      }
    );
  }
  return content;
};

const containsOnlyLetters = (str) => /^[A-Za-z\s]+$/.test(str);

const validateTitle = (title) => {
  if (!title.trim() || !containsOnlyLetters(title.trim())) {
    throw new GraphQLError(
      "Title cannot be empty or contain only spaces or numbers",
      {
        extensions: { code: "BAD_REQUEST", statusCode: 400 },
      }
    );
  }
};

const validateTag = (tag) => {
  tag = tag.toLowerCase().trim();
  const tagRegex = /^[A-Za-z]+$/;
  if (!tagRegex.test(tag)) {
    throw new GraphQLError("Tag must contain only alphabetic characters", {
      extensions: { code: "BAD_REQUEST", statusCode: 400 },
    });
  }
  if (tag.length < 0 || tag.length > 5) {
    throw new GraphQLError("Tags can only be 1-5 characters long", {
      extensions: { code: "BAD_REQUEST", statusCode: 400 },
    });
  }
  return tag;
};

const validateComment = (comment) => {
  const minCommentLength = 1;
  const maxCommentLength = 50;

  const CommentRegex = /[a-zA-Z]/;

  if (comment.length < minCommentLength) {
    throw new GraphQLError(
      `Comment must be at least ${minCommentLength} characters long`,
      {
        extensions: { code: "INVALID_COMMENT_LENGTH", statusCode: 400 },
      }
    );
  }
  if (comment.length > maxCommentLength) {
    throw new GraphQLError(
      `Comment exceeds maximum length of ${maxCommentLength} characters`,
      {
        extensions: { code: "INVALID_COMMENT_LENGTH", statusCode: 400 },
      }
    );
  }

  if (!comment.match(CommentRegex)) {
    throw new GraphQLError(
      `registerUser: Content cannot contain all numbers or special characters`,
      {
        extensions: { code: "INVALID_BIO_CONTENT", statusCode: 400 },
      }
    );
  }
  return comment;
};

export {
  checkPassword,
  checkEmail,
  validateBio,
  validateName,
  validateContent,
  validateTitle,
  validateComment,
  validateFirstName,
  validateLasttName,
  validateTag,
};
