const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    // CRIA  INSTANCIA DO SERVER EXPRESS
    this.app = express();
    // CONFIGURA A PORTA

    // ROTAS DISPONIVEIS
    this.paths = {
      auth: "/api/auth",
      categorias: "/api/categorias",
      buscar: "/api/buscar",
      produtos: "/api/produtos",
      usuarios: "/api/usuarios",
    };

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
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.buscar, require("../routes/buscar"));
    this.app.use(this.paths.categorias, require("../routes/categorias"));
    this.app.use(this.paths.produtos, require("../routes/produtos"));
    this.app.use(this.paths.usuarios, require("../routes/usuarios"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server Express - http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
