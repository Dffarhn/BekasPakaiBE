import express from "express";
import categoryProductController from "./categoryProduct.controller.js";
import { allowedFields } from "../common/middleware/allowedField.middleware.js";
import { CreateCategoryValidationRules } from "./dto/create-category.dto.js";
import { handleValidationErrors } from "../common/middleware/validation.middleware.js";
import { ROLE_BUYER, ROLE_SELLER } from "../roles/role.enum.js";
import { authenticateJWT } from "../common/middleware/jwt.middleware.js";


const CategoryProductRouter = express.Router();

// Rute-rute
CategoryProductRouter.get("/",authenticateJWT([ROLE_BUYER]), categoryProductController.getAll);
CategoryProductRouter.get("/:id", categoryProductController.getOne);
CategoryProductRouter.post("/",allowedFields(['name']),CreateCategoryValidationRules,handleValidationErrors, categoryProductController.create);
CategoryProductRouter.put("/:id", categoryProductController.update);
CategoryProductRouter.delete("/:id", categoryProductController.delete);

export default CategoryProductRouter;
