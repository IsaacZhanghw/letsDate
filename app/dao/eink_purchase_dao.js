const mysqlDao = require('../lib/common/mysql_pool');

function createOrderSql(objInsertParam, done) {
    const str1 = !!objInsertParam.promoCode ? ', promo_code' : '';
    const str2 = !!objInsertParam.promoCode ? ', :promoCode' : '';
    const sql = ' insert into eink_purchase_order' +
        '(id, phone, shipping_address, total_fee, name, openid, product_id, create_ip, status, actual_fee, type_id' + str1 + ')' +
        ' values(:orderId, :phone, :shippingAddress, :totalFee, :name, :openId, :productId, :createIp, :status, :actualFee, :typeId' + str2 + ')';

    mysqlDao.executeUpdate(sql, objInsertParam, done);
}

function fetchOrderMsgSql(objInsertParam, done) {
    const sql = ' select actual_fee, o.status, product_id productId, o.id orderId ' +
        ' from eink_purchase_order o ' +
        ' where o.id=:orderId ' +
        ' limit 1 ';

    mysqlDao.executeObject(sql, objInsertParam, done);
}

function saveInfoSql(objInsertParam, done) {
    const sql = ' insert into pay_wx_notify' +
        '(user_id, product_id, transaction_id, notify_ret)' +
        ' values(:userId, :productId, :transactionId, :notifyRet)';

    mysqlDao.executeUpdate(sql, objInsertParam, done);
}

function updateOrderSql(objUpdateParam, done) {
    const sqlTasks = [];
    const sql1 = ' update eink_purchase_order ' +
        ' set paytime=:timeEnd, transaction_id=:transactionId, status=2 ' +
        ' where id=:orderId';

    const sql2 =
        " update eink_purchase_promo_codes " +
        " set `status` = 2, " +
        " failuretime = now() " +
        " where id=:promoCode";

    sqlTasks.push({'sql': sql1, 'paras': objUpdateParam});
    if (!!objUpdateParam.promoCode) {
        sqlTasks.push({'sql': sql2, 'paras': objUpdateParam});
    }

    mysqlDao.executeByTran(sqlTasks, done);
}

function checkCodeSql(objQueryParam, callback) {
    const sql =
        "    select " +
        "        c.id code" +
        "      , c.`status`" +
        "      , t.off " +
        "    from eink_purchase_promo_codes c " +
        "    LEFT JOIN eink_purchase_promo_codes_type t ON c.type = t.id " +
        "    where c.id=:code ";

    mysqlDao.executeObject(sql, objQueryParam, callback);
}

function fetchCodeSql(objQueryParam, callback) {
    const sql =
        '    select promo_code promoCode from eink_purchase_order where id=:orderId limit 1 ';

    mysqlDao.executeObject(sql, objQueryParam, callback);
}

module.exports = {
    createOrderSql,
    fetchOrderMsgSql,
    saveInfoSql,
    updateOrderSql,
    checkCodeSql,
    fetchCodeSql,
};