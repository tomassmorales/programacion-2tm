var express = require('express');
var router = express.Router();
const movieController = require("../controllers/movieController");

let multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
        cb(null, "public/images/movies"); 
	},
	filename: function (req, file, cb) {
	cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname)) 
	}
      })
      
      const upload = multer({ storage: storage })

/* GET users listing. */
router.get('/', movieController.index);
router.get("/search", movieController.search)
router.get('/detail/:id', movieController.detail);
router.get('/new', movieController.new);
router.get('/recommended', movieController.recommended);
router.get("/create", movieController.create);
router.get("/edit/:id", movieController.edit);
router.get("/relaciones", movieController.demo)


router.post("/edit/:id",upload.single("image") , movieController.modify);
router.post("/create", upload.single("image") , movieController.createMovie);
router.post('/delete/:id', movieController.delete)


module.exports = router;
