const express = require("express");
const cors = require("cors"); //nos permite aceptar otras peticiones de otros servidores
const morgan = require("morgan");
const bodyParser = require('body-parser');
const app = express();

// Settings

// Middlewares
app.use(cors());
//Si pusieramos esto, solo aceptariamos peticiones del puerto 4200:
//app.use(cors(origin: "http://localhost:4200"));
app.use(morgan("dev"));

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());//para poder procesar Json

// Routes
app.use("/api/banco", require("./routes/cuenta.routes"));

module.exports = app;
