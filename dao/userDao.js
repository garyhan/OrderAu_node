/**
 * Created by hanzhongjian on 16/5/9.
 */
var mysql = require('mysql');
var $conf = require('../conf/db');
var $sql = require('./sqlMapping');
var util = require('../util/util');
var jwt = require('../util/jwt');
var $error = require('./errorMessage');

//var pool = mysql.createPool($util.extend({}, $conf.mysql));
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
    queryAll: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            connection.query($sql.user.queryAll, function (err, result) {
                jsonWrite(res, result);
                connection.release();
            });
        });
    },

    login: function (req, res, next) {
        var para = req.body;
        //判断是否传入合法数据
        if (!para.username || !para.psw) {
            jsonWrite(res);
            return;
        }
        //判断
        pool.getConnection(function (err, connection) {
            connection.query($sql.user.queryByUsername, [para.username], function (err, result) {
                if (result.length == 0) {
                    jsonWrite(res, $error.userNotFound);
                    connection.release();
                    return
                }
                var psw = util.md5Entry(para.psw);
                if (result[0].psw != psw) {
                    jsonWrite(res, $error.userNotFound);
                    connection.release();
                    return
                }
                para.id = result[0].id;
                var token = jwt.sign(para)
                var user = {};

                user.token = token;
                user.name = result[0].username;
                user.account = result[0].account;
                jsonWrite(res, user);
                connection.release();
                return;
            });
        });
    },
    //用户注册
    reg: function (req, res, next) {
        //检查用户名是否存在
        var para = req.body;
        //判断是否传入合法数据
        if (!para.username || !para.psw || para.psw != para.psw1) {
            jsonWrite(res);
            return;
        }
        //判断数据库中是否存在数据
        pool.getConnection(function (err, connection) {
            connection.query($sql.user.queryByUsername, [para.username], function (err, result) {
                if (result.length > 0) {
                    jsonWrite(res, $error.userNameExit);
                    connection.release();
                    return
                } else {
                    //密码加密
                    var psw = util.md5Entry(para.psw);
                    var regip = util.getClientIp(req);
                    //将数据插入数据库
                    connection.query($sql.user.regUser, [para.username, para.username, psw, Date.now(), regip], function (err, result) {
                        if (err) {
                            jsonWrite(res, $error.serverError);
                            connection.release();
                            return;
                        }
                        para.id = result.insertId
                        var token = jwt.sign(para)
                        var user = {};
                        user.token = token;
                        user.name = para.username;
                        user.account = para.username;
                        jsonWrite(res, user);
                        connection.release();
                    });
                }
            })
        });
    }
};