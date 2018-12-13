const email = require('../lib/common/email');
const paramConfig = require('../base/param_config');
const RetJson = require('../base/retjson');
const errCode = require('../base/err_code');

function sendEmail(req, res, next) {

    const filename = req.body.filename;
    let data = req.body.fileData;
    data = data.substr(data.indexOf('base64,') + 7);

    const mailOptions = {
        from: paramConfig.emailConfig.option.from,
        to: paramConfig.emailConfig.option.to,
        subject: '简历投递-' + filename || '',
        html: '<b>简历投递</b>',
        attachments: [
            {
                filename: filename,
                content: Buffer.from(data, 'base64'),
                // cid: 'note@example.com' // should be as unique as possible
            },
        ]
    };
    email.sendEmail(mailOptions);
    res.send(new RetJson(errCode.SUCCESS, errCode.SUCCESS_MESSAGE));
}

module.exports = {
    sendEmail
};
