//controladores.
//creamos una funcion que devuelve una vista o un resultado, lo ponemos como funcion de una ruta

//home controller

module.exports = {//guarda en el modulo las funciones
	//funcion del controlador
	index : function(req,res,next){
		res.render('index', {title : 'Bienvenido al crud con NODE JS'});
	}
}