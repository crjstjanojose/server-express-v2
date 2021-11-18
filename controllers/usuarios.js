const { response, request } = require("express");

const usuariosGet = (req = request, res = response) => {
  const { q, nombre, apikey } = req.query;
  res
    .status(200)
    .json({ ok: true, msg: "GET - API Controlador", q, nombre, apikey });
};

const usuariosPut = (req, res) => {
  const { id } = req.params;
  res.status(200).json({ ok: true, msg: "PUT - API Controlador", id });
};

const usuariosPost = (req, res) => {
  const { nombre, edad } = req.body;

  res
    .status(201)
    .json({ ok: true, msg: "POST - API Controlador", nombre, edad });
};

const usuariosPatch = (req, res) => {
  res.status(200).json({ ok: true, msg: "PATCH - API Controlador" });
};

const usuariosDelete = (req, res) => {
  res.status(200).json({ ok: true, msg: "DEL - API Controlador" });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
