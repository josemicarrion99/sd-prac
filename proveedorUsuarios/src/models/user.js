const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, required: true, lowercase: true, index: true},
    nombre: { type: String, required: true },
    tarjetaCredito: { type: String, default: '0000-0000-0000-0000' },
    saldo: {type: Number, default: 0},


    password: {type: String},
  },
  {
    versionKey: false, //dato de cuando fue creado/modificado por ultima vez
    timestamps: true, //para que no añada el __v al crear un objeto
  }
);

module.exports = mongoose.model("User", userSchema); //permite que este archivo pueda ser importado por otro fichero
