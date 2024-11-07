import NotFoundException from "../common/execeptions/NotFoundException.js";
import HttpStatus from "../common/utils/HttpStatus.js";
import ResponseSuccess from "../common/utils/ResponseSuccess.js";
import keranjangProductService from "./keranjangProduct.service.js";

class KeranjangProductController {
  async getAll(req, res, next) {
    try {
      const userId = req.user.id;
      const keranjangProductData = await keranjangProductService.getAll(userId);
      const response = new ResponseSuccess(HttpStatus.OK, "Successfully Get All Jenis Product", { keranjangProductData });
      res.status(response.statusCode).json(response);
    } catch (error) {
      console.error(error.message);
      next(error);
    }
  }

  //   async getOne(req, res, next) {
  //     try {
  //       const { id } = req.params; // Extract id from params
  //       const userId = req.user.id
  //       const result = await offeredProductService.getOneOfferedProduct(id);
  //       const response = new ResponseSuccess(HttpStatus.OK, "Successfully Get One Jenis Product", { result });
  //       res.status(response.statusCode).json(response);
  //     } catch (error) {
  //       next(error);
  //     }
  //   }

  async create(req, res, next) {
    try {
      const { id_product } = req.params;
      const userId = req.user.id;

      const keranjangProductData = req.body;
      keranjangProductData.productId = id_product;
      keranjangProductData.customerId = userId;
      const result = await keranjangProductService.create(keranjangProductData); // Create product
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

  async deleteAllInKeranjang(req, res, next) {
    try {
      const { id } = req.params; // Extract id from params
      const userId = req.user.id;
      const isDeleted = await keranjangProductService.deleteAll(id, userId);
      if (!isDeleted) {
        throw new NotFoundException("Keranjang tidak ditemukan"); // Cart not found
      }
      const response = new ResponseSuccess(HttpStatus.OK, "Successfully Deleted All Products in Keranjang");
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  }

  async deleteOneProductInKeranjang(req, res, next) {
    try {
      const { id_product } = req.params; // Extract id from params
      const customerId = req.user.id; // Extract user ID
      const isDeleted = await keranjangProductService.delete(id_product, customerId);
      if (!isDeleted) {
        throw new NotFoundException("Product in Keranjang not found");
      }
      const response = new ResponseSuccess(HttpStatus.OK, "Successfully Deleted Product in Keranjang");
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default new KeranjangProductController();
