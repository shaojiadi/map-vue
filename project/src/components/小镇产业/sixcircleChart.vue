<template>
  <div ref="linechart" class="barchart">
  </div>

</template>

<script>
  let echarts = require('echarts');
  export default {
    data() {
      let dataStyle = {
        normal: {
          label: {show:false},
          labelLine: {show:false},
        }
      };
      let placeHolderStyle = {
        normal : {
          color: 'rgba(0,0,0,0)',
          label: {show:false},
          labelLine: {show:false}
        },
        emphasis : {
          color: 'rgba(0,0,0,0)'
        }
      };
      return {
        options: {
          color: ['#54FEFE', '#213B7A','#0097EE', '#35CEBA','#3D4969'],
          tooltip : {
            show: false,
            formatter: "{b} :{d}%"
          },
          grid: {
            left: 0,
          },
          legend: {
            icon: 'circle',
            itemGap: 14,
            orient:'vertical',
            top: 20,
            right: '0',
            itemWidth: 13,
            itemHeight: 13,
            formatter: function (name) {
              return name;
            },
            textStyle:{
              color: '#fff',
              fontSize: '70%'
            },
            data:['纺织服装业：62.9%','塑料制品：16.6%','医疗制造业：3.7%','其他：16.6%']
          },
          series : [
            {
              name:'纺织服装业：62.9%',
              type:'pie',
              clockWise:false,
              radius : ['58%','66%'],
              center:['24%', '46%'],
              itemStyle : {
                normal: {
                  label: {show:false},
                  labelLine: {show:false},
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 0.5,
                    colorStops: [{
                      offset: 0, color: '#ffff00' // 0% 处的颜色
                    }, {
                      offset: 1, color: '#cfcf00' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                  }
                }
              },
              hoverAnimation: false,
              data:[
                {
                  value:300,
                  name:'医药'
                },
                {
                  value:50,
                  name:'invisible',
                  itemStyle : placeHolderStyle
                }

              ]
            },
            {
              name:'塑料制品：16.6%',
              type:'pie',
              clockWise:false,
              radius : ['50%', '58%'],
              center:['24%', '46%'],
              itemStyle : {
                normal: {
                  label: {show:false},
                  labelLine: {show:false},
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 0.5,
                    colorStops: [{
                      offset: 0, color: '#ff0000' // 0% 处的颜色
                    }, {
                      offset: 1, color: '#c30202' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                  }
                }
              },
              hoverAnimation: false,

              data:[
                {
                  value:150,
                  name:'针织'
                },
                {
                  value:60,
                  name:'invisible',
                  itemStyle : placeHolderStyle
                }
              ]
            },
            {
              name:'医疗制造业：3.7%',
              type:'pie',
              clockWise:false,
              hoverAnimation: false,
              radius : ['42%', "50%"],
              center:['24%', '46%'],
              itemStyle : {
                normal: {
                  label: {show:false},
                  labelLine: {show:false},
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 0.5,
                    colorStops: [{
                      offset: 0, color: '#ffa000' // 0% 处的颜色
                    }, {
                      offset: 1, color: '#c87d00' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                  }
                }
              },
              data:[
                {
                  value:80,
                  name:'机械'
                },
                {
                  value:50,
                  name:'invisible',
                  itemStyle : placeHolderStyle
                }
              ]
            },
            {
              name:'其他：16.6%',
              type:'pie',
              clockWise:false,
              hoverAnimation: false,
              radius : ["34%", '42%'],
              center:['24%', '46%'],
              itemStyle : dataStyle,

              data:[
                {
                  value:45,
                  name:'服装'
                },
                {
                  value:30,
                  name:'invisible',
                  itemStyle : placeHolderStyle
                }
              ]
            },
            // {
            //   name:'其它 占比5.13%',
            //   type:'pie',
            //   clockWise: false,
            //   hoverAnimation: false,
            //   radius : ['26%', '34%'],
            //   center:['24%', '46%'],
            //   itemStyle : dataStyle,
            //   data:[
            //     {
            //       value:30,
            //       name:'其它'
            //     },
            //     {
            //       value:30,
            //       name:'invisible',
            //       itemStyle : placeHolderStyle
            //     }
            //   ]
            // },
          ]
        },
        lineChart: null,
        legend: {
          icon: 'circle',
          itemGap:12,
          orient:'vertical',
          top: '10%',
          right: '2',
          itemWidth: 6,
          itemHeight: 6,
          formatter: function (name) {
            return name;
          },
          textStyle:{
            color: '#fff',
            fontSize: '80%'
          },
          data:['纺织服装业：62.9%','塑料制品：16.6%','医疗制造业：3.7%','其他：16.6%']
        },
        legend1: {
          icon: 'circle',
          itemGap: 14,
          orient:'vertical',
          top: 20,
          right: 30,
          itemWidth: 13,
          itemHeight: 13,
          formatter: function (name) {
            return name;
          },
          textStyle:{
            color: '#fff',
            fontSize: '70%'
          },
          data:['纺织服装业：62.9%','塑料制品：16.6%','医疗制造业：3.7%','其他：16.6%']
        },
      }
    },
    props: {
    },
    mounted() {
      this.init();
      window.addEventListener('resize', () => {
        if (this.lineChart) {
          //this.lineChart.resize();
          // console.log(document.body.clientWidth)
          // this.lineChart.clear();
          // this.init()
          if (document.body.clientWidth < 1400) {
            this.options.legend = this.legend
          } else {
            this.options.legend = this.legend1
          }
          this.lineChart.setOption(this.options);
          this.lineChart.resize();
        }
      });
    },
    components: {},
    computed: {

    },
    methods: {
      init(){
        if (document.body.clientWidth < 1400) {
          this.options.legend = this.legend
        } else {
          this.options.legend = this.legend1
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

    }
  }
</script>

<style scoped lang="scss">
  @import '../../assets/css/mixin';
  .barchart{
    width: 3.8rem;
    height: 2.61rem;
  }
</style>
