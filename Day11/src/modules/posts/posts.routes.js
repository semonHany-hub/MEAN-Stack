import express from "express";
import {
  addPost,
  deletePost,
  getPosts,
  updatePost,
} from "./posts.controller.js";
import { verifyToken } from "../../middlewares/verifyToken.js";
import { verifyAdminRole } from "../../middlewares/verifyAdminRole.js";

export const postsRoutes = express.Router();

postsRoutes.get("/posts", verifyToken, verifyAdminRole, getPosts);

postsRoutes.post("/post", verifyToken, verifyAdminRole, addPost);

postsRoutes.put("/post/:id", verifyToken, verifyAdminRole, updatePost);

postsRoutes.delete("/post/:id", verifyToken, verifyAdminRole, deletePost);
