var express = require('express');
var router = express.Router();
let userController = require('../controllers/userController')
let multer = require('multer');
let path = require('path');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
        cb(null, "public/images/avatars"); 
	},
	filename: function (req, file, cb) {
	cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname)) 
	}
      })
      
      const upload = multer({ storage: storage })
/* GET users listing. */
router.get('/register', userController.register);
router.get('/login', userController.login);
router.get("/editarPerfil", userController.editarPerfil);

router.post('/register',upload.single("avatar"),  userController.store);
router.post('/login', userController.processLogin);
router.post('/logout', userController.logout)
router.post("/editarPerfil",upload.single("avatar"), userController.procesoEditar);
module.exports = router;
