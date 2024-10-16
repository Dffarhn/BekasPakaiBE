import User from "./user.entity.js";

class UserService {
  constructor() {
    this.userRepository = User;
  }

  async getUsers(options={}) {
    try {
      return await this.userRepository.findAll(options);
    } catch (error) {
      throw new Error("Gagal mengambil data pengguna");
    }
  }

  async getUserById(id) {
    try {
      const user = await this.userRepository.findByPk(id);
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

  async updateUser(id, userData) {
    try {
      await this.userRepository.update(userData, { where: { id } });
      return await this.userRepository.findByPk(id);
    } catch (error) {
      throw new Error("Gagal memperbarui pengguna");
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
