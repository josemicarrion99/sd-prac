'use strict'

const express = require('express');
const app = express();
const api = require('./routes/index.js');
const path = require('path'); //que hace?
const bodyParser = require('body-parser');


const logger = require('morgan');
const fetch = require('node-fetch');//para la bbdd


const cors = require("cors"); //nos permite aceptar otras peticiones de otros servidores
app.use(cors());

//express.json();
//express.urlencoded({extended:false});

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());//permite procesar Json

//Seguridad
const fs = require('fs');
const helmet = require('helmet');

app.use(helmet());
//var accessLogStream = fs.createWriteStream(path.join(__dirname, './logs/access.log'), {flags: 'a'});

//app.use(logger('combined', {stream: accessLogStream}));


app.use('/api', api);


module.exports = app;