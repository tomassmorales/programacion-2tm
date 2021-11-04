module.exports = function(sequelize, dataTypes){

	//Definir un alias.
	let alias = 'Actor'; //Con este alias sequelize va a identificar internamente al archivo de modelo.
    
	//Describir la configuración de las columnas de la tabla
	let columnas = {
	    id:{
		autoIncrement: true,
		primaryKey: true,
		type: dataTypes.INTEGER,
	    },
	    first_name:{
		type: dataTypes.STRING,
	    },
	    last_name:{
		type: dataTypes.STRING,
	    },
	    rating:{
		    type:dataTypes.INTEGER
	    }
	}
    
	let configuracionDeLaTabla = {
	    tableName: 'actors', 
	    timestamps: false, //Si la tabla no tiene los campos created_at y updated_at
	    underscored: true, //Si los nombres de las columnas en la db tienen guiones bajos en lugar de camelCase.        
	}
    
       const Actor = sequelize.define(alias, columnas, configuracionDeLaTabla);

       Actor.associate = function(models){
	Actor.belongsToMany(models.Movie, {
		as: "movies",
		foreignKey: "actor_id",
		otherKey: "movie_id",
		through: "actor_movie",
		timestamps: false
	})
       }




       return Actor;
    }