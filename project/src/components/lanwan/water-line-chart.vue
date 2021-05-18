<template>
<!-- 五维防控面-水系-水质评价指数变化情况 -->
  <div ref="linechart" class="barchart">
  </div>
</template>

<script>
  let echarts = require('echarts');
  export default {
    data() {
      return {
        options: {
          xAxis: {
            show: false,
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            // show: false,
            type: 'value',
            splitLine:{ //刻度线
              show: true,
              lineStyle: {
                opacity: 0.1 // 使用深浅的间隔色
              }
            },
            axisLine:{ //y轴
              show:false,
            },
            axisLabel: {
              show: false, //坐标轴上的文字
            },
            axisTick: { //刻度线
              show: false,
            }
          },
          series: [{
            data: [30, 40, 50, 45, 35, 60, 23],
            type: 'line',
            smooth: false, //是否平滑曲线显示
            // symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
            showSymbol: false,
            itemStyle: {
              normal: {
                color: "#00C1FF",// 线条颜色
              }
            },
            areaStyle: { //区域填充样式
              normal: {
                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(0,150,239,0.3)'
                },
                  {
                    offset: 1,
                    color: 'rgba(0,253,252,0)'
                  }
                ], false),
                shadowColor: 'rgba(53,142,215, 0.9)', //阴影颜色
                shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              }
            },
          }]
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
