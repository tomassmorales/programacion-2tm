
let data = require('../modules/science');

const heroeController = {
	index: function(req,res){
		return res.send(data.lista);
	},
	show: function(req,res){
		let id = req.params.id;
		let resultado = ``;

		if (id < data.lista.length) {
			for(let i = 0; i < data.lista.length; i++){
				let heroe = data.lista[i];
				if(heroe.id == id){
					resultado = heroe;
					return res.send(`Hola, mi nombre es ${resultado.nombre} y soy ${resultado.profesion}`);
				}
			}
		} else {
			res.send(`No encontramos al científico indicado. Por favor, elija otro id`)
		}
	},
	getBio: function(req,res){
		let id = req.params.id;
		let ok = req.params.ok;
		let resultado = ``;

		if (id < data.lista.length) {
			for(let i = 0; i < data.lista.length; i++){
				let heroe = data.lista[i];
				if(heroe.id == id && ok !== undefined || ok == "ok"){
					resultado = heroe;
					return res.send(`Sobre ${resultado.nombre}: ${resultado.resenia}`);
				}else {
					resultado = heroe;
					return res.send(`${resultado.nombre} dice: Lamento que no desees saber más de mi :(`)	
				}
			}
		} else {
			res.send(`No encontramos al científico indicado para mostrar su biografia`)
		}
	},
};

module.exports = heroeController;