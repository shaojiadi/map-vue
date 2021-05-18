<template>
  <div ref="linechart" class="barchart"></div>
</template>

<script>
let echarts = require("echarts");
export default {
  data() {
    return {
      options: {
        
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(255,255,255,0)", // 0% 处的颜色
                  },
                  {
                    offset: 0.5,
                    color: "rgba(255,255,255,1)", // 100% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(255,255,255,0)", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
          },
        },
        grid: {
          top: "15%",
          left: "5%",
          right: "5%",
          bottom: "15%",
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
                color: "rgba(255,255,255,0.4)",
              },
            },
            axisLabel: {
              //坐标轴刻度标签的相关设置
              rotate: 0,

              textStyle: {
                color: "rgba(255,255,255,0.8)",
                fontSize: 12,
              },
            },
            axisTick: {
              show: false,
            },
            data: ["00时", "02时", "04时", "06时", "08时", "10时", "12时"],
          },
        ],
        yAxis: [
          {
            type: "value",
            min: 0,
            // max: 140,
            splitNumber: 4,
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,0.1)",
              },
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: false,
              margin: 20,
              textStyle: {
                color: "#d1e6eb",
              },
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "内部",
            type: "line",
            // smooth: true, //是否平滑曲线显示
            // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            symbol: "image://./static/images/guang-circle.png",
            symbolSize: 16,
            lineStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#3EA6FF", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#54FEFE", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
            label: {
              // show: true,
              position: "top",
              textStyle: {
                color: "rgba(255,255,255,0.2)",
                fontSize: 12,
              },
            },
            emphasis: {
              label: {
                show: true,
                position: "top",
                textStyle: {
                  color: "rgba(255,255,255,1)",
                  fontSize: 12,
                },
              },
            },
            itemStyle: {
              normal: {
                color: "rgba(255,255,255,1)",
              },
            },
            tooltip: {
              show: false,
            },
            areaStyle: {
              //区域填充样式
              normal: {
                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(0,150,239,0.3)",
                    },
                    {
                      offset: 1,
                      color: "rgba(0,253,252,0)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(53,142,215, 0.9)", //阴影颜色
                shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              },
            },
            data: [],
          },
      
        ],
      },
      lineChart: null,
      data: [114951.8, 115421.5, 40317.2, 49504.5, 52327.6, 55868.7, 5555],
      dataIndex: 0,
      startCharts: null,
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
    init() {
      this.options.series[0].data = this.data;
      let chartDom = this.$refs["linechart"];
      this.lineChart = echarts.init(chartDom);
      this.lineChart.setOption(this.options);

      // 高亮当前图形
      this.lineChart.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: this.dataIndex,
      });

      // 显示 tooltip
      this.lineChart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: this.dataIndex,
      });
      this.startCharts = setInterval(this.chartHover, 2000);

      // 2、鼠标移动上去的时候的高亮动画
      this.lineChart.on("mouseover", (param) => {
        // 取消之前高亮的图形
        this.lineChart.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: this.dataIndex,
        });
        clearInterval(this.startCharts);
        this.startCharts = null;
      });
      this.lineChart.on("mouseout", (param) => {
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
        dataIndex: this.dataIndex,
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
        dataIndex: this.dataIndex,
      });

      // 显示 tooltip
      this.lineChart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: this.dataIndex,
      });
    },
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
  watch: {},
};
</script>

<style scoped lang="scss">
@import "../../assets/css/mixin";
.barchart {
  width: 100%;
  height: 100%;
}
</style>
