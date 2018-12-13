(function(){
    "use strict";
    var redis = require('redis');
    var staticConfig = require('../../../config/static_config');
    var logger = require('./logger');

    // var idgen = require('node-idgen');
    //var nodeId = (process.pid % 63); //config.env.nodeID
    // exports.idGenerator = new idgen.IdGenerator();

    var log = {};
    ['trace', 'debug', 'info', 'warn', 'error', 'fatal'].forEach(function(method) {
        log[method] = function(key, logType, module, logContent) {
            var args = [];
            args.push('%s#%s#%s#%s#%s#%s');
            args.push(process.pid);
            //args.push(config.env.nodeID);
            args.push("supplier");
            for (var i = 0, len = arguments.length; i < len; i++) {
                args.push(arguments[i]);
            }
            (logger[method]).apply(logger, args);
        };
    });

    exports.logger = log;

    var redisClient = redis.createClient(staticConfig.redisConfig.port, staticConfig.redisConfig.host, { auth_pass: staticConfig.redisConfig.pass });

    redisClient.on('error', function(err) {
        log.error('',
            'SYS',
            'redisClient',
            'redis 出错:',
            err
        );
    });

    exports.redisData = new (require('./redis_data'))(redisClient, redis);

    // exports.messageHandling = new (require('./message_handling'))(redisClient);

    // exports.apiConfig = config.api_config;

    //暂时不用注释，消息队列
    // var stompClient = require('./stomp_pool');

    // function stompPublishMessage(type, message, callback) {
    //     //message格式暂定: 消息类型，发起者，消息体
    //     message = type + '$' + 'manage' + '$' + message;
    //     stompClient.publishMessage(config.MQPublishConfig.scmNotify, message, callback);
    // }

    // exports.stompPublishMessage = stompPublishMessage;

})();