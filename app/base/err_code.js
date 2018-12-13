var errCode = {
    'SUCCESS': 0,        //操作成功
    'ERROR': 1,          //服务器异常
    'DB_ERROR': 2,       //数据库错误
    'NO_SIGNIN': 3,      //用户未登陆
    'NO_PERMISSION': 4,      //没有权限

    'SUCCESS_MESSAGE': '操作成功',
    'ERROR_MESSAGE': '服务器异常',
    'DB_ERROR_MESSAGE': '数据库错误',
    'USER_NO_SIGNIN': '请先登陆',
    'PARAM_ERROR': '参数错误',
    'TOKEN_IS_NULL': '没有提供token！',
    'TOKEN_IS_ERROR': 'token信息错误',

    'USERNAME_IS_EXIST': '账号已经被注册',
    'PHONE_NUMBER_INPUT_ERROR': '手机号码输入错误',
    'LOGIN_INPUT_ERROR': '登录输入格式不对',
    'LOGIN_USER_NOT_EXIST': '用户名不存在',
    'LOGIN_USER_PASSWORD_ERROR': '登录密码错误',

    'SUPPLIER_ID_ERROR': '供应商id错误',
    'USER_ID_ERROR': '用户id错误',
    'USERNAME_ERROR': '用户名格式错误，只能英文字母和数字',
    'PASSWORD_ERROR': '密码格式错误',
    'USERNAME_HAVED_EXIST': '用户名已存在',
    'OLD_PASSWORD_ERROR': '原密码错误',
    'DONE_TEST': '已经做过测评了',
    'NO_PAPER': '没有对应的试卷',
    'GRADE_ERR': '年级错误',
    'SHAREID_ERR': '分享id错误',
    'ERR_OPENID': 'openId错误',
    'PAPERID_ERR': '试卷id错误',
    'NAME_ERR': '名字不能空',
    'ERR_NAME': '用户姓名错误',
    'ERR_MONEY': '价格错误',
    'ERR_PHONE': '手机号错误',
    'ERR_ADDR': '地址错误',

    'INTERNAL_SERVER_ERROR': '服务器内部错误',
    'CREATE_ORDER_SIGN_ERROR': '创建订单失败',
    'PROMO_CODE_ERROR': '优惠码有误',
    'INVALID_PROMO_CODE': '优惠码已失效',
};

module.exports = errCode;