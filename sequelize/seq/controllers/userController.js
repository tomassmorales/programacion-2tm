let db = require('../database/models');
let bcrypt = require('bcryptjs');

let userController = {

    register: function (req, res) {
        if (req.session.user == undefined) {
            res.render('register')
        } else {
            return res.redirect("/movies")
        }    
    },
    store: function (req, res) {

        let errors = {}
        let emailExistente;

        db.User.findAll({
            where: {
                email: req.body.email
            }
        })
        .then(function(email){
            emailExistente = email;
        })

        if (req.body.email == "") {
            errors.message = "El campo del email no puede estar vacio";
            res.locals.error = errors;
            res.render("register")
        } else if (req.body.password == ""){
            errors.message = "El campo de la contraseña no puede estar vacio";
            res.locals.error = errors;
            res.render("register")
        } else if (emailExistente != ""){
            errors.message = "Ya existe un usuario con ese email";
            res.locals.error = errors;
            res.render("register") 
        }
        else {
        let passwordEncriptada = bcrypt.hashSync(req.body.password, 10)
        db.User.create({
                name: req.body.name,
                email: req.body.email,
                password: passwordEncriptada,
                avatar: req.file.filename
            })
            .then(user => {
                res.redirect('/movies')
                // res.send(req.file.filename)
            })
            .catch(err => {
                console.log(err);
                res.send(err)
            })
        }
    },
    login: function (req, res) {

        if (req.session.user == undefined) {
            res.render('login')
        } else {
            return res.redirect("/movies")
        }
    },
    processLogin: function (req, res) {

        let errors = {};

        if (req.body.email == "") {
            errors.message = "El campo del email no puede estar vacio";
            res.locals.error = errors;
            res.render("login")
        } else {
            db.User.findOne({
                    where: {
                        email: req.body.email
                    }
                })
                .then(user => {
                    if (user != undefined) {
                        let passwordCorrecta = bcrypt.compareSync(req.body.password, user.password)
                        if (passwordCorrecta == true) {
                            req.session.user = user.email;
                            req.session.userImage = user.avatar;
                            if (req.body.recordame) {
                                res.cookie("usuarioId", user.id, {
                                    maxAge: 1000 * 60 * 30
                                }) //30 minutos
                            }
                            return res.redirect("/movies")
                        } else {
                            return res.redirect("/users/register")
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.send(err)
                })
        }
    },
    logout: function (req, res) {
        req.session.destroy();
        res.clearCookie("usuarioId");
        res.redirect("/users/login");
    },
    editarPerfil: function (req, res) {
        db.User.findOne({
                where: {
                    email: req.session.user
                }
            })
            .then(function (usuario) {
                res.render("editarPerfil", {
                    user: usuario
                });
            })
    },
    procesoEditar: function (req, res) {
        db.User.update({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar: req.file.filename
            }, {
                where: {
                    email: req.body.email
                }
            })
            .then(user => {
                db.User.findOne({
                    where: {
                        email: req.body.email
                    }
                })
                    .then(user => {
                        req.session.user = user.email;
                        req.session.userImage = user.avatar;
                        res.locals.avatar = req.session.userImage;
                        res.locals.user = req.session.user;
                        res.redirect('/movies');
                    })
            })
            .catch(function (error) {
                res.send(error)
            })
    }

}

module.exports = userController