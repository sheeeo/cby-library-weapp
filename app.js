//app.js
var Bmob = require('utils/bmob.js');
Bmob.initialize("cfa579f8a35311f18a23922d885247a3 ", "32810b7579140d7f6fcccdfd1df406f1");
App({
  onLaunch: function () {
    // 用户登录
    var user = new Bmob.User();
    if (Bmob.User.current()) {
      return;
    }
    wx.login({
      success: function (res) {
        user.loginWithWeapp(res.code).then(function (user) {
          var openid = user.get("authData").weapp.openid;
          wx.setStorageSync('openid', openid)
          console.log('openid=', openid);
          var u = Bmob.Object.extend("_User");
          var query = new Bmob.Query(u);
          query.get(user.id, {
            success: function (result) {
              wx.setStorageSync('own', result.get('uid'))
              console.log(result.get('uid'))
            },
            error: function (result, error) {
              console.log("查询失败");
            }
          });
          //保存用户其他信息，比如昵称头像之类的
          wx.getUserInfo({
            success: function (result) {
              console.log("userInfo:", result)
              var userInfo = result.userInfo;
              var nickName = userInfo.nickName;
              var avatarUrl = userInfo.avatarUrl;
              var u = Bmob.Object.extend("_User");
              console.log("user.id=", user.id)
              var query = new Bmob.Query(u);
              // 这个 id 是要修改条目的 id，你在生成这个存储并成功时可以获取到，请看前面的文档
              query.get(user.id, {
                success: function (result) {
                  // 自动绑定之前的账号
                  result.set('userInfo', {
                    nickName: nickName,
                    avatarUrl: avatarUrl
                  });
                  result.save();
                  console.log("save success")
                }
              });
            }
          });
        }, function (err) {
          console.log(err, 'err');
        });
      }
    })
  },
  globalData: {
    userInfo: null
  }

})