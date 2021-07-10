const express = require("express");
const router = express.Router();

const user = require("../controllers/user.controller");

router.get("/usuarios", user.getUsuarios);

router.post("/usuarios", user.createUsuario);

router.post("/tokens", user.getToken);

module.exports = router;
