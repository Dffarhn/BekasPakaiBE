import "reflect-metadata";
import express, { json, urlencoded } from "express";
import dotenv from "dotenv";
import sequelize from "./src/database/config.database.js";
import router from "./src/router.js";
import errorHandler from "./src/common/middleware/errorHandler.middleware.js";

const app = express();
const port = 3000 || process.env.PORT;

dotenv.config();

// Middleware
app.use(json());
app.use(urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("Selamat datang di aplikasi Express.js!");
});

app.use('/api/v1/',router);

app.use(errorHandler)

// Start server after the database is initialized successfully
const startApp = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true});
    console.log("Database & tables created or updated!");
  } catch (error) {
    console.error("Tidak dapat terhubung ke database:", error);
  }
};

startApp();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
