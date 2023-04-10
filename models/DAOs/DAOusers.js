const mongoose = require("mongoose");
const usersModel = require("../mongoModels/usersModel");

class DAOusers {
  constructor() {
    this.model = mongoose.model("users", usersModel);
    // MongoDBService.init();
  }

  async getAll(username) {
    if (username) {
      const user = await this.model.findOne({ username: username }).lean();
      return user;
    } else {
      return "usuario no encontrado";
    }
  }

  async save(element) {
    const response = await this.model.create(element);

    return response;
  }

  async updateById(username, newData) {
    const response = await this.model.findByIdAndUpdate(username, newData, {
      new: true,
    });
    return response;
  }

  async deleteById(username) {
    const response = await this.collection.findByIdAndDelete(username);
    return response;
  }
}

const DAOuser = new DAOusers();

module.exports = DAOuser;
