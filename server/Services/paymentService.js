import { StatusCodes } from "http-status-codes";
import { AppError } from "../Errors/AppError.js";
import { dbConnection } from "../Config/DbConfig.js";
import { stripe } from "../Utils/stripe.js";

async function processPayment(userid, orderid, payment_method) {
  // 1. CHECK ORDER
  const [order] = await dbConnection.query(
    `SELECT * FROM orders WHERE orderid = ? AND userid = ?`,
    [orderid, userid],
  );

  if (order.length === 0) {
    throw new AppError("Order not found", StatusCodes.NOT_FOUND);
  }

  // =================================
  // STRIPE PAYMENT FLOW
  // =================================
  if (payment_method === "stripe") {
    const [items] = await dbConnection.query(
      `SELECT oi.quantity, oi.price, p.title FROM order_items oi JOIN products p ON oi.productid = p.productid WHERE oi.orderid = ?`,
      [orderid],
    );

    const lineItems = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.title },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
      metadata: { orderid: orderid, userid: userid },
    });

    await dbConnection.query(
      `INSERT INTO payments (orderid, amount, payment_method, payment_status) VALUES (?, ?, ?, ?)`,
      [orderid, order[0].total_price, "stripe", "pending"],
    );

    return { url: session.url };
  }

  // =================================
  // TELEBIRR FLOW (PLACEHOLDER)
  // =================================
  if (payment_method === "telebirr") {
    await dbConnection.query(
      `INSERT INTO payments (orderid, amount, payment_method, payment_status) VALUES (?, ?, ?, ?)`,
      [orderid, order[0].total_price, "telebirr", "pending"],
    );

    return {
      message: "Telebirr payment initiated",
      redirect: "/success?method=telebirr",
    };
  }

  throw new AppError("Invalid payment method", StatusCodes.BAD_REQUEST);
}

async function fetchPaymentRecord(orderid, userid) {
  const [payment] = await dbConnection.query(
    `SELECT * FROM payments WHERE orderid = ? AND userid = ?`,
    [orderid, userid],
  );

  if (payment.length === 0) {
    throw new AppError("Payment not found", StatusCodes.NOT_FOUND);
  }

  return { payment: payment[0] };
}

export { processPayment, fetchPaymentRecord };
