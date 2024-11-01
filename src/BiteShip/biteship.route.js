import express from "express";
import biteshipController from "./biteship.controller.js";


const biteShipRouter = express.Router();

biteShipRouter.get("/postal-code",biteshipController.getPostalCode)
biteShipRouter.get("/kurir",biteshipController.getListOfKurir)



export default biteShipRouter;
