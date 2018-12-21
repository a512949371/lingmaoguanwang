// pages/productlist/productlist.js
import Request from '../../datajson/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: 'https://ptuan.zhsjgroup.cn',
    screenwidth:'',
    shopactindex:'1',
    shoplist:[],
    comprodunctlist:[],
    productinfolist:[],
    animationleft:{},
    animationright: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getSystemInfo({
      success(res) {
        that.setData({
          screenwidth: res.windowWidth
        })
      }
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
    var data={
      platCode:'zreocat'
    }
    var that=this;
    Request.Shoplist(data,function(res){
      console.log("shop",res)
      if(res.data.isOk){
        that.setData({
          shoplist: res.data.data.productList,
          comprodunctlist: res.data.data.comProdunctList,
          productinfolist: res.data.data.productInfoList
        })
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

  },
  Scrollshop(e){
    console.log(e)
    var animationone = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    var animationtwo = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    this.animationone = animationone;
    this.animationtwo = animationtwo;
    animationone.translateX(0).step();
    animationtwo.translateX(-this.data.screenwidth + 'px').step()
    this.setData({
      animationleft: animationone.export(),
      animationright:animationtwo.export(),
      shopactindex: e.currentTarget.dataset.num
    })
  },
  Clicknav(e) {
    var id = e.currentTarget.dataset.id;
    wx.setStorageSync('reserveInfoId', id);
    wx.navigateTo({
      url: './reserveInfo/reserveInfo?id='+id
    })
  },
  //商品详情
  Godetail(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: './detail/detail?id=' + id
    })
  },
  //联系我
  Callme() {
    wx.makePhoneCall({
      phoneNumber: '136423848435',
    })
  }
})