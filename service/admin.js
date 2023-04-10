const DAOmessages = require("../models/DAOs/DAOmessagesMongo");
const DAOProducts = require("../models/DAOs/DAOproducts/factoryDAOSproducts");
const { logger } = require("../middlewares/logger.js");
require("dotenv");

async function getAdminProductos() {
  try {
    const productos = await DAOProducts.getAll();
    return productos;
  } catch (error) {
    logger.error(error);
  }
}

async function getChats(req, res) {
  try {
    let chats = await DAOmessages.getAllChats();
    return chats;
  } catch (error) {
    logger.error(error);
  }
}

async function getConfig() {
  try {
    const modo = process.argv[3] ? process.argv[3] : "Prod";
    const configs = {};
    configs.modo = modo;
    modo == "dev" || modo == "test"
      ? (configs.persistencia = "Memoria")
      : (configs.persistencia = "MongoDB");
    configs.host = process.env.HOST;
    configs.mongo = process.env.MONGO_URI;
    configs.platform = process.platform;
    configs.uptime = process.uptime;

    return configs;
  } catch (error) {
    logger.error(error);
  }
}

module.exports = {
  getConfig,
  getAdminProductos,
  getChats,
};
