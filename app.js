const path = require('path');
const moment = require('moment');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const webRoutes = require('./app/web_routes');
const staticConfig = require('./config/static_config');

const _ = require('lodash');

//Gzip压缩
// app.use(compression());

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000
}));
app.use(bodyParser.json({limit: '50mb'}));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, content-type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// set global.context
global.context = {};
_.assign(global.context, require('./app/lib/common/global_data'));

app.enable('trust proxy');

app.use(express.query());
app.use('/', webRoutes);

const server = app.listen(staticConfig.port, err => {
    if (err) {
        console.log('web server start failure:', err);
        throw err;
    }

    console.log('----------------------',moment().format('YYYY-MM-DD HH:mm:ss'),'---------------------');
    console.log('lemonRead WeChat server listening on port %d in %s mode', staticConfig.port, app.settings.env);
    console.log('lemonRead WeChat server running, god bless love...');
});

process.on('uncaughtException', err => {
    global.context.logger.error(
        '异常',
        'SYS',
        'uncaughtException',
        '代码异常发生错误: ',
        err.stack
    );
});


// unhandledRejection 未处理的Promise错误
process.on('unhandledRejection', (reason, promise) => {
    global.context.logger.error(
        '异常',
        'SYS',
        'uncaughtException',
        '代码异常发生错误: ',
        reason
    );
});