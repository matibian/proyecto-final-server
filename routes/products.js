const express = require("express");
const { Router } = express;
const routerProducts = new Router();
const {
  getProducts,
  getCategory,
  getById,
  delProducts,
  postProducts,
} = require("../controller/products");
const { auth } = require("../middlewares/auth");
const { authAdmin } = require("../middlewares/admin");

routerProducts.get("/", auth, getProducts);

routerProducts.post("/", authAdmin, postProducts);

routerProducts.delete("/:id", authAdmin, delProducts);

routerProducts.get("/id/:id", auth, getById);

routerProducts.get("/:category", auth, getCategory);

module.exports = routerProducts;
