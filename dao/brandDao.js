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

            //开始插入数据
            pool.getConnection(function (err, connection) {
                console.log(connection.query($sql.brand.add, [para.b_name,para.code,Date.now(),user.iss], function (err) {
                    connection.release();
                    if(err){
                        res.json($error.serverError)
                        return;
                    }
                    res.json($error.success);
                }));
            });
        });
    },
    update: function(req,res,next){
        var header = req.headers;
        jwt.verify(header.token, function (err, user) {
            if (err) {
                res.json($error.authError);
                return;
            }

            var para = req.body;

            //开始插入数据
            pool.getConnection(function (err, connection) {
                connection.query($sql.brand.update, [para.b_name,user.iss,para.code,Date.now(),para.key,user.iss], function (err, result) {
                    connection.release();
                    if(err){
                        res.json($error.serverError)
                        return;
                    }
                    res.json($error.success);
                });
            });
        });
    }
};