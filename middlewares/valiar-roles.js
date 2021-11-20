const { response } = require("express");

const esAdminRole = (req, res = response, next) => {
  if (!req.usuarioAuth) {
    return res.status(500).json({
      msg: "Se quiere verificar el role sim validar el token primeiro",
    });
  }

  const { rol, nombre } = req.usuarioAuth;

  if (rol !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${nombre} no es administrador - No puede hacer esto`,
    });
  }

  next();
};

const tieneRole = (...roles) => {
  return (req, res = response, next) => {
    if (!req.usuarioAuth) {
      return res.status(500).json({
        msg: "Se quiere verificar el role sim validar el token primeiro",
      });
    }

    if (!roles.includes(req.usuarioAuth.rol)) {
      return res.status(401).json({
        msg: `Este servicio so pode ser acessado por usuario com perfil ${roles}`,
      });
    }

    next();
  };
};

module.exports = {
  esAdminRole,
  tieneRole,
};
