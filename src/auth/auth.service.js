import User from "../user/user.entity.js"; // Sequelize model
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op, Sequelize } from "sequelize";
import BadRequestException from "../common/execeptions/BadRequestExecption.js";
import dotenv from "dotenv";
import verifyGoogleIdToken from "../common/utils/googleLogin.js";
import { generateOTP, storeOTP, validateOTP } from "../common/services/OTPService.js";
import emailService from "../common/services/emailService.js";

dotenv.config();

class AuthService {
  constructor() {
    this.userRepository = User;
  }

  // Helper method to generate tokens
  generateTokens(user) {
    const accessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.roleId, isVerified: user.isVerified },
      process.env.JWT_ACCESS_TOKEN,
      { expiresIn: "1h" } // Short-lived access token
    );

    const refreshToken = jwt.sign(
      { id: user.id, email: user.email, role: user.roleId, isVerified: user.isVerified },
      process.env.JWT_REFRESH_TOKEN,
      { expiresIn: "7d" } // Long-lived refresh token
    );

    return { accessToken, refreshToken };
  }

  async register(userData) {
    // Start a transaction
    const transaction = await this.userRepository.sequelize.transaction();
    try {
      const existingUser = await this.userRepository.findOne({
        where: {
          [Sequelize.Op.or]: [{ email: userData.email }, { username: userData.username }],
        },
        transaction, // Use the transaction
      });

      if (existingUser) {
        throw new BadRequestException("Email atau nomor handphone sudah terdaftar");
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      // Generate an OTP
      const otp = generateOTP();

      // Create new user
      const newUser = await this.userRepository.create(
        {
          ...userData,
          name: userData.username,
          password: hashedPassword,
        },
        { transaction } // Use the transaction
      );

      // Store the OTP associated with the user ID
      storeOTP(newUser.id, otp); // Ensure this function can work within a transaction

      // Send the OTP to the user's email
      await emailService.sendConfirmationEmail(userData.email, newUser.username, otp);

      // Generate tokens
      const { accessToken, refreshToken } = this.generateTokens(newUser);

      // Commit the transaction
      await transaction.commit();

      // Return the new user and the tokens
      return {
        access_token: accessToken, // Access token
        refresh_token: refreshToken, // Refresh token
      };
    } catch (error) {
      // Rollback the transaction in case of an error
      await transaction.rollback();
      throw error; // Re-throw the error for further handling
    }
  }

  async login(userData) {
    const { email, password } = userData;

    // Find user by email
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException("Invalid User");
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException("Invalid User");
    }

    // Generate tokens
    const { accessToken, refreshToken } = this.generateTokens(user);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  // Login with Google OAuth
  async authViaGoogle(data) {
    const { googleId, email, name, image } = data;
    // Extract username from email
    const username = email.split("@")[0];

    // Check if the user already exists
    let user = await this.userRepository.findOne({ where: { googleId } });

    if (!user) {
      // Create new user if it doesn't exist
      user = await this.userRepository.create({
        email,
        username: username,
        name: name,
        profile_picture: {
          url: image,
        },
        googleId,
        isVerified: true,
      });
    }

    // Generate tokens
    const { accessToken, refreshToken } = this.generateTokens(user);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  // Refresh the access token using the refresh token
  async refreshToken(refreshToken) {
    try {
      // Verify the refresh token
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN);

      // Find the user based on the token's payload
      const user = await this.userRepository.findByPk(decoded.id);
      if (!user) {
        throw new BadRequestException("Invalid refresh token");
      }

      // Generate a new access token
      const accessToken = jwt.sign({ id: user.id, email: user.email, role: user.roleId }, process.env.JWT_ACCESS_TOKEN, { expiresIn: "1h" });

      return { access_token: accessToken };
    } catch (error) {
      throw new BadRequestException("Invalid refresh token");
    }
  }

  async verifyOTP(userId, inputOtp) {
    const isValid = validateOTP(userId, inputOtp); // Validate the OTP using the utility function

    if (!isValid) {
      throw new BadRequestException("Invalid or expired OTP");
    }

    // If valid, you can proceed to verify the user or return a success message
    // Here you might want to mark the user's email as verified in the database if applicable.
    const user = await this.userRepository.findByPk(userId);

    if (user) {
      user.isVerified = true; // Update user's verification status
      await user.save(); // Save the changes
    }

// Generate tokens
    const { accessToken, refreshToken } = this.generateTokens(user);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async resendOTP(userId) {
    try {
      // Fetch the user by ID
      const user = await this.userRepository.findByPk(userId);

      if (!user) {
        throw new BadRequestException("User not found");
      }

      if (user.isVerified) {
        throw new BadRequestException("User is already verified");
      }

      // Generate a new OTP
      const otp = generateOTP();

      // Store the new OTP associated with the user ID
      storeOTP(userId, otp);

      // Resend the OTP to the user's email
      await emailService.sendConfirmationEmail(user.email, user.username, otp);

      return { message: "OTP resent successfully!" };
    } catch (error) {
      throw error; // Pass any errors back for handling
    }
  }
}

export default new AuthService();
