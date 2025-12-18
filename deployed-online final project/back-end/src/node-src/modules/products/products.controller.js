import { productsModel } from "../../../DB/models/products.model.js";

const getproducts = async (req, res) => {
  let products = await productsModel.find().lean();
  res.status(200).json(products);
};

const getproduct = async (req, res) => {
  let product = await productsModel.find(
    { "products._id": req.params.id },
    { "products.$": 1 }
  );
  res.status(200).json(product[0].products[0]);
};

const addproduct = async (req, res) => {
  let insertedproduct = await productsModel.findOneAndUpdate(
    { category: req.headers.category },
    { $push: { products: req.body } }
  );
  res
    .status(201)
    .json({ message: "product added successfully!", insertedproduct });
};

const addcategory = async (req, res) => {
  let insertedproduct = await productsModel.insertOne(req.body);
  res
    .status(201)
    .json({ message: "product added successfully!", insertedproduct });
};

const updateproduct = async (req, res) => {
  let foundedproduct = await productsModel.findOneAndUpdate(
    { "products._id": req.params.id },
    { $set: { "products.$": req.body } },
    { returnDocument: "after" }
  );
  if (foundedproduct) {
    res.json({
      message: "product updated successfully!",
      newproductInfo: foundedproduct,
    });
  } else {
    res.statusCode = 404;
    res.end("this product isn't exist!");
  }
};

const deleteproduct = async (req, res) => {
  await productsModel.updateOne(
    { "products._id": req.params.id },
    { $pull: { products: { _id: req.params.id } } }
  );
  let products = await productsModel.find();
  res.json({ message: "products after deletion: ", products });
};

const deletecategory = async (req, res) => {
  await productsModel.findOneAndDelete({ category: req.params.name });
  let products = await productsModel.find();
  res.json({ message: "products after deletion: ", products });
};

export {
  getproducts,
  getproduct,
  addproduct,
  updateproduct,
  deleteproduct,
  deletecategory,
  addcategory,
};
