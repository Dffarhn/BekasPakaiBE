// models/User.js
import { Model, DataTypes } from "sequelize";
import sequelize from "../database/config.database.js"; // Adjust the path to your Sequelize instance

import { config } from "dotenv";
import { decryptData, encryptData } from "../database/utils/secretUtils.js";

config();

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    banner_profile_picture:{
      type: DataTypes.JSON,
      allowNull:true
    },
    profile_picture:{
      type: DataTypes.JSON,
      allowNull:true
    },
    name:{
      type: DataTypes.STRING,
      allowNull:true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    noHandphone: {
      type: DataTypes.STRING,
      allowNull: true,
      set(value) {
        const encrypted = encryptData(value);
        this.setDataValue("noHandphone", encrypted);
      },
      get() {
        const value = this.getDataValue("noHandphone");
        if (!value) return null;
        const decrypted = decryptData(value);
        return decrypted;
      },
    },
    tanggalLahir: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    jenisKelamin: {
      type: DataTypes.ENUM("Laki-Laki", "Perempuan"),
      allowNull: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize, // Pass the Sequelize instance here
    modelName: "User",
    tableName: "user_bekasku",
  }
);

// User.hasMany(Product);

// User.belongsTo(Role, {
//   foreignKey: {
//     allowNull: false,
//     name: "roleId",
//     defaultValue: process.env.ROLE_CUSTOMER,
//   },
//   as: "role",
//   onDelete: "CASCADE",
//   onUpdate: "CASCADE",
// }); // A user belongs to a role

// User.belongsTo(AuthPenjual, {
//   foreignKey: {
//     allowNull: true,
//     name: "AuthPenjualId",
//   },
// });

// User.hasMany(ChatRoom);
// User.hasMany(KeranjangProduct);
// User.hasMany(Chat)
// User.hasMany(OfferedProduct);
// User.hasMany(OrderedProduct);
export default User;
