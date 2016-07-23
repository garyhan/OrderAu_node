/**
 * Created by hanzhongjian on 16/7/19.
 */
var error={
    success:{
        code:200,
        msg:'成功!'
    },
    paramError:{
        code:400,
        msg:'参数有误!!!'
    },
    authError:{
        code:403,
        msg:'没有权限进行该操作!'
    },
    serverError:{
        code:500,
        msg:'内部错误!'
    },
    userNameExit:{
        code:601,
        msg:'用户名已存在!'
    },
    userNotFound:{
        code:602,
        msg:'用户名或密码错误!'
    }
};

module.exports = error;