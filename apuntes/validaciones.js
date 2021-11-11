//validar la informacion en el formulario prevendra la inconcistencia de datos y los controles de acceso van a evitar
// la ejecucion de funcionalidades por usuarios no autorizados

//evitar acceso a no autorizados:
//para hacer que si estas logueado no puedas acceder a los formularios de registro o login
//dentro del controlador que renderiza la vista de login:

if(require.session.user != undefined){
	return res.redirect("/")
}else{
	return res.render("login")
}

//lo mismo se aplica para hacer que un usuario pueda cargar productos, comentarios etc...

//validación: las validaciones por backend se van a realizar dentro de controladores usando condicionales y usando mensajes de error, en las vistas mostraremos los errores si los hay
