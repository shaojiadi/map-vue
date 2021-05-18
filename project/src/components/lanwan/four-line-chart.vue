<template>
  <div class="linechart">
    <div class="chaets" ref="linechart"></div>
  </div>
</template>

<script>
 let echarts = require('echarts');
  export default {
    name: '',
    data() {
      return {
        options : {
          title: {
            /* text: '党建活动',
            textStyle: {
              fontWeight: 'normal',
              fontSize: 12,
              color: 'rgba(255,255,255,.8)'
            },
            top: '0%',
            left: '-1%' */
          },
          tooltip: {
              trigger: 'axis'
          },
          legend: {
            icon: 'rect',
            itemWidth: 8,
            itemHeight: 8,
            itemGap: 5,
            data: ['电力管线', '通信管线', '燃气管线', '排水管线'],
            right: '0%',
            top: '5%',
            textStyle: {
              fontSize: 12,
              color: 'rgba(255,255,255,0.8)'
            }
          },
          grid: {
              left: '3%',
              bottom: '3%',
              containLabel: true
          },
         /*  toolbox: {
              feature: {
                  saveAsImage: {}
              }
          }, */
          xAxis: {
            type: 'category',
            // name: '月/周/年',
            // nameLocation: 'end',
            nameTextStyle:{
              verticalAlign: 'bottom'
            },
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: 'rgba(255,255,255,0.4)'
              }
            },
            axisTick: {
              show: false
            },
            data: ['8-01', '8-02', '8-03', '8-04', '8-05', '8-06','月/周/年'],
            axisLabel: {  //坐标轴数字
              show: true,
              color: 'rgba(255,255,255,.8)',
              align: 'center'
            },
            offset: 5
          },
          yAxis: {
            type: 'value',
            splitNumber: 4,
            name: '米数',
            nameGap: 15,   //坐标轴名称与轴线之间的距离
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true,
              margin: 20,
              color: 'rgba(255,255,255,.8)'
            },
            splitLine: {        //分割线
              show: true,
              lineStyle: {
                type: 'dotted',
                color: 'rgba(255,255,255,.2 )',
                widh: 1,
              }
            },
          },
          series: [
              {
                  name: '电力管线',
                  type: 'line',
                  lineStyle: {
                    color: '#F7542C'
                  },
                  itemStyle: {
                    color: '#F7542C'
                  },
                  data: [20, 32, 45, 45, 90,70]
              },
              {
                  name: '通信管线',
                  type: 'line',
                  lineStyle: {
                    color: '#59C437'
                  },
                  itemStyle: {
                    color: '#59C437'
                  },
                  data: [30, 18, 65, 74, 54,60]
              },
              {
                  name: '燃气管线',
                  type: 'line',
                  lineStyle: {
                    color: '#FFEC57'
                  },
                  itemStyle: {
                    color: '#FFEC57'
                  },
                  data: [27, 54, 48, 41, 67,80]
              },
              {
                  name: '排水管线',
                  type: 'line',
                  lineStyle: {
                    color: '#2290FA'
                  },
                  itemStyle: {        //拐点样式
                    color: '#2290FA'
                  },
                  data: [50, 70, 80, 40, 35,78]
              }
          ],
          textStyle: {
            color: '#fff'
          }
        },
        lineChart: null
      }
    },
    mounted(){
      this.init();
      window.addEventListener('resize', () => {
        if (this.lineChart) {
          this.lineChart.resize();
        }
      });
    },
    methods: {
      init(){
        let chartDom = this.$refs['linechart'];
        this.lineChart = echarts.init(chartDom);
        this.lineChart.setOption(this.options);
      },
    },
    beforeDestroy() {
      if (this.lineChart) {
        this.lineChart.clear();
        this.lineChart = null
      }
    },
  }
</script>

<style scoped lang="scss">
  .linechart{
    width: 4rem;
    height: 2.2rem;
    .chaets{
      width: 100%;
      height: 100%;
  }
}
</style>