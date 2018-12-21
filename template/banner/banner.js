// template/banner/banner.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    sliderdata: Array,
    screenwidth: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgUrl: 'https://ptuan.zhsjgroup.cn',
    listdata:[],
    usewidth:'',
    swiperIndex:0,
    slideranimation:{}
  },
  ready(){
    console.log("slidedata",this.data.sliderdata)
    var newdata = [];
    newdata.push(this.data.sliderdata[this.data.sliderdata.length - 1]);
    for (let i = 0; i < this.data.sliderdata.length;i++){
      newdata.push(this.data.sliderdata[i])
    }
    newdata.push(this.data.sliderdata[0])
    this.setData({
      listdata: this.data.sliderdata,
      usewidth: this.data.screenwidth
    })
    console.log(this.data.listdata)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    swiperChange(e) {
      this.setData({
        swiperIndex: e.detail.current
      })
    },
    Godetail(e){
      this.triggerEvent('Godetail', { id: e.currentTarget.dataset.id}, {})
    }   
  },
  
})
