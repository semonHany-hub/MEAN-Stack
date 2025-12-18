let posts = [
  { id: 1, Uid: 1, content: "first post for u1" },
  { id: 2, Uid: 1, content: "second post for u1" },
  { id: 3, Uid: 2, content: "first post for u2" },
  { id: 4, Uid: 2, content: "second post for u2" },
  { id: 5, Uid: 3, content: "first post for u3" },
  { id: 6, Uid: 3, content: "second post for u3" },
];

// const express = require("express");  //in ES5
import express from "express"; //in ES6
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());

app.get("/users", async (req, res) => {
  let users = await userModel.find(); //collection methods return promise so we used await to wait for its execution
  res.status(200).json(users);
});

app.post("/user", express.json(), async (req, res) => {
  let users = await userModel.find();
  let foundedUser;
  for (let user of users) {
    foundedUser = bcrypt.compareSync(req.body.email, user.email);
    if (foundedUser) break;
  }
  if (foundedUser)
    res.json({ message: `user with email ${req.body.email} already exist!` });
  else {
    req.body.email = bcrypt.hashSync(req.body.email, 10);
    let insertedUser = await userModel.insertOne(req.body);
    res.json({ message: "user added successfully!", insertedUser }); //the last elem in object can be without key
  }
});
//the middle parameter 'express.json()' acts as a middle-ware between the client and back-end that automatically change the type between buffer(string) and json.

app.put("/user/:email", express.json(), async (req, res) => {
  //   let users = await userModel.find();
  //   let foundedUser = users.findOne({ email: req.params.email });   //Error: users represent array not collection and doesn't has findOne()
  req.body.email = bcrypt.hashSync(req.body.email, 10);
  let foundedUser = await userModel.findOneAndUpdate(
    { email: req.params.email },
    { $set: req.body },
    { returnDocument: "after" }
  );
  if (foundedUser) {
    res.json({
      message: "user updated successfully!",
      newUserinfo: foundedUser,
    });
  } else {
    res.statusCode = 404;
    res.end("this user isn't exist!");
  }
}); //params property stand for query parameters
//:email make this email dynamic with its all possible values

app.delete("/user/:email", express.json(), async (req, res) => {
  await userModel.deleteOne({ email: bcrypt.hashSync(req.params.email, 10) });
  let users = await userModel.find();
  //   users = users.filter((user) => user.email != req.params.email);  //this command acts with shallow copied array then it won't update in database
  res.json({ message: "users after deletion: ", users });
});

//posts CRUD
app.get("/posts", async (req, res) => {
  res.status(200).json(posts);
});

app.post("/post", express.json(), (req, res) => {
  let foundedPost = posts.find((post) => {
    req.body.id = post.id;
    return post == req.body;
  });
  if (foundedPost)
    res.json({ message: `post with id ${foundedPost.id} already exist!` });
  else {
    req.body.id = posts[posts.length - 1].id + 1;
    posts.push(req.body);
    res.end("post added successfully!");
  }
});

app.put("/post/:id", express.json(), (req, res) => {
  let foundedPost = posts.find((post) => post.id == req.params.id);
  if (foundedPost) {
    // foundedPost = req.body; //this reference copy won't update the properties values
    Object.assign(foundedPost, req.body); //the object is a reference copy so any change in its properties will be updated in the actual array, unlike the shallow copy of a simple variable
    res.json({
      message: "post updated successfully!",
      newpostinfo: foundedPost,
    });
  } else {
    res.statusCode = 404;
    res.end("this post isn't exist!");
  }
});

app.delete("/post/:id", express.json(), (req, res) => {
  posts = posts.filter((post) => post.id != req.params.id);
  res.json({ message: "posts after deletion: ", posts });
});

app.listen(3000, () => {
  console.log("server running!");
});

//password encryption
const hashedB = bcrypt.hashSync("semon hany", 10);
console.log(hashedB);
bcrypt.compareSync("semon hany", hashedB);

import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/NTI"); //NTI here is a database, and this string represent URI(universal resource identifier)

const usersSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: { type: String, unique: true },
});
//String must be with first letter capital as they are classes in js not familiar types indenfiers like in ts.
const userModel = mongoose.model("users", usersSchema); //create a collection named "users"
