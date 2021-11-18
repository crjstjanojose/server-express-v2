require("dotenv").config();

const Server = require("./models/server");

// CRIA A INSTANCIA DO SERVER
const server = new Server();

// CHAMA O METODO INSTANCIAÇÃO DO SERVER
server.listen();
