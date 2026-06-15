import { StatusCodes } from "http-status-codes";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { sendResponse } from "../Utils/sendResponse.js";
import { AppError } from "../Errors/AppError.js";
import { executeRegistration, executeLogin } from "../Services/userService.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new AppError(
      "Please provide all required fields",
      StatusCodes.BAD_REQUEST,
    );
  }

  const result = await executeRegistration(username, email, password);
  return sendResponse(res, StatusCodes.CREATED, result);
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError(
      "Please provide email and password",
      StatusCodes.BAD_REQUEST,
    );
  }

  const result = await executeLogin(email, password);
  return sendResponse(res, StatusCodes.OK, result);
});

const checkUser = asyncHandler(async (req, res) => {
  const { userid, username, role } = req.user;
  return sendResponse(res, StatusCodes.OK, {
    message: "Authorized user",
    userid,
    username,
    role,
  });
});

export { registerUser, loginUser, checkUser };
