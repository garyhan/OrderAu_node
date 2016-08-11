/**
 * Created by hanzhongjian on 16/7/24.
 */
var express = require('express');
var router = express.Router();

var productDao = require('../dao/productDao');
var commonDao = require('../dao/commonDao');

router.get('', function (req, res, next) {
    commonDao.queryAll(req, res, next, 'product');
})
router.put('', function (req, res, next) {
    productDao.add(req, res, next);
})
router.post('', function (req, res, next) {
    productDao.update(req, res, next);
})
router.delete('', function (req, res, next) {
    commonDao.delete(req, res, next, 'product');
})

module.exports = router;