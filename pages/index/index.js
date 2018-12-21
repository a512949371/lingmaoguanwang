//index.js
//获取应用实例
const app = getApp()
import Request from '../../datajson/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:'https://ptuan.zhsjgroup.cn',
    notice:'',
    screenwidth: '',
    swiperIndex:0,
    reserveindex:0,
    showBanner: false,
    showInfo: false,
    showService: false,
    showStore: false,
    showAdvantage: false,
    showHonor: false,
    showProduct: false,
    showRecruit: false,
    showSale: false,
    indicatorDots: false,
    autoplay: false,
    interval: 2000,
    duration: 1000,
    bannerList: [],
    title: '零猫科技',
    logo: '',
    description: '云南首家创新型互联网科技公司',
    descriptionService: '已为“洗护、金融、汽车、商家、化妆品等不同业态客户提供服务”',
    serviceList: [],
    isFold: true,
    reservepic: [],
    reserveTitle: '',
    advservername:'喵家服务',
    advserverlist: [
      { description: "猫猫有敏锐的视角和市场洞察力。能为客户提供顺应政策并适应市场的合理化解决方案。", id: 2, logoImg: "/files/6c340099-612f-4c8f-a3f7-aace4bbe7188.png", title: "机敏警锐的【猫警长】" }
      , { description: "无论是企业+互联网方案合作还是小程序+APP定制开发……猫猫既是资深“码农”又是企业及市场营销专家。", id: 3, logoImg: "/files/11827845-766d-45af-bb43-eb8c5055a359.png", title: "技能爆棚的【机器猫】" }
      , { description: "猫猫三岁，擅长打怪并努力练级，已先后取得多项软件著作权。未来，正不断努力成为一只战绩卓越的明星猫咪。", id: 5, logoImg: "/files/481b6338-ef9c-413f-95bb-2a347785a009.png", title: "技能爆棚的【酷乐猫】" }],
    advname:"",
    advlist:[],
    honorTitle: '',
    honorpic: [],
    recruitTitle: '',
    recruitList: [],
    animationBig:{},
    animationSmall:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
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
    var that=this;
    Request.Notice('',function(res){
      console.log("notice",res)
      if(res.data.isOk){
        that.setData({
          notice:res.data.data
        })
      }else{
        console.log("errnotice",res)
      }
    })  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this;
    Request.getIndexInfo('',function(res){
      console.log("index",res)
      if (res.data.isOk){
        var dataList = res.data.data;
        console.log("index", dataList.recruitList)
        that.setData({
          showBanner: dataList.showBanner,
          showInfo: dataList.showInfo,
          showService: dataList.showService,
          showStore: dataList.showStore,
          showProduct: dataList.showProduct,
          showHonor: dataList.showHonor,
          showRecruit: dataList.showRecruit,
          showAdvantage: dataList.showAdvantage,
          bannerList: dataList.bannerList,
          advname: dataList.advTitle,
          logo: dataList.logo,
          description: dataList.profile,
          reservepic: dataList.productList,
          reserveTitle: dataList.productTitle,
          honorTitle: dataList.honorTitle,
          honorpic: dataList.honorList,
          recruitTitle: dataList.recruitTitle,
          recruitList: dataList.recruitList

        });
      }
    })
    Request.companyProduct('',function(res){
      console.log("companyProduct",res)
      if(res.data.isOk){
        that.setData({
          serviceList: res.data.data,
        })
      }
      
    })
    Request.ServiceAdvantage('',function(res){
      console.log("ServiceAdvantage", res)
      if (res.data.isOk) {
        that.setData({
          advlist: res.data.data,
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
  onPageScroll: function (e) {
    console.log("e", e)
  },
  //滑动广告图
  _changeSwiper:function(e){
    this.setData({
      swiperIndex:e.detail.current
    })
  },
  Getreserveindex:function(e){
    var animationBig = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    var animationSmall = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    this.animationBig = animationBig
    this.animationSmall = animationSmall
    animationBig.width('628rpx').height('228rpx').step()
    animationSmall.width('508rpx').height('133rpx').step()
    this.setData({
      animationBig: animationBig.export(),
      animationSmall: animationSmall.export(),
      reserveindex: e.detail.current
    })
  },
  //招聘
  recruitList: function (e) {
    var id = e.currentTarget.dataset['id'];
    wx.navigateTo({
      url: '/pages/recruit/recruit'
    })
  },
  //进入主营业务详情
  Goreserve(e){
    wx.navigateTo({
      url: './servicedetail/servicedetail?id='+e.detail.id,
    })
  },
  //热门消息详情
  Gohotnews(e){
    wx.navigateTo({
      url: './hotnews/hotnews?id='+e.currentTarget.dataset.id,
    })
  },
  //联系我
  Callme() {
    wx.makePhoneCall({
      phoneNumber: '136423848435',
    })
  }
})
