import { usersModel } from "../../DB/models/users.model.js";
import bcrypt from "bcrypt";

export const checkEmail = async (req, res, next) => {
  let foundedUser = await usersModel.findOne({ email: req.body.email });
  if (foundedUser)
    return res
      .status(409)
      .json({ message: `user with email ${req.body.email} already exist!` });
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  next();
};
