import { Schema, model, mongoose } from "mongoose";

const cartsSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  products: [
    {
      productId: {
        type: mongoose.Types.ObjectId,
        required: true,
      },
      quantity: { type: Number, default: 1, min: 1 },
    },
  ],
  totalPrice: { type: Number, default: 0 },
});

export const cartsModel = model("carts", cartsSchema);
