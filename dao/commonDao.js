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
    getOne:function(req,res,next,type){
        var header = req.headers;
        jwt.verify(header.token, function (err, user) {
            if (err) {
                res.json($error.authError);
                return
            }
            var para = req.params;
                pool.getConnection(function (err, connection) {
                    console.log(connection.query($sql[type].getOneById, [para.id, user.iss], function (err,result) {
                        connection.release();
                        if (err) {
                            res.json($error.serverError)
                            return;
                        }
                        res.json(result[0]);
                    }))
                });
        });
    },
    delete:function(req,res,next,type) {
        var header = req.headers;
        jwt.verify(header.token, function (err, user) {
            if (err) {
                res.json($error.authError);
                return
            }
            var para = req.params;
            pool.getConnection(function (err, connection) {
                console.log(connection.query($sql[type].delete, [Date.now(), para.id, user.iss], function (err) {
                    connection.release();
                    if (err) {
                        res.json($error.serverError)
                        return;
                    }
                    res.json($error.success);
                }))
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
                    connection.release();
                    res.json(result);
                }).sql);
            });
        });
    }
}