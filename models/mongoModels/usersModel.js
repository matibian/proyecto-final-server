const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const UsuarioSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Por favor, agregar un mail"],
    max: 100,
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Por favor, agregar un nombre"],
    max: 100,
  },
  password: {
    type: String,
    required: [true, "Por favor, agregar una contraseña"],
  },
  dir: {
    type: String,
    required: [true, "Por favor, agregar una dirección"],
    max: 50,
  },
  age: {
    type: Number,
    required: [true, "Por favor, agregar una edad"],
    max: 100,
  },
  phone: { type: Number, required: [true, "Por favor, agregar un teléfono"] },
  avatar: {
    type: String,
    required: [true, "Por favor, agregar un avatar"],
    max: 100,
  },
  cart: { type: Array, required: false, max: 100 },
  admin: { type: Boolean, required: false },
});

UsuarioSchema.plugin(findOrCreate);

const User = mongoose.model("users", UsuarioSchema);
module.exports = UsuarioSchema;
