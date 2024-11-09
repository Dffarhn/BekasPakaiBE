import { where } from "sequelize";
import Product from "../product/product.entity.js";
import User from "../user/user.entity.js";
import KeranjangProduct from "./keranjangProduct.entity.js";
import ForbiddenException from "../common/execeptions/ForbiddenException.js";
import sequelize from "../database/config.database.js";
import NotFoundException from "../common/execeptions/NotFoundException.js";

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
          attributes: ["id", "name", "picture", "condition", "isAvailable","price"],
          include: [{ model: User, as: "penjual", attributes: ["id", "username","profile_picture"] }],
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
      const pictureName = item.Product.penjual.profile_picture;

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
        price: item.Product.price, 
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
    // console.log(keranjangProductData)
    try {
      const existingProduct = await this.keranjangProductRepository.findOne({
        where: {
          productId: keranjangProductData.productId,
          customerId: keranjangProductData.customerId,
        },
      });

      if (existingProduct) {
        throw new ForbiddenException("Product already exists in the cart.");
      }
      const newProduct = await this.keranjangProductRepository.create(keranjangProductData);
      return { createdAt: newProduct.createdAt };
    } catch (error) {
      throw error;
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

  async deleteAll(id_penjual, id_user) {
    try {
      // Check if there are any matching keranjang entries
      const existingItems = await this.keranjangProductRepository.findAll({
        where: {
          "$Product.penjualId$": id_penjual,
          customerId: id_user,
        },
        include: [
          {
            model: Product,
            include: [{ model: User, as: "penjual" }],
          },
        ],
      });

      if (existingItems.length === 0) {
        throw new NotFoundException("Keranjang tidak ditemukan"); // Throw an error if no matching items
      }

      const query = `
        DELETE kp
        FROM keranjang_product kp
        INNER JOIN product p ON kp.productId = p.id
        INNER JOIN user_bekasku u ON p.penjualId = u.id
        WHERE u.id = :id_penjual AND kp.customerId = :id_user
      `;
      await sequelize.query(query, {
        replacements: { id_penjual, id_user },
        type: sequelize.QueryTypes.DELETE,
      });

      // If no errors occurred, assume success
      return true;
    } catch (error) {
      // console.log(error);
      throw error;
    }
  }

  async delete(productId, customerId) {
    const result = await this.keranjangProductRepository.destroy({
      where: {
        productId,
        customerId,
      },
    });
    return result > 0; // Returns true if one or more products were deleted
  }
}

export default new KeranjangProductService();
