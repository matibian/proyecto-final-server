const { faker } = require("@faker-js/faker");
const productos = require("../../DB/productosMem");
const { logger } = require("../../../middlewares/logger");

class DAOproductsMem {
  constructor() {}

  getAll = async () => {
    return productos;
  };

  save = async (producto) => {
    try {
      const prod = producto;
      prod._id = Number(faker.random.numeric() + 50);
      productos.push(prod);
      return prod;
    } catch (error) {
      logger.error(error);
    }
  };

  getByCategory = async (category) => {
    try {
      const list = await productos.filter((p) => p.category === category);
      return list;
    } catch (error) {
      logger.error(error);
    }
  };

  getById = async (_id) => {
    try {
      const producto = await productos.filter((p) => p._id === _id);
      return producto[0];
    } catch (error) {
      logger.error(error);
    }
  };

  deleteById = async (_id) => {
    try {
      productos.filter((p) => p._id !== _id);
      return true;
    } catch (error) {
      logger.error(error);
    }
  };

  updateById = async (_id, newData) => {
    try {
      const index = array.findIndex((item) => item._id === _id);
      if (index !== -1) {
        array[index] = { ...array[index], ...newData };
        return array[index];
      } else {
        return null;
      }
    } catch (error) {
      logger.error(error);
    }
  };
}

module.exports = DAOproductsMem;
