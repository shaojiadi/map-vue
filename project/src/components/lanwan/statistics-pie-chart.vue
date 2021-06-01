<template>
  <div ref="linechart" class="barchart"></div>
</template>

<script>
let echarts = require("echarts");
export default {
  data() {
    return {
      options: {
        color:["#20FEC7","#FD4762","#10ADFB","#96A5AE"],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: 30,
          top: 10,
          data: ['汽车', '无人机', '动物', '其他'],
          textStyle: {
            color: "#7AF4FD",
          },
          itemWidth: 12,//图标宽
          itemHeight: 12,//图标高
          // itemGap: 13,//间距
        },
        graphic: [{ //环形图中间添加文字
            type: 'text', //通过不同top值可以设置上下显示
            left: '32%',
            top: '45%',
            style: {
                text: '移动物体'+'\n'+'监测统计',
                textAlign: 'center',
                fill: '#7AF4FD', //文字的颜色
                fontSize: 14,
                fontFamily: "PingFang SC"
            }
        }],
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ["40%", "50%"],    //图标位置
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: []
          }
        ]
      },
      data: [
        {
          name: "汽车",
          value: 10,
        },
     
        {
          name: "无人机",
          value: 20,
        },
    
        {
          name: "动物",
          value: 20,
        },
           {
          name: "其他",
          value: 5,
        }
      ],
      lineChart: null,
    };
  },
  props: {},
  mounted() {
    this.init();
    window.addEventListener("resize", () => {
      if (this.lineChart) {
        this.lineChart.setOption(this.options);
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
