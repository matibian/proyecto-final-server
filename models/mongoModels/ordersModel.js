const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const orderModel = new mongoose.Schema(
  {
    buyer: {
      name: { type: String, required: true, max: 100 },
      mail: { type: String, required: true },
      phone: { type: Number, required: true },
      address: { type: String, required: true },
    },
    envio: { type: Number, required: false },
    carrito: { type: Array, required: false, max: 100 },
    ordernumber: { type: Number, required: false },
    total: { type: Number, required: true },
    descuento: { type: String, required: false },
  },
  { timestamps: true }
);

orderModel.plugin(findOrCreate);

// const Products = mongoose.model("productos", productModel);
module.exports = orderModel;
