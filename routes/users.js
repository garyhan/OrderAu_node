var express = require('express');
var router = express.Router();

var userDao = require('../dao/userDao');

/* GET users listing. */
router.get('/user', function (req, res, next) {
    userDao.queryAll(req, res, next);
})
router.post('/reg',function(req,res,next){
    userDao.reg(req,res,next);
})
router.post('/login',function(req,res,next){
    userDao.login(req,res,next);
})

module.exports = router;
