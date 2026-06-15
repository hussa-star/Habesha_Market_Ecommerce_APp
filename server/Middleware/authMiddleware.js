import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../Errors/AppError.js";

/*
=================================
AUTH MIDDLEWARE
=================================
*/
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError("No token provided", StatusCodes.UNAUTHORIZED);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      userid: decoded.userid,
      username: decoded.username,
      role: decoded.role,
    };
    next();
  } catch (error) {
    throw new AppError("Invalid or expired token", StatusCodes.UNAUTHORIZED);
  }
}

export { authMiddleware };
