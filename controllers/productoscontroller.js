var mysql = require('mysql');

var dateFormat = require('dateformat');
//controladores.
//creamos una funcion que devuelve una vista o un resultado, lo ponemos como funcion de una ruta

//productos controller

module.exports = {//guarda en el modulo las funciones
  //funcion del controlador
  getProductos : function(req,res,next){
    var config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();
    var productos = null;

    db.query('SELECT * FROM productos', function(err, rows, fields){
      if(err) throw err;
      productos = rows;
      db.end();
      res.render('productos/productos', {productos : productos});
    });


  },
  getNuevoProducto : function(req, res, next){
    res.render('productos/nuevo');
  },

  postNuevoProducto : function(req,res,next){
    var fechaActual = new Date();
    var fecha = dateFormat(fechaActual, 'yyyy-mm-dd-h:MM:ss');

    var producto = {
      nombre : req.body.nombre,
      precio : req.body.precio,
      stock : req.body.stock,
      fecha_creacion : fecha
    }
    //console.log(req.body);
    var config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();

    db.query('INSERT INTO productos SET ?', producto, function(err,rows,fields){
      if(err) throw err;
      db.end();
    });

    res.render('productos/nuevo', {info : 'Producto creado correctamente'});
  },

  eliminarProducto : function(req,res,next){
    var id= req.body.id;
    var config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();

    var respuesta = {res: false};
    db.query('DELETE FROM productos WHERE id_producto = ?', id, function(err,rows,fields){
      if(err) throw err;
      db.end();

      respuesta.res = true;//creando una propiedad

      res.json(respuesta);
    });

  },
  getModificarProducto : function(req, res, next){
    var id = req.params.id;//por get es params y por post es body

    var config = require('.././database/config');

    var db = mysql.createConnection(config);
    db.connect();

    var producto = null; //donde guardamos el producto

    db.query('SELECT * FROM productos WHERE id_producto = ?',id, function(err,rows,fields){
        if(err) throw err;
        producto = rows;
        db.end();

        res.render('productos/modificar', {producto: producto});
    });
  },
  postModificarProducto : function(req, res, next){
     var producto = {
      nombre : req.body.nombre,
      precio : req.body.precio,
      stock : req.body.stock,
      
    }
    var config = require('.././database/config');

    var db = mysql.createConnection(config);
    db.connect();
    db.query('UPDATE productos SET ? WHERE ?', [producto, {id_producto : req.body.id_producto}], function(err,rows,fields){
      if(err) throw err;

      db.end();
    });
    res.redirect('/productos');
  }
}
