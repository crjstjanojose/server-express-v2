const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSingIn } = require("../controllers/auth");
const { existeCorreo } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post(
  "/login",
  [
    check("correo", "El correo es obligatorio").isEmail(),
    check("password", "El contraseña es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  login
);

router.post(
  "/google",
  [
    check("id_token", "Token (id_token) de Google es necessario.")
      .not()
      .isEmpty(),
    validarCampos,
  ],
  googleSingIn
);

module.exports = router;
