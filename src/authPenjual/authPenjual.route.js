import express from "express";
import authPenjualController from "./authPenjual.controller.js";
import { authenticateJWT } from "../common/middleware/jwt.middleware.js";
import { ROLE_CUSTOMER } from "../roles/role.enum.js";

const AuthPenjualRoute = express.Router();


AuthPenjualRoute.post("/",authenticateJWT([ROLE_CUSTOMER]),authPenjualController.upgradeToPenjual);


export default AuthPenjualRoute;
