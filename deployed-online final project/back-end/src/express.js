import express from "express";
import { dbConnection } from "./DB/dbConnection.js";
import { usersRoutes } from "./node-src/modules/users/users.routes.js";
import { productsRoutes } from "./node-src/modules/products/products.routes.js";
import cors from "cors";
import { cartsRoutes } from "./node-src/modules/carts/carts.routes.js";

dbConnection; //connect to mongoDB

// const express = require("express");  //in ES5
const app = express(); //create express server
app.use(express.json()); //use its passed parameter over the whole application
app.use(
  cors()
  // cors({
  //   origin: "https://hotrest.netlify.app",
  //   methods: ["GET", "POST", "PUT", "DELETE"],
  //   credentials: true,
  // })
); //cors stands for(cross origin resource sharing)
//the middle parameter 'express.json()' acts as a middle-ware between the client and back-end that automatically change the type between buffer(string) and json.

//users CRUD
app.use(usersRoutes);

//products CRUD
app.use(productsRoutes);

//carts CRUD
app.use(cartsRoutes);

app.listen(process.env.PORT, () => {
  console.log("server running!");
});
