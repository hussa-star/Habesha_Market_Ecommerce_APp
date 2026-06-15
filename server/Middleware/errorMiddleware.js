import { StatusCodes } from "http-status-codes";

/*
=================================
GLOBAL ERROR HANDLER
=================================
*/
function errorMiddleware(err, req, res, next) {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || "Internal Server Error";

  console.log(err.message);

  return res.status(statusCode).json({ message });
}

export { errorMiddleware };
