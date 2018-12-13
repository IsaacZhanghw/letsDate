const RetJson = require('../base/retjson');
const errCode = require('../base/err_code');
const pConfig = require('../base/param_config');
const einkPurchaseDao = require('../dao/eink_purchase_dao');
const wxpay = require('../lib/common/wxpay');
const commFunc = require('../lib/common/comm_func');
const weChatApi = require('../lib/common/wechat_api');
const redisHandler = require('../lib/common/redis_data');
const weChatClient = require('../lib/common/wechat_oauth');
const validator = require('../lib/common/validator_extend');

const _ = require('lodash');
const async = require('async');
const moment = require('moment');

function auth(req, res, next) {
    const typeId = req.query.typeId;

    if (!!typeId && typeId == 2) {
        const url = weChatClient.getAuthorizeURL('http://mp.weixin.lemonread.com/einkPurchase/fetchHomePageViaType2', '', 'snsapi_base');
        res.redirect(url);
    } else {
        const url = weChatClient.getAuthorizeURL('http://mp.weixin.lemonread.com/einkPurchase/fetchHomePage', '', 'snsapi_base');
        res.redirect(url);
    }
}

function fetchHomePage(req, res, next) {
    const code = req.query.code;
    weChatClient.getAccessToken(code, (err, result) => {
        if (err || !result || !result.hasOwnProperty('data')) {
            console.log('微信购买 eInk 页面跳转异常:', err);
            res.send('服务异常，请稍后再试！');
        } else {
            let redirectUrl = pConfig.host + '/#/lemonPay?openid=' + result.data.openid;
            // // TODO 取消开发者调试
            // if (['oBg2Z0eTNCU5RYwtW_f_f95DFc_0'     // wx
            //     , 'oBg2Z0Vd5QNaw3w1QzVguoVjNzwg'    // zhw
            //     , 'oBg2Z0XCjSXnJfWtUIsxUQBS23CU'    // dzb
            //     , 'oBg2Z0QWWBKCQMUD9KVzVd7-P-po'    // pzs
            //     , 'oBg2Z0a9tW9Z4svJ77TlZ_LIghbI'    // fqc
            //     , 'oBg2Z0dHFtYlVMnRZ9Wd19gjdTBY'    // ldb
            // ].indexOf(result.data.openid) > -1) {
            //     res.redirect(redirectUrl);
            // } else {
            //     res.send('功能开发中,敬请期待!');
            // }

            res.redirect(redirectUrl);
        }
    });
}


function fetchHomePageViaType2(req, res, next) {
    const code = req.query.code;
    weChatClient.getAccessToken(code, (err, result) => {
        if (err || !result || !result.hasOwnProperty('data')) {
            console.log('微信购买 eInk 页面跳转异常:', err);
            res.send('服务异常，请稍后再试！');
        } else {
            let redirectUrl = pConfig.host + '/#/lemonPay?typeId=2&openid=' + result.data.openid;
            // // TODO 取消开发者调试
            // if (['oBg2Z0eTNCU5RYwtW_f_f95DFc_0'     // wx
            //     , 'oBg2Z0Vd5QNaw3w1QzVguoVjNzwg'    // zhw
            //     , 'oBg2Z0XCjSXnJfWtUIsxUQBS23CU'    // dzb
            //     , 'oBg2Z0QWWBKCQMUD9KVzVd7-P-po'    // pzs
            //     , 'oBg2Z0a9tW9Z4svJ77TlZ_LIghbI'    // fqc
            //     , 'oBg2Z0dHFtYlVMnRZ9Wd19gjdTBY'    // ldb
            // ].indexOf(result.data.openid) > -1) {
            //     res.redirect(redirectUrl);
            // } else {
            //     res.send('功能开发中,敬请期待!');
            // }

            res.redirect(redirectUrl);
        }
    });
}

/**
 * 生成订单, 请求支付
 * @param { object } req
 * @param { object } res
 * @param { object } next
 * @returns {*}
 */
function order(req, res, next) {
    // // TODO 取消打印
    // console.log('生成订单, 请求支付');
    let { openId, name, phone, shippingAddress, code, typeId } = req.body;

    // 订单状态,已生成未付款
    const _status = 1;

    if (!openId) {
        return res.send(new RetJson(errCode.ERROR, errCode.ERR_OPENID));
    }

    if (!name) {
        return res.send(new RetJson(errCode.ERROR, errCode.ERR_NAME));
    }

    if (!shippingAddress) {
        return res.send(new RetJson(errCode.ERROR, errCode.ERR_ADDR));
    }

    if (!validator.isPhone('' + phone)) {
        return res.send(new RetJson(errCode.ERROR, errCode.ERR_PHONE));
    }

    if (!req.body.hasOwnProperty('typeId')) {
        typeId = 1;
    } else {
        if (!validator.isInt('' + typeId, { min: 1 })) {
            return res.send(new RetJson(errCode.ERROR, errCode.PARAM_ERROR));
        }
    }

    let subPhoneNum = phone.slice(-4);
    const orderId = moment().format('YYMMDDHHmmss') + Math.random().toString().substr(2, 2) + subPhoneNum;
    // const clientIp = commFunc.getClientIp(req);
    const clientIp = req.ip;

    let insertData = {
        name: _.trim(name),
        openId,
        phone,
        orderId,
        typeId,
        shippingAddress: _.trim(shippingAddress),
        // TODO 价格修改
        totalFee: pConfig.moneyLevel[0],
        productId: pConfig.productId,
        createIp: clientIp,
        status: _status,
    };

    /**
     * 优惠码检查
     * @param callback
     */
    function checkCode(callback) {
        if (code) {
            einkPurchaseDao.checkCodeSql({ code }, (err, result) => {
                if (err) {
                    console.log(err);
                    return callback(err);
                }

                if (!!result) {
                    if (result.status !== 1) {
                        return res.send(new RetJson(errCode.ERROR, errCode.INVALID_PROMO_CODE));
                    } else {
                        insertData.promoCode = result.code;
                        insertData.off = result.off;
                        insertData.actualFee = insertData.totalFee - result.off;
                        callback(null, null);
                    }
                } else {
                    return res.send(new RetJson(errCode.ERROR, errCode.PROMO_CODE_ERROR));
                }
            });
        } else {
            insertData.actualFee = insertData.totalFee;
            callback(null, null);
        }
    }

    /**
     * 记录订单 (本地)
     * @param { function } callback
     */
    function createOrder(callback) {
        einkPurchaseDao.createOrderSql(insertData, callback);
    }

    /**
     * 统一下单 (微信支付)
     * @param { function } callback
     */
    function createUnifiedOrder(callback) {
        const data = {
            openid: openId,
            body: pConfig.wxJsPay.body,
            out_trade_no: insertData.orderId,                           // 商户系统内部订单号
            total_fee: insertData.actualFee,                            // 订单实际金额,单位为分
            spbill_create_ip: insertData.createIp,                      // 用户端ip
            notify_url: pConfig.host + pConfig.wxJsPay.notify_url,      // 支付成功回调成功地址
            trade_type: pConfig.wxJsPay.trade_type,                     // 交易类型
            product_id: insertData.productId,                           // 商品id
        };

        wxpay.createUnifiedOrder(data, callback);
    }

    /**
     * 返回函数
     * @param { object } err
     * @param { object } result
     */
    function funcRet(err, result) {
        if (err) {
            console.log(err);
            return res.send(new RetJson(errCode.ERROR, errCode.INTERNAL_SERVER_ERROR));
        }

        // // TODO 取消打印
        // console.log('统一下单回调数据: ', result.createUnifiedOrder);

        // { return_code: 'SUCCESS',
        //     return_msg: 'OK',
        //     appid: 'wx532043a487e6d198',
        //     mch_id: '1495291572',
        //     nonce_str: 'NstmzuGtNvLujJnA',
        //     sign: 'A9B43CB38CCFCE3DB07234AFD7594EC7',
        //     result_code: 'SUCCESS',
        //     prepay_id: 'wx2312003930049994dd8a3f993547606681',
        //     trade_type: 'JSAPI' }

        // 微信生成订单返回值验证
        if (result.createUnifiedOrder.result_code !== 'SUCCESS'
            || result.createUnifiedOrder.sign !== wxpay.sign(result.createUnifiedOrder)) {
            return res.send(new RetJson(errCode.ERROR, errCode.CREATE_ORDER_SIGN_ERROR));
        }

        const retObj = {
            appId: result.createUnifiedOrder.appid,
            nonceStr: Math.random().toString().substr(2, 16),
            timeStamp: moment().format('X'),
            signType: 'MD5',
            package: 'prepay_id=' + result.createUnifiedOrder.prepay_id,
        };
        retObj.paySign = wxpay.sign(retObj);

        // app返回预付信息
        res.send(new RetJson(errCode.SUCCESS, errCode.SUCCESS_MESSAGE, retObj));
    }

    // 异步控制
    async.auto({
        checkCode,
        createOrder: ['checkCode', createOrder],
        createUnifiedOrder: ['createOrder', createUnifiedOrder],
    }, funcRet);
}

/**
 * 支付成功回调
 * @param req
 * @param res
 * @param next
 */
function wxpayNotify(req, res, next) {
    // // TODO 取消打印
    // console.log('支付成功回调');
    const wxmessage = req.wxmessage;
    // const wxmessage = {
    //     appid: 'wx532043a487e6d198',   // 公众号ID
    //     bank_type: 'CFT',   // 付款银行
    //     cash_fee: '1',   // 现金支付金额位为【分】
    //     fee_type: 'CNY', // 货币种类
    //     is_subscribe: 'Y',  // 是否关注公众账号 Y-关注，N-未关注
    //     mch_id: '1495291572',  // 商户号
    //     nonce_str: 'NstmzuGtNvLujJnA',  // 随机字符串
    //     openid: 'oBg2Z0eTNCU5RYwtW_f_f95DFc_0', // 用户在商户appid下的唯一标识
    //     out_trade_no: '180628092249974272', // 商户系统内部订单号
    //     result_code: 'SUCCESS',  // 业务结果
    //     return_code: 'SUCCESS',  // 返回状态码
    //     sign: 'A9B43CB38CCFCE3DB07234AFD7594EC7',  // 签名
    //     time_end: '20180426165426', // 支付完成时间
    //     total_fee: '2',  // 订单总金额，单位为分
    //     trade_type: 'JSAPI', // 交易类型
    //     transaction_id: '4200000057201804266525314378'  // 微信支付订单号
    // };

    // // TODO 取消打印
    // console.log(wxmessage);

    const weiPay = wxpay;
    const weiPayObj = pConfig.wxJsPay;

    let orderMsg;
    let objUpdateParam = {};

    /**
     * 获取订单信息
     * @param callback
     */
    function getOrderMessage(callback) {
        const objQueryParam = {
            orderId: wxmessage.out_trade_no
        };

        einkPurchaseDao.fetchOrderMsgSql(objQueryParam, (err, result) => {
            if (err) return callback(err);

            orderMsg = result || {};
            callback(null, null);
        });
    }

    /**
     * 保存回调数据
     * @param callback
     */
    function saveInfo(callback) {
        const objQueryParam = {
            userId: 0,
            productId: orderMsg.productId || 99,
            transactionId: wxmessage.transaction_id,
            notifyRet: JSON.stringify(wxmessage),
        };

        einkPurchaseDao.saveInfoSql(objQueryParam, callback);
    }

    /**
     * 校验
     * @param callback
     */
    function validate(callback) {
        if (wxmessage.result_code !== 'SUCCESS') {
            return res.success();
        }

        const sign = weiPay.sign(wxmessage);

        // 接收到无记录的订单充值
        if (sign !== wxmessage.sign) {
            return res.success();
        }

        // 接收到无记录的订单充值
        if (!orderMsg || !orderMsg.hasOwnProperty('orderId')) {
            return res.fail();
        }

        // 订单已处理，支付成功
        if (orderMsg.status === 2) {
            return res.success();
        }

        if (orderMsg.actual_fee !== parseInt(wxmessage.total_fee, 10)) {
            return res.success();
        }

        if (weiPayObj.appid !== wxmessage.appid) {
            return res.success();
        }

        callback(null, orderMsg);
    }

    function fetchCode(callback) {
        einkPurchaseDao.fetchCodeSql({ orderId: wxmessage.out_trade_no }, (err, result) => {
            if (err || !result) {
                objUpdateParam.promoCode = null;
                callback(null, null);
            } else {
                objUpdateParam.promoCode = result.promoCode;
                callback(null, null);
            }
        });
    }

    // 更新订单状态
    function updateOrder(callback) {
        objUpdateParam.orderId = wxmessage.out_trade_no;
        objUpdateParam.timeEnd = wxmessage.time_end;
        objUpdateParam.transactionId = wxmessage.transaction_id;

        einkPurchaseDao.updateOrderSql(objUpdateParam, callback);
    }

    // 回调函数
    function funcRet(err, result) {
        if (err) {
            console.log(err);
            return res.fail();
        }

        res.success();
    }

    async.auto({
        getOrderMessage,
        saveInfo: ['getOrderMessage', saveInfo],
        validate: ['saveInfo', saveInfo],
        fetchCode: ['validate', fetchCode],
        updateOrder: ['fetchCode', updateOrder],
    }, funcRet);
}

/**
 * 检查优惠码有效性
 * @param req
 * @param res
 * @param next
 */
function checkCode(req, res, next) {
    const code = req.query.code;

    if (!code) {
        return res.send(new RetJson(errCode.ERROR, errCode.ERR_OPENID));
    }

    einkPurchaseDao.checkCodeSql({ code }, (err, result) => {
        if (err) {
            console.log(err);
            return res.send(new RetJson(errCode.ERROR, errCode.INTERNAL_SERVER_ERROR));
        }

        if (!!result) {
            if (result.status !== 1) {
                return res.send(new RetJson(errCode.ERROR, errCode.INVALID_PROMO_CODE));
            } else {
                return res.send(new RetJson(errCode.SUCCESS, errCode.SUCCESS_MESSAGE, result));
            }
        } else {
            return res.send(new RetJson(errCode.ERROR, errCode.PROMO_CODE_ERROR));
        }
    });
}

module.exports = {
    auth,
    fetchHomePage,
    fetchHomePageViaType2,
    order,
    wxpayNotify,
    checkCode,
};