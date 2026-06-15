import express from "express";
import { authMiddleware } from "../Middleware/authMiddleware.js";
import {
  registerUser,
  loginUser,
  checkUser,
} from "../Controllers/userControllers.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/check", authMiddleware, checkUser);

export { userRouter };
