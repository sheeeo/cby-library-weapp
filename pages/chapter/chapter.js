// pages/chapter/chapter.js
var Bmob = require('../../utils/bmob.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      bookid : options.bookid
    })
    var query = new Bmob.Query("chapterinformation");
    query.equalTo("bookid", this.data.bookid);
    // 按照bookchapterid升序排列
    query.ascending('bookchapterid');
    query.find().then(res => {
      console.log(res);
      that.setData({
        chapterinfo_list:res
      })
    })
  },
  showChapterContent:function(e){
    // 跳转回阅读器
    wx.navigateTo({
      url: '/pages/reading/reading?id =' + e.currentTarget.dataset.id + '&bookchapterid = ' + e.currentTarget.dataset.bookchapterid
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