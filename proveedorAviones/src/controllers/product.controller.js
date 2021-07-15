const Product = require("../models/product");

const productCtrl = {};

productCtrl.getProducts = async (req, res, next) => {
  const products = await Product.find();
  res.json(products);
};

productCtrl.createProduct = async (req, res, next) => {
  const product = new Product({ //definimos dato
    salida: req.body.salida,
    destino: req.body.destino,
    precio: req.body.precio,
    soloIda: req.body.soloIda,

    reservadoDesde: req.body.reservadoDesde,
    reservadoHasta: req.body.reservadoHasta,
  });

  await product.save(); //lo almacenamos (ponemos await porque es una operación de la bbdd)
  res.json({ status: "Product created" });
};

productCtrl.getProduct = async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.json(product);
};

productCtrl.editProduct = async (req, res, next) => {
  const { id } = req.params;
  await Product.findByIdAndUpdate(id, {$set: req.body}, {new: true});
  res.json({ status: "Product Updated" });
};

productCtrl.deleteProduct = async (req, res, next) => {
  await Product.findByIdAndRemove(req.params.id);
  res.json({ status: "Product Deleted" });
};

module.exports = productCtrl;
