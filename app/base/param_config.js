var config = {
    server_type: 'lemonReadWeChat',

    weixin: {
        token: 'boyue',
        appid: 'wx532043a487e6d198',
        appsecret: '04a2ccba28ebb5899c8fd6e35e2ed277',
    },

    host: 'http://mp.weixin.lemonread.com',

    // 微信公众号支付配置
    wxJsPay: {
        appid: 'wx532043a487e6d198',       // 公众号ID
        mch_id: '1495291572',     // 微信商户号
        partner_key: 'OpUBRyix4iy93s8H9Cp2KFuyLtz1x8RU', // 微信商户平台API密钥
        body: '柠檬悦读-eink购买',
        notify_url: '/einkPurchase/wxpay/notify', // 扫码支付后回调地址
        trade_type: 'JSAPI',  // 交易类型:公众号支付
    },

    // productId
    productId: 99,

    // money level 单位:分
    moneyLevel: [99800],

    emailConfig: {
        host: 'smtp.exmail.qq.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'lemonread@boyue.com', // email id
            pass: 'kQN5bNGhjiG9mgce' // password
        },
        option: {
            from: 'lemonread@boyue.com', // sender address same as auth.user
            to: 'hr@boyue.com', // sender address same as auth.user
        }
    },
};

module.exports = config;