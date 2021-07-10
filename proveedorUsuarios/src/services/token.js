const jwt = require ('jwt-simple')
const moment = require('moment')
const config = require ('../../../proveedorCoches/server/src/config')


function createToken( user ){
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(config.TOKEN_TIME, 'minutes').unix()
    };
    return jwt.encode(payload, config.SECRET_TOKEN);
}


function decodeToken(token){
    const payload = jwt.decode(token, config.SECRET_TOKEN, true);
    return payload.sub;
}

module.exports = {
    createToken,
    decodeToken
}