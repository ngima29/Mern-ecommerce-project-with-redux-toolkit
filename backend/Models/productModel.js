const mongoose = require("mongoose");
const {ObjectId}= mongoose.Schema

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required:  true,  trim: true },
    brand: { type: String, required:  true,  trim: true },
    stock: { type: String, required:  true,  trim: true },
    desc: { type: String, required:  true,  trim: true },
    price: { type: Number, required:  true,  trim: true },
    category: { type: ObjectId, required:  true,   ref: 'Category' },
    image: { type: Object, required:  true,  trim: true },
    rating: { type: Number, default: 5, max: 5 }

  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", productSchema);
module.exports = ProductModel;