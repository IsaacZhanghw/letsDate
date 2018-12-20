import {get, post } from "../../utils/request";
const app = getApp();
Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        imgalist: ['http://webview.lemonread.com/code.jpg'],
        screenWidth: 0,
        screenHeight: 0,
        inputValue: "",
        minValue: 0,
        maxValue: 1,
        avatarUrl: '',
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
        this.setData({
            screenWidth: app.globalData.SystemInfo.windowWidth,
            screenHeight: app.globalData.SystemInfo.windowHeight,
        })
    },
    bindKeyInput(e) {
        this.setData({
            inputValue: e.detail.value
        })
    },
    leftValueChangeAction: function(e) {
        this.setData({
            minValue: e.detail.leftValue
        })
    },
    rightValueChangeAction: function(e) {
        this.setData({
            maxValue: e.detail.rightValue
        })
    },
    bindImage: function() {
        console.log('???')
        let that = this
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                const tempFilePaths = res.tempFilePaths
                console.log('tempFilePaths', tempFilePaths[0])
                that.setData({
                    avatarUrl: tempFilePaths[0]
                })
            }
        })
    },
})