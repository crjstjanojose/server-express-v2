const { Categoria, Produto } = require("../models");
const Role = require("../models/role");
const Usuario = require("../models/usuario");

const esRolValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registado en la BD`);
  }
};

const existeCorreo = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo ${correo} ya esta registado en la BD`);
  }
};

const existeUsuarioPorId = async (id) => {
  const usuario = await Usuario.findById(id);
  if (!usuario) {
    throw new Error(`No existe este ${id} registrado en la BD`);
  }
};

const existeCategoria = async (id) => {
  const categoria = await Categoria.findById(id);
  if (!categoria) {
    throw new Error(`No existe este ${id} de Categoria registrado en la BD`);
  }
};

const existeProduto = async (id) => {
  const produto = await Produto.findById(id);
  if (!produto) {
    throw new Error(`No existe este ${id} de Produto registrado en la BD`);
  }
};

module.exports = {
  esRolValido,
  existeCorreo,
  existeUsuarioPorId,
  existeCategoria,
  existeProduto,
};
