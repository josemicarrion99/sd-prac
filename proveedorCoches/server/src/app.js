const express = require("express");
const cors = require("cors"); //nos permite aceptar otras peticiones de otros servidores
const morgan = require("morgan");

const app = express();

// Settings
app.set("port", process.env.PORT || 3100);

// Middlewares
app.use(cors());
//Si pusieramos esto, solo aceptariamos peticiones del puerto 4200
//app.use(cors(origin: "http://localhost:4200"));
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/coches", require("./routes/product.routes"));

module.exports = app;
