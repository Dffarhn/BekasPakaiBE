import HttpStatus from "../common/utils/HttpStatus.js";
import ResponseSuccess from "../common/utils/ResponseSuccess.js";
import offeredProductService from "./offeredProduct.service.js";

class OfferedProductController {
  async getAll(req, res, next) {
    try {

      const userId = req.user.id
      const offeredProduct = await offeredProductService.getAllOfferedProduct(userId);
      const response = new ResponseSuccess(HttpStatus.OK, "Successfully Get All Jenis Product", { offeredProduct });
      res.status(response.statusCode).json(response);
    } catch (error) {
      console.error(error.message);
      next(error);
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params; // Extract id from params
      const userId = req.user.id
      const result = await offeredProductService.getOneOfferedProduct(id);
      const response = new ResponseSuccess(HttpStatus.OK, "Successfully Get One Jenis Product", { result });
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const {id_product} = req.params
      const userId = req.user.id

      const offeredProductData = req.body
      offeredProductData.productId = id_product
      offeredProductData.buyerId = userId
      const result = await offeredProductService.createOfferedProduct(offeredProductData); // Create product
      const response = new ResponseSuccess(HttpStatus.CREATED, "Successfully Created One Jenis Product", { result });
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  }

//   async update(req, res, next) {
//     try {
//       const { id } = req.params; // Extract id from params
//       const result = await jenisProductService.updateJenisProduct(id, req.body);
//       const response = new ResponseSuccess(HttpStatus.OK, "Successfully Updated Jenis Product", { result });
//       res.status(response.statusCode).json(response);
//     } catch (error) {
//       next(error);
//     }
//   }

//   async delete(req, res, next) {
//     try {
//       const { id } = req.params; // Extract id from params
//       const isDeleted = await jenisProductService.deleteJenisProduct(id);
//       const message = isDeleted ? "Successfully Deleted Jenis Product" : "Jenis Product Not Found";
//       const response = new ResponseSuccess(HttpStatus.OK, message);
//       res.status(response.statusCode).json(response);
//     } catch (error) {
//       next(error);
//     }
//   }
}

export default new OfferedProductController();
