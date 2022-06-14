const Validator = require("validator");
const isEmpty = require("./isEmpty");

const validateRegisterInput = (data) => {

  //we will add errors to our error object here depending on the field
  let errors = {};

  //check email field
  if (isEmpty(data.email)) {
    errors.email = "Email field can not be empty";
    //.isEmail from validator
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid, please provide a valid email";
  }

  //check password field
  if (isEmpty(data.password)) {
    errors.password = "Password can not be empty!";
    //.isLength from validator
  } else if (!Validator.isLength(data.password, { min: 6, max: 150 })) {
    errors.password = "Password must be between 6 and 150 characters long";
  }

  //check name field 

  if (isEmpty(data.name)) {
    errors.name = "Name can not be empty!";
  } else if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters long";
  }

  //check confirm password field
  if (isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Confirm password field can not be empty";
    //compares password and confirmPassword fields
  } else if (!Validator.equals(data.password, data.confirmPassword)) {
      errors.confirmPassword = "Password and Confirm Password fileds must match";
  }
  return { errors, isValid: isEmpty(errors) };
};

module.exports = validateRegisterInput;
