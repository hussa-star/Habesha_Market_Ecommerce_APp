import { StatusCodes } from "http-status-codes";
import { AppError } from "../Errors/AppError.js";
import {
  findProductByTitle,
  findProductById,
  insertProduct,
  queryAllProducts,
  updateProductDetails,
  deleteProductById,
} from "../Models/productModel.js";

async function addProduct(title, description, price, image, stock) {
  const existing = await findProductByTitle(title);
  if (existing.length > 0) {
    throw new AppError("Product already exists", StatusCodes.BAD_REQUEST);
  }

  const finalStock = stock || 0;
  await insertProduct(title, description, price, image, finalStock);
  return { message: "Product created successfully" };
}

async function fetchProducts() {
  const products = await queryAllProducts();
  return { products };
}

async function fetchSingleProduct(id) {
  const product = await findProductById(id);
  if (product.length === 0) {
    throw new AppError("Product not found", StatusCodes.NOT_FOUND);
  }
  return { product: product[0] };
}

async function modifyProduct(id, title, price, description, stock) {
  const product = await findProductById(id);
  if (product.length === 0) {
    throw new AppError("Product not found", StatusCodes.NOT_FOUND);
  }

  await updateProductDetails(id, title, price, description, stock);
  return { message: "Product updated successfully" };
}

async function removeProduct(id) {
  const product = await findProductById(id);
  if (product.length === 0) {
    throw new AppError("Product not found", StatusCodes.NOT_FOUND);
  }

  await deleteProductById(id);
  return { message: "Product deleted successfully" };
}

export {
  addProduct,
  fetchProducts,
  fetchSingleProduct,
  modifyProduct,
  removeProduct,
};
