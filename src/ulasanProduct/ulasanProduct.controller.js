import { convertImagesToWebP } from "../common/services/convertToWEBPService.js";
import { deleteFilesPicture, uploadFilesPicture } from "../common/services/uploadImageService.js";
import HttpStatus from "../common/utils/HttpStatus.js";
import ResponseSuccess from "../common/utils/ResponseSuccess.js";
import ulasanProductService from "./ulasanProduct.service.js";

class UlasanProductController {
  // Fetch all products
//   async getProducts(req, res, next) {
//     try {
//       console.log("masuk");
//       const products = await ProductService.getProducts();
//       const response = new ResponseSuccess(HttpStatus.OK, "Successfully get products", {
//         products,
//       });

//       res.status(response.statusCode).json(response);
//     } catch (error) {
//       next(error);
//     }
//   }

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

      const {id_ulasan_product} = req.params
      let ulasanProductData = req.body;
      ulasanProductData.reviewer = req.user.id;
      ulasanProductData.productId = id_ulasan_product
      let uploadedImageUrls = [];

      // Step 2: After validation passes, upload images
      if (req.files) {
        // Validate that all files are images
        const isValidImage = req.files.every((file) => file.mimetype.startsWith("image/"));
        if (!isValidImage) {
          return res.status(400).json({ message: "Invalid file type. Only images are allowed." });
        }

        // Generate unique file names and prepare for conversion/upload
        const processedFiles = req.files.map((file) => ({
          name: `${file.originalname}_${Date.now()}`,
          size: file.size,
          type: file.mimetype,
          buffer: file.buffer,
          originalname: file.originalname, // Maintain original name for conversion
        }));

        // Convert files to .webp format
        const convertedFiles = await convertImagesToWebP(processedFiles);

        // Upload the converted files
        uploadedImageUrls = await uploadFilesPicture(convertedFiles);
      }

      ulasanProductData.pictures = uploadedImageUrls;

      // Step 3: Save the product to the database, including the uploaded image URLs
      const product = await ulasanProductService.createUlasanProduct(ulasanProductData);
      const response = new ResponseSuccess(HttpStatus.CREATED, "Create Ulasan Product successfully", {
        product,
      });

      res.status(response.statusCode).json(response);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  // Update an existing product
//   async updateProduct(req, res) {
//     try {
//       const { id } = req.params;
//       const productData = req.body;
//       const updatedProduct = await ProductService.updateProduct(id, productData);
//       if (!updatedProduct) {
//         return res.status(404).json({
//           statusCode: 404,
//           message: "Product not found",
//         });
//       }
//       return res.status(200).json({
//         statusCode: 200,
//         message: "Product updated successfully",
//         data: updatedProduct,
//       });
//     } catch (error) {
//       return res.status(500).json({
//         statusCode: 500,
//         message: error.message || "Failed to update product",
//       });
//     }
//   }

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
