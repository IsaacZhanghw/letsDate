
var logCofig = require('../../../config/static_config').log;
var log4js = require('log4js');

var appenders = logCofig.appenders.filter(function (appender) {
    return appender.category === logCofig.logger.appender;
});

log4js.configure({
    appenders: appenders
});

var logger = log4js.getLogger(logCofig.logger.appender);
logger.setLevel(logCofig.logger.level);

module.exports = exports = logger;