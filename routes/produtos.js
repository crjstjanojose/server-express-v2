const { Router } = require("express");
const { check } = require("express-validator");
const {
  obtenerProdutos,
  obtenerProduto,
  actualizarProduto,
  crearProduto,
  borrarProduto,
} = require("../controllers/produtos");
const { existeCategoria, existeProduto } = require("../helpers/db-validators");
const { validarCampos, esAdminRole } = require("../middlewares");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", obtenerProdutos);
router.get(
  "/:id",
  [
    check("id", "El ID no es um ID Mongo").isMongoId(),
    check("id").custom(existeProduto),
    validarCampos,
  ],
  obtenerProduto
);
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", "No es um id de Mongo").isMongoId(),
    check("categoria").custom(existeCategoria),
    validarCampos,
  ],
  crearProduto
);
router.put(
  "/:id",
  [
    validarJWT,
    check("id", "El ID no es um ID Mongo").isMongoId(),
    check("id").custom(existeProduto),
    check("categoria", "No es um id de Mongo").isMongoId(),
    check("categoria").custom(existeCategoria),
    validarCampos,
  ],
  actualizarProduto
);
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "El ID no es um ID Mongo").isMongoId(),
    check("id").custom(existeProduto),
    validarCampos,
  ],
  borrarProduto
);

module.exports = router;
