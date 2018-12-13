const WXPay = require('weixin-pay');
const pConfig = require('../../base/param_config');

const wxpay = WXPay(pConfig.wxJsPay);

module.exports = wxpay;