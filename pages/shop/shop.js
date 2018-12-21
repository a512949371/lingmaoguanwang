// pages/shop/shop.js
import Request from '../../datajson/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: 'https://ptuan.zhsjgroup.cn',
    winHeight: "", //窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    tab1: [],
    tab2: [],
    tab3: [],
    addlist: [],
    isBlance: true,
    totalprice: 0,
    sumNum: 0,
    actlength:0,
    isfixed:false,
    isonescroll:true,
    ispay:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        that.setData({
          winHeight: calc
        });
      }
    });
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
    Request.getShopList('',function(res){
      console.log("shop",res)
      if(res.data.isOk){
        var listData = res.data.data;
        for (let i = 0; i < listData.length; i++) {
          switch (listData[i].type) {
            case 'drinking':
              for (let j = 0; j < listData[i].list.length; j++) {
                listData[i].list[j].tab = 1;
                listData[i].list[j].index = j;
                listData[i].total = 0;
              }
              that.setData({
                tab1: listData[i].list
              })
              break;
            case "flavored":
              for (let j = 0; j < listData[i].list.length; j++) {
                listData[i].list[j].tab = 2;
                listData[i].list[j].index = j;
                listData[i].total = 0;
              }
              that.setData({
                tab2: listData[i].list
              })
              break;
            case "fatout":
              for (let j = 0; j < listData[i].list.length; j++) {
                listData[i].list[j].tab = 3;
                listData[i].list[j].index = j;
                listData[i].total = 0;
              }
              that.setData({
                tab3: listData[i].list
              })
              break;
          }
        }
        that.setData({
          actlength: that.data.tab1.length
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
    if (this.data.isonescroll) {
      if (e.scrollTop > 298) {
        this.data.isonescroll=false;
        this.setData({
          isfixed: true
        })
      }
    }else{
        if (e.scrollTop <= 298) {
          this.data.isonescroll = true;
          this.setData({
            isfixed: false
          })
      }
      
    }
  },
  //选择分类
  Changenav(e){
    switch (e.currentTarget.dataset.num) {
      case "0":
        this.setData({
          actlength: this.data.tab1.length,
          currentTab: 0
        })
        break;
      case "1":
        console.log(e.detail.current)
        this.setData({
          actlength: this.data.tab2.length,
          currentTab: 1
        })
        break;
      case "2":
        this.setData({
          actlength: this.data.tab3.length,
          currentTab: 2
        })
        break;
      default:
        break;
    }
  },
  switchTab: function (e) {
    console.log(e)
    switch(e.detail.current){
      case 0:
       this.setData({
         actlength: this.data.tab1.length,
         currentTab:0
       })
       break;
      case 1:
        console.log(e.detail.current)
        this.setData({
          actlength: this.data.tab2.length,
          currentTab:1
        })
        break;
      case 2:
        this.setData({
          actlength: this.data.tab3.length,
          currentTab:2
        })
        break;
      default:
      break;
    }
  },
  /* 点击减号 */
  bindMinus: function (e) {
    let tab=e.currentTarget.dataset.tab;
    let index = e.currentTarget.dataset.index;
    switch (tab){
      case 1:
        if (this.data.tab1[index].goodNum>0){
          this.data.tab1[index].goodNum--;
          this.CalculationFun(1)
        }else{
          this.data.tab1[index].goodNum=0
        }
        break;
      case 2:
        if (this.data.tab2[index].goodNum > 0) {
          this.data.tab2[index].goodNum--;
          this.CalculationFun(1)
        } else {
          this.data.tab2[index].goodNum = 0
        }
        break;
      case 3:
        if (this.data.tab3[index].goodNum > 0) {
          this.data.tab3[index].goodNum--;
          this.CalculationFun(1)
        } else {
          this.data.tab3[index].goodNum = 0
        }
        break;
      default:
        break;
    }
    
  },
  /* 点击加号 */
  bindPlus: function (e) {
    let tab = e.currentTarget.dataset.tab;
    let index = e.currentTarget.dataset.index;
    switch (tab) {
      case 1:
        if (this.data.tab1[index].goodNum < this.data.tab1[index].maxNum) {
          this.data.tab1[index].goodNum++;
          this.CalculationFun(2)
        } else {
          wx.showToast({
            title: '数量不足,只能购买这么多!',
            icon: 'none',
            duration: 1000,
            mask: true
          })
          this.data.tab1[index].goodNum = this.data.tab1[index].maxNum;
        }
        break;
      case 2:
        if (this.data.tab2[index].goodNum < this.data.tab2[index].maxNum) {
          this.data.tab2[index].goodNum++;
          this.CalculationFun(2)
        } else {
          wx.showToast({
            title: '数量不足,只能购买这么多!',
            icon: 'none',
            duration: 1000,
            mask: true
          })
          this.data.tab2[index].goodNum = this.data.tab2[index].maxNum;
        }
        break;
      case 3:
        if (this.data.tab3[index].goodNum < this.data.tab3[index].maxNum) {
          this.data.tab3[index].goodNum++;
          this.CalculationFun(2)
        } else {
          wx.showToast({
            title: '数量不足,只能购买这么多!',
            icon: 'none',
            duration: 1000,
            mask: true
          })
          this.data.tab3[index].goodNum = this.data.tab3[index].maxNum;
        }
        break;
      default:
        break;
    }
    
  },
  CalculationFun(type){
    let data=[];
    let price=0;
    switch(type){
      case 1:
        this.data.sumNum--;
        break;
      case 2:
        this.data.sumNum++;
        break;
      case 3:
        this.data.sumNum=0
        break;
      default:
        break;
    }
    for (let i = 0; i < this.data.tab1.length;i++){
      if (this.data.tab1[i].goodNum>0){
        data.push(this.data.tab1[i]);
        price += this.data.tab1[i].goodPrice*this.data.tab1[i].goodNum; 
      }
    }
    for (let i = 0; i < this.data.tab2.length; i++) {
      if (this.data.tab2[i].goodNum > 0) {
        data.push(this.data.tab2[i]);
        price += this.data.tab2[i].goodPrice * this.data.tab2[i].goodNum
      }
    }
    for (let i = 0; i < this.data.tab3.length; i++) {
      if (this.data.tab3[i].goodNum > 0) {
        data.push(this.data.tab3[i]);
        price += this.data.tab3[i].goodPrice * this.data.tab3[i].goodNum
      }
    }
    console.log("price", this.data.sumNum, this.data.totalprice)
    this.setData({
      tab1:this.data.tab1,
      tab2: this.data.tab2,
      tab3: this.data.tab3,
      addlist:data,
      sumNum: this.data.sumNum,
      totalprice: price.toFixed(2)
    })
  },
  showCart(e) {
    var that = this;
    this.setData({
      isBlance: !this.data.isBlance,
      addlist: this.data.addlist
    })
  },
  //购买
  toBuy(e) {
    var that = this;
    if (that.data.sumNum == 0) {
      wx.showModal({
        title: '提示',
        content: '请选择商品',
        showCancel: false,
      })
      return;
    } else {
      if (this.data.addlist.length < 1) {
        wx.showModal({
          title: '提示',
          content: '请选择商品',
          showCancel: false,
        })
        return;
      } else {
        if (this.data.ispay){
          that.setData({
            ispay: false
          })
          Request.shopCreateOrder(this.data.addlist, function (res) {
            if (res.data.isOk) {
              Request.shopPay(res.data.orderNo, function (res) {
                console.log(res);
                that.setData({
                  ispay:true
                })
                if (res.data.isOk) {
                  wx.requestPayment({
                    'timeStamp': res.data.data.timeStamp,
                    'nonceStr': res.data.data.nonceStr,
                    'package': res.data.data.package,
                    'signType': res.data.data.signType,
                    'paySign': res.data.data.paySign,
                    'success': function (res) {
                      // console.log(res);
                      that.Clearselect();
                      wx.showToast({
                        title: '购买成功',
                        icon: 'succes',
                        duration: 1000,
                        mask: true
                      })
                    },
                    'fail': function (res) {
                      console.log("err", res)
                    }
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
          })
        }else{
          wx.showToast({
            title: '请等待支付完成',
            icon: "none",
            duration: 1000,
            mask: true
          })
        }

      }
      // console.log(list);
    }
  },
  //清空选择
  Clearselect() {
    var that = this;
    for (let i = 0; i < this.data.tab1.length; i++) {
      this.data.tab1[i].goodNum=0
    }
    for (let i = 0; i < this.data.tab2.length; i++) {
      this.data.tab2[i].goodNum = 0
    }
    for (let i = 0; i < this.data.tab3.length; i++) {
      this.data.tab3[i].goodNum = 0
    }
    this.CalculationFun(3)
  },
  //关闭选择商品列表
  Closechangeshop(){
    this.setData({
      isBlance:true,
    })
  }
})