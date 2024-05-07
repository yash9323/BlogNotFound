// Validations

export const validateTag = (tag) => {
  tag = tag.toLowerCase().trim();
  const tagRegex = /^[A-Za-z]+$/;
  if (!tagRegex.test(tag)) {
    throw "Tag must contain only alphabetic characters";
  }
  if (tag.length > 5) {
    throw "Tags can only be 1-5 characters long";
  }
};

const containsOnlyLetters = (str) => /^[A-Za-z\s]+$/.test(str);

export const validateTitle = (title) => {
  if (!title.trim() || !containsOnlyLetters(title.trim())) {
    throw "Title cannot be empty or contain only spaces or numbers";
  }
};

export const validateContent = (content) => {
  const minContentLength = 20;
  const maxContentLength = 2500;

  const ContentRegex = /[a-zA-Z]/;

  if (content.length < minContentLength) {
    throw `Content must be at least ${minContentLength} characters long`;
  }
  if (content.length > maxContentLength) {
    throw `Content exceeds maximum length of ${maxContentLength} characters`;
  }

  if (!content.match(ContentRegex)) {
    throw `Content cannot contain all numbers or special characters`;
  }
};
export function fnameChecker(fname) {
  if (fname === undefined) {
    throw "Error: First Name not passed";
  } else if (typeof fname !== "string") {
    throw "Error: First Name passed is not a String!";
  } else if (fname.trim().length === 0) {
    throw "Error: First Name is not passed or has only has empty spaces";
  } else if (!/^[A-Za-z]+$/.test(fname)) {
    throw "Error: First Name passed has characters other than letters which are not accepted";
  } else if (fname.length < 2 || fname.length > 25) {
    throw "Error: First Name should be between 2-25 characters";
  } else if (/<|>/.test(fname)) {
    throw "No injection of tags allowed!";
  }
}

export function lnameChecker(lname) {
  if (lname === undefined) {
    throw "Error: Last Name not passed";
  } else if (typeof lname !== "string") {
    throw "Error: Last Name passed is not a String!";
  } else if (lname.trim().length === 0) {
    throw "Error: Last Name is not passed or only has empty spaces";
  } else if (!/^[A-Za-z]+$/.test(lname)) {
    throw "Error: Last Name passed has characters other than letters which are not accepted";
  } else if (lname.length < 2 || lname.length > 25) {
    throw "Error: Last Name should be between 2-25 characters";
  } else if (/<|>/.test(lname)) {
    throw "No injection of tags allowed!";
  }
}

export function validateBio(bio) {
  const minBioLength = 3;
  const maxBioLength = 150;

  if (bio === undefined) {
    throw `Error: Biography not passed`;
  } else if (typeof bio !== "string") {
    throw `Error: Biography passed is not a String!`;
  } else if (bio.length < minBioLength) {
    throw `Error: Biography must be at least ${minBioLength} characters long`;
  } else if (bio.length > maxBioLength) {
    throw `Error: Biography exceeds maximum length of ${maxBioLength} characters`;
  }
}

export function checkEmail(email) {
  if (email === undefined) {
    throw "Error: Email Address not passed";
  } else if (typeof email !== "string") {
    throw "Error: Email Address passed is not a String!";
  } else if (email.trim().length === 0) {
    throw "Error: Email Address passed only has empty spaces";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      throw "Error: Incorrect format of Email Address";
    }
    if (email.length > 30 || email.length < 1) {
      throw "Error: Email Address should be between 1-30 characters";
    }
  }
}

export function checkPassword(password) {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  if (password === undefined) {
    throw "Error: Password not passed";
  } else if (typeof password !== "string") {
    throw "Error: Password passed is not a String!";
  } else if (!passwordRegex.test(password)) {
    throw "Password must contain at least one digit, one lowercase letter, one uppercase letter, and have a minimum length of 8 characters";
  }
}
