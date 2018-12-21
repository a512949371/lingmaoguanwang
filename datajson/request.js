var Httpone = "http://192.168.54.30:10005";
//var Httpone = "https://ptuan.zhsjgroup.cn";
var requestTimes = 0;
// 获取token
var Login = function (data, onsuccess) {

  wx.login({
    success: res => {
      console.log("code", res.code)
      Ajaxpost(Httpone, '/api/login', { code: res.code, platCode:'zreocat'}, function (res) {
        onsuccess(res)
      })
    }
  })
}
//更新用户信息
var Setaccountinfo = function (data, onsuccess) {
  Ajaxpost(Httpone, '/api/login/updateWxName', data, function (res) {
    onsuccess(res)
  }, requestTimes)
}
//小程序首页内容
var getIndexInfo=function(data,onsuccess){
  Ajaxget(Httpone,'/api/home','',function(res){
    onsuccess(res)
  }, requestTimes)
}
//首页通知公告
 var Notice=function(data,onsuccess){
   Ajaxget(Httpone,'/api/home/notice','',function(res){
     onsuccess(res)
   }, requestTimes)
 }
 //通知公告详情
 var Notdetail=function(data,onsuccess){
   Ajaxget(Httpone,'/api/home/notice/detail?id='+data,'',function(res){
     onsuccess(res)
   }, requestTimes)
 }
 //喵家主营业务
var companyProduct=function(data,onsuccess){
  Ajaxget(Httpone,'/api/home/companyProduct','',function(res){
    onsuccess(res)
  }, requestTimes)
}
//喵家主营业务详情
var Servicedetail=function(data,onsuccess){
  Ajaxget(Httpone, '/api/home/comProductOne?id='+data,'',function(res){
    onsuccess(res)
  }, requestTimes)
}
//喵家优势
var ServiceAdvantage =function(data,onsuccess){
  Ajaxget(Httpone,'/api/home/ServiceAdvantage','',function(res){
    onsuccess(res)
  }, requestTimes)
}
//招聘列表
var getRecruitList = function (data, onsuccess) {
  Ajaxget(Httpone, '/api/recruit', '', function (res) {
    onsuccess(res)
  }, requestTimes)
}
//招聘详情
var getRecruitDetail=function(data,onsuccess){
  Ajaxget(Httpone,'/api/recruit/getRecruitInfo/'+data,'',function(res){
    onsuccess(res)
  }, requestTimes)
}
//商品列表
var Shoplist=function(data,onsuccess){
  Ajaxget(Httpone, '/api/product/selectList?platCode=' + data.platCode ,'',function(res){
    onsuccess(res)
  }, requestTimes)
}
//商品详情接口
var Shopdetail=function(data,onsuccess){
  Ajaxget(Httpone,'/api/product/selectOne?id='+data,'',function(res){
    onsuccess(res)
  }, requestTimes)
}
//喵家展示厅详情
var GetServiceInfo=function(data,onsuccess){
  Ajaxget(Httpone,'/api/home/getProductInfo/'+data,'',function(res){
    onsuccess(res)
  }, requestTimes)
}
//企业服务
var Serviceshop=function(data,onsuccess){
  Ajaxget(Httpone,'/api/shop?platCode=zreocat','',function(res){
    onsuccess(res)
  }, requestTimes)
}
//企业服务详情列表
var getStoreDetail=function(data,onsuccess){
  Ajaxget(Httpone,'/api/shop/getShopInfo/'+data,'',function(res){
    onsuccess(res)
  }, requestTimes)
}
//创建企业服务订单
var storeCreateOrder=function(data,onsuccess){
  console.log(data)
  Ajaxpost(Httpone, '/api/shop/createOrder?productId=' + data.productId + '&priceId=' + data.priceId,data,function(res){
    onsuccess(res)
  }, requestTimes)
}
//支付
var storePay=function(data,onsuccess){
  console.log("pay",data)
  Ajaxpost(Httpone, '/api/pay/shoppay?orderNo=' + data,'',function(res){
    onsuccess(res)
  }, requestTimes)
}
//公司详情
var getProfileInfo=function(data,onsuccess){
  Ajaxget(Httpone,'/api/home/getProfile','',function(res){
    onsuccess(res)
  }, requestTimes)
}
//喵家小卖部商品列表
var getShopList=function(data,onsuccess){
  Ajaxget(Httpone,'/api/good','',function(res){
    onsuccess(res)
  }, requestTimes)
}
//生成喵家小卖部商品订单
var shopCreateOrder=function(data,onsuccess){
  console.log(data)
  Ajaxpost(Httpone,'/api/good/createOrder', data,function(res){
    onsuccess(res)
  }, requestTimes)
}
//喵家小卖部商品支付
var shopPay = function (data, onsuccess) {
  console.log("pay", data)
  Ajaxpost(Httpone, '/api/pay/goodpay?orderNo=' + data, '', function (res) {
    onsuccess(res)
  }, requestTimes)
}
//我的订单列表
var getOrderList=function(data,onsuccess){
  Ajaxget(Httpone,'/api/order/list','',function(res){
    onsuccess(res)
  }, requestTimes)
}
//post请求
var Ajaxpost = function (Http, url, data, onsuccess, requestTimes) {
  let questfunc = wx.request({
    method: "POST",
    url: Http + url,
    data: data,
    header: {
      'content-type': 'application/json',
      "platCode":'zreocat',
      'Authorization': wx.getStorageSync("token") || '',
    },
    success: function (res) {
      onsuccess(res)
    },
    fail: function (res) {
      onsuccess(res)
      wx.showToast({
        title: '网络错误，请等待网络正常之后重试',
        icon: "none",
        duration: 4000
      })
    },
    complete: function (res) {
      console.log("res", res, requestTimes)
      if (res.statusCode == 401) {
        if (requestTimes < 3) {
          requestTimes++;
          Login('', function (res) {
            wx.setStorageSync("token", res.data.data.token)
            wx.setStorageSync("isBindPhone", res.data.data.isBindPhone)
            if (res.statusCode == 200) {
              setTimeout(function () {
                Ajaxpost(Http, url, data, onsuccess, requestTimes)
              }, 2000)
            }
          })
        }
        console.log("requestTimes", requestTimes)
      } else if (res.statusCode == 405) {
        wx.setStorageSync("isBindPhone", "0")
      } else {
        requestTimes = 0;
      }
    }
  })
}
//get请求
var Ajaxget = function (Http, url, data, onsuccess, requestTimes) {
  let questfunc = wx.request({
    method: "GET",
    url: Http + url,
    data: data,
    header: {
      'content-type': 'application/json',
      "platCode": 'zreocat',
      'Authorization': wx.getStorageSync("token") || '',
    },
    success: function (res) {
      onsuccess(res)
    },
    fail: function (res) {
      onsuccess(res)
      wx.showToast({
        title: '网络错误，请等待网络正常之后重试',
        icon: "none",
        duration: 4000
      })
    },
    complete: function (res) {
      if (res.statusCode == 401) {
        if (requestTimes < 3) {
          requestTimes++;
          setTimeout(function () {
            Login('', function (res) {
              wx.setStorageSync("token", res.data.data.token)
              wx.setStorageSync("isBindPhone", res.data.data.isBindPhone)
              if (res.statusCode == 200) {
                setTimeout(function () {
                  Ajaxget(Http, url, data, onsuccess, requestTimes)
                }, 2000)
              }
            })
          }, 2000)
        }
      } else if (res.statusCode == 405) {
        wx.setStorageSync("isBindPhone", "0")
      } else {
        requestTimes = 0;
      }
    }

  })
}
module.exports={
  Ajaxpost: Ajaxpost,
  Ajaxget: Ajaxget,
  Login: Login,
  Setaccountinfo: Setaccountinfo,
  getIndexInfo: getIndexInfo,
  Notice: Notice,
  Notdetail: Notdetail,
  ServiceAdvantage: ServiceAdvantage,
  companyProduct: companyProduct,
  Servicedetail: Servicedetail,
  getRecruitList: getRecruitList,
  Shoplist: Shoplist,
  GetServiceInfo: GetServiceInfo,
  Shopdetail: Shopdetail,
  Serviceshop: Serviceshop,
  getStoreDetail: getStoreDetail,
  storeCreateOrder: storeCreateOrder,
  storePay: storePay,
  getProfileInfo: getProfileInfo,
  getRecruitDetail: getRecruitDetail,
  getShopList: getShopList,
  shopCreateOrder: shopCreateOrder,
  shopPay: shopPay,
  getOrderList: getOrderList
}