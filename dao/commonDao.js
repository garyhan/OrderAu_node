/**
 * Created by hanzhongjian on 16/7/24.
 */

var mysql = require('mysql');
var $conf = require('../conf/db');
var $sql = require('./sqlMapping');
var jwt = require('../util/jwt');
var $error = require('./errorMessage');

var pool = mysql.createPool($conf.mysql);

module.exports = {
    delete:function(req,res,next,type) {
        var header = req.headers;
        jwt.verify(header.token, function (err, user) {
            if (err) {
                res.json($error.authError);
                return
            }
            var para = req.body;
            pool.getConnection(function (err, connection) {
                connection.query($sql[type].delete, [Date.now(), para.key, user.iss], function (err) {
                    if (err) {
                        res.json($error.serverError)
                        return;
                    }
                    res.json($error.success);
                })
            });
        })
    },
    queryAll: function (req, res, next,type) {
        var header = req.headers;
        jwt.verify(header.token, function (err, user) {
            if (err) {
                res.json($error.authError);
                return;
            }

            //开始插入数据
            pool.getConnection(function (err, connection) {
                console.log(connection.query($sql[type].queryAll, [user.iss], function (err, result) {
                    res.json(result);
                }).sql);
            });
        });
    }
}