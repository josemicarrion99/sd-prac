const express = require('express');
const router = express.Router();

const Product = require('../models/product'); //Importamos el esquema de bd de models

//esto es una funcion de middleware donde req tiene acceso al objeto requested,
//res al de respuesta y next a la siguiente funcion en el ciclo de respuesta de la aplicacion
router.get('/coches/', async(req, res) =>{
    const products = await Product.find(); //nos traemos los datos de la bd, y como tenemos que esperar usamos el async y await
    res.render('index', {
        products // es lo mismo que poner products: products
        //y nos permite pasarle la bd a la vista
    }); //aqui llamo al index.ejs que está en views

});

router.get('/coches/:id', async(req, res) =>{
    const {id} = req.params;
    const product = await Product.findById(id); 

    res.render('singleObject', {
        product 
    }); 

});

router.post('/coches/add', async(req, res) => {
    //console.log(new Product(req.body)); esto es para mostrarlo por terminal
    const product = new Product(req.body); //definimos dato
    await product.save(); //lo almacenamos
    res.redirect('/coches/');
});

router.get('/coches/turn/:id', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id); //ponemos await proque es una operacion de la bbdd
    product.disponible = !product.disponible;
    await product.save();
    res.redirect('/coches/');

});

router.get('/coches/delete/:id', async (req,res) =>{
    const {id} = req.params;
    await Product.remove({_id: id});
    res.redirect('/coches/');
});

router.get('/coches/edit/:id', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id); //ponemos await proque es una operacion de la bbdd
    res.render('edit', {
        product
    });
});

router.post('/coches/edit/:id', async (req, res) => {
    const {id} = req.params;
    await Product.update({_id: id}, req.body);
    res.redirect('/coches/');

});


module.exports = router;
