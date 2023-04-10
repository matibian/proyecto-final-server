const express = require("express");
const session = require("express-session");
const { engine } = require("express-handlebars");
const app = express();
const cors = require("cors");
const config = require("./config/config");
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);
const websocket = require("./service/chat.js");
const routerCart = require("./routes/cart");
const routerProducts = require("./routes/products");
const routerAuth = require("./routes/auth.js");
const routerAdmin = require("./routes/admin");
const { MongoSession, MongoDBService } = require("./config/services");
const routerOrders = require("./routes/orders");

class Server {
  constructor(modo) {
    this.PORT = process.env.PORT || 8080;
    this.app = express();
    this.httpServer = httpServer;
    this.middlewares(modo);
    this.routes();
    this.views();
    websocket(io);
  }

  routes() {
    app.use("/api/products", routerProducts);
    app.use("/api/orders", routerOrders);
    app.use("/api/cart", routerCart);
    app.use("/admin", routerAdmin);
    app.use("/auth", routerAuth);
  }

  middlewares(modo) {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    MongoDBService();
    app.use(session(MongoSession));
  }

  views() {
    app.use(express.static(__dirname + "/public"));
    app.set("view engine", "hbs");
    app.set("views", "./views/layouts");
    app.engine(
      "hbs",
      engine({
        extname: ".hbs",
        defaultLayout: "index.hbs",
        layoutsDir: __dirname + "/views/layouts",
        partialsDir: __dirname + "/views/partials",
      })
    );
  }
  listen() {
    httpServer.listen(config.PORT, () =>
      console.log(`App listening on http://${config.HOST}:${config.PORT}`)
    );
  }
}
module.exports = Server;
