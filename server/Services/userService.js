import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../Errors/AppError.js";
import { generateToken } from "../Utils/generateToken.js";
import { findUserByEmail, createUser } from "../Models/userModel.js";

async function executeRegistration(username, email, password) {
  const existingUser = await findUserByEmail(email);
  if (existingUser.length > 0) {
    throw new AppError("User already exists", StatusCodes.BAD_REQUEST);
  }

  if (password.length < 6) {
    throw new AppError(
      "Password must be at least 6 characters",
      StatusCodes.BAD_REQUEST,
    );
  }

  let role = "user";
  if (email === "endrishussien313@gmail.com") {
    role = "admin";
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  await createUser(username, email, hashedPassword, role);
  return { message: "User registered successfully" };
}

async function executeLogin(email, password) {
  const user = await findUserByEmail(email);
  if (user.length === 0) {
    throw new AppError("Invalid credentials", StatusCodes.BAD_REQUEST);
  }

  const isMatch = await bcrypt.compare(password, user[0].password);
  if (!isMatch) {
    throw new AppError("Invalid credentials", StatusCodes.BAD_REQUEST);
  }

  const token = generateToken({
    userid: user[0].userid,
    username: user[0].username,
    role: user[0].role,
  });

  return {
    message: "Login successful",
    token,
    user: {
      userid: user[0].userid,
      username: user[0].username,
      role: user[0].role,
    },
  };
}

export { executeRegistration, executeLogin };
