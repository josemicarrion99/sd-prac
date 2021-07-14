const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    modelo: { type: String, required: true },
    matricula: { type: String, required: true },
    precio: { type: Number, required: true },
    disponible: { type: Boolean, default: true },
    reservadoDesde: {type: Date},
    reservadoHasta: {type: Date}
  },
  {
    versionKey: false, //dato de cuando fue creado/modificado por ultima vez
    timestamps: false, //para que no añada el __v al crear un objeto
  }
);

module.exports = mongoose.model("Product", productSchema); //permite que este archivo pueda ser importado por otro fichero
