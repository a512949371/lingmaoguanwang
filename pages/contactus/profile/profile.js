import WxParse from '../../../wxParse/wxParse.js'
import Request from '../../../datajson/request.js';
const app = getApp();
Page({
    data: {},
    onLoad: function(options) {
        var that = this;
        Request.getProfileInfo('',
            function(res) {
                // console.log(res);
                if(res.data.isOk){
                  var resData = res.data.data;
                  WxParse.wxParse('companyProfile', 'html', resData, that, 5)
                }
            }
        );

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