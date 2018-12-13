const weChatClient = require('../lib/common/wechat_oauth');
const pConfig = require('../base/param_config');

function auth(req, res, next) {
    const { typeId, uriName = '' } = req.query;

    // 由于一开始开发欠考虑  typeId 为临时添加 所以有点乱
    if (uriName.length === 0 && !!typeId && typeId == 2) {
        const url = weChatClient.getAuthorizeURL(pConfig.host + '/einkPurchase/fetchHomePageViaType2', '', 'snsapi_base');
        return res.redirect(url);
    }

    if (uriName.length === 0 && !typeId) {
        const url = weChatClient.getAuthorizeURL(pConfig.host + '/einkPurchase/fetchHomePage', '', 'snsapi_base');
        return res.redirect(url);
    }

    // 接下的开发以 uriName 为主
    if (uriName.length !== 0 && uriName.toLocaleLowerCase().indexOf('reviewregister') !== -1) {
        const url = weChatClient.getAuthorizeURL(pConfig.host + '/review/register', '', 'snsapi_userinfo');
        return res.redirect(url);
    }
}

module.exports = {
    auth,
};