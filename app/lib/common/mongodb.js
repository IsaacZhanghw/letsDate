var mongoose = require('mongoose');
var staticConfig = require('../../../config/static_config');

/**
 * 连接
 */
 // console.log(staticConfig.mongoConfig)
mongoose.Promise = global.Promise;
mongoose.connect(staticConfig.mongoConfig.connstr);

/**
  * 连接成功
  */
mongoose.connection.on('connected', function () {    
    console.log('Mongoose connection open to ' + staticConfig.mongoConfig.connstr);  
});    

/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {    
    console.log('Mongoose connection error: ' + err);  
    global.context.logger.error(
        'SYSTEAM',
        'SYS',
        'error',
        'mongo连接异常:',
        err
    );
});    
 
/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function (err) {    
    console.log('Mongoose connection disconnected');  
    global.context.logger.error(
        'SYSTEAM',
        'SYS',
        'disconnected',
        'mongo连接断开:',
        err
    );
});    

module.exports = mongoose;