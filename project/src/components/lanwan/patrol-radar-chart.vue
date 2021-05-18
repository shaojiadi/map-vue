<template>
<!-- 月度安防巡查指数分布 -->
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
          /* legend:{
            icon:"circle",   //提示圆形
            itemWidth: 20,
            itemHeight: 10,
          },  */  //提示框
          radar: {
            // shape: 'circle',
            splitNumber: 5, // 雷达图圈数设置
            center: ["53%", "50%"],    //图标位置
            indicator: (function (){
                var res = [];
                for (var i = 1; i <= 12; i++) {
                    res.push({text: i + '月', max: 100});
                }
                return res;
            })(),
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
                name: '平均指标',
                type: 'radar',
                symbol: 'circle', // 拐点的样式，还可以取值'rect','angle'等
                // symbolSize: 6, // 拐点的大小
                data: [[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 18.8, 6.0, 2.3]],
                itemStyle: {
                  color: '#FFD68B'
                },
                areaStyle: {
                  opacity: 0.5
                }
            },
            {
                name: '镇街得分',
                type: 'radar',
                symbol: 'circle', // 拐点的样式，还可以取值'rect','angle'等
                // symbolSize: 6, // 拐点的大小
                data: [[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 35.6, 62.2, 32.6, 20.0, 6.4, 3.3]],
                itemStyle: {
                  color: '#00E2C2'
                },
                areaStyle: {
                  opacity: 0.6
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
