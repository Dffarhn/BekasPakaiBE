import { where } from "sequelize";
import Product from "../product/product.entity.js";
import User from "../user/user.entity.js";
import KeranjangProduct from "./keranjangProduct.entity.js";

class KeranjangProductService {
  constructor() {
    this.keranjangProductRepository = KeranjangProduct;
  }

  async getAll(userId) {
    const dataProduct = await this.keranjangProductRepository.findAll({
      attributes: ["id"],
      where: {
        customerId: userId,
      },
      include: [
        {
          model: Product,
          attributes: ["id", "name", "picture", "condition", "isAvailable"],
        },

        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    return dataProduct; // Ensure the function returns the fetched data
  }

  //   async getOneOfferedProduct(id, userId) {
  //     const product = await this.offeredProductRepository.findByPk(id, {
  //       include: [
  //         {
  //           model: Product,
  //           where: {
  //             penjualId: userId,
  //           },
  //         },

  //         { model: User, attributes: ["name"] },
  //       ],
  //     });

  //     if (!product) throw new NotFoundException("category Product not found");

  //     if (product.product.id != userId) {
  //       throw new UnauthorizedException("You are not Authorize access this");
  //     }
  //     return product;
  //   }

  async create(keranjangProductData) {
    try {
      const newProduct = await this.keranjangProductRepository.create(keranjangProductData);
      return { createdAt: newProduct.createdAt };
    } catch (error) {
      throw new Error("Failed to create category product");
    }
  }

  //   async updateCategoryProduct(id, subCategoryProductData) {
  //     try {
  //       await this.offeredProductRepository.update(subCategoryProductData, { where: { id } });
  //       return await this.getOnecategoryProduct(id);
  //     } catch (error) {
  //       throw new Error("Failed to update category product");
  //     }
  //   }

  async delete(id) {
    const result = await this.keranjangProductRepository.destroy({ where: { id } });
    return result === 1; // Returns true if the product was deleted
  }
}

export default new KeranjangProductService();
