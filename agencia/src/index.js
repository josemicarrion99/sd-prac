'use strict'

const app = require('./app');
const config = require('./config');
const https = require('https');
const fs = require('fs');

const opciones = {
    key: fs.readFileSync(__dirname + '/cert/key.pem'),
    cert: fs.readFileSync(__dirname + '/cert/cert.pem')
};

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

console.log('Establecida la conexion con la BBDD');

https.createServer(opciones, app).listen(config.port, () =>{
    console.log(`Servidor escuchando en https://localhost:${config.port}/api`);
});
