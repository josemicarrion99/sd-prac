'use strict'

const express = require('express');
const api = express.Router();
const coches = require('../controllers/coches');
const usuarios = require('../controllers/user');
const cuentas = require('../controllers/cuenta');
const auth = require('../middleware/auth');




api.get('/usuarios', auth, usuarios.getUsuarios);
api.post('/usuarios', usuarios.saveUsuario);
api.post('/usuarios/tokens', usuarios.getToken);


//Probablemente quite el post desde la agencia
api.get('/coches',coches.getCoches);
api.post('/coches', auth, coches.saveCoche);

api.get('/coches/:productId',coches.getCoche); 
api.put('/coches/:productId', auth, coches.rentCoche);



api.get('/banco',cuentas.getCuentas);
api.post('/banco', auth, cuentas.saveCuenta);

api.get('/banco/:productId',cuentas.getCuenta); 
api.put('/banco/:productId', auth, cuentas.putCuenta);


module.exports = api;