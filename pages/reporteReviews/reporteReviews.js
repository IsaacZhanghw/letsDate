import { get, getOpenid } from "../../utils/request";
var app = getApp()
Page({
    data: {
        animationData: '',
        hasReport: true,
        clientWidth: 0,
        resultReadNum: 0,
        exceedNum: 0,
        range: '0',
        createTime: '2018-00-00',
        dimensionsColor: [{
            color: 'rgba(113, 184, 255, 1)',
            bgColor: "rgba(113, 184, 255, 0.5)"
        }, {
            color: 'rgba(255, 173, 84, 1)',
            bgColor: "rgba(255, 173, 84, .5)"
        }, {
            color: 'rgba(255, 124, 112, 1)',
            bgColor: "rgba(255, 124, 112, .5)"
        }],
        gradeList: ['一', '二', '三', '四', '五', '六', '七', '八', '九']
    },
    onReady: function() {
        const openid = wx.getStorageSync("openid") || '';
        if (!openid) {
            getOpenid();
        } else {
            this.getReporteReviews()
        }
    },
    getReporteReviews() {
        var that = this
        get(`/test/getTestReport`).then(res => {
            // console.log('res==>', res)
            if (JSON.stringify(res.data.retobj) == "{}") {
                that.setData({
                    hasReport: false,
                })
                var animation = wx.createAnimation({
                    duration: 500,
                    timingFunction: "ease",
                    delay: 0,
                })
                animation.opacity(1).step();
                that.setData({
                    animationData: animation.export()
                })
                setTimeout(function()   {
                    wx.redirectTo({
                        url: `/pages/index/index`,
                    })
                }, 1500)
                return
            }
            var resData = res.data.retobj
            resData.dimensions.forEach((dimenItem, dimenIndex) => {
                dimenItem.color = that.data.dimensionsColor[dimenIndex].color
                dimenItem.bgColor = that.data.dimensionsColor[dimenIndex].bgColor
            })
            resData.books.forEach(bookItem => {
                bookItem.title = bookItem.title.split('.')[0]
            })
            that.setData({
                realName: resData.realName,
                headImg: resData.headImg,
                grade: resData.grade,
                finalScore: resData.finalScore,
                createTime: resData.createTime.substring(0, 16),
                range: resData.range,
                copywriting: resData.copywriting,
                books: resData.books,
                dimensions: resData.dimensions,
                betterThan: resData.betterThan,
            })
            wx.getSystemInfo({
                success: function(res) {
                    var windowWidth = res.windowWidth
                    that.setData({
                        clientWidth: windowWidth,
                        bookWidth: windowWidth * .29
                    })
                    var angle = 168;
                    var angleEnd = null
                    var readNum = that.data.finalScore
                    var initialReadNum = 0
                    if (readNum < 1) {
                        angleEnd = 168
                    } else if (readNum >= 1 && readNum < 1500) {
                        initialReadNum = readNum - 250
                        if (initialReadNum > 0) {
                            angle = 179 + Math.ceil(initialReadNum * .12)
                        }
                        angleEnd = 179 + Math.ceil(readNum * .12)
                    } else {
                        angle = 179 + Math.ceil(1250 * .12)
                        angleEnd = 372
                    }
                    var readNumStep = angleEnd - angle
                    var resultReadNum = readNum - readNumStep * 2
                    var stepTime = 10
                    var timerTime = setInterval(fn, stepTime);

                    function fn() {
                        angle += .5;
                        var resultRead = resultReadNum
                        that.setData({
                            resultReadNum: resultRead
                        })
                        that.drawMain(windowWidth, windowWidth / 2, windowWidth * 0.75, windowWidth / 4, 168, angle)
                        stepTime = stepTime * 1.05;
                        clearInterval(timerTime);
                        if (angle <= angleEnd) {
                            timerTime = setInterval(fn, stepTime);
                            resultReadNum += 1;
                        }
                    }
                    that.animationWidth()
                }
            })
        })
    },
    drawMain(w, x, y, r, angle1, angle2) {
        var rad = (Math.PI * 2) / 100;
        var center_x = w / 2;
        var center_y = w / 2;
        var context = wx.createCanvasContext('backgroundCanvas', this)
        context.lineCap = 'butt';
        context.setFillStyle('#ffffff');
        context.setFontSize(14);
        // 青色透明
        context.save();
        context.strokeStyle = '#09A053';
        context.lineWidth = 6;
        context.beginPath();
        context.arc(x, y, r, angle1 * Math.PI / 180, 372 * Math.PI / 180, false);
        context.stroke();
        context.closePath();
        context.restore();
        // 白色动画
        context.save();
        context.strokeStyle = '#ffffff';
        context.lineWidth = 6;
        context.beginPath();
        context.arc(x, y, r, angle1 * Math.PI / 180, angle2 * Math.PI / 180, false);
        context.stroke();
        context.closePath();
        context.restore();
        // 内
        context.save();
        context.strokeStyle = '#ffffff';
        context.lineWidth = 3;
        context.beginPath();
        context.arc(x, y, r * .8, angle1 * Math.PI / 180, 372 * Math.PI / 180, false);
        context.stroke();
        context.closePath();
        context.restore();
        // 右
        context.save();
        context.beginPath();
        context.arc(x + (r * .8) - 10, y, 10, -15 * Math.PI / 180, 15 * Math.PI / 180, false);
        context.lineTo(x + (r * .8) - 10, y);
        context.fill();
        context.closePath();
        context.restore();
        // 左
        context.save();
        context.beginPath();
        context.arc(x - (r * .8) + 10, y, 10, 165 * Math.PI / 180, 195 * Math.PI / 180, false);
        context.lineTo((x - (r * .8) + 10), y);
        context.fill();
        context.closePath();
        context.restore();
        // 上
        context.save();
        context.beginPath();
        context.arc(x, (y - (r * .8) - 10), 10, 75 * Math.PI / 180, 105 * Math.PI / 180, false);
        context.lineTo(x, (y - ((r * .8) - 10)));
        context.fill();
        context.closePath();
        context.restore();
        // 上字750
        context.save();
        var text_width = 24.6;
        context.fillText('750', x - text_width / 2, y - r - 10);
        context.restore();
        // 左字0
        context.save();
        text_width = 8.2
        context.translate(x - r, y)
        context.rotate(90 * Math.PI / 180)
        context.fillText('0', -text_width / 2, 20);
        context.translate(-(x - r), -y)
        context.restore();
        // 右字1500
        context.save();
        text_width = 32.8
        context.translate(x + r, y)
        context.rotate(-270 * Math.PI / 180)
        context.fillText('1500', -text_width / 2, -10);
        context.translate(-(x + r), -y)
        context.restore();
        context.draw()
    },
    animationWidth() {
        var stepTime = 50
        var that = this
        var exceedNum = 0
        if (parseFloat(that.data.betterThan) * 100 > 30) {
            exceedNum = (~~(parseFloat(that.data.betterThan) * 100)) - 30;
        }
        that.setData({
            exceedNum: exceedNum
        })
        var timerTime = setInterval(fn, stepTime);

        function fn() {
            stepTime = stepTime * 1.05;
            clearInterval(timerTime);
            if (that.data.exceedNum < parseFloat(that.data.betterThan) * 100) {
                timerTime = setInterval(fn, stepTime);
                exceedNum += 1;
                that.setData({
                    exceedNum: exceedNum
                })
            }
        }
    }
})