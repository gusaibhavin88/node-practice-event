const { body } = require("express-validator");

exports.registerUserValidation = [
  body("email").notEmpty().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
  body("password").notEmpty().withMessage("Password is required"),
];
