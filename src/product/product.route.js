import express from "express";
import { handleValidationErrors } from "../common/middleware/validation.middleware.js";
import productController from "./product.controller.js";
import { createPorductValidator } from "./dto/createProduct.dto.js";

const productRouter = express.Router();

// Rute-rute
productRouter.get("/", productController.getProducts);
productRouter.get("/:id", productController.getProductById);
productRouter.post("/", createPorductValidator, handleValidationErrors, productController.createProduct);
productRouter.put("/:id", productController.updateProduct);
productRouter.delete("/:id", productController.deleteProduct);

export default productRouter;
