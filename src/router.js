import express from "express";
import userRouter from "./user/user.route";
import productRouter from "./product/product.route";

const router = express.Router();

// Gunakan router untuk setiap entitas
router.use("/users", userRouter);
router.use("/products",productRouter);

export default router;
