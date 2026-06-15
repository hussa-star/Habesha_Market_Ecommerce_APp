import { StatusCodes } from "http-status-codes";
import { AppError } from "../Errors/AppError.js";
import { findProductById } from "../Models/productModel.js";
import {
  checkItemInCart,
  updateCartQuantity,
  insertIntoCart,
  queryCartItems,
  findCartItemByIdAndUser,
  updateCartItemById,
  deleteCartItemById,
} from "../Models/cartModel.js";

async function addItemsToCart(userid, productid, quantity) {
  const product = await findProductById(productid);
  if (product.length === 0) {
    throw new AppError("Product not found", StatusCodes.NOT_FOUND);
  }

  const existing = await checkItemInCart(userid, productid);
  if (existing.length > 0) {
    await updateCartQuantity(userid, productid, quantity || 1);
    return { message: "Cart updated successfully" };
  }

  const finalQty = quantity || 1;
  await insertIntoCart(userid, productid, finalQty);
  return { message: "Product added to cart" };
}

async function fetchCart(userid) {
  const items = await queryCartItems(userid);
  return { cart: items };
}

async function modifyCartItem(id, quantity, userid) {
  if (quantity <= 0) {
    throw new AppError(
      "Quantity must be greater than 0",
      StatusCodes.BAD_REQUEST,
    );
  }

  const item = await findCartItemByIdAndUser(id, userid);
  if (item.length === 0) {
    throw new AppError("Cart item not found", StatusCodes.NOT_FOUND);
  }

  await updateCartItemById(id, quantity);
  return { message: "Cart updated" };
}

async function removeCartItem(id, userid) {
  const item = await findCartItemByIdAndUser(id, userid);
  if (item.length === 0) {
    throw new AppError("Cart item not found", StatusCodes.NOT_FOUND);
  }

  await deleteCartItemById(id);
  return { message: "Item removed from cart" };
}

export { addItemsToCart, fetchCart, modifyCartItem, removeCartItem };
