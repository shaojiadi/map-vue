<template>
  <div ref="linechart" class="barchart">
  </div>

</template>

<script>
  let echarts = require('echarts');
  export default {
    data() {
      return {
        options:{
          color: ['#4ee9f8'],
          grid: {
            top: 0,
            bottom: 0,
            left: '20%',
            right: '20%',
          },
        
          radar: [{
            indicator: [
              {
                name: '大专级人才64.53%',
                max: 100
              },
              {
                name: '本科级人才24.79%  ',
                max: 50
              },
              {
                name: '硕士级人才9.13%',
                max: 30
              },
              {
                name: '博士级人才   1.55%',
                max: 20
              }
            ],
            center: ['50%', '50%'],
            radius: 55,
            startAngle:90,
            splitNumber: 4,
            orient: 'horizontal', // 图例列表的布局朝向,默认'horizontal'为横向,'vertical'为纵向.
            // shape: 'circle',
            // backgroundColor: {
            //     image:imgPath[0]
            // },
            name: {
             formatter:(text) =>{
              var strlength=text.length;
            text=text.replace(text[4],function (match) {
              return match+'\n'
            })
            return text
          },
              textStyle: {
                fontSize: "11", //外圈标签字体大小
                color: 'rgba(255,255,255,0.8)' //外圈标签字体颜色
              }
            },
            splitArea: { // 坐标轴在 grid 区域中的分隔区域，默认不显示。
              show: true,
              areaStyle: { // 分隔区域的样式设置。
                color: ['rgba(255,255,255,0)', 'rgba(255,255,255,0)'], // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
              }
            },
            // axisLabel:{//展示刻度
            //     show: true
            // },
            axisLine: { //指向外圈文本的分隔线样式
              lineStyle: {
                color: 'rgba(255,255,255,0.2)'
              }
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(255,255,255,0.2)', // 分隔线颜色
                width: 2, // 分隔线线宽
              }
            }
          }, ],
          series: [{
            name: '雷达图',
            type: 'radar',
            lineStyle: {
              width: 1
            },
            itemStyle: {
              emphasis: {
                lineStyle: {
                  width: 1
                }
              }
            },
            data: [{
              name: '2018',
              value: [64.53,24.79,9.13, 1.55],
              label: {
                 
                normal: {
                  // show: true,
              position:'bottom',
              distance:10,
                  fontSize: '15rem',
                  
                  color: '#fff',
                  
                  formatter:function(params) {
                    return params.value + '%';
                  }
                }
              },
              symbol:'image://./static/images/guang-circle.png',
              symbolSize: 16,
              itemStyle: {
                normal: {
                  borderWidth: 1,
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
                }
              },
              areaStyle: {
                normal: { // 单项区域填充样式
                  color: {
                    type: 'linear',
                    x: 0, //右
                    y: 0, //下
                    x2: 1, //左
                    y2: 1, //上
                    colorStops: [{
                      offset: 0,
                      color: 'rgba(62,166,255,0.6)'
                    }, {
                      offset: 1,
                      color: 'rgba(84,254,254,0.6)'
                    }],
                    globalCoord: false
                  },
                  // opacity: 0.89 // 区域透明度
                }
              }
            }]
          }, ]
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
    width: 3.8rem;
    height: 3.44rem;
  }
</style>
