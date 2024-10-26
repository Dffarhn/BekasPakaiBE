import { DataTypes, Model } from "sequelize";
import Product from "../product/product.entity.js";
import User from "../user/user.entity.js";
import sequelize from "../database/config.database.js"; // Adjust the path to your Sequelize instance

class UlasanProduct extends Model {}

UlasanProduct.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    ulasan: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    rating: {
      type: DataTypes.ENUM("1","2","3","4","5"),
      allowNull: false,
    },
    pictures: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    ulasanOwner: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    ulasanProductId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Product,
        key: "ulasanId",
      },
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "UlasanProduct",
    tableName: "UlasanProduct",
  }
);

UlasanProduct.belongsTo(Product, { foreignKey: "ulasanId" });

UlasanProduct.belongsTo(User, { foreignKey: "id" });

export default UlasanProduct;
