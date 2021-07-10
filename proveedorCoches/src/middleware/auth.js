'use strict'

const moment = require('moment')
const config = require('../config')
const jwt = require('jwt-simple')

function isAuth(req, res, next){
    const auxAuth = req.headers.authorization;
    if(!auxAuth){
        return res.json({
            status: 'No ha sido incluido ningún token en la cabecera'
        })
    }

    const auxToken = auxAuth.split(" ")[1];
    var payload = 0;
    
    try{
        payload = jwt.decode(token, config.secretToken)
    }catch(err){
        return res.json({
            status: 'El token ha caducado/sido manipulado'
        })
    }

    req.user = {
        id: payload.sub,
        token: auxToken
    }

    next()
}

module.exports = isAuth;