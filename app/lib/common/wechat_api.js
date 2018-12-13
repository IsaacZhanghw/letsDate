const WeChatApi = require('wechat-api');
const config = require('../../base/param_config');

const weChatApi = new WeChatApi(config.weixin.appid, config.weixin.appsecret);
module.exports = weChatApi;