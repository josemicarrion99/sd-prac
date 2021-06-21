const express = require('express');
const router = express.Router();

const Task = require('../models/task'); //Importamos el esquema de bd de models

//esto es una funcion de middleware donde req tiene acceso al objeto requested,
//res al de respuesta y next a la siguiente funcion en el ciclo de respuesta de la aplicacion
router.get('/', async(req, res) =>{
    const tasks = await Task.find(); //nos traemos los datos de la bd, y como tenemos que esperar usamos el async y await
    res.render('index', {
        tasks // es lo mismo que poner tasks: tasks
        //y nos permite pasarle la bd a la vista
    }); //aqui llamo al index.ejs que está en views

});

router.post('/add', async(req, res) => {
    //console.log(new Task(req.body)); esto es para mostrarlo por terminal
    const task = new Task(req.body); //definimos dato
    await task.save(); //lo almacenamos
    res.redirect('/');
});

router.get('/turn/:id', async (req, res) => {
    const {id} = req.params;
    const task = await Task.findById(id); //ponemos await proque es una operacion de la bbdd
    task.status = !task.status;
    await task.save();
    res.redirect('/');

});

router.get('/delete/:id', async (req,res) =>{
    const {id} = req.params;
    await Task.remove({_id: id});
    res.redirect('/');
});

router.get('/edit/:id', async (req, res) => {
    const {id} = req.params;
    const task = await Task.findById(id); //ponemos await proque es una operacion de la bbdd
    res.render('edit', {
        task
    });
});

router.post('/edit/:id', async (req, res) => {
    const {id} = req.params;
    await Task.update({_id: id}, req.body);
    res.redirect('/');

});


module.exports = router;
