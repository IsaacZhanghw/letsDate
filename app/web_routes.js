const express = require('express');
const einkPurchaseCtrl = require('./controllers/eink_purchase_controller');
const oauthCtrl = require('./controllers/oauth_controller');
const reviewCtrl = require('./controllers/review_controller');
const testCtrl = require('./controllers/test_controller');
const resumeCtrl = require('./controllers/resume_controller');
const router = express.Router();

const wxpay = require('./lib/common/wxpay');

router.get('/auth', oauthCtrl.auth);

router.get('/einkPurchase/fetchHomePage', einkPurchaseCtrl.fetchHomePage);
router.get('/einkPurchase/fetchHomePageViaType2', einkPurchaseCtrl.fetchHomePageViaType2);
router.get('/einkPurchase/checkCode', einkPurchaseCtrl.checkCode);
router.post('/einkPurchase/order', einkPurchaseCtrl.order);
router.post('/einkPurchase/wxpay/notify', wxpay.useWXCallback((msg, req, res, next) => { next(); }), einkPurchaseCtrl.wxpayNotify);

router.get('/review/register', reviewCtrl.register);

//阅读测评
router.get('/readTest/getPaper', testCtrl.getTestPaper);
router.post('/readTest/commitAns', testCtrl.commitAnswer);
router.get('/readTest/getShare', testCtrl.getShare);

// 收集简历
router.post('/resume/sendEmail', resumeCtrl.sendEmail);

module.exports = router;
