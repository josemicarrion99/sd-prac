const express = require("express");
const router = express.Router();

const cuenta = require("../controllers/cuenta.controller");

router.get("/", cuenta.getCuentas);

router.post("/", cuenta.createCuenta);

router.get("/:id", cuenta.getCuenta);

router.put("/:id", cuenta.editCuenta);

router.delete("/:id", cuenta.deleteCuenta);

module.exports = router;
