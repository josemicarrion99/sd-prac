const mongoose = require("mongoose");
const { Schema } = mongoose;

const cuentaSchema = new Schema(
  {
    correoDelTitular: { type: String, required: true },
    saldo: { type: Number, default: 0 },
    codigo: { type: String, required: true },

  },
  {
    versionKey: false, //dato de cuando fue creado/modificado por ultima vez
    timestamps: false, //para que no añada el __v al crear un objeto
  }
);

module.exports = mongoose.model("Cuenta", cuentaSchema); //permite que este archivo pueda ser importado por otro fichero
