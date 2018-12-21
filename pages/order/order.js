import Request from '../../datajson/request.js';
Page({
    data: {
        imgUrl: 'https://ptuan.zhsjgroup.cn',
        winHeight: "", //窗口高度
        currentTab: 0, //预设当前项的值
        scrollLeft: 0, //tab标题的滚动条位置
        sellListAll: [],
        sellListObligation: [],
        sellListPayment: [],
        sellListRefund: []
    },
    onLoad: function() {
        var that = this;
        that.getOrderList();
        wx.getSystemInfo({
            success: function(res) {
                var clientHeight = res.windowHeight,
                    clientWidth = res.windowWidth,
                    rpxR = 750 / clientWidth;
                var calc = clientHeight * rpxR - 100;
                // console.log(calc)
                that.setData({
                    winHeight: calc
                });
            }
        });
    },
    getOrderList: function() {
        var that = this;
        /**
         * 订单状态 订单状态 0待付款 3退款 4完成 9取消
         */
        Request.getOrderList('',function(res) {
            console.log(res);
            if(res.data.isOk){
              var alldata = res.data.data;
              var obligationdata=[];
              var paymentdata=[];
              var refunddata=[];
              for(let i=0;i<alldata.length;i++){
                switch (alldata[i].orderStatus){
                  case 0:
                    obligationdata.push(alldata[i])
                    break;
                  case 4:
                    paymentdata.push(alldata[i])
                    break;
                  case 3:
                    refunddata.push(alldata[i])
                    break;
                  case 6:
                    refunddata.push(alldata[i])
                    break;
                  default:
                    break;
                }
              }
              that.setData({
                sellListAll: res.data.data,
                sellListObligation: obligationdata,
                sellListPayment: paymentdata,
                sellListRefund: refunddata
              })
            }
            
        })
    },
    gotoPay: function(e) {
        var that = this;
        var orderType = e.currentTarget.dataset['type'];
        var orderNum = e.currentTarget.dataset['num'];
        var orderStatus = e.currentTarget.dataset['status'];
        // console.log(orderType + '----' + orderStatus);
        if (orderStatus == 0) {
            wx.showModal({
                title: '支付订单',
                content: '确认支付该订单？',
                success: function(res) {
                    if (res.confirm) {
                        if (orderType == 1) {
                            Request.storePay(orderNum, function(res) {
                              if(res.data.isOk){
                                wx.requestPayment({
                                  'timeStamp': res.data.data.timeStamp,
                                  'nonceStr': res.data.data.nonceStr,
                                  'package': res.data.data.package,
                                  'signType': res.data.data.signType,
                                  'paySign': res.data.data.paySign,
                                  'success': function (res) {
                                    that.getOrderList();
                                    wx.showToast({
                                      title: '购买成功',
                                      icon: 'succes',
                                      duration: 1000,
                                      mask: true
                                    })
                                  },
                                  'fail': function (res) {
                                    that.getOrderList();
                                  }
                                })
                              }else{
                                console.log("order",res)
                              } 
                            })
                        } else if (orderType == 2) {
                          Request.shopPay(orderNum, function(res) {
                                // console.log(res);
                                if(res.data.isOk){
                                  wx.requestPayment({
                                    'timeStamp': res.data.data.timeStamp,
                                    'nonceStr': res.data.data.nonceStr,
                                    'package': res.data.data.package,
                                    'signType': res.data.data.signType,
                                    'paySign': res.data.data.paySign,
                                    'success': function (res) {
                                      that.getOrderList();
                                      wx.showToast({
                                        title: '购买成功',
                                        icon: 'succes',
                                        duration: 1000,
                                        mask: true
                                      })
                                    },
                                    'fail': function (res) {
                                      that.getOrderList();
                                    }
                                  })
                                }else{
                                  console.log("order1",res)
                                }
                                
                            })
                        }
                    } else if (res.cancel) {
                        return;
                    }
                }
            })
        } else {
            return;
        }
    },
    // 设置各状态订单列表
    setSellData: function(obj, type) {
        var result = []
        for (let i = 0; i < obj.length; i++) {
            for (let j = 0; j < type.length; j++) {
                if (obj[i].orderStatus == type[j]) {
                    result.push(obj[i]);
                }
            }
        }
        return result;
    },
    // 滚动切换标签样式
    switchTab: function(e) {
        this.setData({
            currentTab: e.detail.current
        });
        this.checkCor();
    },
    // 点击标题切换当前页时改变样式
    swichNav: function(e) {
        var cur = e.target.dataset.current;
        if (this.data.currentTaB == cur) { return false; } else {
            this.setData({
                currentTab: cur
            })
        }
    },
    //判断当前滚动超过一屏时，设置tab标题滚动条。
    checkCor: function() {
        if (this.data.currentTab > 4) {
            this.setData({
                scrollLeft: 300
            })
        } else {
            this.setData({
                scrollLeft: 0
            })
        }
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
})