//Cookies, las usamos para no perder los datos del usuario logeado si cierra la ventana del navegador
//las cookies tienen un tiempo de vida que le asignamos, cuando se cumpla esta dejara de existir. Se guarda del lado del cliente
//en el navegador, por esto tenemos un limite de espacio para guardar, no debemos guardar informacion sensible

//la cookie puede identificar el usuario cuando entre a la app.

//con express generator no hace falta instalar el cookie-parser

//para crear y guardar una cookie usamos el objeto response:
res.cookie("materia", "Programación II", {maxAge: 1000 * 60 * 5}) //5 minutos de vida, se pone en milisegundos

//parametros de propiedad, valor, tiempo de vida.

//para leer una cookie usamos el objeto request y llamamos al objeto cookies:
req.cookies.materia;

//para eliminar una cookie llamamos al metodo clearCookie() del objeto response (se usa para cuando el usuario quiere cerrar sesión);
res.clearCookie("materia"); //recibe como parametro el nombre de la cookie