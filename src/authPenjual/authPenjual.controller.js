import HttpStatus from "../common/utils/HttpStatus.js";
import ResponseSuccess from "../common/utils/ResponseSuccess.js";
import authPenjualService from "./authPenjual.service.js";

class AuthPenjualController {
  async upgradeToPenjual(req, res, next) {
    try {
      const userId = req.user.id; // Assumes `userId` is available in `req.user` from auth middleware
      const penjualData = req.body;

      const { access_token, refresh_token } = await authPenjualService.upgradeToPenjual(userId, penjualData);

      // Set the refresh token in an HTTP-only cookie
      res.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      // Success response with access token
      const response = new ResponseSuccess(HttpStatus.CREATED, "User upgraded to Penjual successfully", {
        access_token,
      });

      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error); // Handle errors using error handling middleware
    }
  }
}

export default new AuthPenjualController();
