import HttpStatus from "../common/utils/HttpStatus.js";
import ResponseSuccess from "../common/utils/ResponseSuccess.js";
import xenditService from "./xendit.service.js";

class XenditController {
  async getCodeBank(req, res, next) {
    try {
      const {input} = req.query
      const result = await xenditService.showCodeBank(input);

      // Set the refresh token in an HTTP-only cookie
      // Success response with access token
      const response = new ResponseSuccess(HttpStatus.OK, "successfully get code bank", result);

      res.status(response.statusCode).json(response);
    } catch (error) {
      console.log(error.message);
      next(error); // Handle errors using error handling middleware
    }
  }
}

export default new XenditController();
