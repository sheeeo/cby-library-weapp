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
          console.log('item',item)
          query.equalTo('bookid', item);
          query.first({
            success: function (result) {
              console.log('first',result)
              bookarray.push(result)
              that.setData({
                bookinfo: bookarray
              })
              console.log('bookarray', bookarray)
            }
          })
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },//监听显示
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
})
