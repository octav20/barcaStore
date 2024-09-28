import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  images: [
    {
      id: String,
      url: String,
    },
  ],
});
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
