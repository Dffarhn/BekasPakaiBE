import { body } from "express-validator";

const upgradeToPenjualValidator = [
  body("codeBank")
    .trim()
    .notEmpty()
    .withMessage("Bank code is required.")
    .isString()
    .withMessage("Bank code must be a string."),
  
  body("namaRekening")
    .trim()
    .notEmpty()
    .withMessage("Account name is required.")
    .isString()
    .withMessage("Account name must be a string."),
  
  body("nomorRekening")
    .trim()
    .notEmpty()
    .withMessage("Account number is required.")
    .isString()
    .withMessage("Account number must be a string."),

  body("alamat")
    .trim()
    .notEmpty()
    .withMessage("Address is required.")
    .isString()
    .withMessage("Address must be a string."),
  
  body("kodePos")
    .trim()
    .notEmpty()
    .withMessage("Postal code is required.")
    .isString()
    .withMessage("Postal code must be a string."),
  
  body("negara")
    .trim()
    .notEmpty()
    .withMessage("Country is required.")
    .isString()
    .withMessage("Country must be a string."),
];

export default upgradeToPenjualValidator;
