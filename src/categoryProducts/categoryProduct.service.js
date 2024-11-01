import SubCategoryProduct from "../subCategoryProduct/subCategoryProduct.entity.js";
import CategoryProduct from "./categoryProduct.entity.js";

class CategoryProductService {
    constructor() {
        this.categoryProductRepository = CategoryProduct;
    }

    async getCategoryProduct(options = {}) {
        try {
            const data = await this.categoryProductRepository.findAll({ include: [
                {
                  model: SubCategoryProduct,
                  as: 'subCategories', // This alias must match the association alias
                },
              ],});// select a.* b.* from a, left join b where a.sub = b.id, 
            return data
        } catch (error) {
            console.error("Error in getAll:", error.message); // Log the error for debuggin
            throw new Error("Failed to fetch category product data");
        }
    }

    async getOnecategoryProduct(id) {
        try {
            const product = await this.categoryProductRepository.findByPk(id,{ include: [
                {
                  model: SubCategoryProduct,
                  as: 'subCategories', // This alias must match the association alias
                },
              ],});
            if (!product) throw new Error("category Product not found");
            return product;
        } catch (error) {
            throw new Error("Failed to fetch category product data");
        }
    }

    async createCategoryProduct(categoryProductData) {
        try {
            const newProduct = await this.categoryProductRepository.create(categoryProductData);
            return { createdAt: newProduct.getDataValue("createdAt") };
        } catch (error) {
            throw new Error("Failed to create category product");
        }
    }

    async updateCategoryProduct(id, categoryProductData) {
        try {
            await this.categoryProductRepository.update(categoryProductData, { where: { id } });
            return await this.categoryProductRepository.findByPk(id);
        } catch (error) {
            throw new Error("Failed to update category product");
        }
    }

    async deletCategoryProduct(id) {
        try {
            const result = await this.categoryProductRepository.destroy({ where: { id } });
            return result === 1; // Returns true if the product was deleted
        } catch (error) {
            throw new Error("Failed to delete category product");
        }
    }
}

export default new CategoryProductService();
