/**
 * Created by hanzhongjian on 16/7/22.
 */
var mysql = require('mysql');
var $conf = require('../conf/db');
var $sql = require('./sqlMapping');
var util = require('../util/util');
var jwt = require('../util/jwt');
var $error = require('./errorMessage');

var pool = mysql.createPool($conf.mysql);

var jsonWrite = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
}


module.exports = {
    add: function (req, res, next) {
        var header = req.headers;
        jwt.verify(header.token, function (err, user) {
            if (err) {
                res.json($error.authError);
            }

            //开始插入数据
            pool.getConnection(function (err, connection) {
                console.log(connection.query($sql.brand.queryAll, [user.iss], function (err, result) {
                    res.json(result);
                }).sql);
            });
        });
    },
    queryAll: function (req, res, next) {
        var header = req.headers;
        jwt.verify(header.token, function (err, user) {
            if (err) {
                res.json($error.authError);
            }

            //开始插入数据
            pool.getConnection(function (err, connection) {
                console.log(connection.query($sql.brand.queryAll, [user.iss], function (err, result) {
                    res.json(result);
                }).sql);
            });
        });
    }
};