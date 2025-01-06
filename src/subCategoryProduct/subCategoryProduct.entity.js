import { DataTypes, Model } from "sequelize";
import sequelize from "../database/config.database.js";
import CategoryProduct from "../categoryProducts/categoryProduct.entity.js";

class SubCategoryProduct extends Model {}

SubCategoryProduct.init(
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
    modelName: "SubCategoryProduct",
    tableName: "sub_category_product",
  }
);

// SubCategoryProduct.belongsTo(CategoryProduct, { foreignKey: "categoryId", as: "category", onDelete: "cascade", onUpdate: "cascade" });

export default SubCategoryProduct;
