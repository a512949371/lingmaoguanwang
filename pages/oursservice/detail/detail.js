import WxParse from '../../../wxParse/wxParse.js';
import Request from '../../../datajson/request.js';
Page({
    data: {
      imgUrl: 'https://ptuan.zhsjgroup.cn',
      pid: '',
      itemName: '',
      itemDescription: '',
      prices: [],
      productInfo: '',
      changetop: true,
      showOrderInfo: false,
      paydata:{
        productId: '',
        priceId:'',
        price:'',
        companyName: '',
        projectName: '',
        phoneNum: '',
      },
      payTF:true
    },
    onLoad: function(options) {
        var that = this;
        that.setData({
          pid: options.id,
          'paydata.productId': options.id,
        });

      Request.getStoreDetail(this.data.pid,function(res) {
        console.log(res)
          if(res.data.isOk){
            that.setData({
              itemName: res.data.data.itemName,
              itemDescription: res.data.data.itemDescription,
              prices: res.data.data.prices
            })
            WxParse.wxParse('desc', 'html', res.data.data.description, that, 5)
          }
        });
    },
    ChangeCname: function(e) {
        var cVal = e.detail.value;
        var that = this;
        that.setData({
            'paydata.companyName': cVal
        })
    },
    ChangePname: function(e) {
        var pVal = e.detail.value;
        var that = this;
        that.setData({
          'paydata.projectName': pVal
        })
    },
    ChangePnum: function(e) {
        var nVal = e.detail.value;
        var that = this;
        that.setData({
          'paydata.phoneNum': nVal
        })
    },
    Zerocancel: function() {
        this.setData({
            showOrderInfo: false
        })
    },
    confirmInfo: function(e) {
        var that = this;
        that.setData({
          showOrderInfo: true,
          'paydata.priceId': e.currentTarget.dataset.id,
          'paydata.price': e.currentTarget.dataset.price
        })
    },
    buyProduct: function(e) {
        var that = this;
        that.setData({
            showOrderInfo: true
        })
      if (that.data.paydata.companyName.length == 0) {
            wx.showToast({
                title: '请输入公司名称',
                image: '../../../images/gt.png',
                icon: 'loading',
                duration: 1000,
                mask: true
            })
            return;
        }
      if (that.data.paydata.projectName.length == 0) {
            wx.showToast({
                title: '请输入项目名称',
                image: '../../../images/gt.png',
                icon: 'loading',
                duration: 1000,
                mask: true
            })
            return;
        }
      if (that.data.paydata.phoneNum.length == 0) {
            wx.showToast({
                title: '请输入手机号码',
                image: '../../../images/gt.png',
                icon: 'loading',
                duration: 1000,
                mask: true
            })
            return;
        } else {
        if ((/^1[3456789]\d{9}$/.test(that.data.paydata.phoneNum))) {
                that.setData({
                    showOrderInfo: false
                })
            } else {
                wx.showToast({
                    title: '手机号码错误',
                    image: '../../../images/gt.png',
                    icon: 'loading',
                    duration: 1000,
                    mask: true
                })
                return;
            }
        }
        wx.showModal({
            title: '确认购买',
            content: '确认支付 ' + this.data.paydata.price + ' 元购买' + that.data.itemName + '产品？',
            success: function(res) {
                if (res.confirm) {
                  if (that.data.payTF){
                    that.setData({
                      payTF: false
                    })
                    Request.storeCreateOrder(that.data.paydata,
                      function (res) {
                        console.log("storeCreateOrder", res)
                        if (res.data.isOk) {
                          Request.storePay(res.data.data, function (res) {
                            console.log("storePay", res)
                            that.setData({
                              payTF:true
                            })
                            if (res.data.isOk) {
                              wx.requestPayment({
                                'timeStamp': res.data.data.timeStamp,
                                'nonceStr': res.data.data.nonceStr,
                                'package': res.data.data.package,
                                'signType': res.data.data.signType,
                                'paySign': res.data.data.paySign,
                                'success': function (res) {
                                  wx.showToast({
                                    title: '购买成功',
                                    icon: 'succes',
                                    duration: 1000,
                                    mask: true
                                  })
                                },
                                'fail': function (res) { }
                              })
                            } else {
                              wx.showToast({
                                title: '购买失败，请重试',
                                icon: none,
                                duration: 1000,
                                mask: true
                              })
                            }

                          })
                        } else {
                          wx.showModal({
                            title: '提交失败',
                            content: res.msg,
                            success: function (res) { }
                          })
                        }
                      }
                    );
                  }else{
                    wx.showModal({
                      title: '请等待',
                      content: res.msg,
                      success: function (res) { }
                    })
                  } 
                } else if (res.cancel) {
                    return;
                }
            }
        })
  },
  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function (res) {
    return {
      title: '零猫科技，为企业创造互联网新价值',
      path: '/pages/index/index'
    }
  }
});