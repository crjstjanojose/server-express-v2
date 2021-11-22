const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const Usuario = require("../models/usuario");
const Categoria = require("../models/categoria");
const Produto = require("../models/produto");

const colecciones = ["usuarios", "categorias", "produtos", "roles"];

const buscarUsuario = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino);

  if (esMongoID) {
    const usuario = await Usuario.findById(termino);
    return res.json({
      results: usuario ? [usuario] : [],
    });
  }

  // Busca por Outros Argumentos
  const regex = new RegExp(termino, "i");
  const usuarios = await Usuario.find({
    $or: [{ nombre: regex }, { correo: regex }],
    $and: [{ estado: true }],
  });

  return res.json({
    results: usuarios,
  });
};

const buscarCategoria = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino);
  if (esMongoID) {
    const categoria = await Categoria.findById(termino);
    return res.json({
      results: categoria ? [categoria] : [],
    });
  }

  //BUSCA POR OUTROS ARGUMENTOS
  const regex = new RegExp(termino, "i");
  const categorias = await Categoria.find({
    $or: [{ nombre: regex }],
    $and: [{ estado: true }],
  });

  return res.json(categorias);
};

const buscarProdutos = async (termino, res = response) => {
  const esMongoID = ObjectId.isValid(termino);

  if (esMongoID) {
    // const produto = await Produto.findById(termino);
    const produto = await Produto.find({
      $or: [{ categoria: termino }, { _id: termino }],
    });
    return res.status(200).json({
      results: produto ? [produto] : [],
    });
  }

  // BUSCA POR OUTROS Argumentos
  const regex = new RegExp(termino, "i");
  const produtos = await Produto.find({
    $or: [{ nombre: regex }],
    $and: [{ estado: true }],
  });

  res.status(200).json({
    results: produtos,
  });
};

const buscar = (req, res = response) => {
  const { coleccion, termino } = req.params;

  if (!colecciones.includes(coleccion)) {
    return res.status(400).json({
      msg: `No existe uma coleccion de nombre ${coleccion} en la base de dados.`,
    });
  }

  switch (coleccion) {
    case "usuarios":
      buscarUsuario(termino, res);
      break;
    case "categorias":
      buscarCategoria(termino, res);
      break;
    case "produtos":
      buscarProdutos(termino, res);
      break;
    default:
      res.status(500).json({ msg: "Se le olvido hacer esta busqueda" });
  }
};

module.exports = { buscar };
