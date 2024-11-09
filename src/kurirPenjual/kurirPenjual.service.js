import User from "../user/user.entity.js"; // Sequelize model
import dotenv from "dotenv";
import sequelize from "../database/config.database.js";
import AuthPenjual from "../authPenjual/authPenjual.entity.js";
import KurirPenjual from "./kurirPenjual.entity.js";
import BadRequestException from "../common/execeptions/BadRequestExecption.js";

dotenv.config();

class AuthPenjualService {
  constructor() {
    this.userRepository = User;
    this.userPenjualRepository = AuthPenjual;
    this.kurirPenjualRepository = KurirPenjual;
  }

  async addKurirPenjual(userId, dataKurir) {
    const transaction = await sequelize.transaction();
    try {
      const existingUser = await this.userRepository.findOne({
        where: { id: userId },
        transaction,
      });

      if (!existingUser) {
        throw new BadRequestException("User not found.");
      }

      // Loop through each courier data in `dataKurir` array
      const insertData = [];
      for (const kurir of dataKurir) {
        const newKurir = await this.kurirPenjualRepository.create(
          {
            KurirPenjualId: existingUser.AuthPenjualId,
            layananKurirId: kurir.nameCode,
            layananKurirServiceId: kurir.serviceNameCode,
          },
          { transaction }
        );
        insertData.push(newKurir); // Add each created courier entry to the response array
      }

      await transaction.commit();

      return { createdAt: new Date().toISOString(), insertData };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async getKurirPenjual(userId) {
    const existingUser = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new BadRequestException("User not found.");
    }

    const authPenjual = await this.userPenjualRepository.findOne({
      where: { id: existingUser.AuthPenjualId },
      attributes:["id"],
      include: [{ model: KurirPenjual }],
    });

    // if (!authPenjual || !authPenjual.KurirPenjuals) {
    //   return { message: "No courier data found for this user." };
    // }

    // const kurirData = authPenjual.KurirPenjuals.map((kurir) => ({
    //   kurirPenjualId: kurir.kurirPenjualId,
    //   layananKurirId: kurir.layananKurirId,
    //   layananKurirServiceId: kurir.layananKurirServiceId,
    //   createdAt: kurir.createdAt,
    //   updatedAt: kurir.updatedAt,
    // }));

    return { authPenjual };
  }
}

export default new AuthPenjualService();
