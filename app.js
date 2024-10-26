import "reflect-metadata";
import express, { json, urlencoded } from "express";
import dotenv from "dotenv";
import axios from 'axios';
import cors from "cors"; 
import sequelize from "./src/database/config.database.js";
import router from "./src/router.js";
import errorHandler from "./src/common/middleware/errorHandler.middleware.js";

import {getBalance} from "./src/paymentGateway/payment.service.js"
import compression from "compression";


const app = express();
const port = 3001 || process.env.PORT;

dotenv.config();

app.use(compression())
app.use(cors({
  origin:'*',
  // credentials:true
}));  // Enable CORS globally

// Middleware
app.use(json());
app.use(urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("Selamat datang di aplikasi Express.js!");
});

app.use("/api/v1/", router);

// app.get('/fetch-shipping', async (req, res) => {

//   console.log(req)
//   try {
//     const response = await axios.get(
//       'https://prd-srvc-dshbd-api-ext.kiriminaja.com/api/dm/v1/shipping/express',
//       {
//         params: {
//           subdistrict_origin: '31483',
//           subdistrict_destination: '31485',
//           insurance: 'false',
//           originTitle: 'Jogo Tirto, Berbah, Sleman, DI Yogyakarta, 55573',
//           destinationTitle: 'Abiansemal, Abiansemal, Badung, Bali, 80352',
//           weight: 100,
//           item_value: 50000,
//         },
//         headers: {
//           Authorization: 'Bearer 30626137|IwW5qO7epi5ZOdcTvB8jNz3nREOYViiSWyqNW2vHcd899a5d',
//           'Api-Key': 'base64:RG/ODAHrZ33diOUid/6oRzkUEu1WBVnjKoqgSqle0gA=',
//         },
//       }
//     );
    
//     // Send the response from the API to the client
//     res.json(response.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred while fetching the data.' });
//   }
// });

app.use(errorHandler);

// Start server after the database is initialized successfully
const startApp = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Database & tables created or updated!");
  } catch (error) {
    console.error("Tidak dapat terhubung ke database:", error);
  }
};

startApp(); 

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
