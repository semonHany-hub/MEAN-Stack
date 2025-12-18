import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.token;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  if (!token)
    return res.status(400).json({ message: "error: token is required!" });

  jwt.verify(token, "key", (err, decoded) => {
    if (err)
      return res.status(400).json({ message: "error: token is not valid!" });

    console.log("decoded token: ", decoded);
    req.user = decoded;
    next();
  });
};
