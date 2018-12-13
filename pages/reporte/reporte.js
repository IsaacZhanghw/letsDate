import { get, post } from "../../utils/request";
const app = getApp();
var wxParse = require('../../wxParse/wxParse.js')
// pages/reporte/reporte.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        artIndex: 0,
        queIndex: 0,
        optIndex: 0,
    },
    // 滑动文章
    changeArticle(e) {
        if (e.detail.current < this.data.articles.length) {
            this.setData({
                artIndex: e.detail.current,
                queIndex: 0
            })
        } else {
            this.gotoCommitPage()
        }
    },
    // 更换题目
    changeQuestion(e) {
        if (e.detail.source == "touch") {
            if (e.detail.current < this.data.articles[this.data.artIndex].Questions.length) {
                this.setData({
                    queIndex: e.detail.current,
                })
            } else {
                if (this.data.artIndex < this.data.articles.length - 1) { // 如果后面还有文章，则跳到下一篇文章
                    this.setData({
                        queIndex: 0,
                        artIndex: this.data.artIndex + 1
                    })
                } else { // 否则跳到提交页面
                    this.gotoCommitPage()
                }
            }
        }
    },
    changeQuestionByTap(e) {
        this.setData({
            queIndex: e.target.dataset.index
        })
    },
    // 点击答案
    onOptionTap(e) {
        const answers = this.data.answers;
        const answerStr = this.data.answerStr;
        answers[this.data.artIndex][this.data.queIndex] = e.target.dataset.select;
        answerStr[this.data.artIndex][this.data.queIndex] = String.fromCharCode(e.target.dataset.select + 65);
        this.setData({
            answers,
            answerStr,
            // artIndex: this.data.artIndex + 1
        });
        if (this.data.queIndex < this.data.articles[this.data.artIndex].Questions.length - 1) { // 如果本文章还有题目，则跳到下一题
            this.setData({
                queIndex: this.data.queIndex + 1
            })
        } else {
            if (this.data.artIndex < this.data.articles.length - 1) { // 如果后面还有文章，则跳到下一篇文章
                this.setData({
                    queIndex: 0,
                    artIndex: this.data.artIndex + 1
                })
            } else { // 否则跳到提交页面
                this.gotoCommitPage()
            }
        }
    },
    // 获取试卷
    getTestPaper(options) {
        const url = app.globalData.url + `/test/getTestPaper`;
        get(`/test/getTestPaper`, options).then(res => {
            console.log(res)
            if (res.data.errcode == 5) { // 已做过试卷专用errcode
                app.globalData.isGoReviews = true,
                // 跳转到报告页面
                wx.reLaunch({
                    url: `/pages/reporteReviews/reporteReviews`,
                })
            }
            const articles = res.data.retobj.articles;
            const answers = {}
            articles.forEach((article, artIndex) => {
                const arr = []
                article.Questions.forEach((question, queIndex) => {
                    arr.push('')
                })
                wxParse.wxParse('article' + artIndex, 'html', article.content, this);
                answers[artIndex] = arr;
            });
            this.setData({
                testTime: res.data.retobj.testTime * 60,
                usedTime: 0,
                articles,
                answers,
                answerStr: JSON.parse(JSON.stringify(answers)),
                paperId: res.data.retobj.paperId
            })
            this.setBarTitle();
        })
    },
    // 倒计时
    setBarTitle() {
        var timer = setInterval(() => {
            var that = this;
            if (this.data.testTime > 0) {
                wx.setNavigationBarTitle({
                    title: this.formatTime(this.data.testTime),
                    success() {
                        that.setData({
                            testTime: that.data.testTime - 1,
                            usedTime: that.data.usedTime + 1
                        })
                        // 最后5分钟
                        if (that.data.testTime == 300) {
                            wx.showModal({
                                title: "",
                                content: "还剩最后5分钟，请抓紧时间作答",
                                showCancel: false,
                                cancelText: '取消',
                                cancelColor: '#000000',
                                confirmText: '我知道了',
                                confirmColor: '#4A4A4A',
                                success: res => {
                                    if (res.confirm) {}
                                }
                            });
                        }
                    }
                });
            } else {
                // 时间到
                clearInterval(timer);
                const answersList = [];
                this.data.articles.forEach((art, aIndex) => {
                    art.Questions.forEach((question, qIndex) => {
                        const obj = {
                            questionId: question.questionId,
                            answers: this.data.answerStr[aIndex][qIndex]
                        }
                        answersList.push(obj);
                    })
                });
                const { paperId, name, grade, usedTime } = this.data
                const reqData = {
                    answersList,
                    paperId,
                    name,
                    grade,
                    timeCost: usedTime * 1000,
                    headImg: wx.getStorageSync('userInfo').avatarUrl
                }
                const url = app.globalData.url + `/test/commitAnser`;
                post(`/test/commitAnser`, reqData).then(res => {
                    // 清除本地存储
                    wx.removeStorageSync(grade)
                })
                wx.showModal({
                    title: "",
                    content: "阅读能力测评时间已用完，试卷已提交",
                    showCancel: false,
                    cancelText: '取消',
                    cancelColor: '#000000',
                    confirmText: '查看报告',
                    confirmColor: '#4A4A4A',
                    success: res => {
                        if (res.confirm) {
                            // 跳转到报告页面
                            app.globalData.isGoReviews = true,
                            wx.reLaunch({
                                url: `/pages/reporteReviews/reporteReviews`,
                            })
                        }
                    }
                });
            }
        }, 1000);
        this.setData({ "timer": timer })
    },
    // 时间格式化为 mm:ss
    formatTime(time) {
        var m = ~~(time / 60);
        var s = time % 60;
        if (m < 10) {
            m = "0" + m
        }
        if (s < 10) {
            s = "0" + s
        }
        return '倒计时' + m + ':' + s;
    },
    // 保存试卷数据到本地
    saveTestData() {
        if (this.data.articles) {
            clearInterval(this.data.timer);
            wx.setStorageSync(this.data.grade, this.data);
        }
    },
    // 从本地拿取试卷数据
    fleshTestData(grade) {
        const testData = wx.getStorageSync(grade) || null;
        if (testData) {
            this.setData(testData);
            this.setBarTitle();
            return false
        } else {
            return true;
        }
    },
    // 跳转到提交页面
    gotoCommitPage() {
        // 保存数据到本地
        this.saveTestData();
        wx.navigateTo({
            url: `/pages/commit/commit?grade=${this.data.grade}`
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            grade: options.grade,
            name: options.name
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        if (this.fleshTestData(this.data.grade)) {
            const { grade, name } = this.data
            this.getTestPaper({ grade, name });
        }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {
        if (app.globalData.isGoReviews) {
            return
        }
        this.saveTestData();
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
        if (app.globalData.isGoReviews) {
            return
        }
        wx.showModal({
            title: "已退出测评",
            content: "下次进入可以继续评测",
            showCancel: false,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#4A4A4A',
        });
        this.saveTestData();
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})