'use strict'

const express = require('express');
const api = express.Router();
const coches = require('../controllers/coches');
const usuarios = require('../controllers/user')
const auth = require('../middleware/auth');




api.get('/usuarios', auth, usuarios.getUsuarios);
api.post('/usuarios', usuarios.saveUsuario);
api.post('/usuarios/tokens', usuarios.getToken);



api.get('/coches',coches.getCoches);
api.post('/coches', auth, coches.saveCoche);

api.get('/coches/:productId',coches.getCoche); 
api.put('/coches/:productId', auth, coches.rentCoche);



module.exports = api;