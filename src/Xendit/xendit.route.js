import express from "express";
import { authenticateJWT } from "../common/middleware/jwt.middleware.js";
import { ROLE_CUSTOMER, ROLE_TOKO } from "../roles/role.enum.js";
import xenditController from "./xendit.controller.js";

const XenditRoute = express.Router();

// XenditRoute.post("/", authenticateJWT([ROLE_TOKO]), kurirPenjualController.createKurirPenjual);
XenditRoute.get("/bank", xenditController.getCodeBank);

export default XenditRoute;
