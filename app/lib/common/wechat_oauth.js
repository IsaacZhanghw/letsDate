const WeChatOAuth = require('wechat-oauth');
const config = require('../../base/param_config');

const weChatClient = new WeChatOAuth(config.weixin.appid, config.weixin.appsecret);
module.exports = weChatClient;