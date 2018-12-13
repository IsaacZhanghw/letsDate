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
const querystring = require('querystring');

async function register(req, res, next) {
    let  accessToken;

    const fetchAccessToken = async () => {
        const code = req.query.code;
        return new Promise((resolve, reject) => {
            weChatClient.getAccessToken(code, (err, result) => {
                if (err || !result || !result.hasOwnProperty('data')) {
                    reject(new Error('服务异常，请稍后再试！'));
                } else {
                    resolve(result);
                }
            });
        });
    };

    try {
        accessToken = await fetchAccessToken();
    } catch(err) {
        return res.send('服务异常，请稍后再试！');
    }

    const fetchUserInfo = async (openId) => {
        return new Promise((resolve, reject) => {
            weChatClient.getUser(openId, (err, result) => {
                if (err || !result) {
                    reject(new Error('服务异常，请稍后再试！'));
                } else {
                    resolve(result);
                }
            });
        });
    };

    try {
        const userInfo = await fetchUserInfo (accessToken.data.openid);
        let redirectUrl = pConfig.host + '/#/reviewsPage?' + querystring.stringify(userInfo);
        res.redirect(redirectUrl);
    } catch(err) {
        return res.send('服务异常，请稍后再试！');
    }
}

module.exports = {
    register,
};