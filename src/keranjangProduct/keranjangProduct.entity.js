import { DataTypes, Model } from "sequelize";
import sequelize from "../database/config.database.js"; // Adjust the path to your
import Product from "../product/product.entity.js";
import User from "../user/user.entity";

class KeranjangProduct extends Model {}

KeranjangProduct.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.UUID,
      references: {
        model: Product,
        key: "id",
      },
    },
    buyerId: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: "id",
      },
    },
    jumlahBarang: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "KeranjangProduct",
    tableName: "KeranjangProduct",
  }
);

KeranjangProduct.belongsTo(User, { foreignKey: "id" });

KeranjangProduct.belongsTo(Product, { foreignKey: "id" });

export default KeranjangProduct;
