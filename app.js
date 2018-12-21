//app.js
import Request from './datajson/request.js';
App({
  onLaunch: function (options) {
    //展示本地存储能力
    var that = this;
    console.log("options", options)
    var data = options.query.uid || 0;
    Request.Login(data, function (res) {
      if (res.data.isOk) {
        wx.setStorage({
          key: "token",
          data: res.data.data.token
        })
        wx.getSetting({
          success: function (res) {
            if (res.authSetting['scope.userInfo']) {
              wx.switchTab({
                url: '/pages/index/index',
              })
            }
          }
        })
      }
    })
  },
  onShow: function (options) {

  },
})