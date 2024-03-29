const { response, request } = require("express");
const { Categoria } = require("../models");

const obtenerCategorias = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query)
      .populate("usuario", "nombre")
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);

  res.status(200).json({
    total,
    categorias,
  });
};

const obtenerCategoria = async (req, res = req) => {
  const { id } = req.params;
  const categoria = await Categoria.findById(id).populate("usuario", "nombre");

  res.status(200).json({ categoria });
};

const actualizarCategoria = async (req, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  data.nombre = data.nombre.toUpperCase();

  const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

  res.status(200).json({ categoria });
};

const borrarCategoria = async (req, res = response) => {
  const { id } = req.params;

  const categoria = await Categoria.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.status(200).json({ categoria });
};

const crearCategoria = async (req, res = response) => {
  console.log(req.usuarioAuth._id);

  const nombre = req.body.nombre.toUpperCase();

  const categoriaDB = await Categoria.findOne({ nombre });

  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoria ${categoriaDB.nombre} , ya existe`,
    });
  }

  const data = {
    nombre,
    usuario: req.usuarioAuth._id,
  };

  const categoria = new Categoria(data);

  await categoria.save();

  res.status(201).json({
    categoria,
  });
};

module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
};
