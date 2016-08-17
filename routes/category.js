/**
 * Created by hanzhongjian on 16/7/24.
 */
var express = require('express');
var router = express.Router();

var categoryDao = require('../dao/categoryDao');
var commonDao = require('../dao/commonDao');

router.get('/', function (req, res, next) {
    commonDao.queryAll(req, res, next, 'category');
})
router.get('/:id', function (req, res, next) {
    commonDao.getOne(req, res, next,'category');
})
router.put('', function (req, res, next) {
    categoryDao.add(req, res, next);
})
router.post('', function (req, res, next) {
    categoryDao.update(req, res, next);
})
router.delete('/:id', function (req, res, next) {
    commonDao.delete(req, res, next, 'category');
})

module.exports = router;