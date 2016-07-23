/**
 * Created by hanzhongjian on 16/5/9.
 */
var user = {
    queryById: 'select * from laopo_cms_user_base where id=?',
    queryAll: 'select * from laopo_cms_user_base',
    queryByUsername: 'select * from laopo_cms_user_base WHERE account=?',
    regUser: 'insert into laopo_cms_user_base(account,username,psw,regdate,regip) values(?,?,?,?,?)'
}

var product = {
    add: 'insert into yixiaocuo_product(proname,c_id,code,protype,price,price_type,weight,pro_brand,teantid) values(?,?,?,?,?,?,?,?,?)',
    delete: 'delete yixiaocuo_product WHERE id=?,teantid=?',
    update: 'UPDATE yixiaocuo_product SET proname=?,c_id=?,code=?,protype=?,price=?,price_type=?,weight=?,pro_brand=? where teantid=?',
    queryAll: 'SELECT * FROM yixiaocuo_product WHERE teantid=?',
    stopUse: '',
    startUser: ''

}

var brand = {
    add: 'insert into yixiaocuo_brand(b_name,b_state,teantid,code) values(?,?,?,?)',
    delete: 'delete yixiaocuo_brand WHERE id=? AND teantid=?',
    update: 'UPDATE yixiaocuo_brand SET b_name=?,b_state=?,teantid=?,code=?',
    queryAll: 'SELECT * FROM yixiaocuo_brand WHERE teantid=? AND isdelete=0',
    stopUse: '',
    startUser: ''
}

var category = {
    add: 'insert into yixiaocuo_product(proname,c_id,code,protype,price,price_type,weight,pro_brand,teantid) values(?,?,?,?,?,?,?,?,?)',
    delete: 'delete yixiaocuo_product WHERE id=?,teantid=?',
    update: 'UPDATE yixiaocuo_product SET proname=?,c_id=?,code=?,protype=?,price=?,price_type=?,weight=?,pro_brand=? where teantid=?',
    queryAll: 'SELECT * FROM yixiaocuo_product WHERE teantid=?',
    stopUse: '',
    startUser: ''
}

var customer = {
    add: 'insert into yixiaocuo_product(proname,c_id,code,protype,price,price_type,weight,pro_brand,teantid) values(?,?,?,?,?,?,?,?,?)',
    delete: 'delete yixiaocuo_product WHERE id=?,teantid=?',
    update: 'UPDATE yixiaocuo_product SET proname=?,c_id=?,code=?,protype=?,price=?,price_type=?,weight=?,pro_brand=? where teantid=?',
    queryAll: 'SELECT * FROM yixiaocuo_product WHERE teantid=?',
    stopUse: '',
    startUser: ''
}

var expressBill = {
    add: 'insert into yixiaocuo_product(proname,c_id,code,protype,price,price_type,weight,pro_brand,teantid) values(?,?,?,?,?,?,?,?,?)',
    delete: 'delete yixiaocuo_product WHERE id=?,teantid=?',
    update: 'UPDATE yixiaocuo_product SET proname=?,c_id=?,code=?,protype=?,price=?,price_type=?,weight=?,pro_brand=? where teantid=?',
    queryAll: 'SELECT * FROM yixiaocuo_product WHERE teantid=?',
    stopUse: '',
    startUser: ''
}

var dicStore = {
    getStore: 'SELECT * FROM yixiaocuo_dicStore WHERE type=? AND state=1'
}

var order = {
    add: '',
    delete: '',
    queryAll: '',
    queryById: '',
    update: ''
}

var prodyctModel = {
    add: '',
    delete: '',
    queryAll: '',
    queryById: '',
    update: ''
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

module.exports = sqlObject;