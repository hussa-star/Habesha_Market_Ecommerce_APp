import express from "express";
import { authMiddleware } from "../Middleware/authMiddleware.js";
import {
  createOrder,
  getUserOrders,
  getSingleOrder,
} from "../Controllers/orderControllers.js";

const orderRouter = express.Router();

orderRouter.post("/", authMiddleware, createOrder);
orderRouter.get("/", authMiddleware, getUserOrders);
orderRouter.get("/:id", authMiddleware, getSingleOrder);

export { orderRouter };
