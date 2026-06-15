import express from "express";
import { authMiddleware } from "../Middleware/authMiddleware.js";
import {
  makePayment,
  getPaymentByOrder,
} from "../Controllers/paymentControllers.js";

const paymentRouter = express.Router();

paymentRouter.post("/", authMiddleware, makePayment);
paymentRouter.get("/:orderid", authMiddleware, getPaymentByOrder);

export { paymentRouter };
