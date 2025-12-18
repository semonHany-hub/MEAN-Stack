import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  let token = req.headers.token;
  jwt.verify(token, "key", (err, decoded) => {
    if (err)
      return res.status(400).json({ message: "error: token is not valid!" });
    else {
      req.users = decoded; //users here isn't a predefined property in req object, it created manual here.
      next();
    }
  });
};
