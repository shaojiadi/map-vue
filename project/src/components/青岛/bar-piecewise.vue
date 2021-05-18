<template>
  <div style="width: 100%; height: 100%; position: relative; display: flex">
    <div class="chart" ref="barChart" style="width: 100%; height: 100%"></div>
    <div class="flex-box" style="position: absolute; width: 100%; bottom: 0">
      <div class="item">监控</div>
      <div class="item">电梯</div>
      <div class="item">车行道闸</div>
      <div class="item">人脸</div>
      <div class="item">巡检</div>
      <div class="item">烟感</div>
    </div>
  </div>
</template>

<script>
let echarts = require("echarts");
export default {
  data() {
    return {
      color: ["#2291E3", "#F5F35D"],
      dataList: [],
      barChart: "",
      options: "",
      chartName: "",
    };
  },
  props: {
    list: {
      type: Array,
      default() {
        return [0, 0, 0, 0, 0, 0, 0];
      },
    },
    list2: {
      type: Array,
      default() {
        return [0, 0, 0, 0, 0, 0, 0];
      },
    },
    dataX: {
      type: Array,
      default() {
        return ["12-23", "12-24", "12-25", "12-26", "12-27", "12-28", "12-29"];
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
    template: {
      type: Object,
      default() {
        return {
          dataX: "dataX",
          data: "data",
        };
      },
    },
    type2: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: "",
    },
    msg: {
      type: String,
      default: "",
    },
    xUnit: {
      type: String,
      default: "",
    },
    yUnit: {
      type: String,
      default: "",
    },
    isInit: {
      type: Boolean,
      default: false,
    },
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
      name = name || "";

      var maxData = 20;

      option = {
        tooltip: {},
     
        xAxis: {
          data: [
            "监控",
            "监控",
            "电梯",
            "电梯",
            "车行道闸",
            "车行道闸",
            "人脸",
            "人脸",
            "巡检",
            "巡检",
            "烟感",
            "烟感",
          ],
         
          splitLine: { show: false },
          offset: 10,
          axisLine: {
            lineStyle: {
              color: "#999",
            },
          },
          axisLabel: {
            show: false,
            margin: 0,
            interval: 1,
            color: "#FEFEFE",
            align: "center",
          },
          axisTick: {
            // show: false
          },
        },
        legend: {
          data: ["离线", "在线"],
          itemWidth: 15,
          itemHeight: 10,
          right: 0,
          top: 0,
          textStyle: {
            color: "rgba(255, 255, 255, 0.6)",
          },
        },
        grid: {
          left: 0,
          right: 0,
          top: "15%",
          bottom: "10%",
        },
        yAxis: {
          type: "value",
          show: true,
          axisLabel: {
            margin: 10,
            color: "#999",
            fontSize: 16,
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              color: "white",
              opacity: 0.2,
              type: "dashed",
            },
          },
        },
        series: [
          {
            name: "离线",
            type: "pictorialBar",
            symbol: "rect",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#F85044" },
                { offset: 1, color: "#A40C09" },
              ]),
            },
            symbolRepeat: true,
            symbolSize: [12, 4],
            symbolMargin: 1,
            data: [0, 2, 0, 3, 0, 5, 0, 1, 0, 2, 0, 1],
            z: 1,
          },
          {
            name: "离线",
            type: "pictorialBar",
            symbol: "rect",
            itemStyle: {
              color: "rgba(255, 0, 0, 0.2)",
            },
            symbolRepeat: true,
            symbolSize: [12, 4],
            symbolMargin: 1,
            z: -10,
            data: [
              0,
              maxData,
              0,
              maxData,
              0,
              maxData,
              0,
              maxData,
              0,
              maxData,
              0,
              maxData,
            ],
          },
          {
            name: "在线",
            type: "pictorialBar",
            symbol: "rect",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#3EA6FF" },
                { offset: 1, color: "#54FEFE" },
              ]),
            },
            symbolRepeat: true,
            symbolSize: [12, 4],
            symbolMargin: 1,
            data: [12, 0, 17, 0,7, 0, 13, 0, 11, 0, 5, 0],
            z: 1,
          },
          {
            name: "在线",
            type: "pictorialBar",
            symbol: "rect",
            itemStyle: {
              color: "rgba(255, 255, 255, 0.2)",
            },
            barCategoryGap: "0",
            symbolRepeat: true,
            symbolSize: [12, 4],
            symbolMargin: 1,
            z: -10,
            data: [
              maxData,
              0,
              maxData,
              0,
              maxData,
              0,
              maxData,
              0,
              maxData,
              0,
              maxData,
              0,
            ],
          },
        ],
        //  animation: true,
        // animationThreshold: 10000
      };

      if (Dom) {
        chart = echarts.init(Dom);
        chart.setOption(option);
      }
      return chart;
    },
  },
  beforeDestroy() {
    if (this.barChart) {
      this.barChart.clear();
      this.barChart = null;
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
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/css/mixin";

.item {
  flex: 18%;
  flex-shrink: 0;
  flex-grow: 0;
  color: white;
  text-align: center;
  font-size: 0.12rem;
}
</style>
