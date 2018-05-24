//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that=this
    // 登录
    wx.login({
      success: res => {
        var code=res.code
        wx.getUserInfo({
          success: res => {
            that.globalData.userInfo = res.userInfo
            wx.request({
              url: "https://rouqin.net.cn/rq_qy/user/insert",
              // url: "http://192.168.1.41/user/insert",
              data: {
                code: code,
                encryptedData: res.encryptedData,
                iv: res.iv
              },
              method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
              header: {
                'content-type': 'application/json'
              }, // 设置请求的 header
              success: function (res) {
                console.log(res)
                that.globalData.openId=res.data.params.openId;
              }
              
            })
            // 可以将 res 发送给后台解码出 unionId
            that.globalData.userInfo = res.userInfo
            that.globalData.encryptedData = res.encryptedData
            that.globalData.iv = res.iv
            wx.login(code, res.encryptedData, res.iv)
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            if (that.userInfoReadyCallback) {
              that.userInfoReadyCallback(res)
            }
          }
        })
        // console.log(res.code)
        // that.globalData.code = res.code
        // // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // // 获取用户openId
        //     var appid = 'wx726957b090216cfd'; //填写微信小程序appid  
        //     var secret = 'a1d8d2bed9d11a5c99578b94cdff3bc5'; //填写微信小程序secret  
        //     //调用request请求api转换登录凭证  
        //     wx.request({
        //       url: 'https://api.weixin.qq.com/sns/jscode2session',
        //       data: {
        //         appid: appid,
        //         secret: secret,
        //         js_code: res.code,
        //         grant_type: 'authorization_code'
        //       },
        //       method: 'GET',
        //       success: function (res) {
        //         that.globalData.openId = res.data.openid
        //       }  
        // })
          
        
      }
    })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           that.globalData.userInfo = res.userInfo
    //           that.globalData.encryptedData = res.encryptedData
    //           that.globalData.iv = res.iv
    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (that.userInfoReadyCallback) {
    //             that.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })


  },
  //多张图片上传
  uploadimg:function(data){
    var that= this,
  //  var beforePage = data.before,
    i = data.i ? data.i : 0,
    
    success = data.success ? data.success : 0,
    fail = data.fail ? data.fail : 0;
    if (data.filePath.length == 0){
      wx.request({
        url: data.url,
        data:data.formData,
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res.data.params)
          wx.reLaunch({
            url: '../myBingli',
          })
         
        },
        fail: function (res) {
        }
      })
    }
      
    else{
      wx.uploadFile({
        url: data.url,
        filePath: data.filePath[i],
        name: 'file',
        formData: data.formData,
        success: function(resp) {
          success++;
          console.log(resp)
          console.log("上传第几张" + i);
          //这里可能有BUG，失败也会执行这里
        },
        fail: (res) => {
          fail++;
          console.log('fail:' + i + "fail:" + fail);
        },
        complete: () => {
          console.log(i);
          i++;
          if (i == data.filePath.length) {  //当图片传完时，停止调用     
            console.log('执行完毕');
            console.log('成功：' + success + " 失败：" + fail);
            wx.reLaunch({
              url: '../myBingli',
            })

          }
          else {//若图片还没有传完，则继续调用函数
            console.log(i);
            data.i = i;
            data.success = success;
            data.fail = fail;
            that.uploadimg(data);
          }
        
        }
      });
    }
    
  },
  globalData: {
    userInfo: null,
    openId:'',
    encryptedData:null,
    iv:null,
    code:null,
    add:"https://rouqin.net.cn/rq_qy",
  
  }
})