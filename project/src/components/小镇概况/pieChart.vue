<template>
  <div ref="linechart" class="barchart"></div>
</template>

<script>
let echarts = require("echarts");
export default {
  data() {
    return {
      options: {
        color: [
          new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(213, 145, 36, 1)" },
            { offset: 1, color: "rgba(255, 197, 15, 1)" },
          ]),
          new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(51, 139, 195, 1)" },
            { offset: 1, color: "rgba(61, 209, 238, 1)" },
          ]),
          new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(164, 12, 9, 1)" },
            { offset: 1, color: "rgba(248, 80, 68, 1)" },
          ]),
          '#a8393c',
          '#752c39',
          '#513a51',
          '#556281'
        //   new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //     { offset: 0, color: "rgba(164, 12, 9, 1)" },
        //     { offset: 1, color: "rgba(248, 80, 68, 1)" },
        //   ]),
        //   new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //     { offset: 0, color: "rgba(164, 12, 9, 1)" },
        //     { offset: 1, color: "rgba(248, 80, 68, 1)" },
        //   ]),
        ],
        grid: {
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
        },
        series: [
          // 主要展示层的
          {
            radius: ["37%", "47%"],
            center: ["50%", "50%"],
            type: "pie",
            startAngle: 140,
            label: {
              normal: {
                show: true,
                formatter: "{d|{d}%}\n{hr|}\n{b|{b}}",
                rich: {
                  b: {
                    fontSize: 10,
                    color: "#72A6E8",
                    align: "center",
                    padding: 3,
                  },
                  hr: {
                    borderColor: "#91D6FF",
                    width: "100%",
                    borderWidth: 1,
                    height: 0,
                  },
                  d: {
                    fontSize: 12,
                    color: "#fff",
                    align: "center",
                    padding: 2,
                    fontFamily: "zhonghei",
                  },
                },
                position: "outside",
              },
              emphasis: {
                show: true,
              },
            },
            itemStyle: {
              borderWidth: 1,
              borderType: "solid",
              borderColor: "#0e172c",
            },
            labelLine: {
              normal: {
                show: true,
                length: 4,
                lineStyle: {
                  color: "#91D6FF",
                  width: 1,
                },
              },
              emphasis: {
                show: true,
              },
            },
            data: [],
          },
          // 边框的设置
          {
            radius: ["40%", "42%"],
            center: ["50%", "50%"],
            type: "pie",
            label: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
              },
            },
            animation: false,
            tooltip: {
              show: false,
            },
            data: [
              {
                value: 1,
                itemStyle: {
                  color: "rgba(208, 226, 255, 0.3)",
                },
              },
            ],
          },
          {
            name: "外边框",
            type: "pie",
            clockWise: false, //顺时加载
            hoverAnimation: false, //鼠标移入变大
            center: ["50%", "50%"],
            radius: ["36%", "36%"],
            label: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: 9,
                name: "",
                itemStyle: {
                  normal: {
                    borderWidth: 1,
                    borderColor: "rgba(255,255,255,0.5)",
                  },
                },
              },
            ],
          },
        ],
      },
      data: [
        {
          name: "其他",
          value: 12.4,
        },
     
        {
          name: "危险作业",
          value: 9,
        },
    
        {
          name: "生产不规范",
          value: 14,
        },
           {
          name: "未带安全帽",
          value: 11.8,
        },
        {
          name: "环境杂乱 ",
          value: 18.8,
        }
      ],
      lineChart: null,
      label: {
        normal: {
          show: true,
          formatter: "{d|{d}%}\n{hr|}\n{b|{b}}",
          rich: {
            b: {
              fontSize: 14,
              color: "rgba(255,255,255,0.8)",
              align: "center",
              padding: 8,
            },
            hr: {
              borderColor: "#91D6FF",
              width: "100%",
              borderWidth: 0.5,
              height: 0,
            },
            d: {
              fontSize: 18,
              color: "#fff",
              align: "center",
              padding: 6,
              fontFamily: "zhonghei",
            },
          },
          position: "outside",
        },
        emphasis: {
          show: true,
        },
      },
      label1: {
        normal: {
          show: true,
          formatter: "{d|{d}%}\n{hr|}\n{b|{b}}",
          rich: {
            b: {
              fontSize: 8,
              color: "#72A6E8",
              align: "center",
              padding: 3,
            },
            hr: {
              borderColor: "#91D6FF",
              width: "100%",
              borderWidth: 1,
              height: 0,
            },
            d: {
              fontSize: 12,
              color: "#fff",
              align: "center",
              padding: 2,
              fontFamily: "zhonghei",
            },
          },
          position: "outside",
        },
        emphasis: {
          show: true,
        },
      },
    };
  },
  props: {},
  mounted() {
    this.init();
    window.addEventListener("resize", () => {
      if (this.lineChart) {
        if (document.body.clientWidth < 1400) {
          this.options.series[0].label = this.label1;
        } else {
          this.options.series[0].label = this.label;
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
      if (document.body.clientWidth < 1400) {
        this.options.series[0].label = this.label1;
      } else {
        this.options.series[0].label = this.label;
      }
      this.options.series[0].data = this.data;
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
@import "../../assets/css/mixin";
.barchart {
  width: 100%;
  height: 100%;
}
</style>
