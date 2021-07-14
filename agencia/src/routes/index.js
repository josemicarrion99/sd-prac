'use strict'

const express = require('express');
const api = express.Router();
const coches = require('../controllers/coches');
const aviones = require('../controllers/aviones');
const hoteles = require('../controllers/hoteles');
const usuarios = require('../controllers/user');
const cuentas = require('../controllers/cuenta');
const auth = require('../middleware/auth');




api.get('/usuarios', auth, usuarios.getUsuarios);
api.post('/usuarios', usuarios.saveUsuario);
api.post('/usuarios/tokens', usuarios.getToken);


api.get('/aviones',aviones.getAviones);
api.post('/aviones', auth, aviones.saveAvion);

api.get('/aviones/:productId',aviones.getAvion); 
api.put('/aviones/:productId', auth, aviones.rentAvion);



//Probablemente quite el post desde la agencia
api.get('/coches',coches.getCoches);
api.post('/coches', auth, coches.saveCoche);

api.get('/coches/:productId',coches.getCoche); 
api.put('/coches/:productId', auth, coches.rentCoche);




api.get('/hoteles',hoteles.getHoteles);
api.post('/hoteles', auth, hoteles.saveHotel);

api.get('/hoteles/:productId',hoteles.getHotel); 
api.put('/hoteles/:productId', auth, hoteles.rentHotel);



api.get('/banco',cuentas.getCuentas);
api.post('/banco', auth, cuentas.saveCuenta);

api.get('/banco/:productId',cuentas.getCuenta); 
api.put('/banco/:productId', auth, cuentas.putCuenta);


module.exports = api;