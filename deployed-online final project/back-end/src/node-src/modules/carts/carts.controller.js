import { cartsModel } from "../../../DB/models/carts.model.js";
import { productsModel } from "../../../DB/models/products.model.js";

const getCarts = async (req, res) => {
  const carts = await cartsModel.find();
  res.json(carts);
};

const getCart = async (req, res) => {
  const cart = await cartsModel
    .findOne({ userId: req.user._id })
    .populate("userId");
  res.json(cart);
};

const updateCart = async (req, res) => {
  let totalPrice = req.body.reduce(
    (sum, prod) => (sum += prod.price * prod.quantity),
    0
  );
  let filteredProducts = req.body.map((prod) => ({
    productId: prod._id,
    quantity: prod.quantity,
  }));
  const updatedCart = await cartsModel.findOneAndUpdate(
    { userId: req.user._id },
    {
      $set: {
        userId: req.user._id,
        products: filteredProducts,
        totalPrice: totalPrice,
      },
    },
    { new: true }
  );
  if (updatedCart)
    return res.json({ message: "cart updated successfully! ", updatedCart });
  res.status(400).end("error updating cart!");
};

const createCart = async (req, res) => {
  const insertedCart = await cartsModel.insertOne({
    userId: req.user._id,
    products: req.body,
  });
  if (insertedCart)
    return res
      .status(200)
      .json({ message: "cart created successfully!", insertedCart });
  res.status(400).end("failed to add the cart!");
};

const addProductToCart = async (req, res) => {
  let userCart = await cartsModel.findOne({ userId: req.user._id });
  if (!userCart) {
    userCart = await cartsModel.create({
      userId: req.user._id,
      products: [],
      totalPrice: 0,
    });
  }

  let cartTargetProduct = userCart.products.find(
    (product) => product.productId.toString() == req.params.id
  );

  let productsTargetProduct = await productsModel.findOne(
    { "products._id": req.params.id },
    { "products.$": 1 }
  );
  let targetProduct =
    productsTargetProduct?.products?.[0].toObject?.() ||
    productsTargetProduct.products[0];

  if (cartTargetProduct) {
    let newQuantity = ++cartTargetProduct.quantity;
    let updatedcart = await cartsModel.findOneAndUpdate(
      { userId: req.user._id, "products.productId": req.params.id },
      {
        $set: {
          "products.$.quantity": newQuantity,
        },
        $inc: { totalPrice: targetProduct.price },
      },
      { new: true }
    );
    res.json({
      message: "product added to cart successfully!",
      newcartInfo: updatedcart,
    });
  } else {
    let updatedcart = await cartsModel.findOneAndUpdate(
      { userId: req.user._id },
      {
        $push: { products: { productId: req.params.id, quantity: 1 } },
        $inc: { totalPrice: targetProduct.price },
      },
      { new: true }
    );
    res.json({
      message: "product added to cart successfully!",
      newcartInfo: updatedcart,
    });
  }
};

const deleteProductFromCart = async (req, res) => {
  try {
    // 1. Check if the product exists in the user's cart
    let cartProductDoc = await cartsModel.findOne(
      { userId: req.user._id, "products.productId": req.params.id },
      { "products.$": 1 }
    );

    if (!cartProductDoc || !cartProductDoc.products?.length) {
      return res
        .status(404)
        .json({ message: "Product not found in your cart." });
    }

    let cartTargetProduct =
      cartProductDoc.products[0].toObject?.() || cartProductDoc.products[0];

    // 2. Find the product details (to get price)
    let productDoc = await productsModel.findOne(
      { "products._id": cartTargetProduct.productId.toString() },
      { "products.$": 1 }
    );

    if (!productDoc || !productDoc.products?.length) {
      return res
        .status(404)
        .json({ message: "Product not found in product collection." });
    }

    let targetProduct =
      productDoc.products[0].toObject?.() || productDoc.products[0];

    // 3. Update the cart depending on quantity
    let newCart;
    if (cartTargetProduct.quantity > 1) {
      newCart = await cartsModel.findOneAndUpdate(
        { userId: req.user._id, "products.productId": req.params.id },
        {
          $inc: {
            "products.$.quantity": -1,
            totalPrice: -targetProduct.price,
          },
        },
        { new: true }
      );
    } else {
      newCart = await cartsModel.findOneAndUpdate(
        { userId: req.user._id },
        {
          $pull: { products: { productId: req.params.id } },
          $inc: { totalPrice: -targetProduct.price },
        },
        { new: true }
      );
    }

    // 4. Final check: if the cart is now empty, reset the totalPrice
    if (newCart.products.length === 0) {
      await cartsModel.findOneAndUpdate(
        { userId: req.user._id },
        { $set: { totalPrice: 0 } }
      );
    }

    return res.status(200).json({ newCart });
  } catch (err) {
    console.error("Delete product error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteWholeProduct = async (req, res) => {
  let cartTargetProduct = await cartsModel.findOne(
    { userId: req.user._id, "products.productId": req.params.id },
    { "products.$": 1 }
  );
  cartTargetProduct =
    cartTargetProduct?.products?.[0]?.toObject?.() ||
    cartTargetProduct.products[0];

  let targetProduct = await productsModel.findOne(
    { "products._id": cartTargetProduct.productId.toString() },
    { "products.$": 1 }
  );
  targetProduct =
    targetProduct?.products?.[0]?.toObject?.() || targetProduct.products[0];

  let productPrice = targetProduct.price * cartTargetProduct.quantity;
  let newCart = await cartsModel.findOneAndUpdate(
    { userId: req.user._id },
    {
      $pull: { products: { productId: req.params.id } },
      $inc: { totalPrice: -productPrice },
    },
    { new: true }
  );

  if (newCart) {
    return res.status(200).json({ newCart });
  }
  return res
    .status(404)
    .json({ message: "this product of your cart hasn't been found!" });
};

const deleteCart = async (req, res) => {
  await cartsModel.findOneAndDelete({ userId: req.user._id });
  const carts = await cartsModel.find();
  return res.status(200).json({ message: "carts after deletion!", carts });
};

const getCartProducts = async (req, res) => {
  try {
    const userCart = await cartsModel.findOne({ userId: req.user._id });

    if (!userCart) {
      return res.status(404).end("Sorry, your cart doesn't exist!");
    }

    const products = [];

    for (let prod of userCart.products) {
      const result = await productsModel.findOne(
        { "products._id": prod.productId },
        { "products.$": 1 }
      );

      if (result && result.products.length) {
        const productDetails = result.products[0];
        products.push({
          ...(productDetails.toObject?.() || productDetails),
          quantity: prod.quantity,
        });
        // toObject() =>	is mongoose method Converts Mongoose doc to plain JS object
        // ?.	(optional chaining)=> Prevents errors if toObject is undefined
        // ... =>	Spread the properties into the final products array

        // This pattern ensures the code works safely whether productDetails is a Mongoose document or already a plain object.
      }
    }

    return res.status(200).json(products);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getCarts,
  getCart,
  addProductToCart,
  updateCart,
  deleteCart,
  createCart,
  getCartProducts,
  deleteProductFromCart,
  deleteWholeProduct,
};
