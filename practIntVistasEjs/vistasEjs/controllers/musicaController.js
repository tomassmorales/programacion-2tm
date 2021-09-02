const bandas = require("../data/bandas")

const musica = {
	index: function(req,res){
		let artistas = bandas.lista;
		res.render("index", {bandasInfo: artistas})
	},
	porId: function (req,res){

		let idSelec = req.params.id;

		let artistas = [];

		for(let i = 0; i < bandas.lista.length; i++){
			let bandaId = bandas.lista[i].id;

			if(idSelec == bandaId){
				artistas.push(bandas.lista[i])
			}
		}
		if(artistas.length > 0){
		res.render("detalleBanda", {bandasInfo: artistas})
	}else{
		res.send("No encontramos bandas para ese id");	
	}
	},
	porGenero: function (req,res){

		let generoSelec = req.params.genero;

		let artistas = [];

		for(let i = 0; i < bandas.lista.length; i++){
			let bandaGenero = bandas.lista[i].genero;

			if(generoSelec.toLowerCase() == bandaGenero.toLowerCase()){
				artistas.push(bandas.lista[i])
			}
		}
		if(artistas.length > 0){
		res.render("porGenero", {
			bandasInfo: artistas,
			genero: generoSelec,
		})
	}else {
		res.send("No encontramos bandas para ese genero");
	}
	},

}

module.exports = musica;