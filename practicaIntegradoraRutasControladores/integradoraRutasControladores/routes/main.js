var express = require('express');
var router = express.Router();
let mainController = require('../controllers/mainController');

router.get('/', mainController.index);

router.get('/creditos', mainController.creditos);

module.exports = router;