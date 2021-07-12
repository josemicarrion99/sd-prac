'use strict'

const config = require('../config.js');
const fetch = require('node-fetch');

const URL = config.urlUsuarios;

function getUsuarios(req, res, next){
    
    console.log(URL);

    const auxToken = req.user.token;

    fetch(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${auxToken}` 
        },
        //body: JSON.stringify(req.body),

    })

    .then(res => res.json()) // me convierte a tipo json la respuesta

    .then(myjson => { //declaramos un myjson don de metemos la respuesta del servidor
        res.json(myjson)
    })
    
    .catch(error => {
        res.json({
            status: 'El servidor está deshabilitado.',
        })
        next() 

    })
}

function getToken(req, res, next){
    const productId = req.params.productId;
    console.log(`${URL}/tokens`);

    fetch(`${URL}/tokens`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),

    })


    .then(res => res.json()) // me convierte a tipo json la respuesta

    .then(myjson => { //declaramos un myjson don de metemos la respuesta del servidor
        res.json(myjson)
        console.log(myjson);
    })
    
    .catch(error => {
        res.json({
            status: 'El servidor está deshabilitado.',
        })
        next() 
 
    })
}

function saveUsuario(req, res, next){

    console.log(URL);


    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),

    })

    .then(res => res.json()) // me convierte a tipo json la respuesta

    .then(myjson => { //declaramos un myjson don de metemos la respuesta del servidor
        res.json(myjson)
    })
    
    .catch(error => {
        res.json({
            status: 'El servidor está deshabilitado.',
        })
        next() 

    })
}






module.exports = {
    getUsuarios,
    getToken,
    saveUsuario
}