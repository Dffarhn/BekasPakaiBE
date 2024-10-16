import { validationResult } from "express-validator";
import BadRequestException from "../execeptions/BadRequestExecption.js";

// Common function to handle validation errors
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorDetails = errors.array().map((err) => ({
      field: err.param,
      message: err.msg,
    }));
    throw new BadRequestException("Validation Failed", errorDetails);
  }
  next();
};
