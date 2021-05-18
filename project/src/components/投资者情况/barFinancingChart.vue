<template>
  <div ref="linechart" class="barchart"></div>
</template>

<script>
let echarts = require("echarts");
export default {
  data() {
    let data = [
      {
        name: "本月度招商数量",
        value: 20,
      },
      {
        name: "本年度招商数量",
        value: 37.8,
      },
      {
        name: "新增纳税户数量",
        value: 41,
      },
    ];
    let xData = [],
      yData = [];
    data.map(function (a, b) {
      xData.push(a.name);
      yData.push(a.value);
    });
    return {
      options: {
        grid: {
          left: "1%",
          right: "1%",
          bottom: "30%",
          top: "30%",
          // containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            gridIndex: 0,
            data: xData,
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: 12,
              // interval: 0,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            gridIndex: 0,
            max: 100,
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
          },
          {
            type: "value",
            gridIndex: 0,
            splitNumber: 20,
            max: 100,
            inverse: true,
            splitLine: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "合格率",
            type: "bar",
            barWidth: "16%",
            xAxisIndex: 0,
            yAxisIndex: 0,
            showBackground: true,
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.4)",
              barBorderRadius: 5,
            },
            itemStyle: {
              normal: {
                barBorderRadius: 30,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#00FCFE",
                  },
                  {
                    offset: 1,
                    color: "#0993FD",
                  },
                ]),
              },
            },
            data: [40, 50, 60, 70, 80, 90],
            zlevel: 11,
          },
          {
            name: "合格率1",
            type: "bar",
            barWidth: "16%",
            xAxisIndex: 0,
            yAxisIndex: 0,
            showBackground: true,
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.4)",
              barBorderRadius: 5,
            },
            itemStyle: {
              normal: {
                barBorderRadius: 30,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#00FCFE",
                  },
                  {
                    offset: 1,
                    color: "#0993FD",
                  },
                ]),
              },
            },
            data: [40, 50, 60, 70, 80, 90],
            zlevel: 11,
          },
          //   {
          //     name: "背景",
          //     type: "bar",
          //     barWidth: "16%",
          //     xAxisIndex: 0,
          //     yAxisIndex: 1,
          //     barGap: "-100%",
          //     data: [
          //       {
          //         value: 100,
          //         name: "29",
          //       },
          //       {
          //         value: 100,
          //         name: "271",
          //       },
          //       {
          //         value: 100,
          //         name: "57",
          //       },
          //       {
          //         value: 100,
          //         name: "187万",
          //       },
          //       {
          //         value: 100,
          //         name: "220万",
          //       },
          //       {
          //         value: 100,
          //         name: "265万",
          //       },
          //     ],
          //     label: {
          //       show: true,
          //       position: "top",
          //       distance: 15,
          //       formatter: "{b}",
          //       color: "#fff",
          //       fontSize: 12,
          //     },
          //     itemStyle: {
          //       normal: {
          //         barBorderRadius: 30,
          //         color: "rgba(255,255,255,0.2)",
          //       },
          //     },
          //     zlevel: 9,
          //   },
        ],
      },
      lineChart: null,
      axisLabel: {
        show: true,
        color: "rgba(255, 255, 255, 0.8)",
        fontSize: 12,
        interval: 0,
      },
      axisLabel1: {
        show: true,
        color: "rgba(255, 255, 255, 0.8)",
        fontSize: 12,
        interval: 0,
      },
    };
  },
  props: {},
  mounted() {
    this.init();
    window.addEventListener("resize", () => {
      if (this.lineChart) {
        if (document.body.clientWidth < 1560) {
          this.options.xAxis[0].axisLabel = this.axisLabel1;
        } else {
          this.options.xAxis[0].axisLabel = this.axisLabel;
        }
        this.lineChart.setOption(this.options);
        this.lineChart.resize();
      }
    });
  },
  components: {},
  computed: {},
  methods: {
    init() {
      if (document.body.clientWidth < 1560) {
        this.options.xAxis[0].axisLabel = this.axisLabel1;
      } else {
        this.options.xAxis[0].axisLabel = this.axisLabel;
      }
      let chartDom = this.$refs["linechart"];
      this.lineChart = echarts.init(chartDom);
      this.lineChart.setOption(this.options);
    },
  },
  beforeDestroy() {
    if (this.lineChart) {
      this.lineChart.clear();
      this.lineChart = null;
    }
  },
  watch: {},
};
</script>

<style scoped lang="scss">
@import "~@/assets/css/mixin";
.barchart {
  width: 3.8rem;
  height: 2.38rem;
}
</style>
