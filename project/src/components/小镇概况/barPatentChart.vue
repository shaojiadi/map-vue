<template>
  <div ref="linechart" class="barchart">
  </div>
</template>

<script>
  let echarts = require('echarts');
  export default {
    data() {
      let dataLine = [50.5, 66, 33.3]
      return {
        options: {
          grid: [
            {
              left: '5%',
              top: '10%',
              right: '20%',
              bottom: '0%',
              containLabel: true
            },
            {
              left: '5%',
              top: '10%',
              right: '20%',
              bottom: '0%',
              containLabel: true
            }
          ],
          xAxis: [{
            show: false
          }],
          yAxis: [{
            axisTick: 'none',
            axisLine: 'none',
            inverse: true,
            offset: '100',
            axisLabel: {
              textStyle: {
                color: 'rgba(255,255,255,0.8)',
                fontSize: '14'
              },
              align: 'left'
            },
            data: ['实用新型专利', '发明专利', '外观专利']
          }, {
            axisTick: 'none',
            axisLine: 'none',
            show: false,
            axisLabel: {
              textStyle: {
                color: '#ffffff',
                fontSize: '16'
              }
            },
            data: [1, 1, 1]
          }, {

            axisLine: {
              lineStyle: {
                color: 'rgba(0,0,0,0)'
              }
            },
            data: []
          }],
          series: [
            {
              name: '条',
              type: 'bar',
              stack: 'b',
              yAxisIndex: 0,
              data: dataLine,
              label: {
                normal: {
                  show: false,
                }
              },
              barWidth: 10,
              itemStyle: {
                normal: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 1,
                    colorStops: [{
                      offset: 0, color: 'rgba(0,253,252,1)' // 0% 处的颜色
                    }, {
                      offset: 1, color: 'rgba(0,150,239,1)' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                  },
                },
                shadowBlur:10,
                shadowColor: '#00FDFC',
                // shadowOffsetX: 20,
                // shadowOffsetY: 20
              },
              z: 10
            },
            {
              name: '外框',
              type: 'bar',
              yAxisIndex: 0,
              barGap: '-100%',
              data: [100, 100, 100],
              barWidth: 10,
              label: {
                normal: {
                  show: true,
                  position: 'right',
                  distance: 10,
                  formatter: function(data) {
                    return '占比:' + dataLine[data.dataIndex] +"%";
                  },
                  textStyle: {
                    color: '#ffffff',
                    fontSize: '14'
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: '#3E4967'
                }
              },
              z: 0
            }
          ]
        },
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
  .barchart{
    width: 100%;
    height: 100%;
  }
</style>
