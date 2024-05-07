// Validations

export const validateTag = (tag) => {
    tag = tag.toLowerCase().trim();
    const tagRegex = /^[A-Za-z]+$/;
    if (!tagRegex.test(tag)) {
      throw "Tag must contain only alphabetic characters"
    }
    if (tag.length > 5) {
        throw "Tags can only be 1-5 characters long"
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
      throw `Content must be at least ${minContentLength} characters long`
    }
    if (content.length > maxContentLength) {
      throw `Content exceeds maximum length of ${maxContentLength} characters`
    }
  
    if (!content.match(ContentRegex)) {
      throw `Content cannot contain all numbers or special characters`
    }
  };