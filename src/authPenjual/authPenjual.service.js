import User from "../user/user.entity.js"; // Sequelize model
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import BadRequestException from "../common/execeptions/BadRequestExecption.js";
import dotenv from "dotenv";
import AuthPenjual from "./authPenjual.entity.js";
import sequelize from "../database/config.database.js";
import authService from "../auth/auth.service.js";

dotenv.config();

class AuthPenjualService {
  constructor() {
    this.userRepository = User;
    this.userPenjualRepository = AuthPenjual;
  }

  // Helper method to generate tokens
  // generateTokens(user) {
  //   const accessToken = jwt.sign({ id: user.id, email: user.email, role: user.roleId, isVerified: user.isVerified }, process.env.JWT_ACCESS_TOKEN, { expiresIn: "1h" });

  //   const refreshToken = jwt.sign({ id: user.id, email: user.email, role: user.roleId, isVerified: user.isVerified }, process.env.JWT_REFRESH_TOKEN, { expiresIn: "7d" });

  //   return { accessToken, refreshToken };
  // }

  async upgradeToPenjual(userId, penjualData) {
    // Start a transaction
    const transaction = await sequelize.transaction();
    try {
      // Fetch the existing user by ID
      const existingUser = await this.userRepository.findOne({
        where: { id: userId },
      });

      if (!existingUser) {
        throw new BadRequestException("User not found");
      }

      if (existingUser.AuthId) {
        throw new BadRequestException("User is already a Penjual");
      }

      // Create a new AuthPenjual entry
      const newPenjual = await this.userPenjualRepository.create(
        {
          ...penjualData,
        },
        { transaction }
      );

      // Update the user to link with the new AuthPenjual entry
      existingUser.AuthPenjualId = newPenjual.id;
      existingUser.roleId = process.env.ROLE_TOKO; // Assign the Penjual role ID
      await existingUser.save({ transaction });

      // Generate tokens
      const { accessToken, refreshToken } = authService.generateTokens(existingUser);

      // Commit the transaction
      await transaction.commit();

      // Return the tokens
      return {
        access_token: accessToken,
        refresh_token: refreshToken,
      };
    } catch (error) {
      // Rollback transaction if error occurs
      await transaction.rollback();
      throw error;
    }
  }
}

export default new AuthPenjualService();
