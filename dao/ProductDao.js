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
        console.log(123);
        jwt.verify(header.token, function (err, user) {
            if (err) {
                res.json($error.authError);
                return;
            }
            var para = req.body;

            //开始插入数据
            pool.getConnection(function (err, connection) {
                console.log(connection.query($sql.product.add, [
                    para.proname,
                    para.cid,
                    para.code,
                    para.protype,
                    para.price,
                    para.price_type,
                    para.pro_brand,
                    Date.now(),
                    user.iss], function (err, result) {
                    if(err){
                        res.json($error.serverError)
                        return;
                    }
                    res.json($error.success);
                }).sql);
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
                connection.query($sql.product.update, [
                    para.proname,
                    para.cid,
                    para.code,
                    para.protype,
                    para.price,
                    para.price_type,
                    para.pro_brand,
                    Date.now(),
                    para.key,
                    user.iss
                ], function (err, result) {
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