const mongoose = require('mongoose'); //ya estamos conectados a la bd
const Schema = mongoose.Schema; //creamos un tipo mongoose para la validacion de datos


const TaskSchema = new Schema({
    title: String,
    description: String,
    status: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('tasks', TaskSchema); //permite que este archivo pueda ser importado por otro fichero




