/**
 * Created by hanzhongjian on 16/7/24.
 */
var express = require('express');
var router = express.Router();

var orderDao = require('../dao/orderBillDao');

router.get('/', function (req, res, next) {
    orderDao.queryAll(req, res, next);
})
router.get('/:id', function (req, res, next) {
    orderDao.getById(req, res, next);
})
router.put('/', function (req, res, next) {
    orderDao.add(req, res, next);
})
router.post('/', function (req, res, next) {
    orderDao.update(req, res, next);
})
router.delete('/:id', function (req, res, next) {
    orderDao.delete(req, res, next);
})

module.exports = router;