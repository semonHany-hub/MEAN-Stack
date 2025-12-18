let posts = [
  { id: 1, Uid: 1, content: "first post for u1" },
  { id: 2, Uid: 1, content: "second post for u1" },
  { id: 3, Uid: 2, content: "first post for u2" },
  { id: 4, Uid: 2, content: "second post for u2" },
  { id: 5, Uid: 3, content: "first post for u3" },
  { id: 6, Uid: 3, content: "second post for u3" },
];

import express from "express";
import { dbConnection } from "./DB/dbConnection.js";
import { usersRoutes } from "./src/modules/users/users.routes.js";
import { postsRoutes } from "./src/modules/posts/posts.routes.js";

dbConnection; //connect to mongoDB

// const express = require("express");  //in ES5
const app = express(); //create express server
app.use(express.json()); //use its passed parameter over the whole application
//the middle parameter 'express.json()' acts as a middle-ware between the client and back-end that automatically change the type between buffer(string) and json.

//users CRUD
app.use(usersRoutes);

//posts CRUD
app.use(postsRoutes);

// app.get("/posts", async (req, res) => {
//   res.status(200).json(posts);
// });

// app.post("/post", express.json(), (req, res) => {
//   let foundedPost = posts.find((post) => {
//     req.body.id = post.id;
//     return post == req.body;
//   });
//   if (foundedPost)
//     res.json({ message: `post with id ${foundedPost.id} already exist!` });
//   else {
//     req.body.id = posts[posts.length - 1].id + 1;
//     posts.push(req.body);
//     res.end("post added successfully!");
//   }
// });

// app.put("/post/:id", express.json(), (req, res) => {
//   let foundedPost = posts.find((post) => post.id == req.params.id); //params property stand for query parameters
//   if (foundedPost) {
//     // foundedPost = req.body; //this reference copy won't update the properties values
//     Object.assign(foundedPost, req.body); //the object is a reference copy so any change in its properties will be updated in the actual array, unlike the shallow copy of a simple variable
//     res.json({
//       message: "post updated successfully!",
//       newpostinfo: foundedPost,
//     });
//   } else {
//     res.statusCode = 404;
//     res.end("this post isn't exist!");
//   }
// });

// app.delete("/post/:id", express.json(), (req, res) => {
//   posts = posts.filter((post) => post.id != req.params.id);
//   res.json({ message: "posts after deletion: ", posts });
// });

app.listen(3000, () => {
  console.log("server running!");
});

//String must be with first letter capital as they are classes in js not familiar types indenfiers like in ts.
