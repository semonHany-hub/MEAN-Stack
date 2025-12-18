import mongoose, { Schema, model } from "mongoose";

const productsSchema = new Schema(
  {
    category: String,
    products: [
      {
        title: String,
        price: Number,
        image: String,
        description: String,
      },
    ],
  },
  {
    timestamps: true, //it automatically adds createdAt and updatedAt fields to your documents
    versionKey: false,
  }
);

export const productsModel = model("products", productsSchema);
