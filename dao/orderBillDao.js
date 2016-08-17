/**
 * Created by hanzhongjian on 16/7/22.
 */
var mysql = require('mysql');
var $conf = require('../conf/db');
var $sql = require('./sqlMapping');
var jwt = require('../util/jwt');
var util = require('../util/util');
var $error = require('./errorMessage');
var async = require('async');

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
            var orderHead = getOrderTj(para, user.iss);
            //统计获取的信息
            pool.getConnection(function (err, connection) {
                connection.query(orderHead, function (err, result) {
                    var ids = [];
                    if (err) {
                        res.json($error.serverError)
                        return;
                    }
                    var orderBody = getOrderInfo(para, result.insertId, user.iss);
                    //将其他数据拼装到数据中
                    var count = 0;
                    console.log(connection.query(orderBody, function (err, resinfo) {
                        if (err) {
                            //清除
                            res.json($error.serverError)
                            return;
                        }
                        count++;
                        res.json($error.success);
                    }).sql)
                });
            });
        });
    },
    /**
     * 更新订单信息
     * 数据结构为
     * {
     *  id:'',
     *  customid:'0',
     *  remark:'',
     *  title:'',
     *  remark:'',
     *  exchangerate:'',
     *  list[
     *      {
     *          id,
     *          proid,
     *          proname,
     *          price,
     *          buyprice,
     *          salerPrice,
     *          yl,
     *          remark,
     *          exchangerate
     *      }
     *  ]
     * }
     * @param req
     * @param res
     * @param next
     */
    update: function (req, res, next) {
        var header = req.headers;
        jwt.verify(header.token, function (err, user) {
                if (err) {
                    res.json($error.authError);
                    return;
                }
                var para = req.body;
                var orderHead = getOrderTj(para, user.iss);
                orderHead.push(para.id);


                async.waterfall([function (callback) {
                    pool.getConnection(function (err, connection) {
                        connection.query($sql.order.update, orderHead, function (err, result) {
                            connection.release();
                            var ids = [];
                            if (err) {
                                callback(err);
                                return;
                            }
                            //console.log(result);
                            ids.push(result.insertId);
                            callback(null, ids);
                        });
                    });
                }, function (ids, callback) {
                    pool.getConnection(function (err, connection) {
                        var orderBody = getOrderInfoUpd(para, user.iss);
                        //将其他数据拼装到数据中
                        var count = 0;
                        console.log(connection.query($sql.order.update, orderBody, function (err, resinfo) {
                            ids.push(resinfo.insertId);
                            //console.log(resinfo);
                            count++;
                            if (err)callback(err);
                        }).sql);
                    });
                    callback(null, "111");
                }], function (err, result) {
                    //console.log(127 + '-' + result);
                    if (err) {
                        res.json($error.serverError)
                        return;
                    }
                    res.json($error.success);
                });

            }
        )
        ;
    },
    getById: function (req, res, next) {
        var header = req.headers;

        jwt.verify(header.token, function (err, user) {
            if (err) {
                res.json($error.authError);
                return;
            }
            var para = req.params;
            pool.getConnection(function (err, connection) {
                connection.query($sql.order.queryById, [para.id, user.iss], function (err, result) {
                    connection.release();
                    res.json(result);
                });
            });
        });
    },
    queryAll: function (req, res, next) {
        var header = req.headers;
        jwt.verify(header.token, function (err, user) {
            if (err) {
                res.json($error.authError);
                return;
            }

            pool.getConnection(function (err, connection) {
                connection.query($sql.order.queryAll, [user.iss], function (err, result) {
                    res.json(result);
                    connection.release();
                });
            });
        });
    }
}

function getOrderInfo(para, resultid, userid) {
    var insertValue = [];

    var value = "INSERT INTO yixiaocuo_sendproduct (proid,proname,ndate,price,buyprice,salerPrice,updateAt,num,exchangerate,yl,remark,pid,customid,teantid,forignPrice,forignSalePrice,forignYl) VALUES ";
    para.list.forEach(function (e, i) {
        var ass = [];
        ass[0] = e.proid;
        ass[1] = e.proname;
        ass[2] = util.now();
        ass[3] = e.price;
        ass[4] = e.buyprice;
        ass[5] = e.salerPrice;
        ass[6] = util.now();
        ass[7] = 0;
        ass[8] = e.exchangeRate;
        ass[9] = e.yl;
        ass[10] = e.remark;
        ass[11] = resultid;
        ass[12] = e.customid;
        ass[13] = userid;
        insertValue.push(ass);

        value += "('"+ass[0] + "','" + ass[1] + "','" + ass[2] + "','" + ass[3] + "','" +
            ass[4] + "','" + ass[5] + "','" + ass[6] + "','" + ass[7] + "','" +
            ass[8] + "','" + ass[9] + "','" + ass[10] + "','" + ass[11] + "','" + ass[12] + "','" + ass[13] + "','"+e.forignPrice+"','"+e.forignSalePrice+"','"+e.forignYl+"')"
        if (i != para.list.length - 1)
            value = value + ",";
    });
    return value;
    //return insertValue;
}

function getOrderInfoUpd(para, userid) {
    var insertValue = [];
    var value = "(";
    para.list.forEach(function (e, i) {
        var ass = [];
        ass[0] = e.proid;
        ass[1] = e.proname;
        ass[2] = util.now();
        ass[3] = e.price;
        ass[4] = e.buyprice;
        ass[5] = e.salerPrice;
        ass[6] = util.now();
        ass[7] = 0;
        ass[8] = e.exchangeRate;
        ass[9] = e.yl;
        ass[10] = e.remark;
        ass[11] = e.customid;
        ass[12] = userid;
        ass[13] = e.id;

        value += ass[0] + ',' + ass[2] + ',' + ass[3] + ',' + ass[4] + ',' + ass[5] + ',' + ass[6] + ',' + ass[7] + ',' + ass[8] + ',' + ass[9] + ',' + ass[10] + ',' + ass[11] + ',' + ass[12]
        if (i != 0)
            value = "),(" + value

        insertValue.push(ass);
    });

    value += ')';
    return value;
    //return insertValue;
}

function getOrderTj(para, userid) {
    var orderHead = [];
    orderHead[0] = 0;
    orderHead[1] = para.title;
    orderHead[2] = util.now();
    orderHead[3] = para.price;
    orderHead[4] = para.buyprice;
    orderHead[5] = para.salerPrice;
    orderHead[6] = util.now();
    orderHead[7] = para.list.length;
    orderHead[8] = para.exchangeRate;
    orderHead[9] = para.yl;
    orderHead[10] = para.remark;
    orderHead[11] = para.customid;
    orderHead[12] = userid;
    var value = 'INSERT INTO yixiaocuo_sendproduct ' +
        "(proid,proname,ndate,price,buyprice,salerPrice,updateAt,num,exchangerate,yl,remark,customid,teantid,forignPrice,forignSalePrice,forignYl) " +
        "VALUES('";
    value += orderHead[0] + "','" + orderHead[1] + "','" +
        orderHead[2] + "','" + orderHead[3] + "','" + orderHead[4] + "','" + orderHead[5] + "','" +
        orderHead[6] + "','" + orderHead[7] + "','" + orderHead[8] + "','" + orderHead[9] + "','" +
        orderHead[10] + "','" + orderHead[11] + "','" + orderHead[12]+"','"+ para.forignPrice+"','"+para.forignSalePrice+"','"+para.forignYl;
    value = value + "')"
    return value;
    //return orderHead;
}