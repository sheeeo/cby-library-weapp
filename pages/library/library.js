var Bmob = require('../../utils/bmob.js');
var that;
Page({
  data: {
    inputShowed: false,
    inputVal: ""
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  onLoad:function(){
    that = this;
    var bookinfo = Bmob.Object.extend("bookinformation ");
    var query = new Bmob.Query(bookinfo);
    // 按照id逆序排列
    query.descending('id');
     // 查询所有数据
     query.find({
       success:function(results){
         // 请求成功将数据存入bookinfo_list
         that.setData({
           bookinfo_list: results
         });
         console.log(results)
       },
       fail:function(error){
         alert("查询失败: " + error.code + " " + error.message);
       }
     });
  },
  showDetail:function(e){
    // 获取wxml元素绑定的index值
    var index = e.currentTarget.dataset.index;
    // 取出objectId
    var objectId = that.data.bookinfo_list[index].id;
    console.log("objectId="+objectId)
    // 跳转到详情页
    wx.navigateTo({
      url: '../bookDetail/bookDetail?objectId=' + objectId
    });
  }
});