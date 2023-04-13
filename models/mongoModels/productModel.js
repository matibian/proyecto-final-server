const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const productModel = new mongoose.Schema({
  name: { type: String, required: true, max: 100 },
  description: { type: String, required: true, max: 150 },
  thumbnail: { type: String, required: true, max: 150 },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 1 },
  timestamp: { type: String, required: false, max: 100 },
  quantity: { type: Number, required: false },
  category: { type: String, required: false },
  more: { type: String, required: false },
  stars: { type: Number, required: false },
});

productModel.plugin(findOrCreate);

module.exports = productModel;
