import { DataTypes, Model } from "sequelize";
import sequelize from "../database/config.database.js";

class CategoryProduct extends Model {}

CategoryProduct.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "CategoryProduct",
    tableName: "CategoryProduct",
  }
);

export default CategoryProduct;
