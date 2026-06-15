import express from "express";
import { authMiddleware } from "../Middleware/authMiddleware.js";
import { isAdmin } from "../Middleware/isAdmin.js";
import {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../Controllers/productControllers.js";

const productRouter = express.Router();

productRouter.post("/", authMiddleware, isAdmin, createProduct);
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getSingleProduct);
productRouter.put("/:id", authMiddleware, isAdmin, updateProduct);
productRouter.delete("/:id", authMiddleware, isAdmin, deleteProduct);

export { productRouter };
