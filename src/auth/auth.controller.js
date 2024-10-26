import HttpStatus from "../common/utils/HttpStatus.js";
import ResponseSuccess from "../common/utils/ResponseSuccess.js";
import authService from "./auth.service.js";

class AuthController {
  async register(req, res, next) {
    try {
      const { access_token, refresh_token } = await authService.register(req.body);

      // Set the refresh token in an HTTP-only cookie
      res.cookie("refresh_token", refresh_token, {
        httpOnly: true, // Prevent client-side JS from accessing the cookie
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: "none", // Prevent CSRF attacks
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      const response = new ResponseSuccess(HttpStatus.CREATED, "User registered successfully", {
        access_token,
      });

      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error); // Handle errors (e.g., BadRequestException)
    }
  }

  async login(req, res, next) {
    try {
      const { access_token, refresh_token } = await authService.login(req.body);

      // Set the refresh token in an HTTP-only cookie
      res.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      const response = new ResponseSuccess(HttpStatus.OK, "User logged in successfully", {
        access_token,
      });

      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  }

  async authViaGoogle(req, res, next) {
    try {
      const { access_token, refresh_token } = await authService.authViaGoogle(req.body.idToken);

      // Set the refresh token in an HTTP-only cookie
      res.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      const response = new ResponseSuccess(HttpStatus.OK, "User logged in via Google successfully", {
        access_token,
      });

      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req, res, next) {
    try {
      const { refresh_token } = req.cookies; // Get refresh token from cookies

      if (!refresh_token) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          message: "Refresh token is missing",
        });
      }

      const { access_token } = await authService.refreshToken(refresh_token);

      const response = new ResponseSuccess(HttpStatus.OK, "Access token refreshed successfully", {
        access_token,
      });

      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error); // Handle errors, e.g., invalid refresh token
    }
  }

  async logout(req, res, next) {
    try {
      // Clear the refresh token cookie
      res.clearCookie("refresh_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
      });

      const response = new ResponseSuccess(HttpStatus.OK, "User logged out successfully", {});
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  }

  // New method for OTP verification
  async verifyOTP(req, res, next) {
    try {
      const userId = req.user.id
      const {otp } = req.body; // Get userId and OTP from request body

      const result = await authService.verifyOTP(userId, otp); // Call the service to verify OTP

      const response = new ResponseSuccess(HttpStatus.OK, "OTP verified successfully", result);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error); // Handle errors (e.g., invalid OTP)
    }
  }
}

export default new AuthController();
