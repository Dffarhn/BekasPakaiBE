import { DataTypes, Model } from "sequelize";
import sequelize from "../database/config.database.js"; // Adjust the path to your
import User from "../user/user.entity.js"; // Make sure you adjust the path

class ChatRoom extends Model {}

ChatRoom.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: "ChatRoom",
    tableName: "chat_room",
  }
);

// Define the associations with alias to avoid conflicts
// ChatRoom.belongsTo(User, {
//   foreignKey: "sellerId",
//   as: "seller",
//   onDelete: "cascade",
//   onUpdate: "cascade",
// });

// ChatRoom.belongsTo(User, {
//   foreignKey: "buyerId",
//   as: "buyer",
//   onDelete: "cascade",
//   onUpdate: "cascade",
// });

export default ChatRoom;
