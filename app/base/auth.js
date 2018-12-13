const config = require('../../config/static_config');
const RetJson = require('../base/retjson');
const errCode = require('../base/err_code');
const jwt = require('jsonwebtoken');
const paramConfig = require('./param_config');
const envConfig = require('../../config/env_config');

// 验证用户是否登录
exports.userRequired = function(req, res, next) {
    if (envConfig.isDebug){
        req.apiUser = {userName: '脚本'};
        next();
        return;
    }

    const token = req.body.token || req.query.token || req.headers.authorization;

    if (token) {
        // 确认token
        jwt.verify(token, paramConfig.token_secret, function(err, decoded) {
            if (err) {
                return res.send(new RetJson(errCode.NO_SIGNIN, errCode.TOKEN_IS_ERROR));
            } else {
                // 如果没问题就把解码后的信息保存到请求中，供后面的路由使用
                req.apiUser = decoded;
                req.userId = decoded.userId;
                next();
            }
        });
    } else {
        // 如果没有token，则返回错误
        const userName = req.apiUser? req.apiUser.userName : '未知人';
        global.context.logger.info(
            userName,
            'SYS',
            req.path,
            '未携带token',
            '参数：' + JSON.stringify(req.body) + JSON.stringify(req.query)
        );
        res.send(new RetJson(errCode.NO_SIGNIN, errCode.TOKEN_IS_NULL));
    }
};
