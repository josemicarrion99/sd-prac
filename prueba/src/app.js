
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
//conectando con las base de datos
mongoose.connect('mongodb://localhost/prueba')
 .then(db => console.log('Db connected'))
 .catch(err => console.log(err));

//importamos rutas
const indexRoutes = require('./routes/index');



//Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views')); //dirname nos pone en el directorio actual y join hace que el movernos por directorios sirva tanto en windows como en linux
app.set('view engine', 'ejs'); //aqui declaramos los .ejs para las vistas, motor de plantillas


//Middlewares
//Procesamos los datos antes de que lleguen a las rutas
app.use(morgan('dev')); //nos muestra por la terminal los procesos de paquetes
app.use(express.urlencoded({extended: false})); //le permite entender los formatos html a pasarlos a json


//Rutas
app.use('/', indexRoutes); //usamos las rutas importadas del directorio routes


//Inicializamos el server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});