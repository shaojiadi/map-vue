<template>
  <div>
    <div ref="linechart" class="barchart"></div>
    <p class="p1">{{title}}</p>
  </div>
</template>

<script>
  let echarts = require('echarts');
  export default {
    data() {
      return {
        lineChart: null,
        options: {
          tooltip: {
          trigger: 'item'
        },
        title: {
          text: 9.3,
          left: 'center',
          top: 'center',
          textStyle: {
            color: '#FFF10B',
            fontSize: 14
          }
        },
        tooltip: {
          show: false
        },
        color:['#3EE09D','rgba(62,224,157,.2)'],
        series: [
            {
                name: '',
                type: 'pie',
                radius: ['80%', '100%'],
                avoidLabelOverlap: false,
                label: {
                  show: false,
                  position: 'center'
                },
            
                labelLine: {
                  show: false
                },
                hoverAnimation: false,
                data: [0,100]
            },
             
          ]
        },
      }
    },
    props: {
      list: {
        type: Array,
        default() {
          return []
        }
      },
      title:　{
        type: String,
        default: ''
      },
      num:　{
        type: Number,
        default: ''
      },
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
    computed: {},
    methods: {
      init() {
        if(this.num){
          this.options.title.text = this.num;
          this.options.series[0].data = [this.num*10,100-this.num*10];
        }

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
      num: {
        handler() {
          this.init()
        },
        deep: true
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../../assets/css/mixin';

  .barchart {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .p1 {
    font-size: 0.14rem;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(122, 244, 253, .8);
    text-align: center;
    margin-top: .1rem;
  }
</style>