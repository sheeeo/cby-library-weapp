var Bmob = require('../../utils/bmob.js');
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: [],
    currentTab: 0,//三个文件这里依次为0，1，2，其他地方一样
    //isChecked: false,
    bookinfo: ''
  },
  serviceSelection() {
    this.setData({
      isChecked: true
    })
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
    query.get(objectId, {
      success: function (result) {
        //console.log(result)
        // 查询成功，调用get方法获取对应属性的值
        var bookid = result.get("bookid")
        console.log("bookid="+bookid)
       
        that.setData({
          /*bookinfo: bookinfo*/
          bookinfo:result,
          navbar: [
            { name: '收藏' },
            {
              name: "阅读",
              url: "/pages/reading/reading?bookid=" + bookid
            }],
        })
      },
      fail: function (object, error) { }
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
});