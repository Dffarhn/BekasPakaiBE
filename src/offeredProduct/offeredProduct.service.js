import { where } from "sequelize";
import OfferedProduct from "./offeredProduct.entity";
import Product from "../product/product.entity";
import User from "../user/user.entity";
import UnauthorizedException from "../common/execeptions/UnauthorizedException";
import NotFoundException from "../common/execeptions/NotFoundException";

class OfferedProductService {
  constructor() {
    this.offeredProductRepository = OfferedProduct;
  }

  async getAllOfferedProduct(userId) {
    const dataProduct = await this.offeredProductRepository.findAll({
      include: [
        {
          model: Product,
          where: {
            penjualId: userId,
          },
        },

        { model: User, attributes: ["name"] },
      ],
    });

    return dataProduct; // Ensure the function returns the fetched data
  }

  async getOneOfferedProduct(id, userId) {
    const product = await this.offeredProductRepository.findByPk(id, {
      include: [
        {
          model: Product,
          where: {
            penjualId: userId,
          },
        },

        { model: User, attributes: ["name"] },
      ],
    });

    if (!product) throw new NotFoundException("category Product not found");

    if (product.product.id != userId) {
      throw new UnauthorizedException("You are not Authorize access this");
    }
    return product;
  }

  async createOfferedProduct(offeredProductData) {
    try {
      const newProduct = await this.offeredProductRepository.create(offeredProductData);
      return { createdAt: newProduct.getDataValue("createdAt") };
    } catch (error) {
      throw new Error("Failed to create category product");
    }
  }

  async updateCategoryProduct(id, subCategoryProductData) {
    try {
      await this.offeredProductRepository.update(subCategoryProductData, { where: { id } });
      return await this.getOnecategoryProduct(id);
    } catch (error) {
      throw new Error("Failed to update category product");
    }
  }

  async deletCategoryProduct(id) {
    try {
      const result = await this.offeredProductRepository.destroy({ where: { id } });
      return result === 1; // Returns true if the product was deleted
    } catch (error) {
      throw new Error("Failed to delete category product");
    }
  }
}

export default new OfferedProductService();
