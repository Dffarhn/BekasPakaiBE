import express from "express";
import { handleValidationErrors } from "../common/middleware/validation.middleware.js";
import { ROLE_ADMIN, ROLE_CUSTOMER, ROLE_TOKO } from "../roles/role.enum.js";
import { authenticateJWT } from "../common/middleware/jwt.middleware.js";
import orderedProductController from "./orderedProduct.controller.js";

const OrderedProductRoute = express.Router();

// Rute-rute
// OrderedProductRoute.get("/", authenticateJWT([ROLE_CUSTOMER, ROLE_TOKO, ROLE_ADMIN]), orderedProductController.getAll);
// OrderedProductRoute.get("/:id", authenticateJWT([ROLE_CUSTOMER, ROLE_TOKO, ROLE_ADMIN]), keranjangProductController.getProductById);
OrderedProductRoute.post("/", authenticateJWT([ROLE_CUSTOMER, ROLE_TOKO, ROLE_ADMIN]),orderedProductController.createOrderProduct);
// OrderedProductRoute.put("/:id", authenticateJWT([ROLE_TOKO]), orderedProductController.updateProduct);
// OrderedProductRoute.delete("/:id", authenticateJWT([ROLE_CUSTOMER, ROLE_TOKO, ROLE_ADMIN]), orderedProductController.delete);

export default OrderedProductRoute;
