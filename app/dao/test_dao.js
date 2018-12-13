
const mysqlDao = require('../lib/common/mysql_pool');
function getTestPaper(queryParam, callback) {
    let sql = `select id from test_paper
    where level=:level and is_delete =0 order by createtime desc limit 1`;
    mysqlDao.executeObject(sql, queryParam, callback);
}

function getTestResult(params, callback) {
    let sql = `select * from test_result_wx where openid=:openid
    and test_paper_id in (SELECT id FROM test_paper WHERE round IN (
        SELECT max( round ) currRound FROM test_paper where is_delete=0
    ))`;
    mysqlDao.executeObject(sql, params, callback);
}

function getAllArticleByPaperId(params, callback) {
    let sql = `select id articleId,title,content from test_article
    where test_paper_id=:paperId and is_delete=0
     order by position asc`;
    mysqlDao.executeList(sql, params, callback);
}

function getAllQuestion(params, callback) {
    let sql = `SELECT
	tq.article_id articleId,
	tq.question,
    tq.options,
    tq.type,
	tq.id questionId,
	tq.position questionPosition
    from test_question tq
	where
     tq.article_id IN ( SELECT id FROM test_article WHERE test_paper_id = :paperId and is_delete=0)
     and tq.is_delete=0
    ORDER BY tq.position ASC `;
    mysqlDao.executeList(sql, params, callback);
}

function getDiffcultySetting(callback) {
    let sql = `select difficulty_level difficultyLevel,
    difficulty_degree difficultyDegree,option_max_score optionMaxScore,
    right_add_score rightAddScore,
    difficulty_add_score difficultyAddScore from test_difficulty_setting
    order by difficulty_level asc`;
    mysqlDao.executeList(sql, undefined, callback);
}

function getArticleLevelByPaperId(params, callback) {
    let sql = `select id articleId,difficulty_level articleDifficultyLevel from test_article
    where test_paper_id =:paperId and is_delete=0`;
    mysqlDao.executeList(sql, params, callback)
}

function getQuestionsById(params, callback) {
    let sql = `select
    article_id articleId,
	question,
    options,
    answer,
	id questionId,
    difficulty_level  difficultyLevel from test_question
    where id in (:questionIds)`;
    mysqlDao.executeList(sql, params, callback);
}

function getTestPaperPass(params, callback) {
    let sql = `select pass_score passScore from test_paper where id = :paperId and is_delete=0`;
    mysqlDao.executeList(sql, params, callback)
}

function insertData(params, callback) {
    //let sqlTasks = [];
    // let sql = `insert into test_user_answer_detail(user_id,question_id,
    //     user_answer,is_right) values(:userId,:questionId,:answers,:isRight)`;

    // params.userAnswers.forEach(r => {
    //     sqlTasks.push({ 'sql': sql, 'paras': r });
    // });
    let sql2 = `insert into test_result_wx(openid,name,head_img,grade,test_paper_id,
        final_score,passed,answer_list,ranking)
        values(:openid,:name,:headImg,:grade,:paperId,:totalScore,:passed,:answerList,:ranking)`;

    // let sql3 = `update sys_user set coin=coin+2000 where id=:userId`;
    // let sql4 = `insert into user_coin_change_detail(user_id,before_change,change_coin,
    //     after_change,way_describe) values (:userId,:coin,2000,${params.coin}+2000,
    //     '阅读测评奖励')`;

    // sqlTasks.push({ 'sql': sql2, 'paras': params });
    // sqlTasks.push({ 'sql': sql3, 'paras': params });
    // sqlTasks.push({ 'sql': sql4, 'paras': params });

    mysqlDao.executeUpdate(sql2, params, callback);
}

function getRanking(params, callback) {
    let sql = `SELECT
	sum( count ) betterThanCount
     from (
    ( SELECT count( * ) count FROM test_result WHERE test_paper_id = :paperId AND
    final_score < :totalScore ) UNION ALL
    ( SELECT count( * ) count FROM test_result_wx WHERE test_paper_id = :paperId AND
    final_score < :totalScore )
    ) a`;
    mysqlDao.executeObject(sql, params, callback)
}

function getTotalCount(params, callback) {
    let sql = `SELECT
	sum( count ) totalCount
     from (
    ( SELECT count( * ) count FROM test_result WHERE test_paper_id = :paperId) UNION ALL
    ( SELECT count( * ) count FROM test_result_wx WHERE test_paper_id = :paperId)
    ) a`;
    mysqlDao.executeObject(sql, params, callback)
}

function getShare(params, callback) {
    let sql = `select name,head_img headImg,grade,final_score score,ranking from test_result_wx where id= :shareId`;
    mysqlDao.executeObject(sql, params, callback);
}

module.exports = {
    getTestPaper, getTestResult, getAllQuestion,
    getAllArticleByPaperId, getDiffcultySetting,
    getArticleLevelByPaperId, getQuestionsById,
    getTestPaperPass, insertData, getRanking, getTotalCount,
    getShare
}