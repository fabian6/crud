var fs = require('fs');//se requiere modulos.
var path = require('path');//rutas en nodejs

var files = fs.readdirSync(__dirname);//se encarga de guardar los archivos de la carpeta controllers

files.forEach(function(file){

	var fileName = path.basename(file, '.js');
	if(fileName !== 'index'){
		exports[fileName] = require('./' + fileName);// exportsretorna el modulo y require me lo da.
	}
});