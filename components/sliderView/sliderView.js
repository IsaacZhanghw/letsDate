Component({
    /**
   * 组件的属性列表
   */
  properties: {
    /** slider 最小值 */
    leftMin: {
      type: Number,
      value: 0,
    },
    /** slider 最大值 */
    leftMax: {
      type: Number,
      value: 100,
    },
    /** 步进 （没做，有时间再说，项目里没用到撒） */
    step: {
      type: Number,
      value: 0.1,
    },
    /** 预选选择的小值*/
    minValue: {
      type: Number,
      value: 0,
    },
    /** 预选选择的大值 */
    maxValue: {
      type: Number,
      value: 100,
    },
    /** 滑块颜色 */
    leftBlockColor:{
      type: String,
      value: "#4D9AE3",
    },
    /** 滑块颜色 */
    rightBlockColor:{
      type: String,
      value: "#4D9AE3",
    },
    /** 未选择进度条颜色 */
    selectColor:{
      type: String,
      value: "#eeeeee",
    },
    /** 未选择进度条颜色 */
    groundColor:{
      type: String,
      value: "#1aad19",
    },
  },
    /**
     * 组件的初始数据
     */
    data: {
        leftValue: 0,
        rightValue: 1,
    },
    /**
     * 组件的方法列表
     */
    methods: {
    //价格slider滑动
      leftSchange: function (e) {
        var that = this
        that.setData({
          isQuery: false
        })
        var value = Number(e.detail.value.toFixed(2))
        if(value > that.data.rightValue) {
          that.setData({
          leftValue: value,
          rightValue: Number(value) + 0.05,
        })
        }else{
          that.setData({
            leftValue: value
          })
        }
        var myEventDetail = { leftValue: value }
        this.triggerEvent('leftValueChange', myEventDetail)
      },
    //右边
    rightSchange: function (e) {
        var that = this
        that.setData({
          isQuery: false
        })
        var value = Number(e.detail.value.toFixed(2))
        if(value < that.data.leftValue) {
          that.setData({
          leftValue: value,
          leftValue: Number(value) - 0.05,
        })
        }else{
          that.setData({
            rightValue: value
          })
        }
        var myEventDetail = { rightValue: value }
        this.triggerEvent('rightValueChange', myEventDetail)
      },
    },
})