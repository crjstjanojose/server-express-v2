const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    // CRIA  INSTANCIA DO SERVER EXPRESS
    this.app = express();
    // CONFIGURA A PORTA

    // ROTAS DISPONIVEIS
    this.usuariosPath = "/api/usuarios";

    this.port = process.env.PORT;
    // APLICA OS MIDDLEWARES
    this.middlewares();
    // CONFIGURA AS ROTAS
    this.routes();
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
    this.app.use(this.usuariosPath, require("../routes/usuarios"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server Express - http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
