import { DataTypes, Model } from "sequelize";
import ChatRoom from "../ChatRooms/chatRoom.entity.js";
import User from "../user/user.entity.js";
import sequelize from "../database/config.database.js"; // Adjust the path to your Sequelize instance
class Chat extends Model{}

Chat.init({
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    chatText:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    roomId:{
        type:DataTypes.UUID,
        references:{
            model: ChatRoom,
            key:'id'
        }
    },
    senderId:{
        type:DataTypes.UUID,
        references:{
            model: User,
            key:"id"
        }
    }

},{
    sequelize,
    modelName:"Chat",
    tableName:"Chat"
})

export default Chat