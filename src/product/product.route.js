import express from "express";
import { handleValidationErrors } from "../common/middleware/validation.middleware.js";
import productController from "./product.controller.js";
import { createProductValidator } from "./dto/createProduct.dto.js";
import { authenticateJWT } from "../common/middleware/jwt.middleware.js";
import { ROLE_ADMIN, ROLE_BUYER, ROLE_SELLER } from "../roles/role.enum.js";
import upload from "../common/utils/multerConfig.js";
import { convertToWebPMiddleware } from "../common/middleware/convertImage.middleware.js";

const productRouter = express.Router();


// Rute-rute
productRouter.get("/", authenticateJWT([ROLE_BUYER, ROLE_SELLER, ROLE_ADMIN]), productController.getProducts);
productRouter.get("/:id", authenticateJWT([ROLE_BUYER, ROLE_SELLER, ROLE_ADMIN]), productController.getProductById);
productRouter.post(
  "/",
  authenticateJWT([ROLE_SELLER]),
  upload.array("files",2),
  convertToWebPMiddleware,
  createProductValidator,
  handleValidationErrors,
  productController.createProduct
);
productRouter.put("/:id", authenticateJWT([ROLE_SELLER]), productController.updateProduct);
productRouter.delete("/:id", authenticateJWT([ROLE_SELLER]), productController.deleteProduct);

export default productRouter;
