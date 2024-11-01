import express from "express";
import { authenticateJWT } from "../common/middleware/jwt.middleware.js";
import { ROLE_CUSTOMER, ROLE_TOKO } from "../roles/role.enum.js";
import kurirPenjualController from "./kurirPenjual.controller.js";

const KurirPenjualRoute = express.Router();

KurirPenjualRoute.post("/", authenticateJWT([ROLE_TOKO]), kurirPenjualController.createKurirPenjual);
KurirPenjualRoute.get("/", authenticateJWT([ROLE_TOKO]), kurirPenjualController.getKurirPenjual);

export default KurirPenjualRoute;
