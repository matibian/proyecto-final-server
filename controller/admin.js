const adminService = require("../service/admin");
const { logger } = require("../middlewares/logger.js");

require("dotenv");

async function getAdminProductos(req, res) {
  try {
    const productos = await adminService.getAdminProductos();
    res
      .status(200)
      .render("productos", { products: productos, layout: "productos" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: true, msj: "error" });
  }
}

async function getLogin(req, res) {
  try {
    const host = process.env.HOST;
    res.status(200).render("login", { host: host, layout: "login" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: true, msj: "error" });
  }
}

async function getChats(req, res) {
  try {
    let chats = await adminService.getChats();
    res.status(200).render("chat", { chats: chats, layout: "chat" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: true, msj: "error" });
  }
}

async function getChatUser(req, res) {
  try {
    const user = req.params.user;
    res.status(200).render("chatUser", { user: user, layout: "chatUser" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: true, msj: "error" });
  }
}

async function getConfig(req, res) {
  try {
    const config = await adminService.getConfig();
    res
      .status(200)
      .render("config", { config: config, status: 500, layout: "config" });
  } catch (error) {
    logger.error(error);
    res
      .status(500)
      .render("error", { error: error, status: 500, layout: "error" });
  }
}

module.exports = {
  getLogin,
  getChatUser,
  getChats,
  getConfig,
  getAdminProductos,
};
