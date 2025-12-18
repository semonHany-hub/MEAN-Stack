import mongoose from "mongoose";

export const dbConnection = mongoose
  .connect(process.env.MONGO_URI) //process is a property in railway server which include environment variables like MONGO_URL(mongodb atlas cluster string) uploaded into cloud
  .then(() => {
    console.log("mongoDB connected!");
  })
  .catch((error) => console.error(error)); //NTI here is a database, and this string represent URI(universal resource identifier)
