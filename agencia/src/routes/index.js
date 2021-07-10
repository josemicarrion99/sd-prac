'use strict'

const express = require('express');
const api = express.Router();
const coches = require('../controllers/coches')

api.get('/coches',coches.getCoches);
api.post('/coches',coches.saveCoche);

api.get('/coches/:productId',coches.getCoche); 
api.put('/coches/:productId', coches.rentCoche);



module.exports = api;