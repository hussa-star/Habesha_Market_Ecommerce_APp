import { StatusCodes } from "http-status-codes";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { sendResponse } from "../Utils/sendResponse.js";
import {
  processCheckout,
  fetchUserOrders,
  fetchOrderDetails,
} from "../Services/orderService.js";

const createOrder = asyncHandler(async (req, res) => {
  const userid = req.user.userid;
  const result = await processCheckout(userid);
  return sendResponse(res, StatusCodes.CREATED, result);
});

const getUserOrders = asyncHandler(async (req, res) => {
  const userid = req.user.userid;
  const result = await fetchUserOrders(userid);
  return sendResponse(res, StatusCodes.OK, result);
});

const getSingleOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userid = req.user.userid;
  const result = await fetchOrderDetails(id, userid);
  return sendResponse(res, StatusCodes.OK, result);
});

export { createOrder, getUserOrders, getSingleOrder };
