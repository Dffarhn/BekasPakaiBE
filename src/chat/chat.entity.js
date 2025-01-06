import { DataTypes, Model } from "sequelize";
import ChatRoom from "../ChatRooms/chatRoom.entity.js";
import User from "../user/user.entity.js";
import sequelize from "../database/config.database.js"; // Adjust the path to your Sequelize instance
class Chat extends Model {}

Chat.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    chatText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Chat",
    tableName: "chat",
  }
);

// Chat.belongsTo(ChatRoom, { foreignKey: { name: "roomId" }, onDelete: "cascade", onUpdate: "cascade" });
// Chat.belongsTo(User, { foreignKey: { name: "senderId" }, onDelete: "cascade", onUpdate: "cascade" });

export default Chat;
