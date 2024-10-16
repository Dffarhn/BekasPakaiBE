import ProductService from "./product.service.js";

class ProductController {
  // Fetch all products
  async getProducts(req, res) {
    try {
      const products = await ProductService.getProducts();
      return res.status(200).json({
        statusCode: 200,
        message: "Products fetched successfully",
        data: products,
      });
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: error.message || "Failed to fetch products",
      });
    }
  }

  // Fetch a single product by ID
  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductService.getProductById(id);
      if (!product) {
        return res.status(404).json({
          statusCode: 404,
          message: "Product not found",
        });
      }
      return res.status(200).json({
        statusCode: 200,
        message: "Product fetched successfully",
        data: product,
      });
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: error.message || "Failed to fetch product",
      });
    }
  }

  // Create a new product
  async createProduct(req, res) {
    try {
      const productData = req.body;
      const product = await ProductService.createProduct(productData);
      return res.status(201).json({
        statusCode: 201,
        message: "Product created successfully",
        data: product,
      });
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: error.message || "Failed to create product",
      });
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
