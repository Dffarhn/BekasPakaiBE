import { DataTypes, Model } from "sequelize";
import sequelize from "../database/config.database.js"; // Adjust the path to your Sequelize instance
import User from "../user/user.entity.js";

class KurirPenjual extends Model {}

KurirPenjual.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    layananKurirId: {
      type: DataTypes.STRING,
    },
    layananKurirServiceId: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "KurirPenjual",
    tableName: "kurir_penjual",
  }
);
// KurirPenjual.hasOne(User);

export default KurirPenjual;
