const { Router } = require("express");
const { check } = require("express-validator");

const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosPatch,
} = require("../controllers/usuarios");
const {
  esRolValido,
  existeCorreo,
  existeUsuarioPorId,
} = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get("/", usuariosGet);

router.post(
  "/",
  [
    check("nombre", "El nombre es oblitatorio").not().isEmpty(),
    check(
      "password",
      "El password es oblitatorio e deve ter mais de 6 caracteres"
    ).isLength({ min: 6 }),
    check("correo", "El correo no es valido").isEmail(),
    check("correo").custom(existeCorreo),
    // check("rol", "No es um rol permitido").isIn([
    //   "ADMIN_ROLE",
    //   "USER_ROLE",
    //   "VENTAS_ROLE",
    // ]),
    check("rol").custom(esRolValido),
  ],
  validarCampos,
  usuariosPost
);

router.put(
  "/:id",
  [
    check("id", `No es um id valido`).isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  usuariosPut
);

router.delete(
  "/:id",
  [
    check("id", `No es um id valido`).isMongoId(),
    check("id").custom(existeUsuarioPorId),
  ],
  validarCampos,
  usuariosDelete
);

router.patch("/", usuariosPatch);

module.exports = router;
