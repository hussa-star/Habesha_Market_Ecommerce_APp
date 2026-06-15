import { StatusCodes } from "http-status-codes";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { sendResponse } from "../Utils/sendResponse.js";
import {
  processPayment,
  fetchPaymentRecord,
} from "../Services/paymentService.js";

const makePayment = asyncHandler(async (req, res) => {
  const userid = req.user.userid;
  const { orderid, payment_method } = req.body;

  const result = await processPayment(userid, orderid, payment_method);
  return sendResponse(res, StatusCodes.OK, result);
});

const getPaymentByOrder = asyncHandler(async (req, res) => {
  const { orderid } = req.params;
  const userid = req.user.userid;

  const result = await fetchPaymentRecord(orderid, userid);
  return sendResponse(res, StatusCodes.OK, result);
});

export { makePayment, getPaymentByOrder };
