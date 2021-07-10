'use strict'

const Bcrypt    = require('bcrypt-nodejs')


function comparaPassword(password, hash){
    return Bcrypt.compareSync(password, hash);
}

module.exports = {
    comparaPassword
}