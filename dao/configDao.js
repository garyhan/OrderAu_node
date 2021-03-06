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
    getAll: function (req, res, next) {
        var header = req.headers;
        jwt.verify(header.token, function (err, user) {
            if (err) {s
                res.json($error.authError);
                return;
            }
            var para = req.body;
            //开始插入数据
            pool.getConnection(function (err, connection) {
                connection.query($sql.configSql.getType, [para.type], function (err, result) {
                    connection.release();
                    if (err) {
                        res.json($error.serverError)
                        return;
                    }
                    res.json(result);
                });
            });
        });
    }
};