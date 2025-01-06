import { DataTypes, Model } from "sequelize";
import sequelize from "../database/config.database.js"; // Adjust the path to your
import JenisProduct from "../jenisProducts/jenisProduct.entity.js";
import User from "../user/user.entity.js";
import SubCategoryProduct from "../subCategoryProduct/subCategoryProduct.entity.js";
import UlasanProduct from "../ulasanProduct/ulasanProduct.entity.js";
import KeranjangProduct  from "../keranjangProduct/keranjangProduct.entity.js";
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
      type: DataTypes.ENUM("Baru dan Tersegel", "Baru Dibuka","Sekali Pakai", "Jarang Dipakai","Pemakaian Rutin","Sesuai Foto"),
      allowNull: true,
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
    minimumPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },

    discount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },

    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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
  },
  {
    sequelize,
    modelName: "Product",
    tableName: "product",
  }
);

// Product.belongsTo(JenisProduct, { foreignKey: "jenisProductId", onDelete: "cascade", onUpdate: "cascade" });
// Product.belongsTo(SubCategoryProduct, { foreignKey: "categoryProductId", onDelete: "cascade", onUpdate: "cascade" });
// Product.belongsTo(User, { foreignKey: "penjualId", as: "penjual", onDelete: "CASCADE", onUpdate: "CASCADE" });
// Product.hasMany(UlasanProduct);
// Product.hasMany(KeranjangProduct);

export default Product;
