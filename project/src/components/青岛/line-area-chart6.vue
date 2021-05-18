<template>
  <div class="line-chart" ref="lineChart"></div>
</template>

<script>
let echarts = require("echarts");
export default {
  data() {
    return {
      color: [
        "#4494f0",
        "#69a9f3",
        "#50b2f7",
        "#73cbea",
        "#97d9fd",
        "#a2caf8",
        "#b9f8f3",
        "#79f8c9",
        "#5df88b",
        "#5df862",
        "#92f854",
        "#b0f84e",
        "#e3f859",
        "#f8de75",
        "#f8a289",
        "#f84b66",
        "#f84a93",
        "#f63ed5",
        "#dc66fb",
        "#a211fb",
        "#7c0efb",
      ],
      dataList: [],
      lineChart: "",
      options: "",
      chartName: "",
      timeOut: "",
    };
  },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    carDate: {
      type: Array,
      default() {
        return [];
      },
    },
    dataX: {
      type: Array,
      default() {
        return [];
      },
    },
    name: {
      type: String,
      default: "",
    },
    minIntervalY: {
      type: [Number, String],
      default: 0,
    },
    maxNumberY: {
      type: [Number, String],
    },
    selectedIndex: {
      type: [Number, String],
      default: 0,
    },
    template: {
      type: Object,
      default() {
        return {
          dataX: "dataX",
          data: "data",
        };
      },
    },
    title: {
      type: String,
      default: "",
    },
    cumulative: {
      type: String,
      default: "",
    },
    msg: {
      type: String,
      default: "",
    },
  },
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
      let chartDom = this.$refs["lineChart"];
      let Data = this.list;
      // let carDate = this.carDate;
      this.lineChart = this.renderLineChart(
        this.options,
        this.name,
        Data,
        chartDom,
        this.DataX,
        this.carDate
      );

      this.lineChart.resize();
    },
    renderLineChart(option, name, data, Dom, dataX, carDate) {
      let chart = "";
      const that = this;
      name = name || "";
      option = {
        color: ["#00CCFB", "#2291E3"],
        tooltip: {
          trigger: "item",
          // axisPointer: {
          //   type: 'cross',
          //   label: {
          //     backgroundColor: '#6a7985'
          //   }
          // },
          // formatter(obj) {
          //   let name = obj.seriesName === '出园人流' ? '出园' : '进园';
          //   return `<div style="color:#fff;text-align: center;">${obj.data.value}</div><div style="color: #b8bbcc;">${name}人量</div>`;
          // },
        },
        grid: {
          left: "2%",
          right: "3%",
          bottom: "1%",
          top: "15%",
          containLabel: true,
        },

        xAxis: [
          {
            type: "category",
            data: carDate,
            axisTick: {
              alignWithLabel: true,
            },

            axisLabel: {
              show: true, //这行代码控制着坐标轴x轴的文字是否显示
              textStyle: {
                color: "#E5F5FF", //上的字体颜色
                fontSize: `80%`, // 字体大小
              },
            },
            axisLine: {
              lineStyle: {
                color: "#90DBFF",
                fontSize: `70%`,
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ["rgba(144,219,255,0.2)"],
                width: 1,
                type: "solid",
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: name,
            minInterval: this.minIntervalY ? this.minIntervalY : "",
            axisLine: {
              lineStyle: {
                color: "#90DBFF",
                fontSize: `70%`,
              },
            },
            axisLabel: {
              textStyle: {
                color: "#E5F5FF", //字体颜色
                fontSize: `80%`, // 字体大小
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ["rgba(144,219,255,0.2)"],
                width: 1,
                type: "solid",
              },
            },
          },
        ],
        series: [
          {
            label: {
              normal: {
                show: true,
                position: "top",
                // distance: -14,
                // distance: 2,
                color: "#00CCFC",
                fontSize: `70%`,

                // 在文本中，可以对部分文本采用 rich 中定义样式。
                // 这里需要在文本中使用标记符号：
                // `{styleName|text content text content}` 标记样式名。
                // 注意，换行仍是使用 '\n'。
                rich: {
                  label: {
                    color: "#fff",
                    lineHeight: 10,
                  },
                },
              },
            },

            type: "bar",
            barWidth: 10,
            smooth: false,
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            areaStyle: {
              color: "rgba(0,204,252,0.2)",
            },
          },
        ],
      };
      if (this.maxNumberY) {
        option.yAxis[0].max = this.maxNumberY;
      }
      if (data && data.length > 0) {
        option.series[0].data = data;
      }
      if (Dom) {
        chart = echarts.init(Dom);
        chart.setOption(option);
      }
      return chart;
    },
    moveLine() {
      let option = this.lineChart.getOption();
      let selected = {};
      for (let i = 0; i < this.legendData.length; i++) {
        // this.legendData是legend中data的值，上面是写死的值，做自动切换时不要写死
        if (this.selectedIndex === i) {
          selected[this.legendData[i].name] = true;
        } else {
          selected[this.legendData[i].name] = false;
        }
      }
      this.lineChart.clear(); // 清空原来的折线图
      option.legend[0].selected = selected; //更改legend里的selected
      this.lineChart.setOption(option); //重绘
    },
  },
  beforeDestroy() {
    if (this.lineChart) {
      this.lineChart.clear();
      this.lineChart = null;
    }
    if (this.timeOut) {
      clearTimeout(this.timeOut);
    }
  },
  watch: {
    list: {
      handler: function (val, oldval) {
        this.chartName = this.name;
        this.init();
      },
      deep: true, //对象内部的属性监听，也叫深度监听
    },
    selectedIndex(val) {
      this.moveLine();
    },
  },
};
</script>

<style >
/* canvas {
  width: 100%;
  height: 100%;
} */
</style>

<style scoped lang="scss">
@import "../../assets/css/mixin";

.line-chart {
 width: 5rem;
    height: 1.95rem;
}
</style>
