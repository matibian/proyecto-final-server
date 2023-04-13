const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const messageSchema = new mongoose.Schema({
  from: { type: String, required: true, max: 100 },
  type: { type: String, required: false, max: 20 },
  message: { type: String, required: false },
  socketid: { type: String, required: false },
  timestamp: { type: String, required: false },
});
messageSchema.plugin(findOrCreate);

const chatSchema = new mongoose.Schema({
  username: { type: String, required: true, max: 100 },
  chat: { type: [messageSchema], default: [] },
  timestamp: { type: String, required: false },
});
chatSchema.plugin(findOrCreate);

module.exports = {
  messageSchema,
  chatSchema,
};
