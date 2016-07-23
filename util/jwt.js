/**
 * Created by hanzhongjian on 16/5/16.
 */
var jwt = require('jsonwebtoken');

module.exports = {
    sign: function (user) {
        var token = jwt.sign({
            username: user.username,
            exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60,
            iss: user.id
        }, 'hanhan');
        return token
    },
    verify: function (token,call) {
        jwt.verify(token, 'hanhan', call)
    },
    decode:function(token){
        return jwt.decode(token);
    }
}