import { StatusCodes } from "http-status-codes";
import { AppError } from "../Errors/AppError.js";
import {
  getCartItemsWithPrice,
  insertOrder,
  insertOrderItem,
  decrementProductStock,
  clearUserCart,
  findOrdersByUser,
  findOrderByIdAndUser,
  findOrderItemsByOrderId,
} from "../Models/orderModel.js";

async function processCheckout(userid) {
  const cartItems = await getCartItemsWithPrice(userid);
  if (cartItems.length === 0) {
    throw new AppError("Cart is empty", StatusCodes.BAD_REQUEST);
  }

  let total = 0;
  cartItems.forEach((item) => {
    total += item.price * item.quantity;
  });

  const orderid = await insertOrder(userid, total);

  for (const item of cartItems) {
    await insertOrderItem(orderid, item.productid, item.quantity, item.price);
    await decrementProductStock(item.productid, item.quantity);
  }

  await clearUserCart(userid);

  return { message: "Order placed successfully", orderid, total };
}

async function fetchUserOrders(userid) {
  const orders = await findOrdersByUser(userid);
  return { orders };
}

async function fetchOrderDetails(id, userid) {
  const order = await findOrderByIdAndUser(id, userid);
  if (order.length === 0) {
    throw new AppError("Order not found", StatusCodes.NOT_FOUND);
  }

  const items = await findOrderItemsByOrderId(id);
  return { order: order[0], items };
}

export { processCheckout, fetchUserOrders, fetchOrderDetails };
