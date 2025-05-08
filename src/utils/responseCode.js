const SuccessResponse = (res, statusCode, message, data) => {
  return res.status(statusCode).json({
    status: "success",
    message: message,
    data: data,
  });
};

const ErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({
    status: "error",
    message: message,
  });
};

module.exports = { SuccessResponse, ErrorResponse };
