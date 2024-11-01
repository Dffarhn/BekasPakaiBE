import { DataTypes, Model } from "sequelize";
import sequelize from "../database/config.database.js";

import SubCategoryProduct from "../subCategoryProduct/subCategoryProduct.entity.js";

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
    tableName: "category_product",
  }
);

// CategoryProduct.belongsToMany(SubCategoryProduct,{foreignKey:'categoryId'})
// Define the relationship (association) in the same file
// CategoryProduct.hasMany(SubCategoryProduct);
export default CategoryProduct;
