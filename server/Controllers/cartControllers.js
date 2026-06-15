import { StatusCodes } from "http-status-codes";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { sendResponse } from "../Utils/sendResponse.js";
import { AppError } from "../Errors/AppError.js";
import {
  addItemsToCart,
  fetchCart,
  modifyCartItem,
  removeCartItem,
} from "../Services/cartService.js";

const addToCart = asyncHandler(async (req, res) => {
  const { productid, quantity } = req.body;
  const userid = req.user.userid;

  if (!productid) {
    throw new AppError("Product ID is required", StatusCodes.BAD_REQUEST);
  }

  const result = await addItemsToCart(userid, productid, quantity);
  return sendResponse(res, StatusCodes.CREATED, result);
});

const getCartItems = asyncHandler(async (req, res) => {
  const userid = req.user.userid;
  const result = await fetchCart(userid);
  return sendResponse(res, StatusCodes.OK, result);
});

const updateCartItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const userid = req.user.userid;

  const result = await modifyCartItem(id, quantity, userid);
  return sendResponse(res, StatusCodes.OK, result);
});

const removeCartItemItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userid = req.user.userid;

  const result = await removeCartItem(id, userid);
  return sendResponse(res, StatusCodes.OK, result);
});

export {
  addToCart,
  getCartItems,
  updateCartItem,
  removeCartItemItem as removeCartItem,
};
