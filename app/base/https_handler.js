const http = require("https");
const parse = require('url').parse;

function getHttpsUrl(url, callback) {
	const info = parse(url);
	const options = {
		hostname: info.hostname,
		port: info.port,
		path: info.path,
		method: 'GET'
	};

	const req = http.request(options, res => {
		res.setEncoding('utf-8');
		res.on('data', function (chunk) {
			callback(null,chunk);// 返回结果
		});
	});

	req.on('error', e => {
		console.log('problem with request: ' + e.message);
		callback(e,null);
	});

	req.end();
}

module.exports = {
	getHttpsUrl,
};