var express = require('express');
var router = express.Router();

var brandDao = require('../dao/brandDao');
var commonDao = require('../dao/commonDao');

router.get('/', function (req, res, next) {
    commonDao.queryAll(req, res, next, 'brand');
})
router.get('/:id', function (req, res, next) {
    commonDao.getOne(req, res, next, 'brand');
})
router.put('', function (req, res, next) {
    brandDao.add(req, res, next);
})
router.post('', function (req, res, next) {
    brandDao.update(req, res, next);
})
router.delete('/:id', function (req, res, next) {
    commonDao.delete(req, res, next, 'brand');
})

module.exports = router;
