import Role from "./role.entity.js";

class RolesService{
    constructor(){
        this.roleRepository = Role
    }

    async getAll(){

        return this.roleRepository.findAll()
        
    }

    async create(name){
        const saveRole = await this.roleRepository.create({name: name})
        return {createdAt: saveRole.getDataValue('createdAt')}
    }
}

export default new RolesService();