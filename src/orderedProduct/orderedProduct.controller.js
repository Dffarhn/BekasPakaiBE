import BadRequestException from "../common/execeptions/BadRequestExecption.js";
import HttpStatus from "../common/utils/HttpStatus.js";
import ResponseSuccess from "../common/utils/ResponseSuccess.js";
import orderedProductService from "./orderedProduct.service.js";

class OrderedProductController {
//   // Fetch all products
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
//       console.log(error);
//       next(error);
//     }
//   }

  async createOrderProduct(req, res, next) {
    try {
      let orderData = req.body;
      orderData.buyerId = req.user.id;

      // Step 3: Save the product to the database, including the uploaded image URLs
      const product = await orderedProductService.create(orderData);
      const response = new ResponseSuccess(HttpStatus.CREATED, "Create Product successfully", {
        product,
      });

      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  }

//   // Update an existing product
//   async updateProduct(req, res, next) {
//     try {
//       const { id } = req.params;
//       console.log(req.body);
//       const productData = req.body;
//       const updatedProduct = await ProductService.updateProduct(id, productData);
//       if (!updatedProduct) {
//         throw new BadRequestException("Data yang diberikan tidak valid");
//       }
//       const response = new ResponseSuccess(HttpStatus.OK, "Create Product successfully", {
//         updatedProduct,
//       });

//       res.status(response.statusCode).json(response);
//     } catch (error) {
//       console.log(error.message);
//       next(error);
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

export default new OrderedProductController();
