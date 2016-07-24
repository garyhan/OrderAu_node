/**
 * Created by hanzhongjian on 16/7/24.
 */
var express = require('express');
var router = express.Router();

var customerDao = require('../dao/customerDao');
var commonDao = require('../dao/commonDao');

router.get('', function (req, res, next) {
    commonDao.queryAll(req, res, next, 'customer');
})
router.put('', function (req, res, next) {
    customerDao.add(req, res, next);
})
router.post('', function (req, res, next) {
    customerDao.update(req, res, next);
})
router.delete('', function (req, res, next) {
    commonDao.delete(req, res, next, 'customer');
})

module.exports = router;