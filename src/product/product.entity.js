import { DataTypes, Model } from "sequelize";
import sequelize from "../database/config.database.js"; // Adjust the path to your
import JenisProduct from "../jenisProducts/jenisProduct.entity.js";
import CategoryProduct from "../categoryProducts/categoryProduct.entity.js";
import User from "../user/user.entity.js";
import SubCategoryProduct from "../subCategoryProduct/subCategoryProduct.entity.js";
class Product extends Model {}

Product.init(
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
    picture: {
      type: DataTypes.JSON,
      allowNull: false,
    },

    condition: {
      type: DataTypes.ENUM("Baru", "Bekas"),
      allowNull: false,
    },

    garansi: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    discount:{
      type:DataTypes.FLOAT,
      allowNull:true
    },

    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },

    weight: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },

    volumePanjang: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },

    volumeLebar: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },

    volumeTinggi: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },

    jenisProductId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: JenisProduct,
        key: "id",
      },
    },

    categoryProductId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: SubCategoryProduct,
        key: "id",
      },
    },
    penjualId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },

    ulasanId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique:true
    },
  },
  {
    sequelize,
    modelName: "Product",
    tableName: "Product",
  }
);

Product.belongsTo(JenisProduct,{foreignKey:'jenisProductId'})
Product.belongsTo(SubCategoryProduct,{foreignKey:'categoryProductId'})
Product.belongsTo(User,{foreignKey:'penjualId',as:'penjual'})

export default Product;
