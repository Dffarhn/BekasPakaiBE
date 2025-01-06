import express from "express";
import userRouter from "./user/user.route.js";
import productRouter from "./product/product.route.js";
import authRouter from "./auth/auth.route.js";
import JenisProductRouter from "./jenisProducts/jenisProduct.route.js";
import CategoryProductRouter from "./categoryProducts/categoryProduct.route.js";
import RoleRouter from "./roles/role.route.js";
import SubCategoryProductRouter from "./subCategoryProduct/subCategoryProduct.route.js";
import biteShipRouter from "./BiteShip/biteship.route.js";
import AuthPenjualRoute from "./authPenjual/authPenjual.route.js";
import UlasanProductRoute from "./ulasanProduct/ulasanProduct.route.js";
import KeranjangProductRoute from "./keranjangProduct/keranjangProduct.route.js";
import chatRoom from "./ChatRooms/chatRoom.route.js";
import KurirPenjualRoute from "./kurirPenjual/kurirPenjual.route.js";
import XenditRoute from "./Xendit/xendit.route.js";
import OrderedProductRoute from "./orderedProduct/orderedProduct.route.js";
const router = express.Router();

// Gunakan router untuk setiap entitas
router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/product/ulasan", UlasanProductRoute);
router.use("/product/keranjang", KeranjangProductRoute);
router.use("/product/order", OrderedProductRoute);


router.use("/auth", authRouter);


router.use("/type", JenisProductRouter);
router.use("/category", CategoryProductRouter);
router.use("/subCategory", SubCategoryProductRouter);

router.use("/role", RoleRouter);


router.use("/biteShip", biteShipRouter);

router.use("/upgrade-customer", AuthPenjualRoute);

router.use("/kurir",KurirPenjualRoute)

router.use("/chatrooms", chatRoom);


router.use("/xendit", XenditRoute)

export default router;
