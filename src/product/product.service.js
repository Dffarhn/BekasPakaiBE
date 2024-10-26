import Product from "./product.entity.js";
import JenisProduct from "../jenisProducts/jenisProduct.entity.js";
import CategoryProduct from "../categoryProducts/categoryProduct.entity.js";
import User from "../user/user.entity.js";
import NotFoundException from "../common/execeptions/NotFoundException.js";
import SubCategoryProduct from "../subCategoryProduct/subCategoryProduct.entity.js";
import { deleteFilesPicture } from "../common/services/uploadImageService.js";

class ProductService {
  constructor() {
    this.productRepository = Product;
  }

  // Get all products with optional filters and associations
  async getProducts(options = {}) {
    try {
      console.log("Masuk service");
      const data = await this.productRepository.findAll({
        attributes: ["id", "name", "picture", "condition", "price"],
        include: [
          { model: JenisProduct, attributes: ["id", "name"] }, // Assuming the alias is 'jenisProduct'
          { model: SubCategoryProduct, attributes: ["id", "name"] },
          { model: User, as: "penjual", attributes: ["id", "username"] }, // Assuming 'penjual' is the alias for the User model
        ],
        ...options,
      });
      console.log(data);

      return data;
    } catch (error) {
      console.log(error.message);
    }
  }

  // Get product by id
  async getProductById(id) {
    const product = await this.productRepository.findByPk(id, {
      attributes: ["id", "name", "picture", "condition", "garansi", "description", "price", "stock", "weight", "volumePanjang", "volumeLebar", "volumeTinggi"],
      include: [
        { model: JenisProduct, attributes: ["id", "name"] }, // Assuming the alias is 'jenisProduct'
        { model: SubCategoryProduct, attributes: ["id", "name"] },
        { model: User, as: "penjual", attributes: ["id", "username"] }, // Assuming 'penjual' is the alias for the User model
      ],
    });
    if (!product) {
      throw new NotFoundException("Product not found");
    }
    return product;
  }

  // Create a new product
  async createProduct(productData) {
    try {
      // console.log(productData);
      return await this.productRepository.create(productData);
    } catch (error) {
      console.log(error.message);
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
      const product = await this.productRepository.findByPk(id, {
        attributes: ["picture"],
      });

      const images = product.dataValues.picture;

      // Transform the array to get only the key values
      const keysOnly = images.map((image) => image.key);

      await deleteFilesPicture(keysOnly);

      const result = await this.productRepository.destroy({ where: { id } });
      return result === 1; // true if the product was deleted, false otherwise
    } catch (error) {
      throw new Error("Failed to delete product");
    }
  }
}

export default new ProductService();
