import { body } from "express-validator";

export const CreateCategoryValidationRules = [
  body("name")
    .trim() // Trim whitespace
    .isString() // Ensure it's a string
    .withMessage("Category name must be a string")
    .isLength({ min: 3, max: 50 }) // Set minimum and maximum length
    .withMessage("Category name must be between 3 and 50 characters")
    .matches(/^[a-zA-Z0-9\s]+$/) // Only allow letters, numbers, and spaces
    .withMessage("Category name can only contain letters, numbers, and spaces"),
];
