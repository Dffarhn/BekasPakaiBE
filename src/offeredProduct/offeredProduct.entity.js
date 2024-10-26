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
    priceOffer: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    isAgree: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "OfferedProduct",
    tableName: "OfferedProduct",
  }
);

OfferedProduct.belongsTo(User, { foreignKey: "id" });

OfferedProduct.belongsTo(Product, { foreignKey: "id" });


export default OfferedProduct;
