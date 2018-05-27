var Bmob = require('../../utils/bmob.js');
const app = getApp()

Page({
  data: {
    recent: [],
    bookinfo:[]
  },
  onLoad: function () { },//监听加载
  onShow: function () {
    var that = this;
    
    wx.getStorage({
      key: 'recent',
      success: function (res) {
        that.setData({
          recent: res
        })
        console.log('recent=', that.data.recent)
        let bookarray = [];
        res.data.map((item) => {
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
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },//监听显示
  showbookDetail: function () {
    wx.navigateTo({
      url: '../bookDetail/bookDetail?bookid=' + this.data.bookid,
    })
  }
})
