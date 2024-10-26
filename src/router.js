import express from "express";
import userRouter from "./user/user.route.js";
import productRouter from "./product/product.route.js";
import authRouter from "./auth/auth.route.js";
import JenisProductRouter from "./jenisProducts/jenisProduct.route.js";
import CategoryProductRouter from "./categoryProducts/categoryProduct.route.js";
import RoleRouter from "./roles/role.route.js";
import SubCategoryProductRouter from "./subCategoryProduct/subCategoryProduct.route.js";
const router = express.Router();





// Gunakan router untuk setiap entitas
router.use("/users", userRouter);
router.use("/products",productRouter);
router.use("/auth",authRouter)
router.use("/type",JenisProductRouter)
router.use("/category",CategoryProductRouter)
router.use("/subCategory",SubCategoryProductRouter)
router.use("/role",RoleRouter)

export default router;
