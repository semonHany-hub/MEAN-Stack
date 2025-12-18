import express from "express";
import {
  addproduct,
  deleteproduct,
  getproducts,
  getproduct,
  updateproduct,
  deletecategory,
  addcategory,
} from "./products.controller.js";
import { verifyToken } from "../../middlewares/verifyToken.js";
import { verifyAdminRole } from "../../middlewares/verifyAdminRole.js";

export const productsRoutes = express.Router();

productsRoutes.get("/products", getproducts);

productsRoutes.get("/product/:id", verifyToken, verifyAdminRole, getproduct);

productsRoutes.post("/product", verifyToken, verifyAdminRole, addproduct);

productsRoutes.post("/category", verifyToken, verifyAdminRole, addcategory);

productsRoutes.put("/product/:id", verifyToken, verifyAdminRole, updateproduct);

productsRoutes.delete(
  "/product/:id",
  verifyToken,
  verifyAdminRole,
  deleteproduct
);

productsRoutes.delete(
  "/category/:name",
  verifyToken,
  verifyAdminRole,
  deletecategory
);
