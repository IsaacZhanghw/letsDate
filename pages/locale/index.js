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
        userList: [{
                "ID": "0a0d5e1118c14139be1b83d6d0d59617",
                "openid": "oBg2Z0V0OPSx73idxA3fx-JDkjkE",
                "nick_name": "吕蓥",
                "head_img": "http://thirdwx.qlogo.cn/mmopen/vi_32/icXe4via54eslyhG54401sVBsWl1Y2nhcBpAwPzfnReH4PoxHa6grOvCCFlvibtbI2teqOxoO6GvGHMxLuYrd4EkA/132",
                "gender": "1",
                "creatTime": "1545114789"
            },
            {
                "ID": "1aeb851bf2c3402984bec98be0d687fd",
                "openid": "ogdsY4xL7BcflOHRy3Nheu1FGwvs",
                "nick_name": "赖丽娜",
                "head_img": "https://wx.qlogo.cn/mmopen/vi_32/jabyoUu9H55h6zJccRwhpWLsyUt44KhN1ULpm8Bveb7dyGlCf5hGdkEuoJQAUUfswMVib1OEY6wIpf7Rd6yL3wg/132",
                "gender": "1",
                "creatTime": "1545114925"
            },
            {
                "ID": "694c3a5620b54d11901d380c8a83b69a",
                "openid": "ogdsY4wiahRBGCWixhEeUJ4F_1mw",
                "nick_name": "毛晓杰",
                "head_img": "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoibBuXQxSoJ9vXhauXiaPXwEs1lcf8U2qYRfz1StrZcD0rXcmhpmZABoEPre6tO7d2ibYde9MtQTicTg/132",
                "gender": "1",
                "creatTime": "1545114893"
            },
            {
                "ID": "7e9d68a81b6a43759e93684df775bc7a",
                "openid": "oBg2Z0S4AooGiuM40o2MYiwVBKls",
                "nick_name": "斯与",
                "head_img": "http://thirdwx.qlogo.cn/mmopen/vi_32/207SGpo7UictSbc96eCdsicPEOEcefWymaWy7OEPfo8M9AFER6jSicn7oRFQSibf4ETM2icYajic4hzgGHFnbnAxyqicA/132",
                "gender": "1",
                "creatTime": "1545114846"
            },
            {
                "ID": "a779acafbc864afc88ea29fdd5036236",
                "openid": "oBg2Z0bc0guDB5tWxOhf3au8wY4Q",
                "nick_name": "Tracy Zou",
                "head_img": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJxtUicJoIA9XQakEnn5bcHzMUZraRlFLZL09QDRsR2yuIhrPWfvCDNOpiabV7aMdHHCIiadxDarRudQ/132",
                "gender": "1",
                "creatTime": "1545114814"
            },
            {
                "ID": "ce17d8477139495db4d060dbbe9f120c",
                "openid": "oBg2Z0XFXuiv7ahMSfYx3YghhPes",
                "nick_name": "星辰",
                "head_img": "http://thirdwx.qlogo.cn/mmopen/vi_32/BUcfMPzbCZSMZ4uvcyXkLW60l23Qa36lfv2eEPyYDiaUSWq7BKb89QqKVd3PyXKD4FplO713MtrVJv2HHHUNLDA/132",
                "gender": "1",
                "creatTime": "1545114694"
            }
        ]
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
    getUserInfo(e) {
        wx.setStorageSync("userInfo", e.detail.userInfo);
        this.setData({
                userInfo: e.detail.userInfo,
                hasUserInfo: true,
                nickName: e.detail.userInfo.nickName
            })
            // console.log('e', e)
        const reqData = {
            weichatid: "zdeai352677",
            password: "123456"
        }
        console.log('reqData==>', reqData)
            // const url = app.globalData.url + `/users/login`;
        post(`/users/login`, reqData).then(res => {
            console.log('res', res)
                // 清除本地存储
                // wx.removeStorageSync(grade)
        })
    },
    previewImage: function(e) {
        var current = e.target.dataset.src;
        wx.previewImage({
            current: current, // 当前显示图片的http链接
            urls: this.data.imgalist // 需要预览的图片http链接列表
        })
    },
})