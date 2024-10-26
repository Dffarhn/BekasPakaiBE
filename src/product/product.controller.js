import NotFoundException from "../common/execeptions/NotFoundException.js";
import { deleteFilesPicture, uploadFilesPicture } from "../common/services/uploadImageService.js";
import HttpStatus from "../common/utils/HttpStatus.js";
import ResponseSuccess from "../common/utils/ResponseSuccess.js";
import ProductService from "./product.service.js";

class ProductController {
  // Fetch all products
  async getProducts(req, res, next) {
    try {
      console.log("masuk");
      const products = await ProductService.getProducts();
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
      next(error);
    }
  }

  // Create a new product
  async createProduct(req, res, next) {
    try {
      // console.log(req.body)
      let productData = req.body;
      productData.penjualId = req.user.id;
      let uploadedImageUrls = [];

      // Step 2: After validation passes, upload images
      if (req.files) {
        // Generate unique file names and prepare for conversion/upload
        const processedFiles = req.files.map((file) => ({
          name: `${file.originalname}_${Date.now()}`,
          size: file.size,
          type: file.mimetype,
          buffer: file.buffer,
        }));

        // Convert and upload concurrently
        uploadedImageUrls = await uploadFilesPicture(processedFiles);
      }

      productData.picture = uploadedImageUrls;

      // Step 3: Save the product to the database, including the uploaded image URLs
      productData.picture = uploadedImageUrls; // Add uploaded image URLs  to the product data
      const product = await ProductService.createProduct(productData);
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
  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const productData = req.body;
      const updatedProduct = await ProductService.updateProduct(id, productData);
      if (!updatedProduct) {
        return res.status(404).json({
          statusCode: 404,
          message: "Product not found",
        });
      }
      return res.status(200).json({
        statusCode: 200,
        message: "Product updated successfully",
        data: updatedProduct,
      });
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: error.message || "Failed to update product",
      });
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
