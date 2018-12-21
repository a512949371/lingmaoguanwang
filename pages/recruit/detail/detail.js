import WxParse from '../../../wxParse/wxParse.js'
import Request from '../../../datajson/request.js';
Page({
    data: {
        rData: '',
        markers: [{
          iconPath: "/images/icon_maker.png",
          id: 0,
          latitude: 24.957532,
          longitude: 102.747751,
          width: 30,
          height: 30
        }],
      isshowmap:false
    },
    onLoad: function(options) {
        var that = this;
      Request.getRecruitDetail(options.id, function(res) {
        console.log("getRecruitDetail",res);
        if(res.data.isOk){
          that.setData({
            rData: res.data.data,
          })
          WxParse.wxParse('recruitProfile', 'html', res.data.data.content, that, 5)
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
})