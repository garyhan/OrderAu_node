var express = require('express');
var router = express.Router();

var userDao = require('../dao/userDao');

/* GET users listing. */
router.get('/user', function (req, res, next) {
    userDao.queryAll(req, res, next);
    //res.send('respond with a resource');
});

module.exports = router;
