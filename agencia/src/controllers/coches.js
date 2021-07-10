'use strict'

const config = require('../config.js');
const fetch = require('node-fetch');

const URL = config.urlCoches;

function getCoches(req, res, next){
    console.log(URL);
    fetch(URL)

    .then(res => res.json()) // me convierte a tipo json la respuesta

    .then(myjson => { //declaramos un myjson don de metemos la respuesta del servidor
        res.json(myjson)
    })
    
    .catch(error => {
        res.json({
            msg: 'El servidor está deshabilitado.',
        })
        next() 

    })
}

function getCoche(req, res, next){
    const productId = req.params.productId;
    console.log(URL);

    fetch(`${URL}/${productId}`)

    .then(res => res.json()) // me convierte a tipo json la respuesta

    .then(myjson => { //declaramos un myjson don de metemos la respuesta del servidor
        res.json(myjson)
    })
    
    .catch(error => {
        res.json({
            msg: 'El servidor está deshabilitado.',
        })
        next() 

    })
}

function saveCoche(req, res, next){

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
            msg: 'El servidor está deshabilitado.',
        })
        next() 

    })
}


function rentCoche(req, res, next){
    console.log(URL);

    const productId = req.params.productId;


    fetch(`${URL}/${productId}`, {
        method: 'PUT',
        body: JSON.stringify(req.body),
        headers: {
            'Content-Type': 'application/json',

        }

    })

    .then(res => res.json()) // me convierte a tipo json la respuesta

    .then(myjson => { //declaramos un myjson don de metemos la respuesta del servidor
        res.json(myjson)
        next();
    })
    
    .catch(error => {
        res.json({
            msg: 'El servidor está deshabilitado.',
        })
        next() 

    })
}



function updateCoche(req, res, next){
    const update = req.params.id
    const save = req.body
    const newURL = `${url}/${update}`
    fetch(newURL, {method: 'PUT', body: JSON.stringify(save), headers: { 'Content-type' : 'application/json' } })
    .then(res => res.json())
    .then(myjson => {
        res.json(myjson)
    })
    .catch(error => {
        res.json({ msg: 'Reintentelo más tarde' })
        next()
    })
}


module.exports = {
    getCoches,
    getCoche,
    rentCoche,
    saveCoche
}