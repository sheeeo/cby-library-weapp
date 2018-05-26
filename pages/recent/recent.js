const app = getApp()

Page({
  data: { 
    
   },
  onLoad: function () { 
    
  },//监听加载
  onReady: function () { },//监听初次渲染完成
  onShow: function () { },//监听显示
  onHide: function () { },//监听隐藏
  onUnload: function () { },//监听卸载
  onPullDownRefresh: function () { },//监听下拉
  onReachBottom: function () { },//监听上拉触底
  onShareAppMessage: function () { },//监听右上角分享
  //如下为自定义的事件处理函数（视图中绑定的）
  viewTap: function () {//setData设置data值，同时将更新视图
    this.setData({ text: 'Set some data for updating view.' })
  }})
