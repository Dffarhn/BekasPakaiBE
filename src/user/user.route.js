import express from "express";
import userController from "./user.controller.js";
import { createUserValidator } from "./dto/create_user.dto.js";
import { handleValidationErrors } from "../common/middleware/validation.middleware.js";
import { authenticateJWT } from "../common/middleware/jwt.middleware.js";
import { ROLE_ADMIN, ROLE_CUSTOMER, ROLE_TOKO } from "../roles/role.enum.js";
import upload from "../common/utils/multerConfig.js";

const userRouter = express.Router();

// Rute-rute
userRouter.get("/", userController.getAllUsers);
userRouter.get("/profile", authenticateJWT([ROLE_ADMIN, ROLE_CUSTOMER, ROLE_TOKO]), userController.getUserProfile);
userRouter.get("/:uname", userController.getUserById);
userRouter.post("/", createUserValidator, handleValidationErrors, userController.createUser);
userRouter.patch(
  "/",
  authenticateJWT([ROLE_ADMIN, ROLE_CUSTOMER, ROLE_TOKO]),
  upload.fields([
    { name: "profile_picture", maxCount: 1 },
    { name: "banner_profile_picture", maxCount: 1 },
  ]),
  userController.updateUser
);

userRouter.delete("/:id", userController.deleteUser);

export default userRouter;
