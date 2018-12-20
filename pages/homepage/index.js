import {get, post } from "../../utils/request";
const app = getApp();
// DELETE from test_result_wx where openid = 'ogdsY4__s16LgfaQlqwQqkE0Z9SI';
// delete from test_user_answer_detail where openid='ogdsY4__s16LgfaQlqwQqkE0Z9SI';
// ogdsY48SFFnroEZhvG9OnxTTPg1Y
// oBg2Z0fCt8mrH496DkdqbMoXJ4FA
Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        imgalist: ['http://webview.lemonread.com/code.jpg'],
        screenWidth: 0,
        screenHeight: 0,
        userdata: {
            ID: "661448e52da94817bc663ffc04926294",
            openid: "ogdsY48SFFnroEZhvG9OnxTTPg1Y",
            nickName: "木头yaya",
            avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL2NibkddSUpjdFZGicr7LDCrkdZkg0Cic2nm16HC3t5GNkW6wo2Av8VQbPlAYoQWkiayC9qsMsibwTqZg/132",
            gender: "1",
            creatTime: "1545217611",
            weichatid: "zdeai352677",
            roleMin: "0",
            roleMax: "0.4",
            dateMin: "0.5",
            dateMax: "1",
            sloganStr: "测试一下"
        }
    },
    onLoad: function() {
        if (app.globalData.userInfo) {
            const userInfo = app.globalData.userInfo
            const nickName = app.globalData.userInfo.nickName;
            this.setData({
                userInfo,
                hasUserInfo: true,
                nickName,
            })
        }
        // console.log(' app.globalData', app.globalData)
        this.setData({
            screenWidth: app.globalData.SystemInfo.windowWidth,
            screenHeight: app.globalData.SystemInfo.windowHeight,
        })
    },
    getUserInfo(e) {
        wx.setStorageSync("userInfo", e.detail.userInfo);
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true,
            nickName: e.detail.userInfo.nickName
        })
        console.log('e', e)
            // const reqData = {
            //     weichatid: "zdeai352677",
            //     password: "123456"
            // }
            // console.log('reqData==>',reqData)
            // // const url = app.globalData.url + `/users/login`;
            // post(`/users/login`, reqData).then(res => {
            //     console.log('res',res)
            //     // 清除本地存储
            //     // wx.removeStorageSync(grade)
            // })
    },
    previewImage: function(e) {
        var current = e.target.dataset.src;
        wx.previewImage({
            current: current, // 当前显示图片的http链接
            urls: this.data.imgalist // 需要预览的图片http链接列表
        })
    },
})