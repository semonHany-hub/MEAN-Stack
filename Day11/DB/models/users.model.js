import { Schema } from "mongoose";
import mongoose, { model } from "mongoose"; //{model} here is a destruction from the object mongoose

const usersSchema = new Schema(
  {
    name: String,
    age: Number,
    email: String,
    password: String,
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const usersModel = model("users", usersSchema); //create a collection named "users"
