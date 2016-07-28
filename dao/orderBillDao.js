/**
 * Created by hanzhongjian on 16/7/22.
 */
var mysql = require('mysql');
var $conf = require('../conf/db');
var $sql = require('./sqlMapping');
var jwt = require('../util/jwt');
var util = require('../util/util');
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
            /***
             * 数据格式
             * {
             *  customid:'0',
             *  remark:'',
             *  title:'',
             *  remark:'',
             *  exchangerate:'',
             *  list[
             *      {
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
             */
            var orderHead = getOrderTj(para, user.iss);
            console.log(orderHead);
            //统计获取的信息
            pool.getConnection(function (err, connection) {
                //proid,proname,ndate,price,buyprice,salerPrice,updateAt,num,exchangerate,yl,remark,pid,customid,teantid
                connection.query($sql.order.add, orderHead, function (err, result) {
                    var ids = [];
                    console.log(result);
                    var orderBody = getOrderInfo(para, result.insertId, user.iss);
                    console.log(orderBody)
                    if (err) {
                        res.json($error.serverError)
                        return;
                    }

                    ids.push(result.insertId)
                    //将其他数据拼装到数据中
                    var count = 0;
                    orderBody.forEach(function (e) {
                        console.log(connection.query($sql.order.addList, e, function (err, resinfo) {
                            console.log(result);
                            if (err) {
                                //清除
                                res.json($error.serverError)
                                return;
                            }
                            ids.push(resinfo.insertId);
                            count++;
                            if (count == orderBody.length)
                                res.json($error.success);
                        }).sql)
                    });
                });
            });
        });
    },
    update: function (req, res, next) {

    },
    getById:function(req,res,next){
        var header = req.headers;
        jwt.verify(header.token, function (err, user) {
            if (err) {
                res.json($error.authError);
                return;
            }
            var para = req.body;
            pool.getConnection(function (err, connection) {
                console.log(connection.query($sql.order.queryById, [para.id,para.id,user.iss], function (err, result) {
                    res.json(result);
                }).sql);
            });
        });
    }
}

function getOrderInfo(para, resultid, userid) {
    var insertValue = [];
    para.list.forEach(function (e) {
        var ass = [];
        ass[0] = e.proid;
        ass[1] = e.proname;
        ass[2] = util.now();
        ass[3] = e.price;
        ass[4] = e.buyprice;
        ass[5] = e.salerPrice;
        ass[6] = util.now();
        ass[7] = 0;
        ass[8] = e.exchangerate;
        ass[9] = e.yl;
        ass[10] = e.remark;
        ass[11] = resultid;
        ass[12] = e.customid;
        ass[13] = userid;
        insertValue.push(ass);
    });
    return insertValue;
}

function getOrderTj(para, userid) {
    var orderHead = [];
    orderHead[0] = 0;
    orderHead[1] = para.title;
    orderHead[2] = util.now();
    orderHead[6] = util.now();
    orderHead[7] = para.list.length;
    orderHead[8] = para.exchangerate;
    orderHead[10] = para.remark;
    orderHead[11] = para.customid;
    orderHead[12] = userid;
    var price = 0.00;
    var buyprice = 0.00;
    var salerPrice = 0.00;
    var yl = 0.00;
    para.list.forEach(function (e) {
        price += parseFloat(e.price);
        buyprice += parseFloat(e.buyprice);
        salerPrice += parseFloat(e.salerPrice);
        yl += parseFloat(e.yl);
        console.log(e);
    });
    orderHead[3] = price.toFixed(2);
    orderHead[4] = buyprice.toFixed(2);
    orderHead[5] = salerPrice.toFixed(2);
    orderHead[9] = yl.toFixed(2);
    console.log(orderHead);
    return orderHead;
}