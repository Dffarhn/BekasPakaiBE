import express from "express";
import { handleValidationErrors } from "../common/middleware/validation.middleware.js";
import productController from "./product.controller.js";
import { createProductValidator } from "./dto/createProduct.dto.js";
import { authenticateJWT } from "../common/middleware/jwt.middleware.js";
import { ROLE_ADMIN, ROLE_CUSTOMER, ROLE_TOKO } from "../roles/role.enum.js";
import upload from "../common/utils/multerConfig.js";

const productRouter = express.Router();

// Rute-rute
productRouter.get("/", productController.getProducts);
productRouter.get("/owner", authenticateJWT([ROLE_TOKO]), productController.getProductsOwner);
productRouter.get("/:id", productController.getProductById);
productRouter.post("/", authenticateJWT([ROLE_TOKO]), upload.array("files", 2),createProductValidator,handleValidationErrors ,productController.createProduct);
productRouter.patch("/edit/:id", authenticateJWT([ROLE_TOKO]),upload.array("files", 2), productController.updateProduct);
productRouter.delete("/:id", authenticateJWT([ROLE_TOKO]), productController.deleteProduct);

export default productRouter;
