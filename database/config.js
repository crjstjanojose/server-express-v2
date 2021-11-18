const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Base de Dados Ativa");
  } catch (error) {
    console.log(error);
    throw new Error("Não foi possivel conectar ao banco de dados");
  }
};

module.exports = { dbConnection };
