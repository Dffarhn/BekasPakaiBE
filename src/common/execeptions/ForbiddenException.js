// exceptions/ForbiddenException.js

import HttpException from "./httpExceptions";


class ForbiddenException extends HttpException {
  constructor(message = 'Forbidden', data = null) {
    super(message, 403, data);
  }
}

export default ForbiddenException;
