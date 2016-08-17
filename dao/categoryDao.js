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
                connection.query($sql.category.add, [para.c_pid, para.c_name, para.c_code, para.c_type, Date.now(), user.iss], function (err, result) {
                    connection.release();
                    if (err) {
                        res.json($error.serverError)
                        return;
                    }
                    res.json($error.success);
                })
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
                connection.query($sql.category.update, [para.c_id, para.c_name, para.c_code, para.c_type, Date.now(), para.key, user.iss], function (err, result) {
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