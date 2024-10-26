import { where } from "sequelize";
import OfferedProduct from "./offeredProduct.entity";

class OfferedProductService {
    constructor() {
        this.offeredProductRepository = OfferedProduct;
    }


    async getOneOfferedProduct(id) {
        try {
            const product = await this.offeredProductRepository.findByPk(id);
            if (!product) throw new Error("category Product not found");
            return product;
        } catch (error) {
            throw new Error("Failed to fetch category product data");
        }
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
            return await this.getOnecategoryProduct(id)
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
