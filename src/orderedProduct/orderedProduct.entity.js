import { DataTypes, Model } from "sequelize";
import Product from "../product/product.entity.js";
import User from "../user/user.entity.js";
import sequelize from "../database/config.database.js";

class OrderedProduct extends Model {}

OrderedProduct.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    price: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("Pending", "Pengiriman", "Berhasil", "Pengembalian", "Pembatalan"),
      allowNull: false,
      defaultValue: "Pending",
    },
    id_shipment:{
      type:DataTypes.STRING,
      allowNull:false
    },
    receivedName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    receivednoHandphone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "ordered_product",
    modelName: "OrderedProduct",
  }
);

// OrderedProduct.belongsTo(User, { foreignKey: { name: "buyerId" }, onDelete: "cascade", onUpdate: "cascade" });

// OrderedProduct.belongsTo(Product, { foreignKey: "productId", onDelete: "cascade", onUpdate: "cascade" });

export default OrderedProduct;
