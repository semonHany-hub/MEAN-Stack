import express from "express";
import {
  addUser,
  deleteUser,
  getUsers,
  getUser,
  signIn,
  updateUser,
} from "./users.controller.js";
import { verifyToken } from "../../middlewares/verifyToken.js";
import { verifyAdminRole } from "../../middlewares/verifyAdminRole.js";

export const usersRoutes = express.Router();

usersRoutes.get("/users", verifyToken, verifyAdminRole, getUsers);

usersRoutes.get("/user", verifyToken, getUser);

// usersRoutes.post("/user", verifyToken, verifyAdminRole, checkEmail, addUser);

usersRoutes.post("/signUp", addUser);

usersRoutes.post("/signIn", signIn);

usersRoutes.put("/user/:id", verifyToken, verifyAdminRole, updateUser); //:id make this id dynamic with its all possible values

usersRoutes.delete("/user/:id", verifyToken, verifyAdminRole, deleteUser);

//call for the functions here must be a reference (without brackets).
