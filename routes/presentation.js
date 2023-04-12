const express = require("express");
const { Router } = express;
const routerPresentation = new Router();
const routes = require("../controller/presentation.js");

routerPresentation.get("/", routes.getPresentation);

module.exports = routerPresentation;
