import { DataTypes, Model } from "sequelize";
import sequelize from "../database/config.database.js"; // Adjust the path to your
import JenisProduct from "../jenisProducts/jenisProduct.entity.js";
import CategoryProduct from "../categoryProducts/categoryProduct.entity.js";
import User from "../user/user.entity.js";
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
      type: DataTypes.ARRAY,
      allowNull: false,
    },

    condition: {
      type: DataTypes.ENUM,
      allowNull: false,
    },

    garansi: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
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
        model: CategoryProduct,
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
    },
  },
  {
    sequelize,
    modelName: "Product",
    tableName: "Product",
  }
);

export default Product;
