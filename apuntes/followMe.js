//Necesitamos en la base de datos una tabla nueva de seguidores

const { ESRCH } = require("constants")
const { defaultMaxListeners } = require("events")
const db = require("../sequelize/seq/database/models")

// // CREATE TABLE seguidores(
// 	id INT  AUTO_INCREMENT PRIMARY,
// 	seguidor INT UNSIGNED,
// 	seguido INT UNSIGNED,
// 	FOREIGN KEY (seguidor) REFERENCES users(id),
// 	FOREIGN KEY (seguido) REFERENCES users(id),	
// );

//Vamos a crear el modelo follower en base a esta tabla para manipular estas relaciones

//Hacemos la relación del lado del modelo de usuario (M:M)

User.associate = function(models){
	User.belongsToMany(models.User , { //se relaciona consigo mismo
		as: "seguidos",
		through: "seguidores",
		foreignKey: "seguidor",
		otherKey: "seguido",
		timestamps: false
	}),
	User.belongsToMany(models.User , { //se relaciona consigo mismo
		as: "seguidor",
		through: "seguidores",
		foreignKey: "seguido",
		otherKey: "seguidor",
		timestamps: false
	}) 
}

//Donde se guarda la informacion de session? -> en el servidor

//Necesitamos una página de perfil del usuario logeado: vamos al archivo de rutas de usuario y hacemos una ruta por get para traer la vista del detalle
//En el controlador validamos si el usuario está logeado o no para dejarlo acceder al detalle de usuario,
//Despues usamos un findbypk para encontrar al usuario logeado, el id estara en req.session.user.id
//En el .then renderizamos la vista de detalle mandando la informacion del usuario como parametro compartido

//Hacemos una ruta de detalle de usuario que tenga un parametro :id,
//En el controlador hacemos un findbypk donde el id sera req.params.id, el el then hacemos un render de la página de detalle enviando la informacion del usuario obtenida.

//En el detalle de usuario ponemos dos formularios por metodo post que tenga un boton para seguir y otro formulario que tenga uno para dejar de seguir

//Ponemos en los formularios, en el action la ruta por la cual vamos a ejecutar la accion (donde le mandamos el id del usuario como parametro)
//<%= detail.id %>
//En las rutas creamos la ruta por metodo post con un parametro :id

//En el controlador validamos que exista la session con una condicional:
//Si no existe lo redirigimos al login
//Si existe la session hacemos

db.Seguidores.create({
	seguidor: req.session.user.id,
	seguido: req.params.id
})
.then(user =>{
	res.redirect("user/detail/" + req.params.id) //nos redirige de vuelta al perfil de quien seguimos
})

//En el controlador de la página de detalle le incluimos las relaciones de seguidos y seguidores y en el .then ponemos

.then(detail =>{
	let loSigue = false;
	for(let i = 0 ; i < detail.seguidor.length; i++){
		if(req.session.user.id == detail.seguidor[i].id){ //recorremos el array de seguidores para ver si está el usuario logeado
			let loSigue = true; // a esta variable la pasamos como param compartido al render del detalle
		}
	}
})

//En el la vista del detalle hacemos una condicional

if(loSigue){
	//mostramos el boton de dejar de seguir
}else{
	//mostramos el boton de seguir
}

//Para hacer el unfollow tenemos que crear una nueva ruta por post, le agregamos al action del form de dejar de seguir esta ruta que tendra el parametro id
//Validamos en el controlador que el usuario este logeado, si no lo esta es redireccionado al login, en caso de que este logeado:

db.Seguidor.destroy({
	where: {
		[Op.and]: [
			{seguidor: req.session.user.id},
			{seguido: req.params.id}
		]
	}
})
.then (user =>{
	res.redirect("user/detail/" + req.params.id)
})


//preguntas de final: 
//por que agus usa siempre el then? por que es una promesa, que es una promesa? busca un dato de manera asincronica
// que es asincronico?
//por que se usa el redirect? por el uso del metodo post, por que se pone user/login y no /login directamente? por que tiene que ser específico
//donde se guarda la session? en el servidor, las cookies en el navegador
//para que sirve el associate? para asociar la tabla, para que me ayuda el belongsToMany? para hacer la relacion muchos a muchos
//cuales otros tenemos? hasMany
//que es el "as" y para que sirve?