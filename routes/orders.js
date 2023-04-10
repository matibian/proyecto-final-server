const express = require("express");
const { Router } = express;
const routerOrders = new Router();
const routes = require("../controller/orders.js");
const { auth } = require("../middlewares/auth.js");
const { authAdmin } = require("../middlewares/admin.js");

routerOrders.post("/checkout", auth, routes.postCheckout);

routerOrders.get("/all", authAdmin, routes.getCheckouts);

routerOrders.get("/:email", auth, routes.getEmail);

routerOrders.delete("/:id", routes.deleteCheckout);

module.exports = routerOrders;
