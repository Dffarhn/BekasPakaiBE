import AuthPenjual from "../authPenjual/authPenjual.entity.js";
import { FBdeleteFilesPicture, FBuploadFilesPicture } from "../common/services/uploadImageService.js";
import sequelize from "../database/config.database.js";
import KurirPenjual from "../kurirPenjual/kurirPenjual.entity.js";
import User from "./user.entity.js";

class UserService {
  constructor() {
    this.userRepository = User;
  }

  async getUsers(options = {}) {
    try {
      return await this.userRepository.findAll(options);
    } catch (error) {
      throw new Error("Gagal mengambil data pengguna");
    }
  }

  async getUserById(id) {
    try {
      const user = await this.userRepository.findByPk(id, {
        attributes:["id","name","username","email","profile_picture"],
        include: [{ model: AuthPenjual,attributes:["alamat"], include: [{ model: KurirPenjual }] }],
      });
      return user;
    } catch (error) {
      throw new Error("Gagal mengambil data pengguna");
    }
  }

  async createUser(userData) {
    try {
      return await this.userRepository.create(userData);
    } catch (error) {
      throw new Error("Gagal membuat pengguna baru");
    }
  }

  async updateUser(id, data, files) {
    const transaction = await sequelize.transaction();
    const uploadedFiles = [];

    try {
      // Fetch the existing user record
      const user = await User.findByPk(id);
      if (!user) throw new Error("User not found");

      const updateData = { ...data };

      // Process profile picture if provided
      if (files?.profile_picture?.length > 0) {
        // Check if an existing profile picture exists, delete it
        if (user.profile_picture) {
          await FBdeleteFilesPicture([user.profile_picture.key]); // Delete existing profile picture
        }

        // Upload the new profile picture
        const profilePictureUpload = await FBuploadFilesPicture(files.profile_picture);
        updateData.profile_picture = profilePictureUpload[0];
        uploadedFiles.push(profilePictureUpload[0].key); // Track new file key for rollback
      }

      // Process banner profile picture if provided
      if (files?.banner_profile_picture?.length > 0) {
        // Check if an existing banner profile picture exists, delete it
        if (user.banner_profile_picture) {
          await FBdeleteFilesPicture([user.banner_profile_picture.key]); // Delete existing banner profile picture
        }

        // Upload the new banner profile picture
        const bannerPictureUpload = await FBuploadFilesPicture(files.banner_profile_picture);
        updateData.banner_profile_picture = bannerPictureUpload[0];
        uploadedFiles.push(bannerPictureUpload[0].key); // Track new file key for rollback
      }

      // Update user in the database within the transaction
      const [updateResult] = await User.update(updateData, { where: { id }, transaction });
      if (updateResult === 0) {
        throw new Error("User not found or no changes made");
      }

      // Commit transaction if everything is successful
      await transaction.commit();

      // Retrieve and return updated user
      const updatedUser = await User.findByPk(id);
      return updatedUser;
    } catch (error) {
      console.error("Failed to update user pictures:", error);

      // Rollback transaction
      await transaction.rollback();

      // Rollback file uploads by deleting successfully uploaded files
      if (uploadedFiles.length > 0) {
        try {
          await FBdeleteFilesPicture(uploadedFiles);
        } catch (deleteError) {
          console.error("Failed to delete files during rollback:", deleteError);
        }
      }

      throw new Error("Failed to update user pictures");
    }
  }

  async deleteUser(id) {
    try {
      const result = await this.userRepository.destroy({ where: { id } });
      return result === 1;
    } catch (error) {
      throw new Error("Gagal menghapus pengguna");
    }
  }
}

export default new UserService();
