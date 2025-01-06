import express from "express";
import subCategoryProductController from "./subCategoryProduct.controller.js";


const SubCategoryProductRouter = express.Router();

// Rute-rute
SubCategoryProductRouter.get("/", subCategoryProductController.getAll);
SubCategoryProductRouter.get("/:id", subCategoryProductController.getOne);
SubCategoryProductRouter.post("/", subCategoryProductController.create);
SubCategoryProductRouter.put("/:id", subCategoryProductController.update);
SubCategoryProductRouter.delete("/:id", subCategoryProductController.delete);

export default SubCategoryProductRouter;
