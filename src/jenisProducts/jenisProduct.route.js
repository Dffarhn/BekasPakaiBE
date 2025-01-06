import express from "express";
import jenisProductController from "./jenisProduct.controller.js";
import { authenticateJWT } from "../common/middleware/jwt.middleware.js";
import { ROLE_ADMIN, ROLE_CUSTOMER, ROLE_TOKO } from "../roles/role.enum.js";

const JenisProductRouter = express.Router();

// Rute-rute
JenisProductRouter.get("/", authenticateJWT([ROLE_CUSTOMER,ROLE_ADMIN,ROLE_TOKO]), jenisProductController.getAll);
JenisProductRouter.get("/:id", jenisProductController.getOne);
JenisProductRouter.post("/", jenisProductController.create);
JenisProductRouter.put("/:id", jenisProductController.update);
JenisProductRouter.delete("/:id", jenisProductController.delete);

export default JenisProductRouter;
