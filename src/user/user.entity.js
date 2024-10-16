// models/User.js
import { Model, DataTypes } from "sequelize";
import sequelize from "../database/config.database.js"; // Adjust the path to your Sequelize instance
import Role from "../roles/role.entity.js";
import AuthPenjual from "../auth/authPenjual.entity.js";

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    noHandphone: {
      type: DataTypes.STRING,
      allowNull: true,
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

    roleId: {
      // Foreign key to Role
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: Role, // The model to refer
        key: "id", // The key to refer in the Role model
      },
    },

    authPenjualId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: AuthPenjual,
        key: "id",
      },
    },
  },
  {
    sequelize, // Pass the Sequelize instance here
    modelName: "User",
    tableName: "usersBekasKu",
  }
);

User.belongsTo(Role, { foreignKey: "roleId" }); // A user belongs to a role

export default User;
