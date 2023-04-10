const jwt = require("jsonwebtoken");
const UserModel = require("../models/mongoModels/usersModel");
const { default: mongoose } = require("mongoose");
const User = mongoose.model("users", UserModel);
const modo = process.argv[2];

const authAdmin = async (req, res, next) => {
  try {
    if (modo == "dev") {
      next();
    } else {
      if (!req.session.user || !req.session.user.token) {
        throw "No estas logueado";
      }
      let token = req.session.user.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      req.user.admin === true;
      if (req.user.admin != true) {
        throw "No sos administrador";
      }
      next();
    }
  } catch (error) {
    res.status(401).render("faillogin", {
      error: error,
      layout: "faillogin",
    });
  }
};

module.exports = { authAdmin };
