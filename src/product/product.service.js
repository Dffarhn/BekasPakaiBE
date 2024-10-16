import Product from "./product.entity.js";
import JenisProduct from "../jenisProducts/jenisProduct.entity.js";
import CategoryProduct from "../categoryProducts/categoryProduct.entity.js";
import User from "../user/user.entity.js";
import NotFoundException from "../common/execeptions/NotFoundException.js";

class ProductService {
  constructor() {
    this.productRepository = Product;
  }

  // Get all products with optional filters and associations
  async getProducts(options = {}) {
    try {
      return await this.productRepository.findAll({
        include: [
          { model: JenisProduct, as: "jenisProduct" }, // Assuming the alias is 'jenisProduct'
          { model: CategoryProduct, as: "categoryProduct" },
          { model: User, as: "penjual" }, // Assuming 'penjual' is the alias for the User model
        ],
        ...options,
      });
    } catch (error) {
      throw new Error("Failed to fetch products");
    }
  }

  // Get product by id
  async getProductById(id) {
    try {
      const product = await this.productRepository.findByPk(id, {
        include: [
          { model: JenisProduct, as: "jenisProduct" },
          { model: CategoryProduct, as: "categoryProduct" },
          { model: User, as: "penjual" },
        ],
      });
      if (!product) {
        throw new NotFoundException("Product not found");
      }
      return product;
    } catch (error) {
      throw new Error("Failed to fetch product");
    }
  }

  // Create a new product
  async createProduct(productData) {
    try {
      return await this.productRepository.create(productData);
    } catch (error) {
      throw new Error("Failed to create product");
    }
  }

  // Update a product by id
  async updateProduct(id, productData) {
    try {
      await this.productRepository.update(productData, { where: { id } });
      return await this.productRepository.findByPk(id, {
        include: [
          { model: JenisProduct, as: "jenisProduct" },
          { model: CategoryProduct, as: "categoryProduct" },
          { model: User, as: "penjual" },
        ],
      });
    } catch (error) {
      throw new Error("Failed to update product");
    }
  }

  // Delete a product by id
  async deleteProduct(id) {
    try {
      const result = await this.productRepository.destroy({ where: { id } });
      return result === 1; // true if the product was deleted, false otherwise
    } catch (error) {
      throw new Error("Failed to delete product");
    }
  }
}

export default new ProductService();
