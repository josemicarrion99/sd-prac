const jwt = require ('jwt-simple')
const moment = require('moment')
const config = require ('../config')


function createToken( user ){
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(config.tokenTime, 'minutes').unix()

    };

    return jwt.encode(payload, config.secretToken);
}


function decodeToken(token){
    const payload = jwt.decode(token, config.secretToken, true);
    return payload.sub;
}

module.exports = {
    createToken,
    decodeToken
}