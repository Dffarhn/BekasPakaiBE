import { DataTypes, Model } from "sequelize";
import Product from "../product/product.entity";
import User from "../user/user.entity";
import sequelize from "../database/config.database.js";

class OrderedProduct extends Model {}

OrderedProduct.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.UUID,
      references: {
        model: Product,
        key: "id",
      },
    },
    buyerId: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: "id",
      },
    },

    jumlahBarang: {
      type: DataTypes.BIGINT,
      allowNull: false,
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
    tableName: "OrderedProduct",
    modelName: "OrderedProduct",
  }
);
