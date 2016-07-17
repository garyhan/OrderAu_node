/**
 * Created by hanzhongjian on 16/5/9.
 */
var user = {
    insert: 'INSERT INTO user(id,name,age) VALUES (0,?,?)',
    queryById: 'select * from laopo_cms_user_base where id=?',
    queryAll: 'select * from laopo_cms_user_base'
}

module.exports = user;