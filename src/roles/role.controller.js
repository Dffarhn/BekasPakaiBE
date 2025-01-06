import HttpStatus from "../common/utils/HttpStatus.js";
import ResponseSuccess from "../common/utils/ResponseSuccess.js";
import roleService from "./role.service.js";

class RoleController {

    async getAll(req, res, next) {
        try {
            const roles = await roleService.getAll();
            const response = new ResponseSuccess(HttpStatus.OK, "Successfully Get All Role", { roles });
            res.status(response.statusCode).json(response);
        } catch (error) {
            console.error(error.message)
            next(error);
        }
    }

    // async getOne(req, res, next) {
    //     try {
    //         const { id } = req.params; // Extract id from params
    //         const result = await jenisProductService.getOneJenisProduct(id);
    //         const response = new ResponseSuccess(HttpStatus.OK, "Successfully Get One Jenis Product", { result });
    //         res.status(response.statusCode).json(response);
    //     } catch (error) {
    //         next(error);
    //     }
    // }

    async create(req, res, next) {
        try {
            const result = await roleService.create(req.body.name) // Create product
            const response = new ResponseSuccess(HttpStatus.CREATED, "Successfully Created One Role", result );
            res.status(response.statusCode).json(response);
        } catch (error) {
            console.error(error.message)
            next(error);
        }
    }

}

export default new RoleController();
