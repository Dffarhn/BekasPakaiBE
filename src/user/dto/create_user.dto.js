import { body } from "express-validator";

export const createUserValidator = [
  body("username").isString().notEmpty().withMessage("Username is required and must be a string"),

  body("email").isEmail().withMessage("Please enter a valid email"),

  body("password").isString().notEmpty().withMessage("Password is required"),

  body("noHandphone").optional().isString().withMessage("Phone number must be a string"),

  body("tanggalLahir").optional().isDate().withMessage("Invalid date format for tanggalLahir"),

  body("jenisKelamin").optional().isIn(["Laki-Laki", "Perempuan"]).withMessage("Invalid value for gender"),
];
