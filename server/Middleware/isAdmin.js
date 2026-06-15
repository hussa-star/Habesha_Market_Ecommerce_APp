import { StatusCodes } from "http-status-codes";
import { AppError } from "../Errors/AppError.js";

/*
=================================
ADMIN PROTECTION MIDDLEWARE
=================================
*/
function isAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    throw new AppError("Access denied. Admin only.", StatusCodes.FORBIDDEN);
  }
  next();
}

export { isAdmin };
