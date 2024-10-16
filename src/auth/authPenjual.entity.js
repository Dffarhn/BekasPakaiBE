import { DataTypes, Model } from "sequelize";
import sequelize from "../database/config.database.js"; // Adjust the path to your Sequelize instance
class AuthPenjual extends Model {}

AuthPenjual.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    namaRekening: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nomorRekening: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alamat: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    kodePos: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    negara: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "AuthPenjual",
    tableName: "AuthPenjual",
  }
);

export default AuthPenjual;
