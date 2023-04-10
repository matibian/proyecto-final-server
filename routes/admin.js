const express = require("express");
const { Router } = express;
const routerAdmin = new Router();
const routes = require("../controller/admin");
const { authAdmin } = require("../middlewares/admin");

routerAdmin.get("/config", authAdmin, routes.getConfig);

routerAdmin.get("/chats", authAdmin, routes.getChats);

routerAdmin.get("/chats/:user", authAdmin, routes.getChatUser);

routerAdmin.get("/", routes.getLogin);

routerAdmin.get("/productos", authAdmin, routes.getAdminProductos);

module.exports = routerAdmin;
