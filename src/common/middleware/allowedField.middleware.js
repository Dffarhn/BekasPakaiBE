import { validationResult } from "express-validator";
import BadRequestException from "../execeptions/BadRequestExecption.js";

// Middleware to ensure only allowed fields (from validation rules) are in the request
export const allowedFields = (allowedFields) => (req, res, next) => {
  // Get the fields in the request body that are not allowed
  const extraFields = Object.keys(req.body).filter((field) => !allowedFields.includes(field));

  // If there are extra fields, return an error response
  if (extraFields.length > 0) {
    throw new BadRequestException(`The following fields are not allowed: ${extraFields.join(", ")}`);
  }

  next();
};
