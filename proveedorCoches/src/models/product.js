const mongoose = require('mongoose'); //ya estamos conectados a la bd
const Schema = mongoose.Schema; //creamos un tipo mongoose para la validacion de datos


const ProductSchema = new Schema({
    modelo: String,
    matricula: String,
    precio: {
        type: Number,
        default: -1
    },
    disponible: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('product', ProductSchema); //permite que este archivo pueda ser importado por otro fichero




