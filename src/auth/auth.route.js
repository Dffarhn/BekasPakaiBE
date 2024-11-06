import express from "express";
import { registerValidationRules } from "./dto/register.dto.js";
import { handleValidationErrors } from "../common/middleware/validation.middleware.js";
import authController from "./auth.controller.js";
import { loginValidationRules } from "./dto/login.dto.js";
import { allowedFields } from "../common/middleware/allowedField.middleware.js";
import { authenticateJWT } from "../common/middleware/jwt.middleware.js";
import { ROLE_CUSTOMER, ROLE_TOKO } from "../roles/role.enum.js";

const authRouter = express.Router();

authRouter.post("/register", allowedFields(["email", "password", "username"]), registerValidationRules, handleValidationErrors, authController.register);
authRouter.post("/login", allowedFields(["email", "password"]), loginValidationRules, handleValidationErrors, authController.login);
authRouter.post("/google-login", allowedFields(["googleId","name","image","email"]), authController.authViaGoogle);
authRouter.post("/refresh-token", authController.refreshToken); // Route for refreshing access token
authRouter.post("/logout", authController.logout); // Route for logging out
authRouter.post("/verify-otp", authenticateJWT([ROLE_CUSTOMER]), authController.verifyOTP);
authRouter.post("/send-otp", authenticateJWT([ROLE_CUSTOMER]), authController.sendOTP);

export default authRouter;
