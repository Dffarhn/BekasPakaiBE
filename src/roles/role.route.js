import express from "express";
import roleController from "./role.controller.js";


const RoleRouter = express.Router();

// Rute-rute
RoleRouter.get("/", roleController.getAll);
// RoleRouter.get("/:id", jenisProductController.getOne);
RoleRouter.post("/", roleController.create);
// RoleRouter.put("/:id", jenisProductController.update);
// RoleRouter.delete("/:id", jenisProductController.delete);

export default RoleRouter;
