import AppDataSource from "../database/config.database.js";
import { User } from "../entities/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthService {
  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async register(userData) {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const newUser = this.userRepository.create({
        ...userData,
        password: hashedPassword,
      });
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new Error("Gagal melakukan registrasi");
    }
  }

  async login(email, password) {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        return { success: false };
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return { success: false };
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return { success: true, token };
    } catch (error) {
      throw new Error("Gagal melakukan login");
    }
  }
}

export default new AuthService();
