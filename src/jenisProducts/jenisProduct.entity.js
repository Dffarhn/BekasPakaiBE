import { DataTypes, Model } from "sequelize";
import sequelize from '../database/config.database.js';
class JenisProduct extends Model{}

JenisProduct.init({
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    name:{

        type: DataTypes.UUID,
        allowNullL:false

    }
},{
    sequelize,
    modelName:"JenisProduct",
    tableName:"jenis_product"
})

export default JenisProduct