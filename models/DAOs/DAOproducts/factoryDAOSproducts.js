const DAOproductsMongo = require("./DAOproductsMongo");
const DAOproductsMem = require("./DAOproductsMem");

let DAO;

modo = process.argv[3];

switch (modo) {
  case "dev":
    DAO = new DAOproductsMem();
    console.log("DAO Memoria");
    break;

  case "prod":
    DAO = new DAOproductsMongo();
    console.log("DAO MongoDB");
    break;
  default:
    DAO = new DAOproductsMongo();
    console.log("DAO MongoDB");
    break;
}

module.exports = DAO;
