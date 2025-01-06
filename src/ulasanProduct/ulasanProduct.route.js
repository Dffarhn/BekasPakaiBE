import express from "express";
import ulasanProductController from "./ulasanProduct.controller.js";
import { ROLE_ADMIN, ROLE_CUSTOMER, ROLE_TOKO } from "../roles/role.enum.js";
import { authenticateJWT } from "../common/middleware/jwt.middleware.js";
import upload from "../common/utils/multerConfig.js";

const UlasanProductRoute = express.Router();

// Rute-rute
// UlasanProductRoute.get("/", authenticateJWT([ROLE_CUSTOMER,ROLE_ADMIN,ROLE_TOKO]), ulasanProductController.getAll);
UlasanProductRoute.get("/:id", ulasanProductController.getUlasanProducts);
UlasanProductRoute.post("/:id_product", authenticateJWT([ROLE_CUSTOMER, ROLE_TOKO, ROLE_ADMIN]), upload.array("files", 2), ulasanProductController.create);
UlasanProductRoute.post("/:id_ulasan_product/owner", authenticateJWT([ROLE_TOKO, ROLE_ADMIN]), ulasanProductController.createUlasanProductOwner);
// UlasanProductRoute.put("/:id", ulasanProductController.update);
// UlasanProductRoute.delete("/:id", ulasanProductController.delete);

export default UlasanProductRoute;
