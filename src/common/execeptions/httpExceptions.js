// exceptions/HttpException.js
class HttpException extends Error {
  constructor(message, statusCode = 500, data = null) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
  }
}

export default HttpException;
