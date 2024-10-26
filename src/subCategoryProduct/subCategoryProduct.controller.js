import HttpStatus from "../common/utils/HttpStatus.js";
import ResponseSuccess from "../common/utils/ResponseSuccess.js";
import subCategoryProductService from "./subCategoryProduct.service.js";

class SubCategoryProductController {

    async getAll(req, res, next) {
        try {
            console.log("masuk")
            const result = await subCategoryProductService.getCategoryProduct();
            const response = new ResponseSuccess(HttpStatus.OK, "Successfully Get All Jenis Product", { result });
            res.status(response.statusCode).json(response);
        } catch (error) {
            console.error(error.message)
            next(error);
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params; // Extract id from params
            const result = await subCategoryProductService.getOnecategoryProduct(id);
            const response = new ResponseSuccess(HttpStatus.OK, "Successfully Get One Jenis Product", { result });
            res.status(response.statusCode).json(response);
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const result = await subCategoryProductService.createCategoryProduct(req.body); // Create product
            const response = new ResponseSuccess(HttpStatus.CREATED, "Successfully Created One Jenis Product", { result });
            res.status(response.statusCode).json(response);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params; // Extract id from params
            const result = await subCategoryProductService.updateCategoryProduct(id, req.body);
            const response = new ResponseSuccess(HttpStatus.OK, "Successfully Updated Jenis Product", { result });
            res.status(response.statusCode).json(response);
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params; // Extract id from params
            const isDeleted = await subCategoryProductService.deletCategoryProduct(id);
            const message = isDeleted ? "Successfully Deleted Jenis Product" : "Jenis Product Not Found";
            const response = new ResponseSuccess(HttpStatus.OK, message);
            res.status(response.statusCode).json(response);
        } catch (error) {
            next(error);
        }
    }
}

export default new SubCategoryProductController();
