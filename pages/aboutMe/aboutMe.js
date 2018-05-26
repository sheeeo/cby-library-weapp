const app = getApp()
var Bmob = require("../../utils/bmob.js");
var that;
Page({
  data: {
    userInfo: {},
    bookinfo:{},
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
    //收藏图书
    var query = new Bmob.Query("userFavorated");
    query.equalTo("openId",wx.getStorageSync('openid'))
    query.find().then(res => {
      console.log(res)
      this.setData({
        bookid:res.item.bookid
      })
    })
    console.log('bookid'+this.data.bookid)
  },
  getUserInfo: function (e) {
    console.log("e",e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
});