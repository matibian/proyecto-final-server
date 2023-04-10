const DAOcheckout = require("../models/DAOs/DAOcheckout");
const ordersService = require("../service/orders");
const logger = require("../middlewares/logger");

async function postCheckout(req, res) {
  try {
    let order = req.body;
    let ordernumber = (await DAOcheckout.count()) + 1;
    order.ordernumber = ordernumber;
    const response = await ordersService.postCheckout(order);

    res.status(200).json({ ordernumber: ordernumber });
  } catch (error) {
    logger.error(error);
    res.status(500);
  }
}

async function getCheckouts(req, res) {
  try {
    let orders = await DAOcheckout.getAll();
    res.status(200).render("orders", { orders: orders, layout: "orders" });
  } catch (error) {
    logger.error(error);
    res.status(500);
  }
}

async function deleteCheckout(req, res) {
  try {
    const id = req.params.id;
    let checkouts = await ordersService.deleteCheckout(id);
    res.status(200).json(checkouts);
  } catch (error) {
    logger.error(error);
    res.status(500);
  }
}

async function getEmail(req, res) {
  try {
    const email = req.params.email;
    let orders = await ordersService.getEmail(email);
    res.status(200).json(orders);
  } catch (error) {
    logger.error(error);
    res.status(500);
  }
}

module.exports = {
  getCheckouts,
  postCheckout,
  deleteCheckout,
  getEmail,
};
