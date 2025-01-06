import { Model, DataTypes } from "sequelize";
import sequelize from "../database/config.database.js";
import User from "../user/user.entity.js";

class Role extends Model {}

Role.init(
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
  },
  {
    sequelize, // Pass the sequelize instance
    modelName: "Role", // Name of the model
    tableName: "roles"
  }
);

// Role.hasMany(User);

export default Role;
