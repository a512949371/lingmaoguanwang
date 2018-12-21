// pages/index/servicedetail/servicedetail.js
import WxParse from '../../../wxParse/wxParse.js'
import Request from '../../../datajson/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    imgUrl: 'https://ptuan.zhsjgroup.cn',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
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
    var that=this;
    Request.Servicedetail(this.data.id,function(res){
      console.log(res)
      if (res.data.isOk) {
        that.setData({
          shopdata: res.data.data
        })
        WxParse.wxParse('webdata', 'html', res.data.data.content, that, 5)
      }
    })
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