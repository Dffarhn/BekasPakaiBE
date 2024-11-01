import { DataTypes, Model } from "sequelize";
import sequelize from "../database/config.database.js"; // Adjust the path to your
import Product from "../product/product.entity.js";
import User from "../user/user.entity.js";

class KeranjangProduct extends Model {}

KeranjangProduct.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: "KeranjangProduct",
    tableName: "keranjang_product",
  }
);

// KeranjangProduct.belongsTo(User, { foreignKey: { name: "userId" }, onDelete: "cascade", onUpdate: "cascade" });

// KeranjangProduct.belongsTo(Product, { foreignKey: "productId", onDelete: "cascade", onUpdate: "cascade" });

export default KeranjangProduct;
