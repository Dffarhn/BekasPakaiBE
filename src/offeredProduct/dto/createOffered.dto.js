import { body } from "express-validator";

export const createOfferedDTO = [body("priceOffer").isFloat({ gt: 0 }).withMessage("Price must be a positive number")];
