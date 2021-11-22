const { response, request } = require("express");
const { Produto } = require("../models");
const produto = require("../models/produto");

const obtenerProdutos = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [produtos, total] = await Promise.all([
    Produto.find(query)
      .populate("categoria", "nombre")
      .populate("usuario", "nombre")
      .skip(Number(desde))
      .limit(Number(limite)),
    Produto.countDocuments(query),
  ]);

  res.status(200).json({
    total,
    produtos,
  });
};

const obtenerProduto = async (req, res = response) => {
  const { id } = req.params;
  const produto = await Produto.findById(id)
    .populate("usuario", "nombre")
    .populate("categoria", "nombre");

  res.status(200).json({ produto });
};

const crearProduto = async (req = request, res = response) => {
  const { estado, usuario, ...body } = req.body;

  const nombre = body.nombre;

  const produtoDB = await Produto.findOne({ nombre });
  if (produtoDB) {
    return res.status(400).json({
      nsg: `El Produto ${produtoDB.nombre} , ya existe`,
    });
  }

  const data = {
    ...body,
    nombre: body.nombre.toUpperCase(),
    usuario: req.usuarioAuth._id,
  };

  const produto = new Produto(data);

  await produto.save();

  res.status(201).json({ produto });
};

const actualizarProduto = async (req, res = response) => {
  const { id } = req.params;

  const { estado, usuario, ...body } = req.body;

  if (data.nombre) {
    data.nombre = data.nombre.toUpperCase();
  }

  data.usuario = req.usuarioAuth._id;

  const produto = await Produto.findByIdAndUpdate(id, body, { new: true });

  res.status(200).json(produto);
};

const borrarProduto = async (req, res = response) => {
  const { id } = req.params;

  const produto = await Produto.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.status(200).json({
    produto,
  });
};

module.exports = {
  crearProduto,
  obtenerProdutos,
  obtenerProduto,
  actualizarProduto,
  borrarProduto,
};
