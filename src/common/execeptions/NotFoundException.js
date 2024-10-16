// exceptions/NotFoundException.js
import HttpException from "./httpExceptions.js";

class NotFoundException extends HttpException {
  constructor(message = "Not Found", data = null) {
    super(message, 404, data);
  }
}

export default NotFoundException;
