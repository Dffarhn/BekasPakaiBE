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
          include: [{ model: User, as: "penjual", attributes: ["id", "username"] }],
        },

        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    // Group products by `penjual.id`
    const groupedData = dataProduct.reduce((acc, item) => {
      const penjualId = item.Product.penjual.id;
      const penjualName = item.Product.penjual.username;

      // Initialize the group if it doesn't exist
      if (!acc[penjualId]) {
        acc[penjualId] = {
          penjualId,
          penjualName,
          products: [],
        };
      }

      // Add the product to the corresponding `penjual` group
      acc[penjualId].products.push({
        productId: item.Product.id,
        name: item.Product.name,
        picture: item.Product.picture,
        condition: item.Product.condition,
        isAvailable: item.Product.isAvailable,
      });

      return acc;
    }, {});

    // Convert the grouped data from an object to an array (if needed)
    return Object.values(groupedData);
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
