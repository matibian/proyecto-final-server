const mongoose = require("mongoose");
const UsuariosProd = require("../../models/mongoModels/usersModel");
const DAOproducts = require("./DAOproducts/factoryDAOSproducts");
const logger = require("../../middlewares/logger");

class DAOcarts {
  constructor() {
    this.model = mongoose.model("users", UsuariosProd);
  }

  async getAll(userId) {
    if (userId) {
      const cart = await this.model.findOne({ _id: userId });

      return cart;
    } else {
      return "usuario no encontrado";
    }
  }

  async postById(userId, id, timestamp) {
    let prod = {};
    try {
      const userCart = await this.model.findOne({ _id: userId });
      if (!userCart.cart.find((p) => p._id == id)) {
        prod = await DAOproducts.getById(id);
        prod.timestamp = await timestamp;
        prod.quantity = 1;
        userCart.cart.push(prod);
        await userCart.save();
      } else {
        const userCart = await this.model.findOne({ _id: userId });
        const productIndex = await userCart.cart.findIndex(
          (product) => product._id == id
        );
        await userCart.cart[productIndex].quantity++;
        userCart.markModified("cart");
        await userCart.save();
      }
    } catch (e) {
      logger.error(e);
    }
  }

  async deleteById(userId, id) {
    this.model
      .findOne({ _id: userId })
      .then((user) => {
        const productIndex = user.cart.findIndex(
          (product) => product._id.toString() === id
        );
        user.cart.splice(productIndex, 1);
        return user.save();
      })
      .then((user) => {
        console.log("User updated:", user);
      })
      .catch((error) => {
        logger.error(error);
      });
  }

  async addById(user, id) {
    try {
      const userCart = await this.model.findOne(user._id);
      const productIndex = await userCart.cart.findIndex(
        (product) => product._id == id
      );
      await userCart.cart[productIndex].quantity++;
      userCart.markModified("cart");
      await userCart.save();
    } catch (e) {
      logger.error(e);
    }
  }

  async subsById(user, id) {
    try {
      const userCart = await this.model.findOne(user._id);
      const productIndex = await userCart.cart.findIndex(
        (product) => product._id == id
      );
      if (userCart.cart[productIndex].quantity == 1) {
        this.deleteById(user, id);
      } else {
        await userCart.cart[productIndex].quantity--;
        userCart.markModified("cart");
        await userCart.save();
      }
    } catch (error) {
      logger.error(error);
    }
  }

  async updateById(username, newData) {
    try {
      const response = await this.model.findByIdAndUpdate(username, newData, {
        new: true,
      });
      return response;
    } catch (error) {
      logger.error(error);
    }
  }

  async deleteCart(user) {
    try {
      this.model
        .findById(user._id)
        .then((user) => {
          user.cart = [];
          return user.save();
        })
        .then((user) => {
          console.log("User updated:", user);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      logger.error(error);
    }
  }
}
const DAOcart = new DAOcarts();

module.exports = DAOcart;
