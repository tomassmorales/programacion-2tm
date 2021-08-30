var express = require('express');
var router = express.Router();
let heroeController = require('../controllers/heroesController');

router.get('/', heroeController.index);

router.get('/detalle/id/:id', heroeController.show);

router.get('/bio/id/:id/:ok?', heroeController.getBio);


module.exports = router;