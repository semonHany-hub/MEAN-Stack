import mongoose, { Schema, model } from "mongoose";

const postsSchema = new Schema(
  {
    title: String,
    likes: Number,
    description: String,
    createdBy: { type: mongoose.Types.ObjectId, ref: "users" }, //this type means the whole object of user
  },
  {
    timestamps: true, //it automatically adds createdAt and updatedAt fields to your documents
    versionKey: false,
  }
);

export const postsModel = model("posts", postsSchema);
