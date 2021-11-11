//las relaciones en sequelize sirven paraoptimizar la obtención de datos en una consulta a la base de datos
//Se aplican en el modelo, usamos la propiedad .associate (se usa una vez por modelo): almacena un callback que recibe un parametro,
//Este parametro es un objeto que contiene todos los modelos, pudiendo asi acceder a ellos.

Movie.associate = function (models){
	//relaciones
}

//Relaciones, usamos metodos .belongsTo() y hasMany(), se ponen dontro del associate

// belongs to es para identificar al modelo que pertenece a otro en una relacion de 1 a muchos, recibe 2 parametros:
//el modelo con el que se va a relacionar y un objeto literal donde detallamos la configuración de la relación en sí.

Movie.associate = function (models){
	Movie.belongsTo(models.Genres, {
		as: "genre", //alias definido en el modelo
		foreignKey: "genre_id" //foreign key que identifica
	});
}

//has many, en una relacion de uno a muchos seria quien tiene los muchos

Genre.associate = function (models){
	Movie.belongsTo(models.Movie, {
		as: "movies", //alias definido en el modelo
		foreignKey: "genre_id" //foreign key que identifica
	});
}

//metodo belongsToMany() es un metodo que indica la relacion de muchos a muchos, 2 parametros: 
//el modelo con el que se relaciona y un objeto con las configuraciones

Movie.associate = function (models){
	Movie.belongsToMany(models.Actor, {
		as: "actors", //alias definido en el modelo
		through: "actor_movie", //a traves de que tabla hacemos la relación
		foreignKey: "movie_id", //foreign key de la tabla con la que estamos trabajando
		otherKey: "actor_id", // fk de la entidad con la que hacemos la relacion
		timestamps: false
	});
}

//Usando las relaciones en el controlador:
//podemos usar las relaciones para acceder a información mucho más facil
//usamos el metodo include que va a recibir un array de objetos literales, cada uno de ellos representa una relacion
//tienen un atributo llamado association y su valor sera el alias que definimos en el modelo para llamar a la relacion

db.Movie.findAll({
	include: [
		{association:"genre"},
		{association:"actors"}
	]
})
//...

//en la vista podemos acceder esta informacion por medio de una variable que tiene le nombre del alias y podemos acceder a sus valores con un punto