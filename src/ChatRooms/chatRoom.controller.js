import HttpStatus from "../common/utils/HttpStatus.js";
import ResponseSuccess from "../common/utils/ResponseSuccess.js";
import chatRoomService from "./chatRoom.service.js";

class ChatRoomController {
  async getAllChatRoom(req, res, next) {
    try {

      const userId = req.user.id;
      console.log(userId)

      const data = await chatRoomService.getAllRoomUser(userId);

      const response = new ResponseSuccess(HttpStatus.OK, "Successfully Get All Room User", { data });
      res.status(response.statusCode).json(response);
    } catch (error) {
        next(error)
    }
  }
}

export default new ChatRoomController()
