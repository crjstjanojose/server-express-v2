const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const usuariosGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;

  const [usuarios, total] = await Promise.all([
    Usuario.find({ estado: true }).limit(Number(limite)).skip(Number(desde)),
    Usuario.countDocuments({ estado: true }),
  ]);

  res.status(200).json({ total, usuarios });
};

const usuariosPut = async (req, res) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  //! TODO VALIDAR CONTRA BANCO DE DADOS
  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  await Usuario.findByIdAndUpdate(id, resto);
  const usuarioAtualizado = await Usuario.findById(id);

  res.status(200).json({
    usuarioRefresh: usuarioAtualizado,
  });
};

const usuariosPost = async (req, res) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  // Criptografar senha
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  await usuario.save();
  res.status(201).json({ usuario });
};

const usuariosPatch = (req, res) => {
  res.status(200).json({ ok: true, msg: "PATCH - API Controlador" });
};

const usuariosDelete = async (req, res) => {
  const { id } = req.params;
  const usuarioAuth = req.usuarioAuth;
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  res.status(200).json({ usuario, usuarioAuth });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
