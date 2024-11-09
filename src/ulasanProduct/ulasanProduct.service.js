import ForbiddenException from "../common/execeptions/ForbiddenException.js";
import NotFoundException from "../common/execeptions/NotFoundException.js";
import { convertImagesToWebP } from "../common/services/convertToWEBPService.js";
import { FBdeleteFilesPicture, FBuploadFilesPicture } from "../common/services/uploadImageService.js";
import sequelize from "../database/config.database.js";
import Product from "../product/product.entity.js";
import User from "../user/user.entity.js";
import UlasanProduct from "./ulasanProduct.entity.js";

class UlasanProductService {
  constructor() {
    this.ulasanProductRepository = UlasanProduct;
    this.productRepository = Product;
  }

  // Get all products with optional filters and associations
  async getUlasanProducts(penjualId) {
    try {
      const data = await this.ulasanProductRepository.findAll({
        attributes: ["id", "ulasan", "pictures", "rating", "ulasan_owner"],
        include: [
          {
            model: Product,
            attributes: ["id", "name", "price"],
            include: [
              {
                model: User,
                as: "penjual",
                attributes: ["id", "username", "profile_picture"],
                where: { id: penjualId }, // Filter by penjualId if provided
              },
            ],
          },
          {
            model: User,
            attributes: ["id", "username"],
          },
        ],
      });

      if (!data) {
        throw new NotFoundException("Ulasan not found");
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  //   // Get product by id
  //   async getProductById(id) {
  //     const product = await this.productRepository.findByPk(id, {
  //       attributes: ["id", "name", "picture", "condition", "garansi", "description", "price", "stock", "weight", "volumePanjang", "volumeLebar", "volumeTinggi"],
  //       include: [
  //         { model: JenisProduct, attributes: ["id", "name"] }, // Assuming the alias is 'jenisProduct'
  //         { model: SubCategoryProduct, attributes: ["id", "name"] },
  //         { model: User, as: "penjual", attributes: ["id", "username"] }, // Assuming 'penjual' is the alias for the User model
  //         { model: UlasanProduct, as :"ulasan"}
  //       ],
  //     });
  //     if (!product) {
  //       throw new NotFoundException("Product not found");
  //     }
  //     return product;
  //   }

  // Create a new product
  async createUlasanProduct(ulasanProductData, files) {
    const transaction = await sequelize.transaction();
    let uploadedImageUrls = [];

    try {
      const product = await this.productRepository.findOne({
        where: { id: ulasanProductData.productId }, // Assuming productId is in ulasanProductData
        include: [{ model: User, as: "penjual" }], // Include the seller/user
      });

      // Check if the product exists and if the reviewer is the owner
      if (!product || product.penjual.id === ulasanProductData.reviewer) {
        throw new ForbiddenException("You cannot review your own product.");
      }
      // Step 1: Validate and upload images if provided
      if (files) {
        const isValidImage = files.every((file) => file.mimetype.startsWith("image/"));
        if (!isValidImage) throw new Error("Invalid file type. Only images are allowed.");

        // Prepare files for conversion and upload
        const processedFiles = files.map((file) => ({
          name: `${file.originalname}_${Date.now()}`,
          size: file.size,
          type: file.mimetype,
          buffer: file.buffer,
          originalname: file.originalname,
        }));

        // Convert files to .webp format
        const convertedFiles = await convertImagesToWebP(processedFiles);

        // Upload the converted files
        uploadedImageUrls = await FBuploadFilesPicture(convertedFiles, "ulasan");
      }
      ulasanProductData.pictures = uploadedImageUrls;

      // Step 2: Create the review record in the database within the transaction
      const ulasanProduct = await this.ulasanProductRepository.create(ulasanProductData, { transaction });

      // Step 3: Commit transaction if successful
      await transaction.commit();
      return ulasanProduct;
    } catch (error) {
      console.error("Failed to create ulasan product:", error);

      // Rollback transaction and delete uploaded images if any error occurs
      await transaction.rollback();
      if (uploadedImageUrls.length > 0) {
        try {
          await FBdeleteFilesPicture(uploadedImageUrls.map((file) => file.key));
        } catch (deleteError) {
          console.error("Failed to delete files during rollback:", deleteError);
        }
      }

      throw error;
    }
  }

  // Create a new product
  // Update a review
  async createUlasanProductOwner(id_ulasan, id_penjual, ulasanData) {
    try {
      // Step 1: Find the existing review with product and seller details
      const ulasan = await this.ulasanProductRepository.findOne({
        include: [
          {
            model: Product,
            include: [{ model: User, as: "penjual" }],
          },
        ],
        where: {
          id: id_ulasan,
        },
      });

      // Step 2: Check if the review exists and if it belongs to the specified seller
      if (!ulasan || !ulasan.Product || !ulasan.Product.penjual || ulasan.Product.penjual.id !== id_penjual) {
        throw new ForbiddenException("Review not found or does not belong to this seller.");
      }

      // Step 3: Update the review
      await ulasan.update(ulasanData);

      // Step 4: Return the updated review
      return ulasan;
    } catch (error) {
      throw new Error("Failed to update review.");
    }
  }

  //   // Update a product by id
  //   async updateProduct(id, productData) {
  //     try {
  //       await this.productRepository.update(productData, { where: { id } });
  //       return await this.productRepository.findByPk(id, {
  //         include: [
  //           { model: JenisProduct, as: "jenisProduct" },
  //           { model: CategoryProduct, as: "categoryProduct" },
  //           { model: User, as: "penjual" },
  //         ],
  //       });
  //     } catch (error) {
  //       throw new Error("Failed to update product");
  //     }
  //   }

  //   // Delete a product by id
  //   async deleteProduct(id) {
  //     try {
  //       const product = await this.productRepository.findByPk(id, {
  //         attributes: ["picture"],
  //       });

  //       const images = product.dataValues.picture;

  //       // Transform the array to get only the key values
  //       const keysOnly = images.map((image) => image.key);

  //       await deleteFilesPicture(keysOnly);

  //       const result = await this.productRepository.destroy({ where: { id } });
  //       return result === 1; // true if the product was deleted, false otherwise
  //     } catch (error) {
  //       throw new Error("Failed to delete product");
  //     }
  //   }
}

export default new UlasanProductService();
