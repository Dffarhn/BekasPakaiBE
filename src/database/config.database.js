import { Sequelize } from "sequelize";
import { config } from "dotenv";
import mysql2 from "mysql2";

config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql", // Set dialect to 'mysql'
  dialectModule: mysql2, // Use mysql2 module
  port: process.env.DB_PORT || 3306, // Default MySQL port
  logging: false, // Disable logging queries (optional)
});

export default sequelize;
