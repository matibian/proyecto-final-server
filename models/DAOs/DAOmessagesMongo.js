const mongoose = require("mongoose");
const { chatSchema } = require("../mongoModels/messagesModel");
const { logger } = require("../../middlewares/logger");

class DAOmessagesMongo {
  constructor() {
    this.model = mongoose.model("mensajes", chatSchema);
  }

  async getAllChats() {
    try {
      const chats = await this.model.find().lean();
      return chats;
    } catch (e) {
      logger.error(e);
    }
  }

  async getAll(username) {
    try {
      const user = await this.model.findOne({ username: username });
      return user?.chat;
    } catch (e) {
      logger.error(e);
    }
  }

  async save(element) {
    try {
      let user = await this.model.findOneAndUpdate(
        { username: element.username }, // busca el usuario
        { $push: { chat: element }, timestamp: element.timestamp }, // agrega el mensaje al chat y actualiza el timestamp
        { upsert: true, new: true } // crea un nuevo usuario si no se encuentra uno existente
      );
      // // let user = await this.model.findOne({ username: element.username });
      // if (user == null) {
      //   user = await this.model.create({
      //     username: element.username,
      //     chat: [],
      //   });
      //   user.chat.push(element);
      // }
      // user.timestamp = element.timestamp;
      // user.chat.push(element);
      await user.save();
    } catch (error) {
      logger.error(error);
    }
  }

  async getById(id) {
    try {
      const response = await this.model.findById(id);

      return response;
    } catch (error) {
      logger.error(error);
    }
  }

  async deleteById(id) {
    try {
      const response = await this.collection.findByIdAndDelete(id);
      return response;
    } catch (error) {
      logger.error(error);
    }
  }

  async updateById(id, newData) {
    try {
      const response = await this.model.findByIdAndUpdate(id, newData, {
        new: true,
      });
      return response;
    } catch (error) {
      logger.error(error);
    }
  }

  async getByCategory(category) {
    try {
      const products = await this.model
        .find()
        .where({ category: category })
        .lean();
      return products;
    } catch (error) {
      logger.error(error);
    }
  }
}

DAOmessages = new DAOmessagesMongo();

module.exports = DAOmessages;
