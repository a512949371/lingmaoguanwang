import Request from '../../datajson/request.js';
Page({
    data: {
        recruit: ''
    },
    onLoad: function(options) {
        var that = this;
      Request.getRecruitList('',function(res) {
        console.log("getRecruitList",res);
        if(res.data.isOk){
          that.setData({
            recruit: res.data.data
          })
        }else{
          console.log("errgetRecruitList", res)
        }
            
        });
    },
    rDetail: function(e) {
        wx.navigateTo({
          url: './detail/detail?id=' + e.currentTarget.dataset.id
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