const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const UserModel = require("../models/mongoModels/usersModel.js");
const { default: mongoose } = require("mongoose");
const User = mongoose.model("users", UserModel);
const nodemailer = require("nodemailer");
const { logger } = require("../middlewares/logger.js");

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: "matubianchi@gmail.com",
    pass: "izxopsdqguskflhj",
  },
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, dir, age, phone, avatar } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Por favor llenar todos los datos");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Usuario ya existe");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    dir,
    age,
    phone,
    avatar,
    cart: [],
  });

  if (user) {
    const mailOptions = {
      from: "Servidor Node.js",
      to: "dev.matiasbianchi@gmail.com",
      subject: "Nuevo registro",
      html: `<h1>Nuevo registro de Vortex</h1><br/><ul> <li>Usuario: ${user.email}</li> <li>Nombre: ${user.name}</li> <li>Edad: ${user.age}</li> <li>Dirección: ${user.dir}</li> <li>Teléfono: ${user.phone}</li> <li>Avatar: <img src="${user.avatar}"></li></ul>`,
    };
    try {
      const info = transporter.sendMail(mailOptions);
    } catch (err) {
      logger.error(err);
    }

    res.status(201).json({
      avatar: user.avatar,
      dir: user.dir,
      email: user.email,
      name: user.name,
      phone: user.phone,
      uuid: user._id,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Credenciales inválidas");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password, login } = req.body;
  const user = await User.findOne({ email });
  const modo = process.argv[3];

  if (user && (await bcrypt.compare(password, user.password))) {
    token = generateToken(user._id);
    const userdata = {
      uuid: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      dir: user.dir,
      avatar: user.avatar,
      admin: user.admin,
    };
    req.session.user = userdata;
    req.session.user.token = token;
    req.session.save((err) => {
      if (err) {
        logger.error(err);
      } else if (login == "admin") {
        res.redirect("/admin/config");
      } else {
        res.send(req.session);
      }
    });
  } else {
    res.status(400);
    throw new Error("Credenciales inválidas");
  }
});

function getLogout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      res.send("no pudo deslogear");
    } else {
      res.redirect("/admin");
    }
  });
}

function getLogin(req, res) {
  res.redirect("/admin");
}

const getUser = async (req, res) => {
  const _id = req.body.uuid;
  const user = await User.findOne({ _id });
  res.status(200).json(user);
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
};

module.exports = {
  getLogout,
  registerUser,
  loginUser,
  getUser,
  getLogin,
};
