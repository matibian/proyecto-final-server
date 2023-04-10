const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
require("dotenv");
const { logger } = require("../middlewares/logger");

mongoose.set("strictQuery", true);

const MongoSession = {
  name: "session-vortex",
  secret: process.env.MONGODB_SECRET,
  autoRemove: "native",
  cookie: { maxAge: 2000000, httpOnly: true, signed: true, sameSite: false },
  saveUninitialized: true,
  resave: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collection: "sessions",
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    ttl: 2000000,
  }),
};
const MongoDBService = async () => {
  try {
    mongoose.connect(
      `mongodb+srv://${process.env.USERMONGO}:${process.env.PASSMONGO}@cluster0.u37xyzn.mongodb.net/Proyecto-back`,
      { useNewUrlParser: true }
    );
    console.log("Conectado a MONGODB");
  } catch (error) {
    logger.error(error);
  }
};

module.exports = {
  MongoDBService,
  MongoSession,
};
