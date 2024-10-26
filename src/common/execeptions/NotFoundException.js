// exceptions/NotFoundException.js
import HttpException from "./HttpExceptions.js";

class NotFoundException extends HttpException {
  constructor(message = "Not Found", data = null) {
    super(message, 404, data);
  }
}

//made new function


export default NotFoundException;
