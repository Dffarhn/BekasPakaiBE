import express from "express";
import { handleValidationErrors } from "../common/middleware/validation.middleware.js";
import { ROLE_ADMIN, ROLE_CUSTOMER, ROLE_TOKO } from "../roles/role.enum.js";
import upload from "../common/utils/multerConfig.js";
import keranjangProductController from "./keranjangProduct.controller.js";
import { authenticateJWT } from "../common/middleware/jwt.middleware.js";

const KeranjangProductRoute = express.Router();

// Rute-rute
KeranjangProductRoute.get("/", authenticateJWT([ROLE_CUSTOMER, ROLE_TOKO, ROLE_ADMIN]), keranjangProductController.getAll);
// KeranjangProductRoute.get("/:id", authenticateJWT([ROLE_CUSTOMER, ROLE_TOKO, ROLE_ADMIN]), keranjangProductController.getProductById);
KeranjangProductRoute.post("/:id_product", authenticateJWT([ROLE_CUSTOMER, ROLE_TOKO, ROLE_ADMIN]), keranjangProductController.create);
// KeranjangProductRoute.put("/:id", authenticateJWT([ROLE_TOKO]), keranjangProductController.updateProduct);
KeranjangProductRoute.delete("/all/:id", authenticateJWT([ROLE_CUSTOMER, ROLE_TOKO, ROLE_ADMIN]), keranjangProductController.deleteAllInKeranjang);
KeranjangProductRoute.delete("/:id_product", authenticateJWT([ROLE_CUSTOMER, ROLE_TOKO, ROLE_ADMIN]), keranjangProductController.deleteOneProductInKeranjang);

export default KeranjangProductRoute;
