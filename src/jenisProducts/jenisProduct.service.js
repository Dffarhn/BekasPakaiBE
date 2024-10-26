import NotFoundException from "../common/execeptions/NotFoundException.js";
import JenisProduct from "./jenisProduct.entity.js";

class JenisProductService {
    constructor() {
        this.jenisProductRepository = JenisProduct;
    }

    async getJenisProduct(options = {}) {
        try {
            const data = await this.jenisProductRepository.findAll();
            return data
        } catch (error) {
            console.error("Error in getAll:", error.message); // Log the error for debuggin
            throw new Error("Failed to fetch jenis product data");
        }
    }

    async getOneJenisProduct(id) {

        const product = await this.jenisProductRepository.findByPk(id);
        if (!product){ 
            throw new NotFoundException("Jenis Product not found");
        }
        return product;
    }

    async createJenisProduct(jenisProductData) {
        try {
            const newProduct = await this.jenisProductRepository.create(jenisProductData);
            return { createdAt: newProduct.getDataValue("createdAt") };
        } catch (error) {
            throw new Error("Failed to create jenis product");
        }
    }

    async updateJenisProduct(id, jenisProductData) {
        try {
            await this.jenisProductRepository.update(jenisProductData, { where: { id } });
            return await this.jenisProductRepository.findByPk(id);
        } catch (error) {
            throw new Error("Failed to update jenis product");
        }
    }

    async deleteJenisProduct(id) {
        try {
            const result = await this.jenisProductRepository.destroy({ where: { id } });
            return result === 1; // Returns true if the product was deleted
        } catch (error) {
            throw new Error("Failed to delete jenis product");
        }
    }
}

export default new JenisProductService();
