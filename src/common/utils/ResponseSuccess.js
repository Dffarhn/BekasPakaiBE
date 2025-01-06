class ResponseSuccess {
  constructor(statusCode, message, data) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.accessAt = new Date().toISOString(); // Current timestamp
  }

  // Optional: add method to include additional metadata
  withMeta(meta) {
    this.meta = meta;
    return this;
  }
}

export default ResponseSuccess;
