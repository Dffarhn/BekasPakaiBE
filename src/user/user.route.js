import express from "express";
import userController from "./user.controller.js";
import { createUserValidator } from "./dto/create_user.dto.js";
import { handleValidationErrors } from "../common/middleware/validation.middleware.js";

const userRouter = express.Router();

// Rute-rute
userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", userController.getUserById);
userRouter.post("/", createUserValidator, handleValidationErrors, userController.createUser);
userRouter.put("/:id", userController.updateUser);
userRouter.delete("/:id", userController.deleteUser);

export default userRouter;
