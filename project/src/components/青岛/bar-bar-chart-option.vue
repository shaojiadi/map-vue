<template>
  <div class="chart" ref="barChart" style="width: 100%;height: 100%;"></div>
</template>

<script>
let echarts = require("echarts");
export default {
  data() {
    return {
      color: ["#00CCFB", "#2291E3"],
      dataList: [],
      barChart: "",
      options: "",
      chartName: ""
    };
  },
  props: {
     userOption: {
      type: Object,
      default() {
        return {
          
        };
      }
    },
    list: {
      type: Array,
      default() {
        return [0,0,0,0,0,0,0];
      }
    },
    list2: {
      type: Array,
      default() {
        return [0,0,0,0,0,0,0];
      }
    },
    dataX: {
      type: Array,
      default() {
        return ["12-23", "12-24", "12-25", "12-26", "12-27", "12-28", "12-29"];
      }
    },
    name: {
      type: String,
      default: ""
    },
    minIntervalY: {
      type: [Number, String],
      default: 0
    },
    maxNumberY: {
      type: [Number, String],
    },
    template: {
      type: Object,
      default() {
        return {
          dataX: "dataX",
          data: "data"
        };
      }
    },
    type2: {
      type: Boolean,
      default:  false
    },
    title: {
      type: String,
      default: ""
    },
    msg: {
      type: String,
      default: ""
    },
    xUnit: {
      type: String,
      default: ""
    },
    yUnit: {
      type: String,
      default: ""
    },
    isInit: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.init();
    window.addEventListener("resize", () => {
      if (this.barChart) {
        this.barChart.resize();
      }
    });
  },
  components: {},
  computed: {},
  methods: {
    init() {
      let chartDom = this.$refs["barChart"];
      let DataX = this.dataX;
      let Data = this.list;
      this.barChart = this.renderBarChart(
        this.options,
        this.name,
        Data,
        chartDom,
        DataX
      );
    },
    renderBarChart(option, name, data, Dom, dataX) {
      let chart = "";
      const that = this;
      const userOption = that.userOption
      name = name || "";
      option = {
        legend: {
          right: 0,
          itemGap: 50,
          data: [
            { name: userOption.name1 || "去年人流量", textStyle: { color: this.color[0] } },
            { name: userOption.name2 || "今年人流量", textStyle: { color: this.color[1] } }
          ]
        },
        tooltip: {
          trigger: "axis"
          // formatter: function (obj) {
          //   let name = obj[0].name;
          //   let data1 = obj[0];
          //   return `${name}<p>${data1.marker}${data1.seriesName}${data1.value}</p>`
          // }
        },
        grid: {
          left: "2%",
          right: "2%",
          bottom: "5%",
          top: "18%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [],
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true, //这行代码控制着坐标轴x轴的文字是否显示
              textStyle: {
                color: "#fff", //上的字体颜色
                fontSize: `80%` // 字体大小
              }
            },
            axisLine: {
              lineStyle: {
                color: "#90DBFF",
                fontSize: `70%`
              },
              onZero: true
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ["rgba(144,219,255,0.2)"],
                width: 1,
                type: "solid"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            show: true,
            name: name,
            minInterval: this.minIntervalY ? this.minIntervalY : "",
            axisLine: {
              lineStyle: {
                color: "#90DBFF",
                fontSize: `70%`
              }
            },
            axisLabel: {
              textStyle: {
                color: "#E5F5FF", //字体颜色
                fontSize: `80%` // 字体大小
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ["rgba(144,219,255,0.2)"],
                width: 1,
                type: "solid"
              }
            }
          }
        ],
        series: [
          {
            label: {
              normal: {
                show: this.type2,
                position: "top",
                // distance: -14,
                distance: 10,
                align: "center",
                color: this.color[0],
                fontSize: `95%`,
                fontWeight: 700,
                rich: {
                  label: {
                    color: "#fff",
                    lineHeight: 10
                  }
                }
              }
            },
            color: this.color[0],
            name: userOption.name1 || "去年人流量",
            type: "bar",
            barWidth: "10%",
            barGap: "170%",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            label: {
              normal: {
                show: this.type2,
                position: "top",
                // distance: -14,
                distance: 10,
                align: "center",
                color: this.color[1],
                fontSize: `95%`,
                fontWeight: 700,

                rich: {
                  label: {
                    color: "#fff",
                    lineHeight: 10
                  }
                }
              }
            },
            color: this.color[1],
            name: userOption.name2 || "今年人流量",
            type: "bar",
            barWidth: "10%",
            barGap: "170%",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
        ]
        
      };
      if (this.maxNumberY) {
          option.yAxis[0].max = this.maxNumberY;
        }
      if (dataX && dataX.length > 0) {
        option.xAxis[0].data = dataX;
      }
      if (data && data.length) {
        option.series[0].data = this.list;
        option.series[1].data =  this.list2;
      }
      if (Dom) {
        chart = echarts.init(Dom);
        chart.setOption(option);
      }
      return chart;
    }
  },
  beforeDestroy() {
    if (this.barChart) {
      this.barChart.clear();
      this.barChart = null;
    }
  },
  watch: {
    list: {
      handler: function(val, oldval) {
        this.chartName = this.name;
        this.init();
      },
      deep: true //对象内部的属性监听，也叫深度监听
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/css/mixin";
</style>



// WEBPACK FOOTER //
// src/components/property/bar-bar-chart-option.vue