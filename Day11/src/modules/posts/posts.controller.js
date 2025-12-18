import { postsModel } from "../../../DB/models/posts.model.js";

const getPosts = async (req, res) => {
  let posts = await postsModel
    .find({ createdBy: req.users._id })
    .populate("createdBy"); //populate method get the user data who created the post as a value for this property
  res.status(200).json(posts);
};

const addPost = async (req, res) => {
  req.body.createdBy = req.users._id; //get the user id from the token
  let insertedPost = await postsModel.insertMany(req.body);
  res.status(201).json({ message: "post added successfully!", insertedPost });
};

const updatePost = async (req, res) => {
  let foundedPost = await postsModel.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { returnDocument: "after" }
  );
  if (foundedPost) {
    res.json({
      message: "post updated successfully!",
      newPostInfo: foundedPost,
    });
  } else {
    res.statusCode = 404;
    res.end("this post isn't exist!");
  }
};

const deletePost = async (req, res) => {
  await postsModel.deleteOne({ _id: req.params.id });
  let posts = await postsModel.find();
  res.json({ message: "posts after deletion: ", posts });
};

export { getPosts, addPost, updatePost, deletePost };
