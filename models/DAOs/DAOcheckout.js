const mongoose = require("mongoose");
const ordersModel = require("../mongoModels/ordersModel");
const { logger } = require("../../middlewares/logger");

class DAOcheckouts {
  constructor() {
    this.model = mongoose.model("orders", ordersModel);
  }

  async getAll() {
    try {
      const products = await this.model.find({}).lean();
      return products;
    } catch (error) {
      logger.error(error);
    }
  }

  async save(element) {
    try {
      const response = await this.model.create(element);
      return response;
    } catch (error) {
      logger.error(error);
    }
  }

  async count() {
    try {
      const response = await this.model.countDocuments();
      return response;
    } catch (error) {
      logger.error(error);
    }
  }

  async getByEmail(email) {
    try {
      const response = await this.model.find({
        "buyer.mail": `${email}`,
      });
      return response;
    } catch (error) {
      logger.error(error);
    }
  }

  async deleteById(id) {
    try {
      const response = await this.model.findByIdAndDelete(id);
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
}

const DAOcheckout = new DAOcheckouts();

module.exports = DAOcheckout;
