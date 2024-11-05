import Product from "./product.entity.js";
import { deleteFilesPicture, FBdeleteFilesPicture, FBuploadFilesPicture } from "../common/services/uploadImageService.js";
import UlasanProduct from "../ulasanProduct/ulasanProduct.entity.js";
import JenisProduct from "../jenisProducts/jenisProduct.entity.js";
import User from "../user/user.entity.js";
import SubCategoryProduct from "../subCategoryProduct/subCategoryProduct.entity.js";
import NotFoundException from "../common/execeptions/NotFoundException.js";
import CategoryProduct from "../categoryProducts/categoryProduct.entity.js";
import { convertImagesToWebP } from "../common/services/convertToWEBPService.js";
import AuthPenjual from "../authPenjual/authPenjual.entity.js";
import KurirPenjual from "../kurirPenjual/kurirPenjual.entity.js";

class ProductService {
  constructor() {
    this.productRepository = Product;
    this.ulasanProductRepository = UlasanProduct;
  }

  // Get all products with optional filters and associations
  // Get all products with optional filters and associations
  async getProducts(options = {}) {
    try {
      const { category, subcategory, tipe, limit, page, toko } = options;

      const whereClause = {
        isAvailable: true,
        // Apply filters using the `$` notation to reference the `name` fields in associated models
        ...(category && { "$JenisProduct.name$": category }), // Filter by `JenisProduct.name`
        ...(subcategory && { "$SubCategoryProduct.name$": subcategory }), // Filter by `SubCategoryProduct.name`
        ...(tipe && { "$JenisProduct.name$": tipe }), // Filter by `JenisProduct.name` for type
        ...(toko && { "$penjual.id$": toko }), // Filter by `JenisProduct.name` for type
      };

      const data = await this.productRepository.findAll({
        attributes: ["id", "name", "picture", "condition", "price", "discount"],
        include: [
          { model: JenisProduct, attributes: ["id", "name"] }, // Assuming the alias is 'jenisProduct'
          { model: SubCategoryProduct, attributes: ["id", "name"] },
          { model: User, as: "penjual", attributes: ["id", "username"] }, // Assuming 'penjual' is the alias for the User model
        ],
        where: whereClause,
        // Pagination options
        limit: limit ? parseInt(limit) : 10, // Default to 10 if limit is not provided
        offset: page && limit ? (parseInt(page) - 1) * parseInt(limit) : 0,
      });

      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  // Get product by id
  // Get product by id
  async getProductById(id) {
    const product = await this.productRepository.findByPk(id, {
      attributes: ["id", "name", "picture", "condition", "garansi", "description", "price", "isAvailable", "discount", "weight", "volumePanjang", "volumeLebar", "volumeTinggi"],
      include: [
        { model: JenisProduct, attributes: ["id", "name"] },
        { model: SubCategoryProduct, attributes: ["id", "name"] },
        {
          model: User,
          as: "penjual",
          attributes: ["username"],
          include: [
            {
              model: AuthPenjual,
              attributes: ["alamat", "kodePos"],
              include: [{ model: KurirPenjual, attributes: ["id", "layananKurirId", "layananKurirServiceId"] }],
            },
          ],
        },
        { model: UlasanProduct, include: [{ model: User, attributes: ["username"] }] }, // Ensure alias matches the defined relationship
      ],
      // raw: true,
      nest: true, // This helps in getting nested results
    });

    if (!product) {
      throw new NotFoundException("Product not found");
    }

    return product; // Return the product object with associated ulasan
  }

  // Create a new product
  async createProduct(productData, files) {
    let uploadedImageUrls = [];
    try {
      console.log("Files received:", files);

      if (files) {
        const isValidImage = files.every((file) => file.mimetype.startsWith("image/"));
        if (!isValidImage) throw new Error("Invalid file type. Only images are allowed.");

        const processedFiles = files.map((file) => ({
          originalname: `${file.originalname}_${Date.now()}`,
          size: file.size,
          mimetype: file.mimetype,
          buffer: file.buffer,
        }));

        const convertedFiles = await convertImagesToWebP(processedFiles);
        console.log("Converted files:", convertedFiles);

        uploadedImageUrls = await Promise.all(
          convertedFiles.map(async (file) => {
            const uploaded = await FBuploadFilesPicture([file], "product");
            return uploaded[0];
          })
        );
      }

      productData.picture = uploadedImageUrls;
      return await this.productRepository.create(productData);
    } catch (error) {
      console.error("Failed to create product:", error.message);
      if (uploadedImageUrls.length > 0) {
        await FBdeleteFilesPicture(uploadedImageUrls.map((file) => file.key));
      }
      throw new Error("Failed to create product");
    }
  }

  // Update a product by id
  async updateProduct(id, productData) {
    console.log(productData);

    await this.productRepository.update(productData, { where: { id } });
    return await this.productRepository.findByPk(id, {
      include: [
        { model: JenisProduct, attributes: ["id", "name"] },
        { model: SubCategoryProduct, attributes: ["id", "name"] },
        { model: User, as: "penjual", attributes: ["id", "username"] },
      ],
    });
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
