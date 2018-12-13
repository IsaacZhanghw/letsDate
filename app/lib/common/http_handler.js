/*****************************************************
 * Author  : wadecha
 * Version : 1.0
 * Date    :  2015/09/18
 ****************************************************/

var request = require('superagent');
var http = require('http');
var querystring = require('querystring');

function HttpCallBase() {
    this.moduleName = this.__proto__.constructor.name;
}

module.exports = exports = HttpCallBase;

exports.prototype.baseHttpPostCall = function(postUrl, postData, callback){
    var outPutFunc = function(err, res){
        if(err){
            callback(err);
            return;
        }

        callback(undefined, res.text);
    };

    request.post(postUrl).send(postData).type('json').end(outPutFunc);
};

exports.prototype.baseHttpGetCall = function(getUrl, callback){

    var outPutFunc = function(err, res){
        if(err){
            callback(err);
            return;
        }

        callback(undefined, res.text);
    };

    request.get(getUrl).end(outPutFunc);
};

exports.prototype.httpPost = function(apiParam, postData, callback){
    postData = querystring.stringify(postData);
    var options = {
        host: apiParam.host,
        port: apiParam.port,
        path: apiParam.path,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    var req = http.request(options, function(res) {
        var result;
        res.setEncoding('utf8');
        res.on('data', function (ret) {
            result = ret;
            console.log('result:',ret);
        });
        res.on('end',function(ret){
            console.log("body: " + ret);
            callback(null, result);
        });
        req.on('error', function (err) {
            console.log("err:" + err);
            callback(err);
        });

    });
    req.write(postData);
    req.end();
};

