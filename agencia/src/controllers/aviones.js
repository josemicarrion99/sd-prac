'use strict'

const config = require('../config.js');
const fetch = require('node-fetch');

const URL = config.urlAviones;

function getAviones(req, res, next){
    console.log(URL);
    fetch(URL)

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

function getAvion(req, res, next){
    const productId = req.params.productId;
    console.log(URL);

    fetch(`${URL}/${productId}`)

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

function saveAvion(req, res, next){

    console.log(URL);

    const auxToken = req.user.token;

    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${auxToken}` 
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


function rentAvion(req, res, next){
    console.log(URL);

    const productId = req.params.productId;
    const auxToken = req.user.token;

    fetch(`${URL}/${productId}`, {
        method: 'PUT',
        body: JSON.stringify(req.body),
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${auxToken}` 
        }

    })

    .then(res => res.json()) // me convierte a tipo json la respuesta

    .then(myjson => { //declaramos un myjson don de metemos la respuesta del servidor
        res.json(myjson)
        next();
    })
    
    .catch(error => {
        res.json({
            status: 'El servidor está deshabilitado.',
        })
        next() 

    })
}




module.exports = {
    getAviones,
    getAvion,
    rentAvion,
    saveAvion
}