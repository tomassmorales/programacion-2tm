module.exports = function(sequelize, dataTypes){

	//Definir un alias.
	let alias = 'Genre'; //Con este alias sequelize va a identificar internamente al archivo de modelo.
    
	//Describir la configuración de las columnas de la tabla
	let columnas = {
	    id:{
		autoIncrement: true,
		primaryKey: true,
		type: dataTypes.INTEGER,
	    },
	    name:{
		type: dataTypes.STRING,
	    },
	    ranking:{
		type: dataTypes.INTEGER,
	    },
	    active:{
		type: dataTypes.INTEGER,
	    }
	}
    
	let configuracionDeLaTabla = {
	    tableName: 'genres', 
	    timestamps: false, //Si la tabla no tiene los campos created_at y updated_at
	    underscored: true, //Si los nombres de las columnas en la db tienen guiones bajos en lugar de camelCase.        
	}
    
       const Genre = sequelize.define(alias, columnas, configuracionDeLaTabla);

       Genre.associate = function(models){
	Genre.hasMany(models.Movie, {
		as: "peliculas",
		foreignKey: "genre_id"	       
	})
}

    
       return Genre;
    }