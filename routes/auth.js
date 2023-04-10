const express = require("express");
const passport = require("passport");
const routerAuth = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
  getLogout,
} = require("../controller/auth");
const { auth } = require("../middlewares/auth");

routerAuth.post("/signup", registerUser);
routerAuth.post("/login", loginUser);
routerAuth.get("/logout", getLogout);
routerAuth.post("/getuser", getUser);
routerAuth.get("/user", auth, getUser);

module.exports = routerAuth;
