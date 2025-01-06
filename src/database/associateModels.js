import { config } from "dotenv";
import AuthPenjual from "../authPenjual/authPenjual.entity.js";
import CategoryProduct from "../categoryProducts/categoryProduct.entity.js";
import Chat from "../chat/chat.entity.js";
import ChatRoom from "../ChatRooms/chatRoom.entity.js";
import JenisProduct from "../jenisProducts/jenisProduct.entity.js";
import KeranjangProduct from "../keranjangProduct/keranjangProduct.entity.js";
import OfferedProduct from "../offeredProduct/offeredProduct.entity.js";
import OrderedProduct from "../orderedProduct/orderedProduct.entity.js";
import Product from "../product/product.entity.js";
import Role from "../roles/role.entity.js";
import SubCategoryProduct from "../subCategoryProduct/subCategoryProduct.entity.js";
import UlasanProduct from "../ulasanProduct/ulasanProduct.entity.js";
import User from "../user/user.entity.js";
import KurirPenjual from "../kurirPenjual/kurirPenjual.entity.js";

config();

export const associateModels = () => {
  User.belongsTo(Role, {
    foreignKey: {
      allowNull: false,
      name: "roleId",
      defaultValue: process.env.ROLE_CUSTOMER,
    },
    as: "role",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  }); // A user belongs to a role
  Role.hasMany(User, {
    foreignKey: {
      allowNull: false,
      name: "roleId",
      defaultValue: process.env.ROLE_CUSTOMER,
    },
    as: "role",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  AuthPenjual.hasOne(User);
  User.belongsTo(AuthPenjual, {
    foreignKey: {
      allowNull: true,
      name: "AuthPenjualId",
    },
  });

  User.hasMany(KeranjangProduct, { foreignKey: { name: "customerId" }, onDelete: "cascade", onUpdate: "cascade" });
  KeranjangProduct.belongsTo(User, { foreignKey: { name: "customerId" }, onDelete: "cascade", onUpdate: "cascade" });

  User.hasMany(OfferedProduct, { foreignKey: { name: "buyerId" }, onDelete: "cascade", onUpdate: "cascade" });
  OfferedProduct.belongsTo(User, { foreignKey: { name: "buyerId" }, onDelete: "cascade", onUpdate: "cascade" });

  User.hasMany(OrderedProduct, { foreignKey: { name: "buyerId" }, onDelete: "cascade", onUpdate: "cascade" });
  OrderedProduct.belongsTo(User, { foreignKey: { name: "buyerId" }, onDelete: "cascade", onUpdate: "cascade" });

  Product.hasMany(UlasanProduct, {
    foreignKey: {
      name: "productId",
    },
    onDelete: "cascade",
    onUpdate: "cascade",
  });
  UlasanProduct.belongsTo(Product, {
    foreignKey: {
      name: "productId",
    },
    onDelete: "cascade",
    onUpdate: "cascade",
  });

  User.hasMany(UlasanProduct, {
    foreignKey: {
      name: "reviewer",
    },
    onUpdate: "cascade",
  });
  UlasanProduct.belongsTo(User, {
    foreignKey: {
      name: "reviewer",
    },
    onUpdate: "cascade",
  });

  CategoryProduct.hasMany(SubCategoryProduct, { foreignKey: "categoryId", as: "subCategories", onDelete: "cascade", onUpdate: "cascade" });
  SubCategoryProduct.belongsTo(CategoryProduct, { foreignKey: "categoryId", as: "category", onDelete: "cascade", onUpdate: "cascade" });

  JenisProduct.hasMany(Product, { foreignKey: "jenisId", onDelete: "cascade", onUpdate: "cascade" });
  Product.belongsTo(JenisProduct, { foreignKey: "jenisId", onDelete: "cascade", onUpdate: "cascade" });

  SubCategoryProduct.hasMany(Product, { foreignKey: "categoryProductId", onDelete: "cascade", onUpdate: "cascade" });
  Product.belongsTo(SubCategoryProduct, { foreignKey: "categoryProductId", onDelete: "cascade", onUpdate: "cascade" });

  User.hasMany(Product, { foreignKey: "penjualId", as: "products", onDelete: "CASCADE", onUpdate: "CASCADE" });
  Product.belongsTo(User, { foreignKey: "penjualId", as: "penjual", onDelete: "CASCADE", onUpdate: "CASCADE" });

  Product.hasMany(OrderedProduct, { foreignKey: "productId", onDelete: "cascade", onUpdate: "cascade" });
  OrderedProduct.belongsTo(Product, { foreignKey: "productId", onDelete: "cascade", onUpdate: "cascade" });

  Product.hasMany(OfferedProduct, { foreignKey: "productId", onDelete: "cascade", onUpdate: "cascade" });
  OfferedProduct.belongsTo(Product, { foreignKey: "productId", onDelete: "cascade", onUpdate: "cascade" });

  Product.hasMany(KeranjangProduct, { foreignKey: "productId", onDelete: "cascade", onUpdate: "cascade" });
  KeranjangProduct.belongsTo(Product, { foreignKey: "productId", onDelete: "cascade", onUpdate: "cascade" });

  //   User.hasMany(ChatRoom);
  ChatRoom.belongsTo(User, {
    foreignKey: "sellerId",
    as: "seller",
    onDelete: "cascade",
    onUpdate: "cascade",
  });

  ChatRoom.belongsTo(User, {
    foreignKey: "buyerId",
    as: "buyer",
    onDelete: "cascade",
    onUpdate: "cascade",
  });

  ChatRoom.hasMany(Chat, { foreignKey: { name: "roomId" }, onDelete: "cascade", onUpdate: "cascade" });
  Chat.belongsTo(ChatRoom, { foreignKey: { name: "roomId" }, onDelete: "cascade", onUpdate: "cascade" });

  User.hasMany(Chat, { foreignKey: { name: "senderId" }, onDelete: "cascade", onUpdate: "cascade" });
  Chat.belongsTo(User, { foreignKey: { name: "senderId" }, onDelete: "cascade", onUpdate: "cascade" });

  AuthPenjual.hasMany(KurirPenjual, { foreignKey: { name: "KurirPenjualId" }, onDelete: "cascade", onUpdate: "cascade" });
  KurirPenjual.belongsTo(AuthPenjual, { foreignKey: { name: "KurirPenjualId" }, onDelete: "cascade", onUpdate: "cascade" });
};
