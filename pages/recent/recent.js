const app = getApp()

Page({
  data: { text: "This is page data." },//页面数据，用来维护视图，json格式
  onLoad: function (options) { },//监听加载
  onReady: function () { },//监听初次渲染完成
  onShow: function () { },//监听显示
  onHide: function () { },//监听隐藏
  onUnload: function () { },//监听卸载
  onPullDownRefresh: function () { },//监听下拉
  onReachBottom: function () { },//监听上拉触底
  onShareAppMessage: function () { },//监听右上角分享
  //如下为自定义的事件处理函数（视图中绑定的）
  viewTap: function () {//setData设置data值，同时将更新视图
    this.setData({ text: 'Set some data for updating view.' })
  }})

/*Page({
  data: {
    // logs: []
    scroll_top: 0,
    Text: "大婚当天，她在郊外醒来，衣衫褴褛，在众人的鄙夷下，一步一个血印踏入皇城……她是无父无母任人欺凌的孤女，他是一人之下、万人之上的铁血王爷。她满身是伤，狼狈不堪。他遗世独立，风华无双。她卑微伏跪，他傲视天下。如此天差地别的两人，却阴差阳错地相遇……一件锦衣，遮她一身污秽，换她一世情深。21世纪天才女军医将身心托付，为这铁血王爷风华天下、舔刃饮血、倾尽一切，只求此生结发为夫妻，恩爱两不疑，却不想生死关头，他却挥剑斩断她的生路……医者：下医医病，中医医人，上医医国。神医凤轻尘，以医术救人治国平天下大婚当天，她在郊外醒来，衣衫褴褛，在众人的鄙夷下，一步一个血印踏入皇城……她是无父无母任人欺凌的孤女，他是一人之下、万人之上的铁血王爷。她满身是伤，狼狈不堪。他遗世独立，风华无双。她卑微伏跪，他傲视天下。如此天差地别的两人，却阴差阳错地相遇……一件锦衣，遮她一身污秽，换她一世情深。21世纪天才女军医将身心托付，为这铁血王爷风华天下、舔刃饮血、倾尽一切，只求此生结发为夫妻，恩爱两不疑，却不想生死关头，他却挥剑斩断她的生路……医者：下医医病，中医医人，上医医国。神医凤轻尘，以医术救人治国平天下的传奇的传奇",
    initFontSize: '14',
    colorArr: [{
      value: '#f7eee5',
      name: '米白',
      font: ''
    }, {
      value: '#e9dfc7',
      name: '纸张',
      font: '',
      id: "font_normal"
    }, {
      value: '#cdefce',
      name: '护眼',
      font: ''
    },  {
      value: '#0f1410',
      name: '夜间',
      font: '#4e534f',
      bottomcolor: 'rgba(255,255,255,0.7)',
      id: "font_night"
    }],
    nav: 'none',
    ziti: 'none',
    _num: 1,
    bodyColor: '#e9dfc7',
    daynight: false,
    zj: 'none'

  },
  //选择背景色
  bgChange: function (e) {
    // console.log(e.target.dataset.num)
    // console.log(e)
    this.setData({
      _num: e.target.dataset.num,
      bodyColor: this.data.colorArr[e.target.dataset.num].value
    })
    wx.setStorage({
      key: "bodyColor",
      data: this.data.colorArr[e.target.dataset.num].value
    })
    wx.setStorage({
      key: "_num",
      data: e.target.dataset.num
    })
  },
  //字体变大
  bindBig: function () {
    var that = this;
    if (that.data.initFontSize > 20) {
      return;
    }
    var FontSize = parseInt(that.data.initFontSize)
    that.setData({
      initFontSize: FontSize += 1
    })
    // console.log(that.data.initFontSize)
    wx.setStorage({
      key: "initFontSize",
      data: that.data.initFontSize
    })
  },
  //字体变小
  bindSmall: function () {
    var that = this;
    if (that.data.initFontSize < 12) {
      return;
    }
    var FontSize = parseInt(that.data.initFontSize)
    that.setData({
      initFontSize: FontSize -= 1
    })
    // console.log(that.data.initFontSize)
    wx.setStorage({
      key: "initFontSize",
      data: that.data.initFontSize
    })
  },

  onLoad:function(){
    //存储背景色
    wx.getStorage({
      key: 'bodyColor',
      success: function (res) {
        // console.log(res.data)
        that.setData({
          bodyColor: res.data
        })
      }
    })
    wx.getStorage({
      key: '_num',
      success: function (res) {
        // console.log(res.data)
        that.setData({
          _num: res.data
        })
      }
    })

});*/

