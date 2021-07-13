const Usuario = require("../models/user");
const token = require('../services/token');
const serv = require('../services/crypto');

const Bcrypt = require('bcrypt-nodejs');

const usuarioCtrl = {};

//Hecho
usuarioCtrl.getUsuarios = async (req, res, next) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
};

usuarioCtrl.createUsuario = async (req, res, next) => {
  console.log(req.body)
  var salt = Bcrypt.genSaltSync(10);

  let hash = Bcrypt.hashSync(req.body.password, salt);

  const usuario = new Usuario();

  Usuario.exists({email: `${req.body.email}`}, (err, doc) =>{
    if(doc){
      return res.json({status:'El usuario ya se encuentra en la BBDD'});

    }else if(err){
      return res.json({status:'Fallo a la hora de conectarse con la BBDD'});

    }else{
      usuario.email = req.body.email,
      usuario.nombre = req.body.nombre,
      usuario.tarjetaCredito = req.body.tarjetaCredito,
      usuario.password = hash

      usuario.save(); //lo almacenamos (ponemos await porque es una operación de la bbdd)
      res.json({ status: "Usuario created" });

    }
  })
};

usuarioCtrl.getToken = async (req, res, next) => {
  const password = req.body.password;

  Usuario.findOne({email: `${req.body.email}`}, (err, usuario) => {
    if(err){
      return res.json({status:'El usuario ya se encuentra en la BBDD'});

    }else if(usuario == null){
      return res.json({status:'Fallo a la hora de conectarse con la BBDD'});

    }else{

      let hash = usuario.password;

      if(serv.comparaPassword(password, hash)){

        const auxToken = token.createToken(usuario);

        return res.json({
          status: 'Loggueo exitoso',
          token: auxToken
        })
      }else{
        return res.json({status:'Usuario o contraseña invalido/s'});
      }

    }    
  });
  
  
}


module.exports = usuarioCtrl;
