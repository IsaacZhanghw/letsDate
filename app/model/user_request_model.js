/**
 * 用户请求记录表
 */
var mongoose = require('../lib/common/mongodb.js');
var Schema = mongoose.Schema;
var moment = require('moment');

var requestSchema = new Schema({          
    userId : {type: Number}, //用户id
    clientType : {type: Number}, //客户端类型：1 eInk，2 Android，3 ios
    source: {type: String}, //接口来源：student,teacher,manage
    path: {type: String},//路由
    method: {type: String},//请求类型：GET，POST
    body: {type: {}},  //post参数
    query: {type: {}},//get参数
    responseTime: {type: Number}, //响应时间毫秒值
    time: {type: Date}  //请求具体时间
});

function model(saveData){
	var time = moment().format('YYYYMM');
	var reqModel = mongoose.model('request_msg',requestSchema,'request_msg_'+time);
	reqModel.create(saveData);
}

module.exports = model;
