import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/config.database.js';

class Role extends Model {}

Role.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize, // Pass the sequelize instance
  modelName: 'Role', // Name of the model
});

export default Role;