import HttpStatus from "../common/utils/HttpStatus.js";
import ResponseSuccess from "../common/utils/ResponseSuccess.js";
import kurirPenjualService from "./kurirPenjual.service.js";

class KurirPenjualController {
  async createKurirPenjual(req, res, next) {
    try {
      const userId = req.user.id; // Assuming `userId` is available in `req.user` from auth middleware
      const { dataKurir } = req.body; // Extract `dataKurir` from the request body

      const result = await kurirPenjualService.addKurirPenjual(userId, dataKurir);

      const response = new ResponseSuccess(HttpStatus.CREATED, "User add kurir successfully", result);
      res.status(response.statusCode).json(response);
    } catch (error) {
      // console.log(error.message);
      next(error); // Error handling middleware
    }
  }

  async getKurirPenjual(req, res, next) {
    try {
      const userId = req.user.id; // Assumes `userId` is available in `req.user` from auth middleware

      const result = await kurirPenjualService.getKurirPenjual(userId);

      // Set the refresh token in an HTTP-only cookie
      // Success response with access token
      const response = new ResponseSuccess(HttpStatus.OK, "User get kurir successfully", result);

      res.status(response.statusCode).json(response);
    } catch (error) {
      console.log(error.message);
      next(error); // Handle errors using error handling middleware
    }
  }
}

export default new KurirPenjualController();
