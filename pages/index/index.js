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
        gradeList: ['选择年级', '一年级', '二年级', '三年级', '四年级', '五年级', '六年级', '七年级', '八年级', '九年级', ],
        grade: 0,
    },
    bindDateChange(e) {
        this.setData({
            grade: e.detail.value
        })
    },
    start() {
        if (this.data.grade == 0) {
            wx.showToast({
                title: "请选择年级",
                icon: 'none',
                duration: 700,
            });
            return;
        }
        wx.showModal({
            title: "",
            content: "阅读测评一轮只能做一次哦",
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '去做题',
            confirmColor: '#4A4A4A',
            success: res => {
                if (res.confirm) {
                    wx.navigateTo({
                        url: `/pages/reporte/reporte?grade=${this.data.grade}&name=${this.data.name}`
                    })
                }
            }
        });
    },
    onNameChange(e) {
        this.setData({
            name: e.detail.value
        })
    },
    onLoad: function() {
        if (app.globalData.userInfo) {
            const userInfo = app.globalData.userInfo
            const name = app.globalData.userInfo.nickName;
            this.setData({
                userInfo,
                hasUserInfo: true,
                name,
            })
        }
    },
    getUserInfo(e) {
        wx.setStorageSync("userInfo", e.detail.userInfo);
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true,
            name: e.detail.userInfo.nickName
        })
    }
})