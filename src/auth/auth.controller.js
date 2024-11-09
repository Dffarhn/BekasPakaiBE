import BadRequestException from "../common/execeptions/BadRequestExecption.js";
import HttpStatus from "../common/utils/HttpStatus.js";
import ResponseSuccess from "../common/utils/ResponseSuccess.js";
import userService from "../user/user.service.js";
import authService from "./auth.service.js";

class AuthController {
  // Method to send OTP to user's phone number
  // async sendOTP(req, res, next) {
  //   try {
  //     const { phoneNumber } = req.body;
  //     const userId = req.user.id; // Extract user ID from the token

  //     // Validate phone number presence
  //     if (!phoneNumber) {
  //       throw new BadRequestException("Phone number is required");
  //     }

  //     // Update user's phone number in the database
  //     await userService.updateUser(userId, {noHandphone: phoneNumber});

  //     // Send OTP via Twilio
  //     const verification = await sendVerificationCodeTwillio(phoneNumber);

  //     const response = new ResponseSuccess(HttpStatus.OK, "OTP sent successfully", {
  //       sid: verification.sid,
  //     });

  //     res.status(response.statusCode).json(response);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // // Method to verify OTP
  // async verifyOTP(req, res, next) {
  //   try {
  //     const userId = req.user.id; // User ID from access token
  //     const { otp } = req.body; // OTP from request body

  //     const user = await userService.getUserById(userId)

  //     // Verify OTP
  //     const isVerified = await verifyUserOTPTwillio(user.noHandphone, otp);

  //     const response = new ResponseSuccess(HttpStatus.OK, "OTP verified successfully", {
  //       verified: isVerified,
  //     });

  //     res.status(response.statusCode).json(response);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
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
      const { access_token, refresh_token } = await authService.authViaGoogle(req.body);

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
      const userId = req.user.id;
      const { otp } = req.body; // Get userId and OTP from request body

      const { access_token, refresh_token } = await authService.verifyOTP(userId, otp); // Call the service to verify OTP

res.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      const response = new ResponseSuccess(HttpStatus.OK, "OTP verified successfully", { access_token} );
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error); // Handle errors (e.g., invalid OTP)
    }
  }
  async sendOTP(req, res, next) {
    try {
      const userId = req.user.id;

      const result = await authService.resendOTP(userId); // Call the service to verify OTP

      const response = new ResponseSuccess(HttpStatus.CREATED, "OTP resend verified successfully", result);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error); // Handle errors (e.g., invalid OTP)
    }
  }
}

export default new AuthController();
