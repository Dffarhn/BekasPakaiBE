import { body } from "express-validator";

export const loginValidationRules = [
  body("email")
    .trim() // Trim whitespace
    .isEmail()
    .withMessage("Invalid email format"),

  body("password")
    .trim() // Trim whitespace
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/)
    .withMessage("Password must contain at least one letter and one number")
    .notEmpty()
    .withMessage("Password cannot be empty or contain only whitespace"), // Check for empty
];
