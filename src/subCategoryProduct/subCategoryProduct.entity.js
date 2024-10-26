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
    categoryId: {
        type: DataTypes.UUID,      // Foreign key referencing CategoryProduct
        allowNull: false,
        references: {
          model: "CategoryProduct",  // Name of the CategoryProduct table
          key: 'id',                 // The id in CategoryProduct
        },
      },
  
  },
  {
    sequelize,
    modelName: "SubCategoryProduct",
    tableName: "SubCategoryProduct",
  }
);

// SubCategoryProduct.belongsTo(CategoryProduct, {foreignKey : 'categoryId'})



export default SubCategoryProduct;
