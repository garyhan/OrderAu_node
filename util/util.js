/**
 * Created by hanzhongjian on 16/5/9.
 */
var crypto = require('crypto');

module.exports = {
    md5Entry: function (str) {
        var md5 = crypto.createHash('md5');
        var md5s = md5.update(str);
        var strs = md5s.digest('hex');
        return strs;
    },
    getClientIp: function (req) {
        return req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
    },
    now: function () {
        var date = new Date;
        return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    },
    getInsertSql: function (table, field, param) {
        var sql = "INSERT INTO " + table + " (";
        var insertField = "";
        var insertValue = "";
        for (var i = 0; i < field.length; i++) {
            if (!param[field] || param[field] == 0) {
                if (i == field.length - 1) {
                    insertField += field;
                    insertValue += param[field];
                } else {
                    insertField += field + ',';
                    insertValue += param[field] + ',';
                }
            }
        }
        sql += ") VALUES (" + insertValue + ")";
        return sql;
    },
    getUpdateSql: function (table, field, param) {

    }
}