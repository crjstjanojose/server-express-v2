const { Schema, model } = require("mongoose");

const ProdutoSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  precio: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
  },
  disponible: {
    type: Boolean,
    default: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: "Categoria",
    required: true,
  },
});

// SUBSCRITA DO TO JSON
ProdutoSchema.methods.toJSON = function () {
  const { __v, estado, _id, ...produto } = this.toObject();
  produto.uid = _id;
  return produto;
};

module.exports = model("Produto", ProdutoSchema);
