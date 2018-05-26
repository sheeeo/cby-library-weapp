var Bmob = require('../../utils/bmob.js');
var that;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    favor: '收藏',
    isFavored: '',
    bookinfo: '',
    bookid:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    // 获取传参
    var objectId = options.objectId;
    console.log("bookDetail:objectId=" + objectId)
    // 向Bmob请求详情页数据
    var bookinfo = Bmob.Object.extend("bookinformation");
    //创建查询对象，入口参数是对象类的实例
    var query = new Bmob.Query(bookinfo);
    //查询单条数据，第一个参数是这条数据的objectId值
    wx.showLoading({
      title: '载入中',
    })
    query.get(objectId, {
      success: function (result) {
        // 查询成功，调用get方法获取对应属性的值
        wx.hideLoading()
        var bookid = result.get("bookid")
        that.setData({
          bookinfo: result,
          bookid: bookid
         
        })
      },
      fail: function (object, error) {
        wx.hideLoading();
        wx.showToast({
          title: '载入失败',
          icon: 'none'
        })
      }
    })
    //判断是否被收藏
   
    var openid = wx.getStorageSync("openid")
    var query = new Bmob.Query("userFavorated");
    query.equalTo("openId", openid);
    query.equalTo("bookid", that.data.bookid);
    query.find().then(res => {
      if (res.length > 0) {
        that.setData({
          favor: '已收藏',
          isFavored: true
        })
      } else {
        that.setData({
          favor: '收藏',
          isFavored: false
        })
      }
    })
  }, 

  handleReading: function () {
    wx.navigateTo({
      url: "/pages/reading/reading?bookid=" + this.data.bookid
    })
    // var bookArray=[]
    // wx.setStorage({
    //   key: 'bookid',
    //   data: this.data.bookid,
    // })
  },

  handleFavor: function () {
    var that = this;
    if (this.data.isFavored === false) {
      var Favor = Bmob.Object.extend("userFavorated");
      var favor = new Favor();
      favor.save({
        openId: wx.getStorageSync("openid"),
        bookid: that.data.bookid
      }, {
          success: function (result) {
            //添加成功
            console.log('success' + result)
            that.setData({
              favor: '已收藏',
              isFavored: true
            })
            wx.showToast({
              title: '已收藏',
            })
          },
          error: function (result, error) {
            //添加失败
            console.log('error' + result)
          }
        })
    } else {
      var userFavorated = new Bmob.Object.extend("userFavorated")
      var query = new Bmob.Query(userFavorated);
      query.equalTo("openId", wx.getStorageSync('openid'));
      query.equalTo("bookid", this.data.bookid);
      query.find().then(function (todos) {
        return Bmob.Object.destroyAll(todos);
      }).then(function (todos) {
        console.log(todos);
        that.setData({
          favor: '收藏',
          isFavored: false
        })
        wx.showToast({
          title: '取消收藏'
        })
      }, function (error) {
      })
    }
  }
});