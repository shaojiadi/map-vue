<template>
  <div class="chart-wrap">
    <div ref="linechart" class="barchart"></div>
    <!-- <div class="chart-content" style="display:flex">
      <p class="p1" style="font-size: 0.18rem;
    color: #FFB244;
    font-weight: bold;">{{total}}</p> -->
      <!-- <p class="p2" style="padding-left: 0.02rem;">家</p> -->
    <!-- </div> -->
    <ul class="chart-bottom">
      <li class="chart-item" v-for="(item,index) in data" :key="index">
        <div :class="item.color == 1 ? 'redd1': 'greend1'">{{item.value}}</div>
        <div class="d2">
          <img class="point" :src=item.imgurl >
          <div class="chart-label ellipsis" :title="item.name">{{item.name}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
let echarts = require("echarts");
export default {
  data() {
    return {
      options:{
        tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        // color: ['rgba(176, 2, 25, 1)'], 
        // legend: {
        //   bottom: 0,
        //   data: [{
        //     name: '在线',
        //     textStyle: {
        //       color: '#EEF8FF'
        //     }
        //   },{
        //     name: '离线',
        //     textStyle: {
        //       color: '#EEF8FF'
        //     }
        //   },
        // ],
        // },
        series: [
          {
          name: '设备情况',
          type: 'pie',
          clockWise: true,
          radius: ['50%', '66%'],
          center: ['55%', "40%"],
          itemStyle: {
            normal: {
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            }
          },
           color: ["#40B27E","#F35252"],
          hoverAnimation: false, 
          data: [],
          // data: [{
          //   value: 80,
          //   name: '01',
          //   avoidLabelOverlap: false,
          //   label: {
          //     show: false,
          //     position: 'center'
          //   },
          //   emphasis: {
          //     label: {
          //       show: true,
          //       fontSize: '30',
          //       fontWeight: 'bold'
          //     }
          //   },
          //   labelLine: {
          //     show: false
          //   },
          // }]
        }]
      },
      data: [],
      lineChart: null,
      rentrate:''
    };
  },
   props: ["online","offline"],
  mounted() {
   
    this.init();

    window.addEventListener("resize", () => {
      if (this.lineChart) {
        this.lineChart.resize();
      }
    });
  },
  components: {},
  computed: {
    /* total() {
      let total = 0;
      this.data.forEach(item => {
        total += item.value;
      });
      return total;
    } */
  },
  methods: {
    init() {
      // console.log(this.rentRate);
      // this.data = this.data.map((item, i) => {
      //   item.itemStyle = {
      //     color: this.option.color[i % this.option.color.length]
      //   };
      //   return item;
      // });
      // console.log(this.rentRate,11)
      this.data=[
        {
          name: "在线",
          value: this.online,
          color: 2,
          imgurl: '../../../static/img/point-green.png'
        },
        {
          name: "离线",
          value: this.offline,
          color: 1,
          imgurl: '../../../static/img/point-red.png'
        },
      ],
    
      this.options.series[0].data = this.data;
      let chartDom = this.$refs["linechart"];
      this.lineChart = echarts.init(chartDom);
      this.lineChart.setOption(this.options);
    }
      
  },
  beforeDestroy() {},
  watch: {
    online: {
        handler: function (val, oldval) {
          this.init();
        },
        deep: true//对象内部的属性监听，也叫深度监听
    },
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/css/mixin";
.chart-wrap {
  margin-left: .5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  // .chart-content {
  //   p {
  //     text-align: center;
  //     @include sc(0.14rem, #fff);
  //   }
  // }
  .chart-bottom {
    margin-top: -.5rem;
    display: flex;
    justify-content: start;
    // background:linear-gradient(90deg,rgba(0,63,122,0.8) 0%,rgba(0,67,125,0) 100%);
    .chart-item {
      // width: 50%;
      margin-right: .26rem;
      margin-top: .08rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      .redd1 {
        font-size: 0.14rem;
        color: #F35252;
        font-weight: bold;
        margin-bottom: 0.05rem;
      }
      .greend1 {
        font-size: 0.14rem;
        color: #40B27E;
        font-weight: bold;
        margin-bottom: 0.05rem;
      }
      .d2 {
        display: flex;
        .point {
          width: 0.05rem;
          height: 0.05rem;
          margin-right: .06rem;
          margin-top: .08rem;
        }
        .chart-label{
          font-size:0.14rem;
          // margin-right: .2rem;
          // color:rgba(255,255,255,.5);
          font-family: Lantinghei SC;
          font-weight: bold;
          color: #e5f5ff;
        }
      }
    }
  }
}
.barchart {
  margin-left: -0.4rem;
  padding-top: 0.1rem;
  width: 2.2rem;
  height: 2.2rem;
}
</style>