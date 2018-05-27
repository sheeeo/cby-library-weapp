const app = getApp()
var Bmob = require("../../utils/bmob.js");
var that;
Page({
  data: {
    bookid:[],
    userInfo: {},
    bookinfo: {},
    hasUserInfo: false
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log("e", e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShow: function () {
    var that = this;
    //收藏图书
    //var userFavorated = new Bmob.Object.extend("userFavorated");
    var query = new Bmob.Query("userFavorated");
    query.equalTo("openId", wx.getStorageSync('openid'))
    query.select("bookid");
    query.find().then(res => {
      console.log(res)
      let bookidArr = [];
      for (var i = 0; i < res.length; i++) {
        bookidArr.push(res[i].attributes.bookid)
      }
      that.setData({
        bookid: bookidArr
      })

      // console.log('bookid', that.data.bookid)
      // console.log('bookidArr', bookidArr)

      let bookarray = [];
      that.data.bookid.map((item)=>{
        console.log('map', item)
        var bookInfo = Bmob.Object.extend("bookinformation")
        var query = new Bmob.Query(bookInfo);
        query.equalTo('bookid', item);
        query.first({
          success: function (result) {
            bookarray.push(result)
            that.setData({
              bookinfo: bookarray
            })
          }
        })
      })
    })
  },
  showbookDetail: function (e) {

    // 获取wxml元素绑定的index值
    var index = e.currentTarget.dataset.index;
    // 取出objectId
    var objectId = this.data.bookinfo[index].id;
    //console.log("objectId="+objectId)
    // 跳转到详情页
    wx.navigateTo({
      url: '../bookDetail/bookDetail?objectId=' + objectId
    });
  }
});