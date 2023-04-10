const MainServer = require("./app");
const modo = process.argv[2];
const server = new MainServer(modo);
require("dotenv");

console.log(process.env.MESSAGEINIT);
server.listen();
