/**
 * Created by Administrator on 2016/3/19.
 */

var _ = require('lodash');
var moment = require('moment');
//var qs = require('querystring');
var utility = require('utility');
var urlencode = require('urlencode');
var httpHandler = new (require('../common/http_handler'))();

function getHttpApiUrl(apiParams, reqPath, reqParams) {

    reqParams.timestamp = moment().format('X');
    reqParams.apikey = apiParams.apikey;
    reqParams.sign = '';

    var gather = '';
    var keysTemp = _.keys(reqParams);
    keysTemp = _.sortBy(_.filter(keysTemp, function(k) { return k !== 'sign'; }));
    for (var i = 0; i < keysTemp.length; i++) {
        gather += keysTemp[i] + "=" + reqParams[keysTemp[i]];
    }

    gather = apiParams.secretkey + gather + apiParams.secretkey;
    reqParams.sign = utility.md5(urlencode(gather)).toUpperCase();
    var pathGather = '';
    for (var key in reqParams) {
        pathGather += '&' + key + '=' + reqParams[key];
    }

    pathGather = pathGather.length > 0 ? pathGather.substr(1) : pathGather;
    return apiParams.reqBaseUrl + reqPath + '?' + pathGather;
}

function HttpApiGetReinvoke(apiParams, reqPath, reqParams, callback) {
    var reinvokeCount = 0;
    var invokePeriod = 15 * 1000;
    var reqUrl = getHttpApiUrl(apiParams, reqPath, reqParams);

    function reinvokeHandle() {
        httpHandler.baseHttpGetCall(reqUrl, function(err, result) {            
            reinvokeCount += 1;
            if (err) {
                if (reinvokeCount > 2) {
                    callback(err);
                    return;
                }
                console.log('reinvoke count1: ' + reinvokeCount);
                setTimeout(reinvokeHandle, invokePeriod * reinvokeCount);
                return;
            }

            result = result ? JSON.parse(result) : null;
            if (result && result.errcode === 0) {
                callback(undefined, result);
                return;
            }

            if (reinvokeCount > 2) {
                callback(undefined, result);
                return;
            }
            console.log('reinvoke count2: ' + reinvokeCount);
            setTimeout(reinvokeHandle, invokePeriod * reinvokeCount);
        });
    }
    reinvokeHandle();
}

exports.HttpApiGetReinvoke = HttpApiGetReinvoke;

function HttpApiPostReinvoke(apiParams, reqPath, reqParams, postParams, callback) {
    var reinvokeCount = 0;
    var invokePeriod = 15 * 1000;

    var reqUrl = getHttpApiUrl(apiParams, reqPath, reqParams);

    function reinvokeHandle() {

        httpHandler.baseHttpPostCall(reqUrl, postParams, function(err, result) {
            reinvokeCount += 1;
            if (err) {
                if (reinvokeCount > 2) {
                    callback(err);
                    return;
                }
                console.log('reinvoke count1: ' + reinvokeCount);
                setTimeout(reinvokeHandle, invokePeriod * reinvokeCount);
                return;
            }

            result = result ? JSON.parse(result) : null;
            if (result && result.errcode === 0) {
                callback(undefined, result);
                return;
            }

            if (reinvokeCount > 2) {
                callback(undefined, result);
                return;
            }
            console.log('reinvoke count2: ' + reinvokeCount);
            setTimeout(reinvokeHandle, invokePeriod * reinvokeCount);
        });

    }
    reinvokeHandle();
}

exports.HttpApiPostReinvoke = HttpApiPostReinvoke;

function HttpApiPostInvoke(apiParams, reqPath, reqParams, postParams, callback) {
    var reqUrl = getHttpApiUrl(apiParams, reqPath, reqParams);

    httpHandler.baseHttpPostCall(reqUrl, postParams, function(err, result) {
        result = result ? JSON.parse(result) : null;
        callback(undefined, result);
        return;
    });
}

exports.HttpApiPostInvoke = HttpApiPostInvoke;
