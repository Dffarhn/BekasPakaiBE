import ResponseSuccess from "../utils/ResponseSuccess.js";

const ResponseAPI = (res, statusCode, message, data) => {
  const response = new ResponseSuccess(statusCode, message, data);
  return res.status(statusCode).json(response);
};

export default ResponseAPI;
