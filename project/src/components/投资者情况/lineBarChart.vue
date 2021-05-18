<template>
  <div ref="linechart" class="barchart"></div>
</template>

<script>
let echarts = require("echarts");
export default {
  data() {
    return {
      options: {
        grid: {
          top: "18%",
          left: "5%",
          right: "1%",
          bottom: "14%"
          // containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            axisLine: {
              //坐标轴轴线相关设置。数学上的x轴
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,0.4)"
              }
            },
            axisLabel: {
              //坐标轴刻度标签的相关设置
              textStyle: {
                color: "rgba(255,255,255,0.8)",
                fontSize: 12,
                margin: 15
                
              }
            },
            axisTick: {
              show: false
            },
            data: ["18年3季度", "18年4季度", "19年1季度","19年2季度","19年3季度","19年4季度"]
          }
        ],
        yAxis: [
          {
            type: "value",
            min: 0,
            // max: 140,
            splitNumber: 3,
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,0.1)"
              }
            },
            axisLine: {
              show: true
            },
            axisLabel: {
              show: true,
              margin: 20,
              textStyle: {
                color: "#d1e6eb"
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "注册总量",
            type: "line",
            // smooth: true, //是否平滑曲线显示
            // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            symbol: "image://./static/images/guang-circle.png",
            symbolSize: 16,
            lineStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#54FEFE" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#3EA6FF" // 100% 处的颜色
                    }
                  ],
                  global: false // 缺省为 false
                } // 线条颜色
              }
            },
            label: {
              // show: true,
              position: "top",
              formatter: "{c}",
              textStyle: {
                color: "#fff",
                
              }
            },
            emphasis: {
              label: {
                show: true,
                position: "top",
                textStyle: {
                  color: "rgba(255,255,255,1)",
                  fontSize: 12
                }
              }
            },
            itemStyle: {
              normal: {
                color: "rgba(255,255,255,1)"
              }
            },
            tooltip: {
              show: false
            },
            data: [115352.4, 117136.1, 154072.1,160066.9,161823.8,164304.7]
          },
          {
            type: "bar",
            animation: false,
            barWidth: 10,
            hoverAnimation: false,
            data: [115352.4, 117136.1, 154072.1,160066.9,161823.8,164304.7],
            tooltip: {
              show: false
            },
            itemStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(255,255,255, 0.6)" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(255,255,255, 0)" // 100% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                },
                label: {
                  show: false
                }
              }
            }
          }
        ]
      },
      lineChart: null,
      dataIndex: 0,
      startCharts: null,
       data: [115352.4, 117136.1, 154072.1,160066.9,161823.8,164304.7]
    };
  },
  props: {},
  mounted() {
    this.init();
    window.addEventListener("resize", () => {
      if (this.lineChart) {
        this.lineChart.resize();
      }
    });
  },
  components: {},
  computed: {},
  methods: {
  //   init() {
  //     let chartDom = this.$refs["linechart"];
  //     this.lineChart = echarts.init(chartDom);
  //     this.lineChart.setOption(this.options);
  //   }
  // },
   init() {
      // this.options.series[0].data = this.data;
      let chartDom = this.$refs["linechart"];
      this.lineChart = echarts.init(chartDom);
      this.lineChart.setOption(this.options);

      // 高亮当前图形
      this.lineChart.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: this.dataIndex
      });

      // 显示 tooltip
      this.lineChart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: this.dataIndex
      });
      this.startCharts = setInterval(this.chartHover, 2000);

      // 2、鼠标移动上去的时候的高亮动画
      this.lineChart.on("mouseover", param => {
        // 取消之前高亮的图形
        this.lineChart.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: this.dataIndex
        });
        clearInterval(this.startCharts);
        this.startCharts = null;
      });
      this.lineChart.on("mouseout", param => {
        this.startCharts = setInterval(this.chartHover, 2000);
      });
    },
    chartHover() {
      if (!this.lineChart) {
        clearInterval(this.startCharts);
        return;
      }
      // 取消之前高亮的图形
      this.lineChart.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
        dataIndex: this.dataIndex
      });

      if (this.dataIndex === this.data.length - 1) {
        this.dataIndex = 0;
      } else {
        this.dataIndex++;
      }
      // 高亮当前图形
      this.lineChart.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: this.dataIndex
      });

      // 显示 tooltip
      this.lineChart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: this.dataIndex
      });
    }
  },
  beforeDestroy() {
    if (this.lineChart) {
      this.lineChart.clear();
      this.lineChart = null;
    }
    if (this.startCharts) {
      clearInterval(this.startCharts);
    }
  },
  watch: {}
};
</script>

<style scoped lang="scss">
@import "../../assets/css/mixin";
.barchart {
  width: 3.8rem;
  height: 2rem;
}
</style>
