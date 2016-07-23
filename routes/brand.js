var express = require('express');
var router = express.Router();

var brandDao = require('../dao/brandDao');

/* GET users listing. */
router.get('', function (req, res, next) {
    brandDao.queryAll(req, res, next);
})
router.put('',function(req,res,next){
    brandDao.add(req,res,next);
})
router.post('',function(req,res,next){
    brandDao.update(req,res,next);
})
router.delete('',function(req,res,next){
    brandDao.delete(req,res,next);
})

module.exports = router;
