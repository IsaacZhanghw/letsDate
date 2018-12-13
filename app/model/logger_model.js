/**
 * 日志
 */
var mongoose = require('../lib/common/mongodb.js');
var Schema = mongoose.Schema;

var readingSchema = new Schema({          
    createTime: {type: Date},
    logLevel: {type: String},
    nodeID: {type: String},
    source: {type: String},
    key: {type: String},
    logType: {type: String},
    module: {type: String},
    logContent: {type: String}
});

module.exports = mongoose.model('logger',readingSchema,'logger');

