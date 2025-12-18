import { verifyAdminRole } from "../../middlewares/verifyAdminRole.js";
import { verifyToken } from "../../middlewares/verifyToken.js";
import {
  getCarts,
  getCart,
  addProductToCart,
  updateCart,
  deleteCart,
  createCart,
  getCartProducts,
  deleteProductFromCart,
  deleteWholeProduct,
} from "./carts.controller.js";
import express from "express";

export const cartsRoutes = express.Router();

cartsRoutes.get("/carts", verifyToken, verifyAdminRole, getCarts);

cartsRoutes.get("/cart", verifyToken, getCart);

cartsRoutes.get("/cart/products", verifyToken, getCartProducts);

cartsRoutes.post("/cart/:id", verifyToken, addProductToCart);

cartsRoutes.post("/cart", verifyToken, verifyAdminRole, createCart);

cartsRoutes.put("/cart", verifyToken, verifyAdminRole, updateCart);

cartsRoutes.delete("/cart", verifyToken, verifyAdminRole, deleteCart);

cartsRoutes.delete("/cart/wholeProduct/:id", verifyToken, deleteWholeProduct);

cartsRoutes.delete("/cart/:id", verifyToken, deleteProductFromCart);
