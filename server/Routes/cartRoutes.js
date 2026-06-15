import express from "express";
import { authMiddleware } from "../Middleware/authMiddleware.js";
import {
  addToCart,
  getCartItems,
  updateCartItem,
  removeCartItem,
} from "../Controllers/cartControllers.js";

const cartRouter = express.Router();

cartRouter.post("/", authMiddleware, addToCart);
cartRouter.get("/", authMiddleware, getCartItems);
cartRouter.put("/:id", authMiddleware, updateCartItem);
cartRouter.delete("/:id", authMiddleware, removeCartItem);

export { cartRouter };
