// STANDARDIZED RESPONSE UTILITY

function sendResponse(res, statusCode, data) {
  return res.status(statusCode).json(data);
}

export { sendResponse };
