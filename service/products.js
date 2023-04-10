// const productsDAO = require("../models/DAOs/DAOproducts");
const DAO = require("../models/DAOs/DAOproducts/factoryDAOSproducts");
const { logger } = require("../middlewares/logger");

async function getProducts() {
  try {
    return await DAO.getAll();
  } catch (error) {
    logger.error(error);
  }
}

async function getByCategory(category) {
  try {
    return await DAO.getByCategory(category);
  } catch (error) {
    logger.error(error);
  }
}

async function getById(id) {
  try {
    const product = await DAO.getById(id);
    return product;
  } catch (error) {
    logger.error(error);
  }
}

async function delProducts(id) {
  try {
    return await DAO.deleteById(id);
  } catch (error) {
    logger.error(error);
  }
}

async function postProducts(product) {
  try {
    return await DAO.save(product);
  } catch (error) {
    logger.error(error);
  }
}

module.exports = {
  getByCategory,
  getById,
  getProducts,
  postProducts,
  delProducts,
};
