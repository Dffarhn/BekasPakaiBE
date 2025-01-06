import { DataTypes, Model } from "sequelize";
import sequelize from "../database/config.database.js"; // Adjust the path to your Sequelize instance
import User from "../user/user.entity.js";
import crypto from "crypto";
import { config } from "dotenv";
import { decryptData, encryptData } from "../database/utils/secretUtils.js";
config();
class AuthPenjual extends Model {}

AuthPenjual.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    codeBank: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    namaRekening: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        const encrypted = encryptData(value);
        this.setDataValue("namaRekening", encrypted); 
      },
      get() {
        const value = this.getDataValue("namaRekening");
        if (!value) return null;
        const decrypted = decryptData(value);
        return decrypted;
      },
    },
    nomorRekening: {
      type: DataTypes.STRING,
      allowNull: false,
      // Encrypt `nomorRekening` before saving to the database
      set(value) {
        const encrypted = encryptData(value);
        this.setDataValue("nomorRekening", encrypted); 
      },
      get() {
        const value = this.getDataValue("nomorRekening");
        if (!value) return null;
        const decrypted = decryptData(value);
        return decrypted;
      },
    },
    alamat: {
      type: DataTypes.TEXT,
      allowNull: false,
      set(value) {
        const encrypted = encryptData(value);
        this.setDataValue("alamat", encrypted); 
      },
      get() {
        const value = this.getDataValue("alamat");
        if (!value) return null;
        const decrypted = decryptData(value);
        return decrypted;
      },
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
    tableName: "auth_penjual",
  }
);
// AuthPenjual.hasOne(User);

export default AuthPenjual;
