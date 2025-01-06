import { Model, DataTypes } from "sequelize";
import { default as Product } from "../product/product.entity.js";
import { default as User } from "../user/user.entity.js";
import sequelize from "../database/config.database.js"; // Adjust the path to your

class OfferedProduct extends Model {}

OfferedProduct.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    priceOffer: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    isAgree: {
      type: DataTypes.BOOLEAN,
      allowNull:true,
    },
  },
  {
    sequelize,
    modelName: "OfferedProduct",
    tableName: "offered_product",
  }
);

// OfferedProduct.belongsTo(User, { foreignKey: { name: "buyerId" }, onDelete: "cascade", onUpdate: "cascade" });

// OfferedProduct.belongsTo(Product, { foreignKey: "productId", onDelete: "cascade", onUpdate: "cascade" });

export default OfferedProduct;
