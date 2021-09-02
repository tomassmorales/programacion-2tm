var express = require('express');
var router = express.Router();
let musicaController = require("../controllers/musicaController");

router.get('/', musicaController.index);

router.get('/id/:id', musicaController.porId);

router.get('/genero/:genero', musicaController.porGenero);

router.get('/creditos', musicaController.creditos);

module.exports = router;