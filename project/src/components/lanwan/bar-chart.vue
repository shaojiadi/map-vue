```
<template>
  <div ref="linechart" class="barchart">
  </div>
</template>

<script>
  let echarts = require('echarts');
  export default {
    data() {
      return {
        lineChart: null,
        options: {
          grid: {
            top: '18%',
            left: '8%',
            right: '3%',
            bottom: '18%',
            // containLabel: true
          },
          xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisLine: { //坐标轴轴线相关设置。数学上的x轴
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255,.4)',
              },
            },
            axisLabel: { //坐标轴刻度标签的相关设置
              color: '#fff',
            /*   textStyle: {
                color: 'rgba(0,0,0)',
                margin: 14,
                fontSize: '70%',
              }, */
            },
            axisTick: {        //刻度
              show: false,
            },
            data: ['消防', '环控', '安防', '通讯', '电器'],
          }],
          yAxis: [{
            name: '米数',
            nameGap: 15,   //坐标轴名称与轴线之间的距离
            type: 'value',
            min: 0,
            splitNumber: 4,
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255,.2)',
                widh: 1,
                type: 'dotted'
              }
            },
            axisLine: {  
              show: false,   
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: 'rgba(255,255,255,0.8)',
              },
            },
            textStyle: {
              color: '#d1e6eb',
            },
            axisTick: {
              show: false,
            },
          }],
          series: [
            {
              type: 'bar',
              animation: false,
              barWidth: '30%',    //柱状图宽度
              hoverAnimation: false,
              data: [156, 177, 187, 189, 199, 207],
              tooltip: {
                show: false
              },
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: '#E3FB42'
                  }, {
                      offset: 1,
                      color: '#008AFF'
                  }]),
                }
              },
            },
        /*     {
              name: '背景',
              type: 'bar',
              barWidth: '30%',
              barGap: '-100%',
              data: [250, 250, 250, 250, 250, 250],
              itemStyle: {
                normal: {
                  color: 'rgba(255,255,255,0.1)'
                }
              },
              zlevel: 9
            }, */
          ],
          textStyle: {
            color: '#fff'
          }
        },
      }
    },
    props: {
      list: {
        type: Array,
        default() {
          return []
        }
      },
      bgList: {
        type: Array,
        default() {
          return []
        }
      },
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
    computed: {},
    methods: {
      init() {
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
      list: {
        handler() {
          this.init()
        },
        deep: true
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../../assets/css/mixin';

  .barchart {
    width: 100%;
    height: 100%;
  }
</style>
```