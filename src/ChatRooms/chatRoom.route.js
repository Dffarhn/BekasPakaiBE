import express from "express";
import { handleValidationErrors } from "../common/middleware/validation.middleware.js";
import { authenticateJWT } from "../common/middleware/jwt.middleware.js";
import { ROLE_ADMIN, ROLE_CUSTOMER, ROLE_TOKO } from "../roles/role.enum.js";
import chatRoomController from "./chatRoom.controller.js";

const chatRoom = express.Router();

// Rute-rute
chatRoom.get("/", authenticateJWT([ROLE_CUSTOMER, ROLE_TOKO, ROLE_ADMIN]), chatRoomController.getAllChatRoom);
// chatRoom.get("/:id", authenticateJWT([ROLE_CUSTOMER, ROLE_TOKO, ROLE_ADMIN]), productController.getProductById);
// chatRoom.post("/", authenticateJWT([ROLE_TOKO]), upload.array("files", 2), createProductValidator, handleValidationErrors, productController.createProduct);
// chatRoom.patch("/edit/:id", authenticateJWT([ROLE_TOKO]), productController.updateProduct);
// chatRoom.delete("/:id", authenticateJWT([ROLE_TOKO]), productController.deleteProduct);

export default chatRoom;
