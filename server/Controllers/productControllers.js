import { StatusCodes } from "http-status-codes";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { sendResponse } from "../Utils/sendResponse.js";
import { AppError } from "../Errors/AppError.js";
import {
  addProduct,
  fetchProducts,
  fetchSingleProduct,
  modifyProduct,
  removeProduct,
} from "../Services/productService.js";

const createProduct = asyncHandler(async (req, res) => {
  const { title, description, price, image, stock } = req.body;

  if (!title || !price) {
    throw new AppError("Title and price are required", StatusCodes.BAD_REQUEST);
  }

  const result = await addProduct(title, description, price, image, stock);
  return sendResponse(res, StatusCodes.CREATED, result);
});

const getAllProducts = asyncHandler(async (req, res) => {
  const result = await fetchProducts();
  return sendResponse(res, StatusCodes.OK, result);
});

const getSingleProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await fetchSingleProduct(id);
  return sendResponse(res, StatusCodes.OK, result);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, price, description, stock } = req.body;
  const result = await modifyProduct(id, title, price, description, stock);
  return sendResponse(res, StatusCodes.OK, result);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await removeProduct(id);
  return sendResponse(res, StatusCodes.OK, result);
});

export {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
