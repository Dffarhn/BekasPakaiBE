// exceptions/BadRequestException.js
import HttpException from "./httpExceptions.js";

class BadRequestException extends HttpException {
  constructor(message = "Bad Request", data = null) {
    super(message, 400, data);
  }
}

export default BadRequestException;
