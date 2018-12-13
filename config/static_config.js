const config = {
    port: 4100,

    // mysql 配置

    mysqlConfig: {
        host: 'rm-wz9y70434ff80w27r.mysql.rds.aliyuncs.com',
        user: 'lemonread',
        password: 'lemonreadK12',
        database: 'lemonread',
        port: 3306
    },

    // redis 配置
    redisConfig: {
        host: '127.0.0.1',
        port: 6379,
        pass: 'lemon'
    },

    // mongodb 配置
    mongoConfig: {
        connstr:'mongodb://lemonread:lemonreadK12@dds-wz9b816b097c26841.mongodb.rds.aliyuncs.com:3717,dds-wz9b816b097c26842.mongodb.rds.aliyuncs.com:3717/boyue_K12?replicaSet=mgset-9208011'
    },

    //log 日志配置
    log: {
        logger: {
            appender: 'redis',
            level: 'INFO'
        },
        appenders: [{
            type: 'console',
            category: 'console'
        }, {
            type: 'dateFile',

            filename: 'logs/log.txt',
            pattern: 'yyyyMMdd',
            alwaysIncludePattern: false,
            category: 'dateFile'
        }, {
            type: 'redis',
            host: '127.0.0.1',
            port: 6379,
            pass: 'lemon',
            channel: 'q_log',
            category: 'redis',
            layout: {
                type: 'pattern',
                pattern: '%d{yyyy-MM-dd hh:mm:ss:SSS}#%p#%m'
            }
        }]
    },
};


module.exports = config;
