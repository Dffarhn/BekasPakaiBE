import { body } from "express-validator";

export const createProductValidator = [
    
    body('name')
    .trim() // Removes leading and trailing whitespaces
    .notEmpty().withMessage('Name is required and cannot be just whitespace')
    .isString().withMessage('Name must be a string'),
  
  body('condition')
    .trim()
    .notEmpty().withMessage('Condition is required and cannot be just whitespace')
    .isIn(['Bekas', 'Baru']).withMessage('Condition must be either Bekas or Baru'),
  
  body('garansi')
    .isBoolean().withMessage('Garansi must be a boolean'),
  
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required and cannot be just whitespace')
    .isString().withMessage('Description must be a string'),
  
  body('price')
    .isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
  
  body('stock')
    .isInt({ min: 0 }).withMessage('Stock must be an integer greater than or equal to 0'),
  
  body('weight')
    .isInt({ gt: 0 }).withMessage('Weight must be a positive integer'),
  
  body('volumePanjang')
    .isInt({ gt: 0 }).withMessage('Volume Panjang must be a positive integer'),
  body('volumeLebar')
    .isInt({ gt: 0 }).withMessage('Volume Lebar must be a positive integer'),
  body('volumeTinggi')
    .isInt({ gt: 0 }).withMessage('Volume Tinggi must be a positive integer'),
  
  body('jenisProductId')
    .isUUID(4).withMessage('JenisProductId must be a valid UUID v4'),
  
  body('categoryProductId')
    .isUUID(4).withMessage('CategoryProductId must be a valid UUID v4'),
];
