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
            data: ['实有人口', '缴纳社保数', '就业人数', '居住证数量'],
            right: '0%',
            top: '8%',
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
            data: ['1月', '2月', '3月', '4月', '5月', '6月','7月','8月','9月','10月','11月','12月'],
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
                  name: '实有人口',
                  type: 'line',
                  showSymbol: false,
                  lineStyle: {
                    color: '#F7542C'
                  },
                  itemStyle: {
                    color: '#F7542C'
                  },
                  data: [220, 332, 145, 345, 490,270, 100,500,422,150,145,287]
              },
              {
                  name: '缴纳社保数',
                  type: 'line',
                  showSymbol: false,
                  lineStyle: {
                    color: '#59C437'
                  },
                  itemStyle: {
                    color: '#59C437'
                  },
                  data: [230, 418, 465, 174, 454,360,145,488,452,140,235,147]
              },
              {
                  name: '就业人数',
                  showSymbol: false,
                  type: 'line',
                  lineStyle: {
                    color: '#FFEC57'
                  },
                  itemStyle: {
                    color: '#FFEC57'
                  },
                  data: [127, 254, 448, 141, 367,280,145,485,235,145,455,140]
              },
              {
                  name: '居住证数量',
                  type: 'line',
                  showSymbol: false,
                  lineStyle: {
                    color: '#2290FA'
                  },
                  itemStyle: {        //拐点样式
                    color: '#2290FA'
                  },
                  data: [450, 170, 280, 340, 435,478,142,354,431,142,500,355]
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