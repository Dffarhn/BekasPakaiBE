import CategoryProduct from "../categoryProducts/categoryProduct.entity.js";
import BadRequestException from "../common/execeptions/BadRequestExecption.js";
import NotFoundException from "../common/execeptions/NotFoundException.js";
import ResponseAPI from "../common/middleware/ResponseAPi.js";
import HttpStatus from "../common/utils/HttpStatus.js";
import userService from "./user.service.js";

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await userService.getUsers({ attributes: { exclude: ["password"] } });
      return ResponseAPI(res, HttpStatus.OK, "Berhasil Mendapatkan Semua User", users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getUserById(req, res) {
    try {
      const user = await this.userRepository.findByPk(id);
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {
      throw new BadRequestException("Failed to fetch user by ID");
    }
  }

  async createUser(req, res) {
    try {
      console.log(req.body);
      const newUser = await userService.createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: "Failed to create new user" });
    }
  }

  async updateUser(req, res) {
    try {
      const updatedUser = await userService.updateUser(req.params.id, req.body);
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to update user" });
    }
  }

  async deleteUser(req, res) {
    try {
      const isDeleted = await userService.deleteUser(req.params.id);
      if (isDeleted) {
        res.json({ message: "User successfully deleted" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete user" });
    }
  }
}

export default new UserController();
