// pages/contactus/contactus.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [{
      iconPath: "/images/icon_maker.png",
      id: 0,
      latitude: 24.957532,
      longitude: 102.747751,
      width: 30,
      height: 30
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  //查看公司详情
  profileMore: function () {
    var that = this;
    wx.navigateTo({
      url: './profile/profile'
    })
  },
  //打开地图
  Openmap(){
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userLocation']) {
          wx.getLocation({
            type: 'gcj02',
            success: function (res) {
              wx.openLocation({
                latitude: 24.957532,
                longitude: 102.747751,
                name: "零猫科技",
                address: "昆明市官渡区银海樱花语幸福广场商务写字楼A座二楼",
                scale: 28
              })
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '此应用需要获取您的地理位置,是否允许？',
            cancelText: '不允许',
            confirmText: '允许',
            success: function (res) {
              if (res.confirm) {
                wx.getLocation({
                  type: 'gcj02',
                  success: function (res) {
                    wx.openLocation({
                      latitude: 24.957532,
                      longitude: 102.747751,
                      name: "零猫科技",
                      address: "昆明市官渡区银海樱花语幸福广场商务写字楼A座二楼",
                      scale: 28
                    })
                  },
                  fail: function (res) {
                    wx.showToast({
                      title: '请允许微信访问位置服务',
                      icon: "none"
                    })
                  }
                })
              }
            }
          })
        }
      }
    })
  },
  //联系我
  Callme(){
    wx.makePhoneCall({
      phoneNumber: '136423848435',
    })
  }
})