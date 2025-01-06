import BadRequestException from "../common/execeptions/BadRequestExecption.js";
import NotFoundException from "../common/execeptions/NotFoundException.js";
import { convertImagesToWebP } from "../common/services/convertToWEBPService.js";
import { deleteFilesPicture, FBuploadFilesPicture, uploadFilesPicture } from "../common/services/uploadImageService.js";
import HttpStatus from "../common/utils/HttpStatus.js";
import ResponseSuccess from "../common/utils/ResponseSuccess.js";
import ProductService from "./product.service.js";

class ProductController {
  // Fetch all products
  async getProducts(req, res, next) {
    try {
      const { category, subcategory, tipe, limit, page, toko } = req.query;

      // Pass the query parameters as options to the service
      const products = await ProductService.getProducts({
        category,
        subcategory,
        tipe,
        limit,
        page,
        toko,
      });

      const response = new ResponseSuccess(HttpStatus.OK, "Successfully get products", {
        products,
      });

      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  }
  async getProductsOwner(req, res, next) {
    try {
      const userId = req.user.id;
      const { category, subcategory, tipe, limit, page } = req.query;

      // Pass the query parameters as options to the service
      const products = await ProductService.getProducts({
        category,
        subcategory,
        tipe,
        limit,
        page,
        userId,
      });

      const response = new ResponseSuccess(HttpStatus.OK, "Successfully get products", {
        products,
      });

      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  }

  // Fetch a single product by ID
  async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await ProductService.getProductById(id);
      if (!product) {
        throw new NotFoundException("Product not found");
      }
      const response = new ResponseSuccess(HttpStatus.OK, "Successfully get product", {
        product,
      });

      res.status(response.statusCode).json(response);
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  async createProduct(req, res, next) {
    try {
      let productData = req.body;
      productData.penjualId = req.user.id;

      // Step 3: Save the product to the database, including the uploaded image URLs
      const product = await ProductService.createProduct(productData, req.files);
      const response = new ResponseSuccess(HttpStatus.CREATED, "Create Product successfully", {
        product,
      });

      res.status(response.statusCode).json(response);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  // Update an existing product
  async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const productData = req.body;
      const updatedProduct = await ProductService.updateProduct(id, productData, req.files);
      if (!updatedProduct) {
        throw new BadRequestException("Data yang diberikan tidak valid");
      }
      const response = new ResponseSuccess(HttpStatus.OK, "Create Product successfully", {
        updatedProduct,
      });

      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  }

  // Delete a product by ID
  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const success = await ProductService.deleteProduct(id);
      if (!success) {
        return res.status(404).json({
          statusCode: 404,
          message: "Product not found",
        });
      }
      return res.status(200).json({
        statusCode: 200,
        message: "Product deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: error.message || "Failed to delete product",
      });
    }
  }
}

export default new ProductController();
