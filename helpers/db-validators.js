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

module.exports = { esRolValido, existeCorreo, existeUsuarioPorId };
