<template>
<!-- 高频事故影响因素分析五维图 -->
  <div ref="linechart" class="barchart"></div>
</template>

<script>
  let echarts = require('echarts');
  export default {
    data() {
      return {
        options: {
          color: ["#FFD68B"],
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
            splitNumber: 4, // 雷达图圈数设置
            center: ["53%", "50%"],    //图标位置
            indicator: [
              { name: '生产事故', max: 40},
              { name: '受伤人数', max: 40},
              { name: '消防事故', max: 40},
              { name: '死亡人数', max: 40},
              { name: '经济损失', max: 40},
            ]
          },
          series: [
            { //------------方法2--------------
                name: '',
                type: 'radar',
                symbol: 'circle', // 拐点的样式，还可以取值'rect','angle'等
                // symbolSize: 6, // 拐点的大小
                data: [[22, 18, 26, 21, 19]],
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
