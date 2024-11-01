// src/services/chat.service.js

import ChatRoom from "../ChatRooms/chatRoom.entity.js";
import Chat from "./chat.entity.js";

class ChatService {
  constructor() {
    this.chatRepository = Chat;
    this.roomChatRepository = ChatRoom;
  }
  // Method to create a chat message
  async createChat({ chatText, roomId, senderId }) {
    try {
      // Validate input
      if (!chatText || !roomId || !senderId) {
        throw new Error("Chat text, room ID, and sender ID are required.");
      }

      // Check if the chat room exists
      const chatRoom = await this.roomChatRepository.findByPk(roomId);
      if (!chatRoom) {
        throw new Error("Chat room not found.");
      }

      // Create a new chat message
      const chatMessage = await this.chatRepository.create({
        chatText,
        roomId,
        senderId,
      });

      return chatMessage; // Return the created chat message
    } catch (error) {
      console.error("Error in createChat:", error.message);
      throw new Error("Failed to create chat message");
    }
  }

  async getChatHistory(roomId, limit = 50, offset = 0) {
    try {
      const messages = await this.chatRepository.findAll({
        where: { roomId },
        order: [['createdAt', 'ASC']],
        limit,
        offset,
      });
      return messages;
    } catch (error) {
      console.error("Error in getChatHistory:", error.message);
      throw new Error("Failed to fetch chat history");
    }
  }
  
}

export default new ChatService();
