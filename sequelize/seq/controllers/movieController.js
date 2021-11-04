const db = require('../database/models');
const movie = db.Movie;
const op = db.Sequelize.Op;

const movieController = {
    index : function (req, res) {
        // nuestro codigo para buscar mis datos en movie db
        movie.findAll()
            .then( data =>{
                return res.render("index", {movies: data});
            })
            .catch( error => {
                return res.send(error);
            })
    },
    detail: function(req,res){
        let id = req.params.id;
        movie.findByPk(id,
            {
                include: [{association: "genero"}, {association: "actores"}]
            })
        .then (function(respuesta){
            res.render("detail", {movie: respuesta})
        });
    },
    new: function(req,res){
        movie.findAll(
            {
                order: [["release_date", "ASC"]],
                limit: 5
            }
        )
        .then(function(movies){
            res.render("new", {movies:movies})
        })
    },
    recommended: function(req,res){
        movie.findAll(
            {
                where: [
                    {
                        rating: {[op.gte]: 8}
                    }
                ],
                order: [["rating", "DESC"]],
                limit: 5
            }
        )
        .then(function(movies){
            res.render("recommended", {movies:movies})
        })
    },
    create: function(req,res){
        if (req.session.user != undefined) {
            db.Genre.findAll()
            .then(function(genres){
                res.render("create", {genres:genres});
            })
            .catch(function(error){
                res.send(error);
            })
        } else {
            return res.redirect("/users/login")
        }
    },
    createMovie: function(req,res){
    db.Movie.create({
        title: req.body.title,
        awards: req.body.awards,
        rating: req.body.rating,
        release_date: req.body.release_date,
        genre_id: req.body.genre_id,
        length: req.body.length,
        image: req.file.filename
    })
    .then(function(movie){
        res.redirect("/movies");
    })
    .catch(function(error){
        res.send(error)
    })
    },
    search: function (req, res) {
        let search = req.query.q
        movie.findAll({
            where: [
                {'title': {[op.like]:`%${search}%`}}
            ],
            order: [
                ['rating','ASC']
            ],
            limit:5,
        })
        .then( movies => {
            return res.render("search", {movies: movies});
        })
        .catch(error => {
            return res.send(error)
        })
    },
    edit: function(req,res){
        let pelicula = db.Movie.findByPk(req.params.id);
        let genres = db.Genre.findAll();

        Promise.all([pelicula, genres])
        .then(function([pelicula, genres]){
            res.render("edit", {genres:genres, pelicula:pelicula})
        })
        .catch(function(error){
            res.send(error);
        })
    },
    modify: function(req,res){
        let id = req.params.id
        db.Movie.update({
            title: req.body.title,
            awards: req.body.awards,
            rating: req.body.rating,
            release_date: req.body.release_date,
            genre_id: req.body.genre_id,
            length: req.body.length,
            image: req.file.filename
        },
        {
            where: {
                id: id
            }
        })
        .then(movie => {
            res.redirect("/movies/detail/" + id)
        })
        .catch(function(error){
            res.send(error)
        })
    },
    delete: function(req, res){
        if (req.session.user != undefined) {
            let id = req.params.id
            db.Movie.destroy({
                where: {
                    id: id
                }
            })
            .then(movie => {
                res.redirect('/movies')
            })
        } else {
            return res.redirect("/users/login")
        }    
    },
    demo: function(req,res){
        db.Movie.findAll({
            include: [{association: "genero"}, {association: "actores"}]
        })
        .then(function(peliculas){
            res.send(peliculas);
        })
    }

}

module.exports = movieController;