class ResponseSuccess {
    constructor(statusCode, message, data) {
      this.statusCode = statusCode;
      this.message = message;
      this.data = data;
      this.accessAt = new Date().toISOString(); // Current timestamp
    }
  }
  
  export default ResponseSuccess;
  