/**
 * Created by hanzhongjian on 16/7/22.
 */
var mysql = require('mysql');
var $conf = require('../conf/db');
var $sql = require('./sqlMapping');
var jwt = require('../util/jwt');
var $error = require('./errorMessage');

var pool = mysql.createPool($conf.mysql);

module.exports = {
    add: function (req, res, next) {
        var header = req.headers;
        jwt.verify(header.token, function (err, user) {
            if (err) {
                res.json($error.authError);
                return;
            }
            var para = req.body;
            pool.getConnection(function (err, connection) {
                connection.query($sql.customer.add, [para.uname, para.umobile, Date.now(), user.iss], function (err) {
                    connection.release();
                    if (err) {
                        res.json($error.serverError)
                        return;
                    }
                    res.json($error.success);
                });
            });
        });
    },
    update: function (req, res, next) {
        var header = req.headers;
        jwt.verify(header.token, function (err, user) {
            if (err) {
                res.json($error.authError);
                return;
            }
            var para = req.body;
            pool.getConnection(function (err, connection) {
                connection.query($sql.customer.update, [para.uname, para.umobile, Date.now(), para.key, user.iss], function (err) {
                    connection.release();
                    if (err) {
                        res.json($error.serverError)
                        return
                    }
                    res.json($error.success);
                });
            });
        });
    }
};