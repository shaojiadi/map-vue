<template>
  <div class="linechart">
    <div class="chaets" ref="linechart"></div>
  </div>
</template>

<script>
  let echarts = require('echarts');
  export default {
    data() {
      return {
        options: {
          // backgroundColor:'#1b2735',
          title: {
            text: '党建活动',
            textStyle: {
              fontWeight: 'normal',
              fontSize: 16,
              color: '#fff'
            },
            top: '0%',
            left: '-1%'
          },
          legend: {
            icon: 'rect',
            itemWidth: 8,
            itemHeight: 8,
            itemGap: 20,
            data: ['正式党员活跃度', '预备党员活跃度'],
            right: '0%',
            top: '2%',
            textStyle: {
              fontSize: 12,
              color: 'rgba(255,255,255,0.8)'
            }
          },
          grid: {
            left: '0%',
            right: '0%',
            bottom: '0%',
            top: '20%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: 'rgba(255,255,255,0.4)'
              }
            },
            axisLabel: {
              align: 'left',
              margin: 20,
              color: 'rgba(255,255,255,1)'
            },
            axisTick: {
              show: false
            },
            interval: 4,
            data: ['第一季度', '第二季度', '第三季度', '第四季度','第五季度', '第六季度', '第七季度']
            // data: ['第一季度', '第二季度', '第三季度', '第四季度','第五季度', '第六季度']

          }],
          yAxis: [{
            type: 'category',
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: false
            }
          }],
          series: [{
            name: '预备党员活跃度',
            type: 'line',
            symbolSize: 0,
            smooth: true,
            lineStyle: {
              normal: {
                width: 1
              }
            },
            areaStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: 'rgba(255, 255, 255, 0.2)' // 0% 处的颜色
                  }, {
                    offset: 1, color: 'rgba(255, 255, 255, 0.1)' // 100% 处的颜色
                  }],
                  global: false // 缺省为 false
                }
              }
            },
            itemStyle: {
              normal: {
                color: 'rgb(255,255,255)'
              }
            },
            data: [15,80,0,40,15,80, 90]
          }, {
            name: '正式党员活跃度',
            type: 'line',
            symbolSize: 0,
            smooth: true,
            lineStyle: {
              normal: {
                width: 1
              }
            },
            areaStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: 'rgba(0,150,239,1)' // 0% 处的颜色
                  }, {
                    offset: 1, color: 'rgba(0,253,252,0)' // 100% 处的颜色
                  }],
                  global: false // 缺省为 false
                }
              }
            },
            itemStyle: {
              normal: {
                color: 'rgba(0,150,239,1)'
              }
            },
            data: [6,40,2,20,1,40, 90]
          },]
        },
        data:[2220, 1682, 2791, 3000, 4090, 3230, 2910, 2220, 1682, 2791, 3000, 4090, 3230, 2910],
        xdata:['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        lineChart: null
      }
    },
    props: {
    },
    mounted() {
      this.init();
      window.addEventListener('resize', () => {
        if (this.lineChart) {
          this.lineChart.resize();
        }
      });
    },
    components: {},
    computed: {

    },
    methods: {
      init(){
        // this.options.xAxis.data = this.xdata;
        // this.options.series[0].data = this.data;
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
    watch: {

    }
  }
</script>

<style scoped lang="scss">
  @import '../../assets/css/mixin';
  .linechart{
    width: 3.8rem;
    height: 1.77rem;
    .chaets{
      width: 3.8rem;
      height: 1.77rem;
    }
  }
</style>
