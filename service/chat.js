const DAOmessages = require("../models/DAOs/DAOmessagesMongo");
const moment = require("moment");
moment.locale("es");
const { logger } = require("../middlewares/logger");

async function websocket(io) {
  io.on("connection", async (socket) => {
    socket.on("user", async (data) => {
      socket.emit("msg-list", await DAOmessages.getAll(data));
    });

    socket.on("msg", async (data) => {
      try {
        let username = data.username;
        await DAOmessages.save({
          username: username,
          socketid: socket.id,
          from: data.from,
          message: data.message,
          timestamp: moment().format("D MMM YY, h:mm"),
        });

        io.emit("msg-list", await DAOmessages.getAll(username));
      } catch (err) {
        logger.error(err);
      }
    });
  });
}
module.exports = websocket;
