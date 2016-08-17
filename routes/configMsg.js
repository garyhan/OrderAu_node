var express = require('express');
var router = express.Router();

var configDao = require('../dao/configDao');

router.post('/', function (req, res, next) {
    configDao.getAll(req, res, next);
})


module.exports = router;
