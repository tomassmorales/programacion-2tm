//Multer es una libreria que usamos para subir archivos a traves de un formulario y almacenarlo en el servidor.
//Usamos en el formulario una etiqueta input de tipo file y hay que agregar un atributo al formulario para poder subirlo, el enctype.


// npm install multer para instalar las librerias

//usar multer en las rutas

const router= require("express");
const multer = require("multer");

const path = require("path"); //proporciona herramientas para trabajar con rutas

//usamos el metodo diskStorage para almacenar los archivos, recibe un objeto literal como parametro, este objeto tiene 2 propiedades
//destination y filename (cada una recibe 3 parametros: req,file,cb)

let storage =  multer.diskStorage({
	destination: (req,file,cb) => {
		cb(null, "public/imgages/avatars"); //usamos el tercer parametro para crear una subcarpeta dentro de imagenes para guardar
		//los avatars de todos los usuarios
	},
	filename: (req,file,cb) => {
		cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname)) 
		//generamos un nombre unico para cada imagen que se suba
		//path.extname es un metodo del path que extrae la extension del archivo para pasarselo al nombre del archivo.
	},
})
 var upload = multer({storage:storage})

//configurar las rutas

router.post("/", upload.single("avatar"), registerContoller.store); //el segundo parametro sirve para que multer tome la info del formulario y lo envie al controlador
//el nombre del single viende del atributo name del input en el form
//el metodo upload single crea la propiedad file dentro del objeto request, de esta manera podemos tomar los datos desde el controlador con:
req.file;

//en la base de datos usamos un varchar para almacenar un archivo ya que se trata de una ruta
{
	//...
	image: req.file.filename;
}