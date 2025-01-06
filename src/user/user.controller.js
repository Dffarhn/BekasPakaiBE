import BadRequestException from "../common/execeptions/BadRequestExecption.js";
import NotFoundException from "../common/execeptions/NotFoundException.js";
import HttpStatus from "../common/utils/HttpStatus.js";
import ResponseSuccess from "../common/utils/ResponseSuccess.js";
import userService from "./user.service.js";

class UserController {
  async getAllUsers(req, res, next) {
    try {
      const users = await userService.getUsers({ attributes: { exclude: ["password"] } });
      const response = new ResponseSuccess(HttpStatus.OK, "Berhasil Mendapatkan Semua User", users);

      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req, res, next) {
    try {
      const { uname } = req.params;
      const user = await userService.getUserByUname(uname);
      if (!user) {
        throw new NotFoundException(`User with ID ${uname} not found`);
      }
      const response = new ResponseSuccess(HttpStatus.OK, "Berhasil Mendapatkan Semua User", user);

      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getUserProfile(req, res) {
    try {
      const id = req.user.id;
      const user = await userService.getUserById(id);
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      const response = new ResponseSuccess(HttpStatus.OK, "Berhasil Mendapatkan Semua User", user);

      res.status(response.statusCode).json(response);
    } catch (error) {
      throw new BadRequestException("Failed to fetch user by ID");
    }
  }

  async createUser(req, res) {
    try {
      // console.log(req.body);
      const newUser = await userService.createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: "Failed to create new user" });
    }
  }

  async updateUser(req, res) {
    const { id } = req.user;
    const { body, files } = req;

    try {
      // Prepare the update data

      const updatedUser = await userService.updateUser(id, body, files);

      if (updatedUser) {
        res.json({ message: "User updated successfully", user: updatedUser });
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
