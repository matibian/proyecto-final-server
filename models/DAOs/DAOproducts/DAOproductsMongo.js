const mongoose = require("mongoose");
const productModel = require("../../mongoModels/productModel");

class DAOProductsMongo {
  constructor() {
    this.model = mongoose.model("productos", productModel);
  }

  async getAll() {
    const products = await this.model.find({}).lean();
    return products;
  }

  async save(element) {
    const response = await this.model.create(element);
    return response;
  }

  async getById(id) {
    console.log(id);
    const response = await this.model.findById(id);
    console.log(response);
    return response;
  }

  async deleteById(id) {
    const response = await this.model.findByIdAndDelete(id);
    return response;
  }

  async updateById(id, newData) {
    const response = await this.model.findByIdAndUpdate(id, newData, {
      new: true,
    });
    return response;
  }

  async getByCategory(category) {
    const products = await this.model
      .find()
      .where({ category: category })
      .lean();
    return products;
  }
}

module.exports = DAOProductsMongo;
