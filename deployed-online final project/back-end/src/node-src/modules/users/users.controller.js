import { usersModel } from "../../../DB/models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

let getUsers = async (req, res) => {
  let users = await usersModel.find(); //.populate("createdBy");  //collection methods return promise so we used await to wait for its execution
  res.status(200).json(users);
};

let getUser = async (req, res) => {
  let user = await usersModel.findById(req.user._id); //collection methods return promise so we used await to wait for its execution
  if (user) res.status(200).json(user);
  else res.status(404).json({ message: "user not found!" });
};

let addUser = async (req, res) => {
  let found = await usersModel.findOne({ email: req.body.email });
  if (found) {
    return res
      .status(409)
      .json({ message: "this account already exist!, try sign in" });
  }
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  let insertedUser = await usersModel.insertOne(req.body);
  insertedUser.password = undefined;
  let token = jwt.sign(
    { _id: insertedUser._id, role: insertedUser.role },
    "key"
  );

  let fullInsertedUser = await usersModel.findByIdAndUpdate(
    insertedUser._id,
    { $set: { token: token } },
    { new: true }
  );
  res
    .status(201)
    .json({ message: "user added successfully!", fullInsertedUser });
}; //acts as signUp

let signIn = async (req, res) => {
  // let semon = await usersModel.findOneAndUpdate(
  //   { name: "semon4" },
  //   { $set: { role: "user" } }
  // );
  // console.log(semon);

  let foundedUser = await usersModel.findOne({ email: req.body.email });
  if (foundedUser) {
    let matchedP = bcrypt.compareSync(req.body.password, foundedUser.password); //authentication
    if (matchedP) {
      // let token = jwt.sign(
      //   { _id: foundedUser._id, role: foundedUser.role },
      //   "key"
      // ); //sign for verification later

      let token = foundedUser.token;
      return res.json({ message: `welcome, ${foundedUser.name}!`, token });
    }
    res.status(422).json({ message: "wrong password!" });
  } else {
    res.status(404).json({ message: "Not Found, please sign up!" });
  }
};

let updateUser = async (req, res) => {
  //   let users = await usersModel.find();
  //   let foundedUser = users.findOne({ email: req.params.email });   //Error: users represent array not collection and doesn't has findOne()

  req.body.password = bcrypt.hashSync(req.body.password, 10);
  let foundedUser = await usersModel.findOneAndUpdate(
    { _id: req.params.id },
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
};

let deleteUser = async (req, res) => {
  await usersModel.deleteOne({ _id: req.params.id });
  let users = await usersModel.find();
  //   users = users.filter((user) => user.email != req.params.email);  //this command acts with shallow copied array then it won't update in database
  res.json({ message: "users after deletion: ", users });
};

export { getUsers, getUser, addUser, updateUser, deleteUser, signIn };
