const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    // CRIA  INSTANCIA DO SERVER EXPRESS
    this.app = express();
    // CONFIGURA A PORTA

    // ROTAS DISPONIVEIS
    this.authPath = "/api/auth";
    this.usuariosPath = "/api/usuarios";

    this.port = process.env.PORT;

    // CONECTAR AO BANCO DE DADOS
    this.conectarDb();
    // APLICA OS MIDDLEWARES
    this.middlewares();
    // CONFIGURA AS ROTAS
    this.routes();
  }

  async conectarDb() {
    await dbConnection();
  }

  middlewares() {
    //CORS
    this.app.use(cors());
    // LEITURA E PARSE DE JSON
    this.app.use(express.json());
    // CONFIGURA A PASTA PUBLIC
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.authPath, require("../routes/auth"));
    this.app.use(this.usuariosPath, require("../routes/usuarios"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server Express - http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
