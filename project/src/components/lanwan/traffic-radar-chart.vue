<template>
<!-- 交通安全指数统计 -->
  <div ref="linechart" class="barchart"></div>
</template>

<script>
  let echarts = require('echarts');
  export default {
    data() {
      return {
        options: {
          color: ["#FFD68B","#7AFFEC"],
          grid: {
            bottom: 0,
            left: 0,
            right: 0
          },
          tooltip: {
            trigger: 'item'
          },
          legend:{
            icon:"circle",   //提示圆形
            itemWidth: 20,
            itemHeight: 10,
          },   //提示框
          radar: {
            // shape: 'circle',
            splitNumber: 4, // 雷达图圈数设置
            center: ["53%", "50%"],    //图标位置
            indicator: [
              { name: '设备情况', max: 40},
              { name: '违章事故', max: 40},
              { name: '道路情况', max: 40},
              { name: '地段情况', max: 40},
              { name: '交通管理', max: 40},
            ]
          },
          series: [
            // 主要展示层的
            // {   //------------方法1--------------
            //   name: '',
            //   type: 'radar',
            //   symbol: 'circle', // 拐点的样式，还可以取值'rect','angle'等
            //   // symbolSize: 5, // 拐点的大小
            //   data: [
            //       {
            //         value: [13, 30.68, 0, 246.36, 0.6, 9.23],
            //         name: '平均指标',
            //         areaStyle: {
            //           color: 'rgba(255, 214, 139, 0.5)'
            //         },
            //       },
            //       {
            //         value: [12.93, 31, 0, 238.72, 0.61, 6.56],
            //         name: '镇街得分',
            //         areaStyle: {
            //           color: 'rgba(0, 226, 194, 1)'
            //         },
            //         /* label: {//在拐点处显示数值
            //           normal: {
            //             show: false,
            //             fontSize: '14',
            //             color: '#fff',
            //             formatter:function(params) {
            //               return params.value;
            //             }
            //           }
            //         }, */
            //       },
            //   ]
            // }
            
            { //------------方法2--------------
                name: '2016',
                type: 'radar',
                symbol: 'circle', // 拐点的样式，还可以取值'rect','angle'等
                // symbolSize: 6, // 拐点的大小
                data: [[18, 25, 35, 28, 30]],
                itemStyle: {
                  // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
                  color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [{
                          offset: 0, color: '#3EFFAB' // 0% 处的颜色
                      }, {
                          offset: 1, color: '#94E225' // 100% 处的颜色
                      }],
                      global: false // 缺省为 false
                  }
                },
                areaStyle: {
                  opacity: 0.5
                }
            },
            {
                name: '2017',
                type: 'radar',
                symbol: 'circle', // 拐点的样式，还可以取值'rect','angle'等
                // symbolSize: 6, // 拐点的大小
                data: [[24, 18, 28, 22, 18]],
                itemStyle: {
                  // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
                  color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [{
                          offset: 0, color: '#3EA6FF' // 0% 处的颜色
                      }, {
                          offset: 1, color: '#54FEFE' // 100% 处的颜色
                      }],
                      global: false // 缺省为 false
                  }
                },
                areaStyle: {
                  opacity: 0.5
                }
            },
          ]
        },
        lineChart: null
      }
    },
    props: {
      dataScore: {
        type: Array,
        default() {
          return []
        }
      },
      dataNorm: {
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
    computed: {

    },
    methods: {
      init(){
        if (this.dataNorm&&this.dataNorm.length>0) {
          this.options.series[0].data = this.dataNorm;
        }
        if (this.dataScore&&this.dataScore.length>0) {
          this.options.series[1].data = this.dataScore;
        }
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
      dataNorm: {
        handler() {
          this.init()
        },
        deep: true
      },
      dataScore: {
        handler() {
          this.init()
        },
        deep: true
      },
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
