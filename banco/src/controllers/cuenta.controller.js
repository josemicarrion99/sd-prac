const Cuenta = require("../models/cuenta");

const cuentaCtrl = {};

cuentaCtrl.getCuentas = async (req, res, next) => {
  const cuentas = await Cuenta.find();
  res.json(cuentas);
};

cuentaCtrl.createCuenta = async (req, res, next) => {
  const cuenta = new Cuenta({ //definimos dato
    correoDelTitular: req.body.correoDelTitular,
    saldo: req.body.saldo,
    codigo: req.body.codigo,
  });

  await cuenta.save(); //lo almacenamos (ponemos await porque es una operación de la bbdd)
  res.json({ status: "Cuenta created" });
};

cuentaCtrl.getCuenta = async (req, res, next) => {
  const { id } = req.params;
  const cuenta = await Cuenta.findById(id);
  res.json(cuenta);
};

cuentaCtrl.editCuenta = async (req, res, next) => {
  const { id } = req.params;
  await Cuenta.findByIdAndUpdate(id, {$set: req.body}, {new: true});
  res.json({ status: "Cuenta Updated" });
};

cuentaCtrl.deleteCuenta = async (req, res, next) => {
  await Cuenta.findByIdAndRemove(req.params.id);
  res.json({ status: "Cuenta Deleted" });
};


module.exports = cuentaCtrl;
