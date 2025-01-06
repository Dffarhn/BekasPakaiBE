// src/services/chat.service.js
import { Op } from "sequelize";
import ChatRoom from "./chatRoom.entity.js";
import User from "../user/user.entity.js";

class RoomChatService {
  constructor() {
    this.chatRoomRepository = ChatRoom;
  }
  async findOrCreateChatRoom(buyerId, sellerId) {
    // Try to find an existing chat room
    const existingRoom = await this.chatRoomRepository.findOne({
      where: {
        [Op.or]: [
          { sellerId, buyerId },
          { sellerId: buyerId, buyerId: sellerId },
        ],
      },
    });

    // If no room found, create a new one
    if (existingRoom) {
      return existingRoom;
    }

    // Create a new chat room if it doesn't exist
    return await ChatRoom.create({ sellerId, buyerId });
  }

  async getAllRoomUser(userId) {
    // Fetch all chat rooms where the user is either the seller or the buyer
    const existingRooms = await this.chatRoomRepository.findAll({
      where: {
        [Op.or]: [
          { sellerId: userId }, // User is the seller
          { buyerId: userId },  // User is the buyer
        ],
      },
      include:[
        {model:User, as:"seller", attributes:["username"] },
        {model:User, as:"buyer", attributes:["username"] }
      ]
    });
  
    return existingRooms; // Return the list of chat rooms
  }
}

export default new RoomChatService();
