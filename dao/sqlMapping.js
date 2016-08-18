/**
 * Created by hanzhongjian on 16/5/9.
 */
var user = {
    queryById: 'select * from laopo_cms_user_base where id=?',
    queryAll: 'select * from laopo_cms_user_base',
    queryByUsername: 'select * from laopo_cms_user_base WHERE account=?',
    changePaw: 'update laopo_cms_user_base SET pwd=? WHERE account=?',
    regUser: 'insert into laopo_cms_user_base(account,username,psw,regdate,regip) values(?,?,?,?,?)'
}

var product = {
    add: 'insert into yixiaocuo_product(pro_name,c_id,code,pro_type,price,price_type,pro_brand,ts,teantid) values(?,?,?,?,?,?,?,?,?)',
    delete: 'UPDATE yixiaocuo_product set isdelete=1,ts=? WHERE id=? and teantid=?',
    update: 'UPDATE yixiaocuo_product SET pro_name=?,c_id=?,code=?,pro_type=?,price=?,price_type=?,pro_brand=?,ts=? where id=? AND teantid=?',
    queryAll: 'SELECT * FROM yixiaocuo_product WHERE teantid=? AND isdelete=0',
    getOneById: 'SELECT * FROM yixiaocuo_product WHERE id=? and teantid=?'
}

var brand = {
    add: 'insert into yixiaocuo_brand(b_name,code,ts,teantid) values(?,?,?,?)',
    delete: 'UPDATE yixiaocuo_brand SET isdelete=1,ts=? WHERE id=? AND teantid=?',
    update: 'UPDATE yixiaocuo_brand SET b_name=?,teantid=?,code=?,ts=? where id=? AND teantid=?',
    queryAll: 'SELECT * FROM yixiaocuo_brand WHERE teantid=? AND isdelete=0',
    getOneById: 'SELECT * FROM yixiaocuo_brand WHERE id=? and teantid=?'
}

var category = {
    add: 'insert into yixiaocuo_category(c_pid,c_name,c_code,c_type,ts,teantid) values(?,?,?,?,?,?)',
    delete: 'UPDATE yixiaocuo_category set isdelete=1,ts=?  WHERE id=? AND teantid=?',
    update: 'UPDATE yixiaocuo_category SET c_pid=?,c_name=?,c_code=?,c_type=?,ts=? where id=? AND teantid=?',
    queryAll: 'SELECT * FROM yixiaocuo_category WHERE teantid=? AND isdelete=0',
    getOneById: 'SELECT * FROM yixiaocuo_category WHERE id=? and teantid=?'
}

var customer = {
    add: 'insert into yixiaocuo_customer(u_name,u_mobile,ndate,teantid) values(?,?,?,?)',
    delete: 'UPDATE yixiaocuo_customer SET isdelete=1,ts=? WHERE id=? and teantid=?',
    update: 'UPDATE yixiaocuo_customer SET u_name=?,u_mobile=?,ndate=? where id=? AND teantid=?',
    queryAll: 'SELECT * FROM yixiaocuo_customer WHERE teantid=? AND isdelete=0',
    getOneById: 'SELECT * FROM yixiaocuo_customer WHERE id=? and teantid=?'
}

var expressBill = {
    add: 'insert into yixiaocuo_product(proname,c_id,code,protype,price,price_type,weight,pro_brand,teantid) values(?,?,?,?,?,?,?,?,?)',
    delete: 'UPDATE yixiaocuo_product SET isdelete=1 WHERE id=? and teantid=?',
    update: 'UPDATE yixiaocuo_product SET proname=?,c_id=?,code=?,protype=?,price=?,price_type=?,weight=?,pro_brand=? where teantid=?',
    queryAll: 'SELECT * FROM yixiaocuo_product WHERE teantid=? AND isdelete=0'
}

var dicStore = {
    getStore: 'SELECT * FROM yixiaocuo_dicStore WHERE type=? AND state=1'
}

var order = {
    add: 'INSERT INTO yixiaocuo_sendproduct ' +
    '(proid,proname,ndate,price,buyprice,salerPrice,updateAt,num,exchangerate,yl,remark,customid,teantid) ' +
    'VALUES ?',
    addList: 'INSERT INTO yixiaocuo_sendproduct (proid,proname,ndate,price,buyprice,salerPrice,updateAt,num,exchangerate,yl,remark,pid,customid,teantid) VALUES ?',
    delete: 'UPDATE yixiaocuo_sendproduct SET isdelete=1 WHERE id=? and teantid=?',
    queryAll: 'SELECT * FROM yixiaocuo_sendproduct WHERE teantid=? AND isdelete=0 AND pid=0',
    queryById: 'SELECT * FROM yixiaocuo_sendproduct WHERE (pid=? or id=?) AND teantid=? AND isdelete=0',
    changeCustomer:'UPDATE yixiaocuo_sendproduct SET customid=? WHERE id=? AND teantid=?',
    update: 'UPDATE yixiaocuo_sendproduct SET proid=?,proname=?,ndate=?,price=?,buyprice=?,salerPrice=?,updateAt=?,num=?,exchangerate=?,yl=?,remark=?,customid=? WHERE teantid=?  AND id=? '
}

var prodyctModel = {
    add: '',
    delete: '',
    queryAll: '',
    queryById: '',
    update: ''
}

var configSql = {
    getType:'SELECT * FROM yixiaocuo_dicStore WHERE type=?'
}

var sqlObject = {};
sqlObject.user = user;
sqlObject.product = product;
sqlObject.brand = brand;
sqlObject.category = category;
sqlObject.customer = customer;
sqlObject.expressBill = expressBill;
sqlObject.dicStore = dicStore;
sqlObject.order = order;
sqlObject.prodyctModel = prodyctModel;
sqlObject.configSql=configSql;

module.exports = sqlObject;