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
    const modo = process.argv[2] ? process.argv[2] : "Prod";
    const configs = {};
    configs.modo = modo;
    modo == "dev" || modo == "test"
      ? (configs.persistencia = "Memoria")
      : (configs.persistencia = "MongoDB");
    configs.host = process.env.HOST + ":" + process.env.PORT;
    configs.mongoUser = process.env.USERMONGO;
    configs.mongoPass = process.env.PASSMONGO;
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
