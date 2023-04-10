const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const UserModel = require("../models/mongoModels/usersModel");
const { default: mongoose } = require("mongoose");
const User = mongoose.model("users", UserModel);
const modo = process.argv[2];

const auth = async (req, res, next) => {
  let token;
  if (modo == "dev") {
    next();
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401).send("Error");
    }
    if (!token) {
      res.status(401).send("Error");
    }
  }
};

module.exports = { auth };
