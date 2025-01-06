import SubCategoryProduct from "./subCategoryProduct.entity.js";

class SubCategoryProductService {
    constructor() {
        this.subCategoryProductRepository = SubCategoryProduct;
    }

    async getCategoryProduct(options = {}) {
        try {
            const data = await this.subCategoryProductRepository.findAll();
            return data
        } catch (error) {
            console.error("Error in getAll:", error.message); // Log the error for debuggin
            throw new Error("Failed to fetch category product data");
        }
    }

    async getOnecategoryProduct(id) {
        try {
            const product = await this.subCategoryProductRepository.findByPk(id);
            if (!product) throw new Error("category Product not found");
            return product;
        } catch (error) {
            throw new Error("Failed to fetch category product data");
        }
    }

    async createCategoryProduct(categoryProductData) {
        try {
            const newProduct = await this.subCategoryProductRepository.create(categoryProductData);
            return { createdAt: newProduct.getDataValue("createdAt") };
        } catch (error) {
            throw new Error("Failed to create category product");
        }
    }

    async updateCategoryProduct(id, subCategoryProductData) {
        try {
            await this.subCategoryProductRepository.update(subCategoryProductData, { where: { id } });
            return await this.getOnecategoryProduct(id)
        } catch (error) {
            throw new Error("Failed to update category product");
        }
    }

    async deletCategoryProduct(id) {
        try {
            const result = await this.subCategoryProductRepository.destroy({ where: { id } });
            return result === 1; // Returns true if the product was deleted
        } catch (error) {
            throw new Error("Failed to delete category product");
        }
    }
}

export default new SubCategoryProductService();
