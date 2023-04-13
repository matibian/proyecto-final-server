const productService = require("../service/products");
const { logger } = require("../middlewares/logger");
const DAO = require("../models/DAOs/DAOproducts/factoryDAOSproducts");

async function getProducts(req, res) {
  try {
    const totalProducts = await productService.getProducts();
    res.status(200).json(totalProducts);
  } catch (error) {
    logger.error(error);
    res
      .status(500)
      .render("error", { error: error, status: 500, layout: "error" });
  }
}

async function getCategory(req, res) {
  try {
    const category = req.params.category;
    const categoryProducts = await productService.getByCategory(category);
    res.status(200).json(categoryProducts);
  } catch (error) {
    logger.error(error);
    res.status(500).render("error", { error: error, layout: "error" });
  }
}

async function getById(req, res) {
  try {
    const id = await req.params.id;
    const product = await DAO.getById(id);
    res.status(200).json(product);
  } catch (error) {
    logger.error(error);
    res.status(500).render("error", { error: error, layout: "error" });
  }
}

async function delProducts(req, res) {
  try {
    const id = req.params.id;
    await productService.delProducts(id);
    res.status(202).send("Producto borrado");
  } catch (error) {
    logger.error(error);
    res.status(500).render("error", { error: error, layout: "error" });
  }
}

async function postProducts(req, res) {
  try {
    const product = req.body;
    product.timestamp = Date.now();
    const i = await productService.postProducts(product);
    res.status(201).json(i);
  } catch (error) {
    logger.error(error);
    res.status(500);
  }
}

module.exports = {
  getById,
  getCategory,
  getProducts,
  postProducts,
  delProducts,
};
