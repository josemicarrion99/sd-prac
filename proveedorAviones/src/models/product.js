const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    salida: { type: String, required: true },
    destino: { type: String, required: true },
    precio: { type: Number, required: true },
    soloIda: {type: Boolean},

    disponible: { type: Boolean, default: true },
    correoComprador: {type: String},
    reservadoDesde: {type: Date},
    reservadoHasta: {type: Date}
  },
  {
    versionKey: false, //dato de cuando fue creado/modificado por ultima vez
    timestamps: false, //para que no añada el __v al crear un objeto
  }
);

module.exports = mongoose.model("Product", productSchema); //permite que este archivo pueda ser importado por otro fichero
