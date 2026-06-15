import { StatusCodes } from "http-status-codes";

/*
=================================
FALLBACK NOT FOUND MIDDLEWARE
=================================
*/
function notFoundMiddleware(req, res, next) {
  return res.status(StatusCodes.NOT_FOUND).json({
    message: "Route not found",
  });
}

export { notFoundMiddleware };
