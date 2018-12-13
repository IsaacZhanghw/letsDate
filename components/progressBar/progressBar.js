Component({
    /**
     * 组件的属性列表
     */
    properties: {
        canvasId: {
            type: String,
            value: ''
        },
        color: {
            type: String,
            value: ''
        },
        rate: {
            type: String,
            value: ''
        },
        dimensions: {
            type: String,
            value: ''
        },
        bgColor: {
            type: String,
            value: ''
        },
    },

    /**
     * 组件的初始数据
     */
    data: {

    },
    ready: function() {
        var score = ~~(parseFloat(this.data.rate) * 100)
        var color = this.data.color
        var bgColor = this.data.bgColor
        var canvasId = this.data.canvasId
        this.drawMain(canvasId, score, color, bgColor)
    },
    /**
     * 组件的方法列表
     */
    methods: {
        drawMain(canvasId, percent, forecolor, bgColor) {
            var context = wx.createCanvasContext(canvasId, this)
            var center_x = 40;
            var center_y = 40;
            var rad = (Math.PI * 2) / 100;
            context.save();
            context.beginPath();
            context.lineWidth = 9; //设置线宽
            var radius = 30;
            context.strokeStyle = bgColor;
            context.arc(center_x, center_y, radius, 0, Math.PI * 2, false);
            context.stroke();
            context.closePath();
            context.restore();
            context.save();
            context.strokeStyle = forecolor;
            context.lineWidth = 9;
            if (percent != 100) context.lineCap = 'round';
            var radius = 30;
            context.beginPath();
            if (percent != 100) {
                if (percent < 50) {
                    context.arc(center_x, center_y, radius, 3 * Math.PI / 2, 3 * Math.PI / 2 - percent * rad, true);
                } else {
                    context.arc(center_x, center_y, radius, 3 * Math.PI / 2, 3 * Math.PI / 2 - percent * rad + 0.3, true);
                }
            } else {
                context.arc(center_x, center_y, radius, 3 * Math.PI / 2, 3 * Math.PI / 2 - percent * rad, true);
            }
            context.stroke();
            context.closePath();
            context.restore();
            context.save();
            context.fillStyle = forecolor;
            var font_size = 14;
            context.font = font_size + "px PingFangSC";
            var text_width = context.measureText(percent + '%').width;
            context.fillText(percent + '%', center_x - text_width / 2, center_y + font_size / 4);
            context.restore();
            context.draw()
        },
        goAbilitRule() {
             wx.navigateTo({
                url: `/pages/abilityRule/abilityRule`
            })
        }
    }
})