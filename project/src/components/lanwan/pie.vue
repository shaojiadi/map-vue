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
          text: '89.1',
          left: 'center',
          top: 'center',
          textStyle: {
            color: '#FFF10B',
            fontSize: 20
          }
        },
        tooltip: {
          show: false
        },
        color:['#7AF4FD','rgba(0,0,0,.2)'],
        series: [
            {
                name: '人口就业率',
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
                data: [
                   89,11
                ]
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
      bgList: {
        type: Array,
        default() {
          return []
        }
      },
      title:　{
        type: String,
        default: ''
      },
      type: {
        type: Number
      }
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
        if(this.type==1){
          this.options.color[0]='#7AF4FD';
          this.options.series[0].data = [89,11];
          this.options.title.text = '89.1'
        }else if(this.type==2){
          this.options.color[0]='#FDAB7A';
          this.options.series[0].data = [13,87];
          this.options.title.text = '13.1%'
        }else{
          this.options.color[0]='#7ABBFD';
          this.options.series[0].data = [15,85];
          this.options.title.text = '15.7%'
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
     /*  list: {
        handler() {
          this.init()
        },
        deep: true
      } */
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