const DAOcart = require("../models/DAOs/DAOcart");
const DAOusers = require("../models/DAOs/DAOusers");
const DAOcheckout = require("../models/DAOs/DAOcheckout");
const logger = require("../middlewares/logger");
// const ContUsers = new ContainerUsers();

async function postProdCart(req, res) {
  try {
    const timestamp = new Date().getTime();
    const id = req.params.id;
    const user = req.body.user;
    await DAOcart.postById(user, id, timestamp);
    res.status(200).json(user);
  } catch (error) {
    logger.error(error);
    res.status(500);
  }
}

async function getCart(req, res) {
  try {
    const userId = req.params.id;
    let user = await DAOcart.getAll(userId);
    let total = await user.cart.reduce(
      (acumulador, producto) => acumulador + producto.price * producto.quantity,
      0
    );
    res.json([user.cart, total]);
  } catch (error) {
    logger.error(error);
    res.status(500).render("error", { error: error, layout: "error" });
  }
}

async function deleteProductCart(req, res) {
  try {
    const userId = req.params.userid;
    const prodId = req.params.userid;
    await DAOcart.deleteById(userId, prodId);
    res.status(200);
  } catch (error) {
    logger.error(error);
    res.status(500).render("error", { error: error, layout: "error" });
  }
}

async function postAdd(req, res) {
  try {
    const id = req.params.id;
    const user = await DAOusers.getAll(req.session.user);
    await DAOcart.addById(user, id);
    res.status(200);
  } catch (error) {
    logger.error(error);
    res.status(500).render("error", { error: error, layout: "error" });
  }
}
async function postSubs(req, res) {
  try {
    const id = req.params.id;
    const user = await DAOusers.getAll(req.session.user);
    await DAOcart.subsById(user, id);
    res.status(200);
  } catch (error) {
    logger.error(error);
    res.status(500).render("error", { error: error, layout: "error" });
  }
}

module.exports = {
  postProdCart,
  deleteProductCart,
  postAdd,
  postSubs,
  getCart,
};
