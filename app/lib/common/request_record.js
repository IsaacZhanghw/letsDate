//记录接口请求信息，响应时间
const moment = require('moment');
const config = require('../../base/param_config');
const requestModel = require('../../model/user_request_model');

function Request(){

}

Request.prototype.addStartTime = function(req){
	this.startTime = moment().format('x');
    this.requestObj = {
	    userId: 0,
	    path: req.path,
	    method: req.method,
	    source: config.server_type,  //source接口来源：student,teacher,manage
	    body: req.body,
	    query: req.query,
	    time: new Date(),
    };
};

Request.prototype.addEndTime = function(req){
	this.endTime = moment().format('x');
	this.requestObj.responseTime = this.endTime - this.startTime;
	this.requestObj.userId = req.userId;
	if (req.method == 'OPTIONS') return;
	requestModel(this.requestObj);  //把请求记录到mongo
};

module.exports = Request;
