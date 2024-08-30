import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: false },
  department: {
    type: String,
  }, // Store Firebase image URL
});

const Product = mongoose.model("Product", productSchema);

export default Product;
