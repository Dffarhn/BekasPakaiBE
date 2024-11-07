import ResponseSuccess from "../common/utils/ResponseSuccess.js";
import HttpStatus from "../common/utils/HttpStatus.js";
import BadRequestException from "../common/execeptions/BadRequestExecption.js";
import biteshipService from "./biteship.service.js";

class BiteShipController {
  async getPostalCode(req, res, next) {
    try {
      // Extract data from query parameters
      const { negara, input } = req.query;


      // Call the service to fetch postal codes
      const { nameCodes } = await biteshipService.showPostalCode({ negara, input });

      // Construct a success response
      const response = new ResponseSuccess(HttpStatus.OK, "Postal codes retrieved successfully", { nameCodes });

      // Send the response
      res.status(response.statusCode).json(response);
    } catch (error) {
      // Forward any error to the error handler middleware
      next(error);
    }
  }
  async getListOfKurir(req, res, next) {
    try {
      // Extract data from query parameters
      const { kurirCode } = req.query;

      // Call the service to fetch postal codes
      const {datakurir} = await biteshipService.showListKurir(kurirCode);

      // Construct a success response
      const response = new ResponseSuccess(HttpStatus.OK, "Postal codes retrieved successfully", { datakurir });

      // Send the response
      res.status(response.statusCode).json(response);
    } catch (error) {
      // Forward any error to the error handler middleware
      next(error);
    }
  }
}

export default new BiteShipController();
