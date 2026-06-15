import express from "express";
import cors from "cors";
import { dbConnection } from "./Config/DbConfig.js";

// middleware imports
import { errorMiddleware } from "./Middleware/errorMiddleware.js";
import { notFoundMiddleware } from "./Middleware/notFoundMiddleware.js";
import { authMiddleware } from "./Middleware/authMiddleware.js";

// routes imports
import { userRouter } from "./Routes/userRoutes.js";
import { productRouter } from "./Routes/productRoutes.js";
import { orderRouter } from "./Routes/orderRoutes.js";
import { paymentRouter } from "./Routes/paymentRoutes.js";
import { cartRouter } from "./Routes/cartRoutes.js";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

/*
========================
ROUTES MAPPING
========================
*/
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", authMiddleware, orderRouter);
app.use("/api/payments", authMiddleware, paymentRouter);
app.use("/api/cart", authMiddleware, cartRouter);

// error handling layers
app.use(notFoundMiddleware);
app.use(errorMiddleware);

/*
========================
START SERVER FUNCTION
========================
*/
async function startServer() {
  try {
    // test database connection
    await dbConnection.execute("SELECT 'test'");
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error.message);
  }
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

startServer();
