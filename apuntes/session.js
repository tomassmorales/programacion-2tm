//session, variable accesible en toda la app, permite guardar y compartir info de un mismo usuario entre las vistas.
//la informacion del usuario la guardamos del lado del servidor, el identifiador unico que asocia la informacion con ese usario
//se guarda del lado del navegador.
//Usamos session principalmente para manejar los logeos
//la informacion de session se elimina una vez el usuario cierra la ventana del navegador
//instalación: npm install express-session --save
//en app.js:
const session = require(`express-session`);
const app = require("../sequelize/seq/app");
app.use(session({
	secret: "secret",
	resave: false,
	saveUninitialized: true
      }));
//para entrar a session entramos a la propiedad session del objeto request
// declarar:
req.session.colorFondo = "Violeta";
//para leer esta información:
let colorFondo = req.session.colorFondo;
//podemos acceder en todas los archivos de la app.
//para compartir informacion con todas las vistas de nuestro sitio usamos res.locals (objeto literal donde almacenamos los valores que vamos queremos acceder en todas las vistas),
//por medio de middlewares.
app.use(function(req,res, next){
	res.locals.usuarioLogueado = {
		nombreDeUsuario: "Juan"
	}
	return next();
})
//el next habilita al controlador a ejecutar su logica
//Podemos acceder a el valor del nombre de usuario en cualquier vista:
//<%=usuarioLogueado.nombreUsuario%>
//los middlewares se ejecutan con cada peticion post/get que se haga en la app
//Podemos implementar condicionales en el middleware
app.use(function(req,res,next){
	res.locals.user = null; //ponemos antes esto para poder usar la variable user sin problemas y que 
	//ya este declarada desde el principio no solo cuando el usuario logee.
	if (req.session.usuarioLogueado != undefined){
		res.locals.user = req.session.usuarioLogueado;
	}
	return next();
})

//accediendo a la variable user desde una vista:
//usamos como variable el nombre de la propiedad que asignamos en locals
//<%  if(user != null){  %>
//<%- include("headerLogueado")%>
//<% }else{ %>
//<%- include("headerDeslogueado")%>%
//<% } %>