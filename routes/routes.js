var express = require('express');
var router = express.Router();

var controllers = require('.././controllers');//importamos los controladores, encuentra el primer index.js


/* GET home page. */
router.get('/', controllers.homecontroller.index);

//rutas para productos
router.get('/productos', controllers.productoscontroller.getProductos);//primero es la ruta luego la funcion
router.get('/nuevo', controllers.productoscontroller.getNuevoProducto);
router.post('/crearproducto', controllers.productoscontroller.postNuevoProducto);
router.post('/eliminarproducto', controllers.productoscontroller.eliminarProducto);
router.get('/modificar/:id', controllers.productoscontroller.getModificarProducto);
router.post('/editar', controllers.productoscontroller.postModificarProducto);
module.exports = router;
