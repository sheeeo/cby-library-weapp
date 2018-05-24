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
    //   })
    // })
    // 本地提取字号大小
    console.log("onload")
    var that = this;
    that.setData({
      bookid: options.bookid,
      bookchapterid: 1
    })

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
    query.find().then(res => {
      console.log(res);
      res.map((item) => {
        const { bookid, bookchapterid } = item.attributes;
        if (bookid === this.data.bookid && bookchapterid === this.data.bookchapterid) {
          that.setData({
            chapterinfo: item.attributes
          })
        }
      })
    })
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
    query.equalTo("bookid", this.data.bookid);
    query.equalTo("bookchapterid", bookchapterid - 1);
    query.find().then(res => {
      console.log(res);
      that.setData({
        chapterinfo: res
      })
    })
  },
  //下一页
  nextPage: function () {
    var query = new Bmob.Query("chapterinformation");
    query.find().then(res => {
      let isExist = false;
      res.map((item) => {
        // 拿到服务器下发数据目标字段
        let { bookid, bookchapterid } = item.attributes;
        // 页码加一
        this.setData({
          bookchapterid: this.data.bookchapterid + 1
        })
        // 判断该页码是否有内容
        if (bookid === this.data.bookid && bookchapterid === this.data.bookchapterid) {
          this.setData({
            chapterinfo: item.attributes
          })
          isExist = true;
        }
      })
      // 如果有内容，则下一页可用，否则禁用
      if (isExist) {
        this.setData({
          nextPageDisabled: true
        })
      } else {
        this.setData({
          nextPageDisabled: false
        })
      }
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
  //滚动隐藏窗口
  /*scrollContain:function(){
    this.setData({
      nav: 'none',
      ziti: 'none',
      zj:'none'
    })
  },*/
  //滚动到底部
  /*bindscrolltolower:function(){
    this.setData({
      zj: 'block',
    })
  },*/
  // 触摸开始事件 
  /*touchStart: function (e) {
    touchDot = e.touches[0].pageX; // 获取触摸时的原点 
    // 使用js计时器记录时间  
    interval = setInterval(function () {
      time++;
    }, 100);
  },*/
  // 触摸移动事件 
  /*touchMove: function (e) {
    var touchMove = e.touches[0].pageX;
    // console.log("touchMove:" + touchMove + " touchDot:" + touchDot + " diff:" + (touchMove - touchDot));
    // 向左滑动  
    if (touchMove - touchDot <= -40 && time < 10) {
      // wx.switchTab({
      //   url: '../左滑页面/左滑页面'
      // });
      // console.log("left")
      var bookinfo = Bmob.Object.extend("bookinformation ");
      var query = new Bmob.Query(bookinfo);
      this.setData({
        Text: '',
        scroll_top: 0
      })
    }
    // 向右滑动 
    if (touchMove - touchDot >= 40 && time < 10) {
      // console.log('right');
      // wx.switchTab({
      //   url: '../右滑页面/右滑页面'
      // });
      this.setData({
        Text: '',
        scroll_top: 0
      })
    }
  },*/
  // 触摸结束事件 
  /*touchEnd: function (e) {
    clearInterval(interval); // 清除setInterval 
    time = 0;
  },*/
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