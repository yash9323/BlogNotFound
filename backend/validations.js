const errorType = {
    BAD_INPUT: "BAD_INPUT"
  };
  
  const errorObject = (type, message) => ({ type, message });
  
  const checkPassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      throw errorObject(errorType.BAD_INPUT, "Error: password must contain at least one digit, one lowercase letter, one uppercase letter, and have a minimum length of 8 characters");
    }
    return password.trim();
  };
  
  const checkEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!emailRegex.test(email.trim())) {
      throw errorObject(errorType.BAD_INPUT, "Error: Enter a valid email ID");
    }
    if (email.length > 30 || email.length < 0) {
      throw errorObject(errorType.BAD_INPUT, "Error: Email can be max of 30 characters");
    }
    return email.trim().toLowerCase();
  };
  const validateBio = (bio) => {
    const minBioLength = 3;
    const maxBioLength = 150;
  
    if (bio.length < minBioLength) {
      throw new GraphQLError(`registerUser: Biography must be at least ${minBioLength} characters long`, {
        extensions: { code: "INVALID_BIO_LENGTH", statusCode: 400 },
      });
    }
    if (bio.length > maxBioLength) {
      throw new GraphQLError(`registerUser: Biography exceeds maximum length of ${maxBioLength} characters`, {
        extensions: { code: "INVALID_BIO_LENGTH", statusCode: 400 },
      });
    }
    return bio;
  };

  const validateName = (fname, lname) => {
    const nameRegex = /^[A-Za-z\s]+$/;
  
    if (!nameRegex.test(fname) || !nameRegex.test(lname)) {
      throw new GraphQLError(`Invalid first name or last name`, {
        extensions: { code: "INVALID_NAME", statusCode: 400 },
      });
    }
  };

  const validateContent = (content) => {
    const minContentLength = 20;
    const maxContentLength = 2500;
  
    if (content.length < minContentLength) {
      throw new GraphQLError(`Content must be at least ${minContentLength} characters long`, {
        extensions: { code: "INVALID_CONTENT_LENGTH", statusCode: 400 },
      });
    }
    if (content.length > maxContentLength) {
      throw new GraphQLError(`Content exceeds maximum length of ${maxContentLength} characters`, {
        extensions: { code: "INVALID_CONTENT_LENGTH", statusCode: 400 },
      });
    }
    return content;
  };
  
  const containsOnlyLetters = (str) => /^[A-Za-z\s]+$/.test(str);

  const validateTitle = (title) => {
    if (!title.trim() || !containsOnlyLetters(title.trim())) {
      throw new GraphQLError('Title cannot be empty or contain only spaces or numbers', {
        extensions: { code: 'BAD_REQUEST', statusCode: 400 }
      });
    }
  };

  const validateComment = (comment) => {
    const minCommentLength = 5;
    const maxCommentLength = 50;
  
    if (comment.length < minCommentLength) {
      throw new GraphQLError(`Comment must be at least ${minCommentLength} characters long`, {
        extensions: { code: "INVALID_COMMENT_LENGTH", statusCode: 400 },
      });
    }
    if (comment.length > maxCommentLength) {
      throw new GraphQLError(`Comment exceeds maximum length of ${maxCommentLength} characters`, {
        extensions: { code: "INVALID_COMMENT_LENGTH", statusCode: 400 },
      });
    }
    return comment;
  };
  
  export { checkPassword, checkEmail, validateBio,validateName,validateContent,validateTitle,validateComment,errorType };
  