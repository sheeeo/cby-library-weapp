var util = require('../../utils/util.js');
var Bmob = require('../../utils/bmob.js');
var that;
var bookid;
var touchDot = 0;//触摸时的原点 
var time = 0;// 时间记录，用于滑动时且时间小于1s则执行左右滑动 
var interval = "";// 记录/清理时间记录 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scroll_top: 0,
    Text: '',
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
      value: '#a4a4a4',
      name: '浅灰',
      font: ''
    }, {
      value: '#cdefce',
      name: '护眼',
      font: ''
    }, {
      value: '#283548',
      name: '灰蓝',
      font: '#7685a2',
      bottomcolor: '#fff'
    }, {
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
    zj: 'none',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let destChapter = options.bookchapterid ? parseInt(options.bookchapterid + "") : 1
    console.log(destChapter)
    that.setData({
      bookid: options.bookid,
      bookchapterid: destChapter
    })
    // 本地提取字号大小
    wx.getStorage({
      key: 'initFontSize',
      success: function (res) {
        // console.log(res.data)
        that.setData({
          initFontSize: res.data
        })
      }
    })
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
    wx.getStorage({
      key: 'daynight',
      success: function (res) {
        // console.log(res.data)
        that.setData({
          daynight: res.data
        })
      }
    })

    // 向Bmob请求reading页数据
    //创建查询对象，入口参数是对象类的实例
    var query = new Bmob.Query("chapterinformation");
    query.equalTo("bookid", this.data.bookid);
    query.equalTo("bookchapterid", this.data.bookchapterid);
    wx.showLoading({
      title: '载入中',
    })
    query.find().then(res => {
      wx.hideLoading();
      if (res.length > 0) {
        that.setData({
          chapterinfo: res[0]
        })
      }
    });
  },
  //事件处理函数
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
    wx.setStorage({
      key: "initFontSize",
      data: that.data.initFontSize
    })
  },
  //点击中间区域显示底部导航
  midaction: function () {
    if (this.data.nav == 'none' && this.data.zj == 'none') {
      this.setData({
        nav: 'block',
        zj: 'block'
      })
    } else {
      this.setData({
        nav: 'none',
        zj: 'none',
        ziti: 'none'
      })
    }
  },
  //上一页
  lastPage: function () {
    var query = new Bmob.Query("chapterinformation");
    var that = this;
    this.setData({
      bookchapterid: this.data.bookchapterid - 1
    })
    query.equalTo("bookid", this.data.bookid);
    query.equalTo("bookchapterid", this.data.bookchapterid);
    query.find().then(res => {
      if(res.length>0){
        that.setData({
          chapterinfo: res[0]
        })
      }else{
        that.setData({
          bookchapterid: that.data.bookchapterid + 1
        })
        wx.showToast({
          title: '这是第一章',
          icon: 'none'
        })
      }
    });
  },
  //下一页
  nextPage: function () {
    var query = new Bmob.Query("chapterinformation");
    var that = this;
    this.setData({
      bookchapterid: this.data.bookchapterid + 1
    })
    query.equalTo("bookid", this.data.bookid);
    query.equalTo("bookchapterid", this.data.bookchapterid);
    query.find().then(res => {
      if (res.length > 0) {
        that.setData({
          chapterinfo: res[0]
        })
      } else {
        that.setData({
          bookchapterid: that.data.bookchapterid - 1
        })
        wx.showToast({
          title: '没有更多了',
          icon: 'none'
        })
      }
    });
  },
  //点击进入目录页
  showChapters: function () {
    wx.navigateTo({
      url: '/pages/chapter/chapter?bookid=' + this.data.bookid
    })
  },
  //点击字体出现窗口
  zitiaction: function () {
    if (this.data.ziti == 'none') {
      this.setData({
        ziti: 'block'
      })
    } else {
      this.setData({
        ziti: 'none'
      })
    }
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
  //切换白天夜晚
  dayNight: function () {
    if (this.data.daynight == true) {
      this.setData({
        daynight: false,
        bodyColor: '#e9dfc7',
        _num: 1
      })
      wx.setStorage({
        key: "bodyColor",
        data: '#e9dfc7'
      })
      wx.setStorage({
        key: "_num",
        data: 1
      })

    } else {
      this.setData({
        daynight: true,
        bodyColor: '#000',
        _num: 5
      })
      wx.setStorage({
        key: "bodyColor",
        data: '#000'
      })
      wx.setStorage({
        key: "_num",
        data: 5
      })
    }
    wx.setStorage({
      key: "daynight",
      data: this.data.daynight
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})