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
                connection.query($sql.category.add, [para.cpid, para.cname, para.ccode, para.ctype, Date.now(), user.iss], function (err, result) {
                    console.log(err);
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
                connection.query($sql.category.update, [para.cid, para.cname, para.ccode, para.ctype, Date.now(), para.key, user.iss], function (err, result) {
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