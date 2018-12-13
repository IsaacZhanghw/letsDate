import { post } from "../../utils/request";

const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        numberArr: ['一', '二', '三', '四', '五', '六', '七', '八', '九 ', '十', '十一', '十二', '十三', ]
    },
    gotoReporte(e) {
        this.setData({
            artIndex: Number(e.target.dataset.y),
            queIndex: Number(e.target.dataset.x),
        });
        wx.setStorageSync(this.data.grade, this.data);
        wx.navigateBack({
            delta: 1
        });
    },
    commit() {
        var that = this
        if (this.data.usedTime < 360) {
            wx.showModal({
                title: "",
                content: "只有答题时间超过6分钟才能交卷哦",
                showCancel: false,
                cancelText: '取消',
                cancelColor: '#000000',
                confirmText: '继续作答',
                confirmColor: '#4A4A4A',
                success: res => {
                  if (res.confirm) {}
                }
            });
            return;
        }
        for(var i in this.data.answerStr) {
            for(var j = 0; j < this.data.answerStr[i].length; j++) {
                if(this.data.answerStr[i][j] == '') {
                    wx.showModal({
                        title: "提示",
                        content: "还有题目没有做完，请再仔细阅读作答",
                        showCancel: false,
                        cancelColor: '#000000',
                        confirmText: '继续作答',
                        confirmColor: '#4A4A4A',
                        success: res => {
                            if(res.confirm){
                                that.setData({
                                    artIndex: i,
                                    queIndex: j
                                });
                                wx.setStorageSync(that.data.grade, that.data);
                                wx.navigateBack({
                                    delta: 1
                                });
                            }
                        }
                    });
                    return
                }
            }
        }
        wx.showModal({
            title: "提示",
            content: "交卷后不能再修改，确认无误了么？",
            showCancel: true,
            cancelText: '我再想想',
            cancelColor: '#000000',
            confirmText: '交卷',
            confirmColor: '#4A4A4A',
            success: res => {
                if(res.confirm){
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
                    // 提交试卷
                    post(`/test/commitAnser`, reqData).then(res => {
                        // 跳转到报告页面
                        app.globalData.isGoReviews = true,
                        wx.reLaunch({
                            url: `/pages/reporteReviews/reporteReviews`,
                            success() {
                                // 清除本地存储
                                wx.removeStorageSync(grade)
                            }
                        })
                    })
                }
            }
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const grade = options.grade
        const testData = wx.getStorageSync(grade) || {};
        this.setData(testData);
        if (this.data.testTime == 0) {
            this.commit();
        }
    },
})