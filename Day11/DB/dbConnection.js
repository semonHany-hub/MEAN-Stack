import mongoose from "mongoose";

export const dbConnection = mongoose
  .connect("mongodb://localhost:27017/NTI")
  .then(() => {
    console.log("mongoDB connected!");
  })
  .catch((error) => console.error(error)); //NTI here is a database, and this string represent URI(universal resource identifier)
