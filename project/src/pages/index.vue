<template>
  <div style="position: relative; z-index: 10; width: 100%; height: 100%;pointer-events: none;">
    <v-mask />

    <div class="g-title g-zindexs">
      <div class="g-datacenter-item">
        <div>
          <p class="g-names">今日巡航</p>
          <p class="g-nums">
            <v-countup
              class="g-nums-value"
              tag="span"
              :end-value="3800"
              :duration="1"
            ></v-countup>
            <span class="unit">次</span>
          </p>
        </div>
      </div>
      <div class="g-datacenter-item">
        <div>
          <p class="g-names">今日巡检</p>
          <p class="g-nums">
            <v-countup
              tag="span"
              class="g-nums-value"
              :end-value="1917"
              :duration="1"
            ></v-countup>
            <span class="unit">次</span>
          </p>
        </div>
      </div>
      <div class="g-datacenter-item">
        <div>
          <p class="g-names">生产督察</p>
          <p class="g-nums">
            <v-countup
              tag="span"
              class="g-nums-value"
              :end-value="1917"
              :duration="1"
            ></v-countup>
            <span class="unit">次</span>
          </p>
        </div>
      </div>
      <div class="g-datacenter-item">
        <div>
          <p class="g-names">今日告警</p>
          <p class="g-nums">
            <v-countup
              tag="span"
              class="g-nums-value"
              :end-value="3"
              :duration="1"
            ></v-countup>
            <span class="unit">次</span>
          </p>
        </div>
      </div>
    </div>

    <div class="flex-box">
      <!-- 左侧-主界面 -->
      <div class="g-town-situation-left" v-if="!isShowValue">
        <ul>
          <li
            v-for="(item, index) in conditionList"
            :key="index"
            class="company-item"
          >
            <div class="p-l">
              <p class="p-l-t">
                {{ item.title }}
              </p>
              <v-countup
                tag="div"
                class="p-l-v"
                :end-value="item.value"
                :duration="1"
              ></v-countup>
              <span class="unit">{{item.unit}}</span>
            </div>
          </li>
        </ul>

        <div class="g-center">
          <h4 class="g-situations-tit week" style="padding: 0.28rem 0.25rem 0.27rem 0.26rem">
            设备运行状况监测
            <div class="week-rt">
              今日统计
              <img src="/static/bounced-img/data/down.png" alt="" />
            </div>
          </h4>
          <div style="height: 2.3rem; width: 4rem;padding-left:.26rem">
            <v-barPiecewise></v-barPiecewise>
            <!-- <v-barFinancingChart></v-barFinancingChart> -->
          </div>
        </div>
      
        <div class="g-center" style="margin-top:.12rem">  
          <h4 class="g-situations-tit" style="padding: 0.28rem 0 0 0.26rem">
            设备告警时间类型统计
          </h4>
          <div class="pieChart">
            <v-pieChart></v-pieChart>
            <!-- <v-trafficradarchart></v-trafficradarchart> -->
          </div>
        </div>
      </div>
      <!-- 左侧导航栏 -->
      <ul class="tab-list"  v-if="isShowValue&&tabIndex!=4">
        <transition-group tag="ul" name="list">
          <li v-for="(item,index) in leftData" :key="item.id" @click="leftNavBtn(index)" :class="activeIndex2==index?'active-btn':'btn'"> 
            {{item.label}}
          </li>
        </transition-group>
      </ul>

      <!-- 六大片区左侧 -->
      <ul class="district-list"  v-if="isShowValue&&tabIndex==4">
        <li v-for="(item,index) in districtsList" :key="index"> 
          <img :src="item.imgUrl" alt="">
          <div>
            <p class="title">{{item.school}}</p>
            <p class="p1">今日异常告警 &nbsp;&nbsp;<span>{{item.num}}项</span></p>
            <p class="p1">当前安防指数 &nbsp;&nbsp;{{item.grade}}</p>
          </div>
          <p>查看详情>></p>
        </li>
      </ul>

      <!--  中间center  -->
      <div class="g-datacenterbox g-zindexs">
        <div v-for="(item,index) in tabs" :key="index" class="tab-bg" :class="tabIndex==index?'active-tab-bg':'tab-bg2'">
          <p  @click="changeTabs(index,item)">{{item.name}}</p>
          <template v-for="(item,index2) in item.checkList">
            <div class="check-box" v-if="isShow&&tabIndex==index"  :key="index2" >
              <input type="checkbox"  :value="item.value" @click="changeTab(item.value,index2)" style="margin-right:.1rem" ref="checkItem">{{item.label}}
            </div>
          </template>
      
        </div>
      </div>

      <!-- 右侧 -->
      <div class="g-town-situation-right">
        <!-- 主界面左上组件 -->
        <v-index-right v-if="!isShowValue"></v-index-right>
        <!-- 主界面右下组件 -->
        <div class="g-center" style="margin-top:.09rem"  v-if="!isShowValue">
          <h4 class="g-situations-tit week"  style="padding: 0.28rem 0.27rem 0.1rem 0.26rem">
            人员流量频次分析
            <div style="color:rgba(122, 244, 253, 1);text-decoration:underline">
              取消选中
            </div>
          </h4>
          <div class="diagram-item" v-for="(item,index) in diagramList" :key="index" @click="activeIndex=index" :class="activeIndex==index?'active-bg':'bg'">
            {{item.name}}
          </div>
        </div>
        

        <!------------- 天空 -------------->
          <!-- 无人机巡航左上组件 -->
          <transition name="slide-left">
            <v-drone-cruise v-if="(isShowValue==1&&tabIndex==0)&&(activeIndex2==0||activeIndex2==1||activeIndex2==2)"></v-drone-cruise>
          </transition>
          <!-- 异常告警 -->
          <transition name="list">
            <v-abnormal-alarm v-if="(isShowValue==1&&tabIndex==0)&&(activeIndex2==3)"></v-abnormal-alarm>
          </transition>


          <!------------- 中空 ------------>
          <!-- 安防监控 -->
          <transition name="slide-left">
            <v-security-monitoring v-if="(isShowValue==2&&tabIndex==0)"></v-security-monitoring>
          </transition>


        <!------------- 地面 ----------->
          <!-- 安防监控 -->
          <transition name="slide-left">
            <v-security-monitoring v-if="(isShowValue==3&&tabIndex==0)&&(activeIndex2==0||activeIndex2==3)"></v-security-monitoring>
          </transition>

          <!-- 智慧人行 -->
          <transition name="slide-left">
            <div class="box-offside" v-if="(isShowValue==3&&tabIndex==0)&&(activeIndex2==1)">
              <v-through-control v-if="throughControlShow" @close="throughControlShow = false"></v-through-control>
            </div>
          </transition>
          
          <!-- 智慧车行 -->
          <transition name="slide-left">
            <div class="box-offside" v-if="(isShowValue==3&&tabIndex==0)&&(activeIndex2==2)">
              <v-vehicle-manage
                ref="cheliang"
                :toID="toID"
                v-if="vehiclePopupShow"
                @close="vehiclePopupShow = false"
              ></v-vehicle-manage>
            </div>
          </transition>


        <!----------- 地下管廊 ------------>
        <!-- 管廊分布 -->
        <transition name="slide-left">
          <v-pipe v-if="isShowValue==4&&tabIndex==0"></v-pipe>
        </transition>


        <!------------- 水系 ------------->
          <!-- 水系划分 -->
          <transition name="slide-left">
            <v-drainage-divide v-if="(isShowValue==5&&tabIndex==0)"></v-drainage-divide>
            <!-- <div class="box-offside" v-if="(isShowValue==5&&tabIndex==0)">
              <v-water-area></v-water-area>
              <div class="water-quality">
                <h4 class="box-headline">水质评价指数变化情况</h4>
                <ul class="box-content">
                  <li class="flex-box water-box">
                    <p>A水系</p>
                    <v-water-line-chart class="water-line-chart"></v-water-line-chart>
                  </li>
                  <li class="flex-box water-box">
                    <p>B水系</p>
                    <v-water-line-chart class="water-line-chart"></v-water-line-chart>
                  </li>
                  <li class="flex-box water-box">
                    <p>C水系</p>
                    <v-water-line-chart class="water-line-chart"></v-water-line-chart>
                  </li>
                </ul>
              </div>
            </div> -->
          </transition>


        <!------------- 三道防控圈 ------------>
          <!-- 防控圈划分 -->
          <transition name="slide-left">
            <v-prevent-divide v-if="tabIndex==1"></v-prevent-divide>
          </transition>


        <!------------- 三条主控线 ------------>
          <!--交通管控-->
          <transition name="slide-left">
            <v-control-lines v-if="tabIndex==2"></v-control-lines>
          </transition>



        <!------------- 三类控制点 ----------->
          <!-- 一标五识 -->
          <transition name="slide-left">
            <v-five-understandings v-if="tabIndex==3"></v-five-understandings>
          </transition>


        <!------------- 六大主要片区 -------------->
          <transition name="slide-left">
            <v-left-side v-if="tabIndex==4"></v-left-side>
          </transition>
      </div>
      
    </div>
  </div>
</template>

<script>
import indexRight from '../components/lanwan/index-right'

import rqgjRightTop from '../components/lanwan/rqgj-right-top.vue'
import yqgkRightTop from '../components/lanwan/yqgk-right-top.vue'
import qtjcRightTop from '../components/lanwan/qtjc-right-top.vue'
import MonitoringEquipment from '../components/lanwan/monitoring-equipment.vue'
import latestInvasion from '../components/lanwan/latest-invasion.vue'

import fiveUnderstandings from '../components/lanwan/five-understandings.vue'
import leftSide from '../components/lanwan/left-side.vue'
import controlLines from '../components/三条主控线/control-lines.vue'
export default {
  data() {
    return {
      inDate:[472, 425, 491, 416, 457, 462, 486],
      outDate:    [124, 192, 153, 142, 105, 172, 135] ,
      isInPut: 1,
      conditionList: [
        {
          title: "总发现隐患",
          value: "2641",
          unit: "处"
        },
        {
          title: "整改率",
          value: "100",
          unit: "%"
        },
        {
          title: "总接入设备",
          value: "327",
          unit: "个"
        },
        {
          title: "设备在线率",
          value: "87",
          unit: "%"
        },
      ],
      tabs: [
        {
          name: '五维防控面',
          checkList: [
            {
              label: '天空',
              value: 1
            },
            {
              label: '中空',
              value: 2
            },
            {
              label: '地面',
              value: 3
            },
            {
              label: '地下管廊',
              value: 4
            },
            {
              label: '海域',
              value: 5
            }
          ]
        },
         {
          name: '三道防控圈',
          checkList: [
            {
              label: '环高新区',
              value: 1
            },
            {
              label: '环核新区',
              value: 2
            },
            {
              label: '环中新区',
              value: 3
            }
          ]
        },
         {
          name: '三条主控线',
          checkList: [
            {
              label: '要人警卫',
              value: 1
            },
            {
              label: '出入通道',
              value: 2
            },
            {
              label: '交通站点',
              value: 3
            }
          ]
        },
         {
          name: '三类控制点',
          checkList: [
            {
              label: '重点单位',
              value: 1
            },
            {
              label: '重点单位',
              value: 2
            },
            {
              label: '重点场所',
              value: 3
            }
          ]
        },
         {
          name: '六大主要片区'
        }

      ],
      activeIndex: 0,
      diagramList: [
        {
          name: '区域人流热力图'
        },
        {
          name: '区域能耗热力图'
        },
        {
          name: '区域车流热力图'
        }
      ],
      isShow: false,
      tabIndex: -1,  //中间按钮索引(五维防控面、三道防控圈...)
      checkName: '',
      imgList: [
        {
          imgUrl: "../../static/lanwan/guanjian-1.jpg",
        },
        {
          imgUrl: "../../static/lanwan/video-img22.jpg",
        },
        {
          imgUrl: "../../static/lanwan/video-img33.jpg",
        },
        {
          imgUrl: "../../static/lanwan/video-img22.jpg",
        },
      ],
      isShowValue: "",  //中间按钮每个checkbox的值
      leftData: [],
      skyList: [
        {
          label: '无人机巡航',
          id: 1
        },
        {
          label: '视频巡检',
          id: 2
        },
        {
          label: '安全生产',
          id: 3
        },
        {
          label: '异常告警',
          id: 4
        }
      ],
      groundList: [
        {
          label: '安防监控',
          id: 1
        },
        {
          label: '智慧人行',
          id: 2
        },
        {
          label: '智慧车型',
          id: 3
        },
        {
          label: '疫情管控',
          id: 4
        }
      ],
      HollowList: [
        {
          label: '安防监控',
          id: 1
        },
        {
          label: '移动检测',
          id: 2
        },
        {
          label: '入侵检测',
          id: 3
        }
      ],
      groundList: [
        {
          label: '安防监控',
          id: 1
        },
        {
          label: '智慧人行',
          id: 2
        },
        {
          label: '智慧车行',
          id: 3
        },
        {
          label: '疫情管控',
          id: 4
        }
      ],
      undergroundList: [
        {
          label: '管廊分布',
          id: 1
        },
        {
          label: '入侵告警',
          id: 2
        },
        {
          label: '放拆告警',
          id: 3
        },
        {
          label: '气体监测',
          id: 4
        },
        {
          label: '环境监测',
          id: 5
        }
      ],
      riverSystemList: [
        {
          label: '水系划分',
          id: 1
        },
        {
          label: '无人机巡航',
          id: 2
        },
        {
          label: '违规捕获',
          id: 3
        }
      ],
      controlCircleslist: [
        {
          label: '防控圈划分',
          id: 1
        },
         {
          label: '无人机巡航',
          id: 2
        },
        {
          label: '视频巡检',
          id: 3
        },
        {
          label: '异常告警',
          id: 4
        }
      ],
      mainControlLine: [
        {
          label: '交通管控',
          id: 1
        },
        {
          label: '无人机巡航',
          id: 2
        },
        {
          label: '视频巡检',
          id: 3
        },
        {
          label: '异常告警',
          id: 4
        }
      ],
      controlpoints: [
        {
          label: '一标五实',
          id: 1
        },
        {
          label: '九小场所',
          id: 2
        },
        {
          label: '智慧服务',
          id: 3
        },
        {
          label: '地下管廊',
          id: 4
        }
      ],
      activeIndex2: 0,
      toID: 0,
      vehiclePopupShow: false,
      throughControlShow: false,
      districtsList: [
        {
          imgUrl: '../../static/lanwan/phenomenon-img.png',
          school: '青岛第二中学',
          num: 1,
          grade: 9.3
        },
        {
          imgUrl: '../../static/lanwan/phenomenon-img.png',
          school: '青岛第二中学',
          num: 1,
          grade: 9.3
        },
        {
          imgUrl: '../../static/lanwan/phenomenon-img.png',
          school: '青岛第二中学',
          num: 1,
          grade: 9.3
        },
        {
          imgUrl: '../../static/lanwan/phenomenon-img.png',
          school: '青岛第二中学',
          num: 1,
          grade: 9.3
        },
        {
          imgUrl: '../../static/lanwan/phenomenon-img.png',
          school: '青岛第二中学',
          num: 1,
          grade: 9.3
        },
        {
          imgUrl: '../../static/lanwan/phenomenon-img.png',
          school: '青岛第二中学',
          num: 1,
          grade: 9.3
        }
      ]
    };
  },
  mounted() {
    
  },
  methods: {
    changeTab(val,index){
      this.activeIndex2 = 0;

      if(this.tabIndex==0){
        this.$refs.checkItem.forEach((item,index2)=>{
          if(index2!=index){
            item.checked = false;
          }
        })
        let isShow = this.$refs.checkItem.every(item=>{
          return item.checked == false;
        })
        
        if(isShow){
          this.isShowValue = '';
        }else {
          this.isShowValue = val;
        }
      }else {
        let isShow = this.$refs.checkItem.every(item=>{
          return item.checked == false;
        })
        
        if(isShow){
          this.isShowValue = '';
        } 
      }
     
      //五维防控面
      if(this.tabIndex==0){
        if(val==1){
          this.leftData = this.skyList  //天空
        }else if(val==2){
          this.leftData = this.HollowList  //中空
        }else if(val==3){
          this.leftData = this.groundList  //地面
        }else if(val==4){
          this.leftData = this.undergroundList  //地下管廊
        }else if(val==5){
          this.leftData = this.riverSystemList  //水系
        }
      }
     
    },
    changeTabs(index,item){
      this.isShow=true;
      if(index!=this.tabIndex){
        this.tabIndex=index;
        this.$store.state.activeIndex = this.tabIndex;
        this.isShowValue = 1;
      }else {
        this.tabIndex=-1;
        this.isShowValue= '';
        return
      }

      if(index==0){
        this.leftData = this.skyList  //天空
      }else if(index==1){
        //三道防控圈
        this.leftData = this.controlCircleslist  
      }else if(index==2){
        //三条主控线
        this.leftData = this.mainControlLine
      }else if(index==3){
        //三类控制点
        this.leftData = this.controlpoints
      }
      
      if(index==0){
        this.$nextTick(()=>{
          this.$refs.checkItem[0].checked = true;
        })
      }else {
        this.$nextTick(()=>{
        this.$refs.checkItem.forEach((item,index)=>{
          item.checked = true;
          })
        })
      }
    },
    leftNavBtn(index){
      this.activeIndex2=index;

      switch (this.activeIndex2){
        case 1:
          if(this.isShowValue==3&&this.tabIndex==0){
            this.throughControlShow = true;//智慧人行
          }
          break;
        case 2:
          if(this.isShowValue==3&&this.tabIndex==0){
            this.vehiclePopupShow = true;//智慧车行
          }
          break;
        default:
          break;
      }
    },
    /* mapChange(){//地图中心点及地图zoom大小变化
      switch (this.tabIndex){
        case 0:
          if(this.isShowValue==5){
            this.$store.state.mapCenter = [120.274859, 36.266895];
            this.$store.state.mapZoom = 19.18;
          }
          break;
        case 1:
          console.log(2)
          break;
        case 2:
          console.log(3)
          break;
        case 3:
          console.log(4)
          break;
        case 4:
          console.log(5)
          break;
        default:
          break;
      }
    } */
  },
  components:{
    'v-index-right': indexRight,
    'v-rqgj-right-top': rqgjRightTop,
    'v-yqgk-right-top': yqgkRightTop,
    'v-qtjc-right-top': qtjcRightTop,
    'v-monitoring-equipment': MonitoringEquipment,
    'v-latest-invasion': latestInvasion,
    'v-five-understandings': fiveUnderstandings,
    'v-left-side': leftSide,
    'v-control-lines': controlLines
  }
};
</script>

<style lang="scss">
@import "../assets/css/mixin";
.f-table1 {
  flex: 1;
  width: 100%;
  overflow: hidden;
  margin-top: 0rem;

  .has-gutter {
    th {
     display: none;
    }
  }

  tbody {
    &>tr:nth-child(odd){
      background: rgba(122, 244, 253, .15);
    }
    &>tr>td:nth-child(2){
      .cell {
        color: rgba(122, 244, 253, 1)
      }
    }
  }
}

.f-table2 {
  flex: 1;
  width: 100%;
  overflow: hidden;

  .has-gutter {
    th {
      background: rgba(122, 244, 253, .15);
     .cell {
        color: rgba(122, 244, 253, 1)
      }
    }
  }
  

tbody {
    &>tr:nth-child(even){
      background: rgba(122, 244, 253, .15);
    }
    td  {
      .cell {
        color: rgba(255, 255, 255, .8);
        p {
          font-size: .12rem;
          color: #fff;
        }
      }
    }
  } 
}


  .check-box {
    text-align: left;
    padding: 0 .1rem;
    @include bis('../../static/lanwan/check-box.png');
    width: 1.23rem;
    height: .53rem;
    z-index: 99;
    input {
      background: #08182B;
      border: 1px solid #7AF4FD;
    }
    color: #7AF4FD;
  }
</style>


<style scoped lang="scss">
@import "../assets/css/mixin";


.g-title {
  display: flex;
  align-items: center;
  padding: .89rem 3.1rem .32rem 3.7rem;
  // background: linear-gradient(180deg, #04111F 0%, rgba(4, 17, 31, 0) 100%);
  .g-datacenter-item {
    position: relative;
    display: flex;
    align-items: center;
    margin-right: 2rem;
    &:last-child {
      margin-right: 0;
    }
    img {
      display: block;
      width: 0.45rem;
      height: 0.45rem;
      margin-right: 0.18rem;
    }
    .g-nums {
      font-size: 0.36rem;
      font-family: RTWS ShangGothic G0v1;
      font-weight: bold;
      color: #ffffff;
      .g-nums-value {
        color: white;
        font-size: 0.36rem;
        font-family: RTWS ShangGothic G0v1;
        font-weight: bold;
      }
      .unit {
        width: 0.18rem;
        height: 0.18rem;
        font-size: 0.18rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
        opacity: 0.4;
        margin-left: 0.05rem;
      }
    }
    .g-names {
      width: 1.67rem;
      height: 0.24rem;
      @include bis("/static/bounced-img/top-center-bg.png");
      font-size: 0.16rem;
      font-family: PingFangSC-Regular;
      font-weight: bold;
      color: rgba(122, 244, 253, 1);
      margin-bottom: 0.13rem;
      padding: 0 0.2rem;
    }
  }
}

.pieChart {
  width: 4.5rem;
  height: 2.64rem;
}

.g-datacenterbox {
  flex: 1;
  display: flex;
  justify-content: space-between;
  padding: 0 .92rem;
  z-index: 99;
  .tab-bg {
    width: 1.3rem;
    height: .5rem;
    text-align: center;
    line-height: .5rem;
    cursor: pointer;
    pointer-events: auto;
    p {
      color: rgba(255,255,255,.8);
      font-family: RTWS ShangGothic G0v1;
      font-weight: bold;
    }
  }
  .active-tab-bg {
    @include bis('../../static/lanwan/tab-active-bg.png');
  }
  .tab-bg2 {
    @include bis('../../static/lanwan/tab-bg.png');
  }
  
}


.g-town-situation-left {
  top: 0.6rem;
  height: 9.26rem;
  width: 4.59rem;
  margin-left: .17rem;
  z-index: 99;
  pointer-events: auto;
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .company-item {
      display: flex;
      align-items: center;
      width: 2.2rem;
      height: .8rem;
      @include bis('../../static/lanwan/company-item-bg.png');
      padding: .14rem .21rem;
      margin-bottom: .3rem;
      .p-l {
        .p-l-t {
          font-size: 0.18rem;
          font-family: PingFang SC;
          font-weight: bold;
          color: #7af4fd;
        }
        .p-l-v {
          font-size: 0.24rem;
          font-family: AliHYAiHei;
          font-weight: bold;
          color: #ffffff;
          display: inline-block;
        }
        .unit {
          font-size: 0.16rem;
          font-family: PingFang SC;
          font-weight: bold;
          color: rgba(255,255,255,.4);
        }
      }
    }
  }
}

.g-center {
  @include bis('../../static/lanwan/operation-bg.png');
  width: 4.59rem;
  height: 3.08rem;
}

.g-town-situation-right {
  height: 9.26rem;
  width: 5rem;
  margin-right: .17rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  z-index: 99;
  pointer-events: auto;

  .company-item:nth-child(1),
  .company-item:nth-child(2),
  .company-item:nth-child(3) {
    margin: 0 0 0.32rem 0;
  }
  .company-item:nth-child(1),
  .company-item:nth-child(4) {
    width: 0.76rem;
    margin-right: 0.39rem;
  }
  .company-item:nth-child(2),
  .company-item:nth-child(5) {
    width: 1.16rem;
    margin-right: 0.33rem;
  }
  .company-item:nth-child(3n) {
    margin-right: 0;
  }

  .g-nums {
    width: 0.52rem;
    height: 0.22rem;
    font-size: 0.24rem;
    font-family: AliHYAiHei;
    font-weight: bold;
    color: #ffffff;
    display: flex;
    align-items: center;
    .g-unms-svalue {
      font-size: 0.24rem;
      font-family: AliHYAiHei;
      font-weight: bold;
      color: #ffffff;
      font-style: italic;
    }
    .unit {
      width: 0.18rem;
      height: 0.18rem;
      font-size: 0.18rem;
      font-family: PingFang SC;
      font-weight: bold;
      color: #ffffff;
      opacity: 0.4;
      margin-left: 0.05rem;
    }
  }
  .g-names {
    font-size: 0.18rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: #7af4fd;
    margin-bottom: 0.11rem;
  }

  .diagram-item {
    width: 4.34rem;
    height: .84rem;
    font-size: 0.2rem;
    font-family: RTWS ShangGothic G0v1;
    font-weight: bold;
    color: #FFFFFF;
    text-align: center;
    line-height: .84rem;
    margin-left: .15rem;
    cursor: pointer;
  }

  .active-bg {
    @include bis('../../static/lanwan/diagram-active.png');
  }
  .bg {
    @include bis('../../static/lanwan/diagram.png');
  }
}

.tab-list {
  width: 4.59rem;
  height: 100%;
  z-index: 99;
  pointer-events: auto;
  .active-btn {
    @include bis('../../static/lanwan/active-btn.png');
    width: 2.2rem;
    height: .56rem;
    line-height: .56rem;
    padding-left: .42rem;
    font-size: 0.24rem;
    font-family: PingFang SC;
    color: #FFFFFF;
    margin-bottom: .3rem;
    cursor: pointer;
  }
  .btn {
    @include bis('../../static/lanwan/btn.png');
    width: 1.8rem;
    height: .48rem;
    line-height: .48rem;
    padding-left: .32rem;
    font-size: 0.2rem;
    font-family: PingFang SC;
    color: rgba(73, 215, 255, .8);
    margin-bottom: .71rem;
    cursor: pointer;
  }
}

.list-enter-active,
.list-leave-active {
  transition: all .5s;
}

.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(30px);
}
.list-move {
  transition: transform .5s;
}

.list-leave-active {
  position: absolute;
}

.slide-left-enter-active {
  animation: slide-in-left 1s;
}

.slide-left-leave-active {
  animation: slide-leave-left 1s;
}
@keyframes slide-in-left {
  0% {
    z-index: 190;
    opacity: 0;
    transform: scale(0.6) translateX(-200%);
  }

  50% {
    z-index: 190;
    opacity: 1;
    transform: scale(0.6) translateX(0);
  }

  100% {
    z-index: 200;
    opacity: 1;
    transform: scale(1) translateX(0);
  }
}

@keyframes slide-leave-left {
  0% {
    z-index: 190;
    opacity: 1;
  }

  50% {
    z-index: 190;
    transform: scale(0.6);
  }

  100% {
    z-index: 190;
    opacity: 0;
    transform: scale(0.6) translateX(-200%);
  }
}

.box-offside {
  width:100%;
  display:flex;
  flex-direction: column;
  align-items: flex-end;
}

.box-headline {
  padding:.18rem 0 0 .26rem;
  font-size: .18rem;
  font-family: RTWS ShangGothic G0v1;
  font-weight: 400;
  color: #FEFEFE;
}

.test-statistics {
  position: relative;
  margin-top: .14rem; 
  width: 4.59rem;
  height: 2.83rem;
  background: url("../../static/lanwan/monitor-statistics.png") no-repeat;
  background-size: 100% 100%;

  .month-box {
    position: absolute;
    right: .16rem;
    top: .1rem;
    width: .78rem;
    height: .35rem;
    background: url("../../static/lanwan/month-img.png") no-repeat;
    background-size: 100% 100%;

    .month-sel {
      height:100%;
      font-size: .18REM;
      font-family: RTWS ShangGothic G0v1;
      font-weight: 400;
      color: #FEFEFE;
      line-height: .35rem;
      text-align: center;
    }
  }

  .statistics-chart {
    width: 100%;
    height: 2.47rem;
  }
}

.water-quality {
  margin-top: .14rem; 
  width: 4.59rem;
  height: 2.88rem;
  background: url("../../static/lanwan/monitor-picture.png") no-repeat;
  background-size: 100% 100%;

  .water-box {
    padding: 0 .25rem;
    margin-bottom: .18rem;
    justify-content: flex-start;
    align-items: center;
    P {
      font-size: .16rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: #FEFEFE;
    }
    .water-line-chart {
      width: 3.48rem;
      height: .6rem;
    }

    &:nth-of-type(1) {
      margin-top: .18rem;
    }
  }
  
}

.district-list {
  width: 4.59rem;
  height: 100%;
  z-index: 99;
  pointer-events: auto;
  margin-left: .3rem;
  li {
    @include wh(4.13rem,1.18rem);
    padding: .21rem .16rem;
    @include bis("/static/bounced-img/six-area-item.png");
    display: flex;
    img {
      @include wh(.78rem,.77rem);
      margin-right: .2rem;
    } 
    &>div {
      flex: 1;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      .title {
        font-size: 0.18rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: #FFFFFF;
        margin-bottom: .05rem;
      }
      .p1 {
        font-size: 0.16rem;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        margin-top: .05rem;
        span {
          font-size: 0.16rem;
          font-family: PingFang SC;
          font-weight: 500;
          color: #E82C37;
        }
      }
    }
    &>p {
      color:#7AF4FD;
      cursor: pointer;
    }
  }
}

</style>