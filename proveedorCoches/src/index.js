const app = require("./app");
const config = require('./config');
const mongoose = require('mongoose');
const https = require('https');

const fs = require('fs');

const opciones = {
    key: fs.readFileSync(__dirname + '/cert/key.pem'),
    cert: fs.readFileSync(__dirname + '/cert/cert.pem')
};
/*
// starting the server
app.listen(app.get("port"), () => {
  console.log(`server on port ${app.get("port")}`);
});
*/
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

mongoose.connect(config.DB_URL,(err,res)=>{

  if(err){
       return console.log(`Error al conectar al conectar a la base de datos: ${err}`)
      //si no esta conectado la bbdd  lanzara error
  }
  console.log(`Conexion a la base de datos establecida... \n Escuchando en puerto ${config.port}`);

  
  /*app.listen(config.port, () => {
    console.log(`server on port ${config.port}`);
  });
  */
  https.createServer(opciones, app).listen(config.port);
});