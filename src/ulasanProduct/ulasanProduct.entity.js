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
      type: DataTypes.ENUM("1", "2", "3", "4", "5"),
      allowNull: false,
    },
    pictures: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    ulasan_owner: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "UlasanProduct",
    tableName: "ulasan_product",
  }
);

// UlasanProduct.belongsTo(Product, {
//   foreignKey: {
//     name: "ulasanId",
//   },
//   onDelete:"cascade",
//   onUpdate:"cascade"
// });

// UlasanProduct.belongsTo(User, {
//   foreignKey: {
//     name: "reviewer",
//   },
//   onUpdate:'cascade'
// });

export default UlasanProduct;
