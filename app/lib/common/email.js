const nodemailer = require('nodemailer');
const emailConfig = require('../../base/param_config').emailConfig;

exports.sendEmail = mailOptions => {
    nodemailer.createTestAccount(err => {
        if (err) {
            console.log(err);
            return err;
        }
        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            host: emailConfig.host,
            port: emailConfig.port,
            secure: emailConfig.secure,                                 // true for 465, false for other ports
            auth: {
                user: emailConfig.auth.user,                            // generated ethereal user
                pass: emailConfig.auth.pass,                            // generated ethereal password
            }
        });

        // // setup email data with unicode symbols
        // const mailOptions = {
        //     from: 'wangxiao@boyue.com',                             // sender address
        //     // to: 'tengwei@boyue.com, wuyongze@boyue.com',         // list of receivers
        //     subject: '『这不是演习』',                                 // Subject line
        //     text: 'Hello world?',                                   // plain text body
        //     html: '<b>Hello world?</b>'                             // html body
        // };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return error;
            }

            return info;

            // console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    });
};