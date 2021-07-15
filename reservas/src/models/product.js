const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    idCoche: { type: String },
    idAvion: { type: String },
    idHotel: { type: String },
    precio: {type: Number},


  },
  {
    versionKey: false, //dato de cuando fue creado/modificado por ultima vez
    timestamps: false, //para que no añada el __v al crear un objeto
  }
);

module.exports = mongoose.model("Product", productSchema); //permite que este archivo pueda ser importado por otro fichero
