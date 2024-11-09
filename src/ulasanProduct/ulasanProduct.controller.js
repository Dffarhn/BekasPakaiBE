import { convertImagesToWebP } from "../common/services/convertToWEBPService.js";
import { deleteFilesPicture, FBuploadFilesPicture, uploadFilesPicture } from "../common/services/uploadImageService.js";
import HttpStatus from "../common/utils/HttpStatus.js";
import ResponseSuccess from "../common/utils/ResponseSuccess.js";
import ulasanProductService from "./ulasanProduct.service.js";

class UlasanProductController {
  // Fetch all products
  async getUlasanProducts(req, res, next) {
    try {
      const { id } = req.params;
      const products = await ulasanProductService.getUlasanProducts(id);
      const response = new ResponseSuccess(HttpStatus.OK, "Successfully Get Ulasan products", {
        products,
      });

      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  }

  //   // Fetch a single product by ID
  //   async getProductById(req, res, next) {
  //     try {
  //       const { id } = req.params;
  //       const product = await ProductService.getProductById(id);
  //       if (!product) {
  //         throw new NotFoundException("Product not found");
  //       }
  //       const response = new ResponseSuccess(HttpStatus.OK, "Successfully get product", {
  //         product,
  //       });

  //       res.status(response.statusCode).json(response);
  //     } catch (error) {
  //       next(error);
  //     }
  //   }

  async create(req, res, next) {
    try {
      const { id_product } = req.params;
      const ulasanProductData = {
        ...req.body,
        reviewer: req.user.id,
        productId: id_product,
      };

      // Pass files to service for processing
      const product = await ulasanProductService.createUlasanProduct(ulasanProductData, req.files);

      const response = new ResponseSuccess(HttpStatus.CREATED, "Create Ulasan Product successfully", { product });
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  }

  // Update an existing product
  async createUlasanProductOwner(req, res, next) {
    try {
      const { id_ulasan_product } = req.params;
      const penjualId = req.user.id;
      const ulasanData = req.body;

      const ulasanDataCreate = await ulasanProductService.createUlasanProductOwner(id_ulasan_product, penjualId, ulasanData);
      if (!ulasanDataCreate) {
        return res.status(404).json({
          statusCode: 404,
          message: "Product not found",
        });
      }
      const response = new ResponseSuccess(HttpStatus.CREATED, "Create Ulasan Feedback Product successfully", {
        ulasanDataCreate,
      });

      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  }

  //   // Delete a product by ID
  //   async deleteProduct(req, res) {
  //     try {
  //       const { id } = req.params;
  //       const success = await ProductService.deleteProduct(id);
  //       if (!success) {
  //         return res.status(404).json({
  //           statusCode: 404,
  //           message: "Product not found",
  //         });
  //       }
  //       return res.status(200).json({
  //         statusCode: 200,
  //         message: "Product deleted successfully",
  //       });
  //     } catch (error) {
  //       return res.status(500).json({
  //         statusCode: 500,
  //         message: error.message || "Failed to delete product",
  //       });
  //     }
  //   }
}

export default new UlasanProductController();
