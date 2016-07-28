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
    now:function(){
        return new Date();
    }
}