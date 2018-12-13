
const RetJson = require('../base/retjson');
const errCode = require('../base/err_code');
const testDao = require('../dao/test_dao')
const validator = require('../lib/common/validator_extend');
const async = require('async');

function getTestPaper(req, res, next) {
    const { openid, grade, name } = req.query;
    if (!openid) {
        res.send(new RetJson(errCode.ERROR, errCode.ERR_OPENID));
        return;
    }
    if (!validator.isInt(grade + '', { min: 1, max: 9 })) {
        res.send(new RetJson(errCode.ERROR, errCode.GRADE_ERR));
        return;
    }

    let level;
    if (grade >= 1 && grade <= 3) {
        level = 1;
    } else if (grade == 4 || grade == 5) {
        level = 2;
    } else if (grade >= 6) {
        level = 3;
    }

    function getTestPaper(result, callback) {
        if (result) {
            return callback(1)//做了卷子
        }
        testDao.getTestPaper({ level }, callback);
    }

    function getTestResult(callback) {
        testDao.getTestResult({ openid }, callback);
    }
    let paperId;
    function getArticleAndQuestion(result, callback) {
        if (!result) {//没有卷子
            callback(2)
            return;
        }
        paperId = result.id;
        async.parallel({
            getArticle: function (cb) {
                testDao.getAllArticleByPaperId({ paperId: result.id }, cb);
            },
            getQuestion: function (cb) {
                testDao.getAllQuestion({ paperId: result.id }, cb);
            }
        }, (err, result) => {
            if (err) {
                callback(err, null)
                return
            }
            callback(null, result)
        });
    }

    async.waterfall([
        getTestResult,
        getTestPaper,
        getArticleAndQuestion], (err, result) => {
            if (err) {
                if (err == 1) return res.send(new RetJson(errCode.SUCCESS, errCode.DONE_TEST));
                if (err == 2) return res.send(new RetJson(errCode.SUCCESS, errCode.NO_PAPER));
                global.context.logger.error(
                    '',
                    'MYSQL',
                    'getTestPaper',
                    '微信获取试卷错误:',
                    err
                );
                res.send(new RetJson(errCode.DB_ERROR, errCode.ERROR_MESSAGE));
                return;
            }
            let articles = result.getArticle;
            let Questions = result.getQuestion;

            for (let i = 0, len1 = Questions.length; i < len1; i++) {
                for (let j = 0, len2 = articles.length; j < len2; j++) {
                    if (Questions[i].articleId == articles[j].articleId) {
                        Questions[i].options = JSON.parse(Questions[i].options);
                        let opt = [];
                        for (let key in Questions[i].options) {
                            if (key == 'A') {
                                opt.splice(0, 0, 'A:' + Questions[i].options[key].content);
                            } else if (key == 'B') {
                                opt.splice(1, 0, 'B:' + Questions[i].options[key].content);
                            } else if (key == 'C') {
                                opt.splice(2, 0, 'C:' + Questions[i].options[key].content);
                            } else if (key == 'D') {
                                opt.splice(3, 0, 'D:' + Questions[i].options[key].content);
                            }
                        }
                        Questions[i].options = opt
                        if (articles[j].Questions) {
                            articles[j].Questions.push(Questions[i]);
                        } else {
                            articles[j].Questions = [];
                            articles[j].Questions.push(Questions[i]);
                        }
                        break;
                    }
                }
            }
            res.send(new RetJson(errCode.SUCCESS, errCode.SUCCESS_MESSAGE, { articles, paperId }));
        })
}

function commitAnswer(req, res, next) {
    let { answersList = [], openid, paperId, name, grade, headImg } = req.body;
    if (typeof answersList == 'string' && validator.isJSON(answersList)) answersList = JSON.parse(answersList);

    if (!openid) {
        res.send(new RetJson(errCode.ERROR, errCode.ERR_OPENID));
        return;
    }
    if (!validator.isInt(paperId + '')) {
        res.send(new RetJson(errCode.ERROR, errCode.PAPERID_ERR));
        return;
    }
    if (!name) {
        res.send(new RetJson(errCode.ERROR, errCode.NAME_ERR));
        return;
    }
    if (!validator.isInt(grade + '')) {
        res.send(new RetJson(errCode.ERROR, errCode.GRADE_ERR));
        return;
    }

    let questionIds = [];
    let answerList = ``;
    for (let i = 0; i < answersList.length; i++) {
        questionIds.push(answersList[i].questionId);
        answerList += `,${i + 1}.${answersList[i].answers}`;
    }
    answerList = answerList.length ? answerList.substring(1) : answerList;

    function getDiffcultySetting(callback) {
        testDao.getDiffcultySetting(callback);
    }

    function getArticleLevelByPaperId(callback) {
        testDao.getArticleLevelByPaperId({ paperId }, callback)
    }

    function getQuestions(callback) {
        testDao.getQuestionsById({ questionIds }, callback)
    }

    function getTestPaperPassScore(callback) {
        testDao.getTestPaperPass({ paperId }, callback);
    }

    function compareAnswer(callback) {
        async.parallel({
            getDiffcultySetting,
            getArticleLevelByPaperId,
            getQuestions,
            getTestPaperPassScore,
        }, (err, result) => {
            if (err) {
                callback(err, null)
                return;
            }
            callback(null, result);
        })
    }

    let score;
    let insertParams = {};
    function getRanking(result, callback) {
        let { totalScore, userAnswers } = calculateScore(result.getDiffcultySetting, result.getArticleLevelByPaperId,
            result.getQuestions, answersList, openid);
        score = totalScore;

        insertParams.totalScore = totalScore;
        insertParams.openid = openid;
        insertParams.name = name;
        insertParams.paperId = paperId;
        insertParams.passed = totalScore >= result.getTestPaperPassScore[0].passScore ? 1 : 0;
        insertParams.userAnswers = userAnswers;
        insertParams.answerList = answerList;
        insertParams.grade = grade;
        insertParams.headImg = headImg;

        async.parallel({
            getRanking: cb => {
                testDao.getRanking({ totalScore, paperId }, cb);
            },
            getTotal: cb => {
                testDao.getTotalCount({ paperId }, cb);
            }
        }, (err, result) => {
            if (err) {
                callback(err, null)
                return;
            }
            callback(null, result);
        })
    }

    function insertData(result, callback) {
        if (!result) return callback('GETRANKING_ERR');
        insertParams.ranking = result.getTotal.totalCount ? (result.getRanking.betterThanCount / result.getTotal.totalCount) : 0;
        testDao.insertData(insertParams, callback);
    }

    async.waterfall([compareAnswer, getRanking, insertData], (err, result) => {
        if (err) {
            global.context.logger.error(
                '',
                'MYSQL',
                'commitTestPaper',
                '微信提交试卷错误:',
                err
            );
            res.send(new RetJson(errCode.DB_ERROR, errCode.ERROR_MESSAGE));
            return;
        }
        let retObj = {};
        retObj.name = name;
        retObj.headImg = headImg;
        retObj.grade = grade;
        retObj.score = score;
        retObj.ranking = insertParams.ranking;
        retObj.shareId = result.insertId;

        res.send(new RetJson(errCode.SUCCESS, errCode.SUCCESS_MESSAGE, retObj));
    })
}

function calculateScore(diffSet, articleLevel, questions, userAnswers, openid) {
    let score = 0;
    for (let i = 0, len1 = userAnswers.length; i < len1; i++) {//[{questionId:1,answers:AB}]

        for (let j = 0, len2 = questions.length; j < len2; j++) {//找属于哪题
            if (typeof questions[j].options == 'string')
                questions[j].options = JSON.parse(questions[j].options);


            if (userAnswers[i].questionId == questions[j].questionId) {
                let questionScore = 0;
                for (let k = 0, len3 = articleLevel.length; k < len3; k++) {//找属于哪文
                    if (questions[j].articleId == articleLevel[k].articleId) {

                        let userAns = userAnswers[i].answers;
                        let queOpt = questions[j].options;

                        for (let t = 0, len4 = userAns.length; t < len4; t++) {//答案分值累加
                            questionScore += queOpt[userAns[t]].score;
                        }

                        if (userAns == questions[j].answer) {//正确奖励分
                            questionScore += diffSet[questions[j].difficultyLevel - 1].rightAddScore;
                            userAnswers[i].isRight = 1;
                        } else {
                            userAnswers[i].isRight = 0;
                        }
                        userAnswers[i].openid = openid;
                        if (userAns.length) {
                            //乘以难度系数
                            questionScore *= diffSet[questions[j].difficultyLevel - 1].difficultyDegree;
                            //文章难度加成分
                            questionScore += diffSet[articleLevel[k].articleDifficultyLevel - 1].difficultyAddScore;
                        }
                        break;
                    }
                }
                score += questionScore;
                break;
            }
        }

    }
    return { totalScore: score, userAnswers }
}

function getShare(req, res, next) {
    let shareId = req.query.shareId;

    if (typeof parseInt(shareId) != 'number') {
        return res.send(new RetJson(errCode.ERROR, errCode.SHAREID_ERR));
    }

    testDao.getShare({ shareId }, (err, result) => {
        if (err) {
            global.context.logger.error(
                '',
                'MYSQL',
                'wxGetShare',
                '微信获取分享错误:',
                err
            );
            res.send(new RetJson(errCode.DB_ERROR, errCode.ERROR_MESSAGE));
            return;
        }
        res.send(new RetJson(errCode.SUCCESS, errCode.SUCCESS_MESSAGE, result))
    })
}

module.exports = {
    getTestPaper, commitAnswer, getShare
}