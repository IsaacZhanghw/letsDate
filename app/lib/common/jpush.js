var JPush = require('jpush-sdk');
var config = require('../../base/param_config').jpush;
var RetJson = require('../../base/retjson');
var errCode = require('../../base/err_code');
var client = JPush.buildClient(config);

// arguments: [身份（学生/教师）， （用户id/教师id，类型数组）]
exports.push = function(userids, message, cb) {
    if(!(userids instanceof Array)) {
        return cb(new RetJson(errCode.ERROR,errCode.PARAM_ERROR));
    }

    client
        .push()
        .setPlatform(JPush.ALL)
        .setAudience(JPush.alias(userids))
        .setNotification(message, JPush.ios('优阅阅读1'), JPush.android('优阅阅读2', null, 1))
        .setMessage(message)
        .send(cb);
};

//userId: 可以是一个id，也可以是id数组
exports.pushUserMsg = function(userId, message, cb) {
    client
        .push()
        .setPlatform(JPush.ALL)
        .setAudience(JPush.alias(userId + ''))
        .setMessage(message)
        .send(cb);
};

//tag: 是一个推送用户的一个标签
exports.pushTagMsg = function(tag, message, cb) {
    client
        .push()
        .setPlatform(JPush.ALL)
        .setAudience(JPush.tag(tag+''))
        .setMessage(message)
        .send(cb);
};

module.exports = exports;
