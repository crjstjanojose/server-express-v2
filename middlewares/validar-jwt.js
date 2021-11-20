const { request } = require("express");
const jwt = require("jsonwebtoken");

const Usuario = require("../models/usuario");

const validarJWT = async (req = request, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la peticion",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.PUBLIC_KEY);

    const usuarioAuth = await Usuario.findById(uid);

    if (!usuarioAuth) {
      return res.status(401).json({
        msg: "Token no válido - usuario borrado DB",
      });
    }

    if (!usuarioAuth.estado) {
      return res.status(401).json({
        msg: "Token no válido - estado",
      });
    }

    req.usuarioAuth = usuarioAuth;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "Token no valido" });
  }
};

module.exports = { validarJWT };
