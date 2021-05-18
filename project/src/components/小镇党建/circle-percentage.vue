<template>
  <div class="g-clrclebox">
    <div class="g-nowcir" ref="cicles"></div>
    <img class="g-centerimg" :src="giftImageUrl" alt="">
<!--    ../../static/images/type2.png-->
  </div>
</template>
<script>
  let echarts = require('echarts');
  export default {
    data() {
      return {
        options: {
          series: [
            {
            name: 'pie1',
            type: 'pie',
            clockWise: true,
            radius: ['50%', '50%'],
            center: ['50%', '50%'],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false,
            data: [{
              value: this.percentage,
              name: 'completed',
              itemStyle: {
                normal: {
                  borderWidth: 4,
                  borderColor: {
                    colorStops: [{
                      offset: 0,
                      color: '#00f7fb' // 0% 处的颜色
                    }, {
                      offset: 1,
                      color: '#00b3f2' // 100% 处的颜色
                    }]
                  },
                  color: { // 完成的圆环的颜色
                    colorStops: [{
                      offset: 0,
                      color: '#00f7fb' // 0% 处的颜色
                    }, {
                      offset: 1,
                      color: '#00b3f2' // 100% 处的颜色
                    }]
                  },
                  shadowColor: '#3dd4de',
                  shadowBlur: 10,
                  label: {
                    show: false
                  },
                  labelLine: {
                    show: false
                  }
                }
              }
            },
              {
              name: 'gap',
              value: 100 - this.percentage,
              itemStyle: {
                normal: {
                  label: {
                    show: false
                  },
                  labelLine: {
                    show: false
                  },
                  color: 'rgba(0, 0, 0, 0)',
                  borderColor: 'rgba(255,255,255,0.5)',
                  borderWidth: 0
                }
              }
            },
            ]
          },
            {
              name: '外边框',
              type: 'pie',
              hoverAnimation: false, //鼠标移入变大
              center: ['50%', '50%'],
              radius: ['52%', '52%'],
              label: {
                normal: {
                  show: false
                }
              },
              // data: [{
              //   value: 20,
              //   name: '',
              //   itemStyle: {
              //     normal: {
              //       borderWidth: 1,
              //       borderColor: 'rgba(255,255,255,0.5)'
              //     }
              //   }
              // }]
              data: [{
                value: this.percentage,
                name: 'completed',
                itemStyle: {
                  normal: {
                    borderWidth: 1,
                    borderColor: {
                      colorStops: [{
                        offset: 0,
                        color: '#00f7fb' // 0% 处的颜色
                      }, {
                        offset: 1,
                        color: '#00b3f2' // 100% 处的颜色
                      }]
                    },
                    color: { // 完成的圆环的颜色
                      colorStops: [{
                        offset: 0,
                        color: '#00f7fb' // 0% 处的颜色
                      }, {
                        offset: 1,
                        color: '#00b3f2' // 100% 处的颜色
                      }]
                    },
                    shadowColor: '#3dd4de',
                    shadowBlur: 10,
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  }
                }
              },
                {
                  name: 'gap',
                  value: 100 - this.percentage,
                  itemStyle: {
                    normal: {
                      label: {
                        show: false
                      },
                      labelLine: {
                        show: false
                      },
                      color: 'rgba(0, 0, 0, 0)',
                      borderColor: 'rgba(255,255,255,0.5)',
                      borderWidth: 1
                    }
                  }
                },
              ]
            },
          ]
        },
        lineChart: null
      }
    },
    props: {
     value: {
       type: Number,
       default: 20
     },
      percentage: {
        type: Number,
        default: 20
      },
      giftImageUrl: {
        type: String,
        default: ''
      }
    },
    methods: {
      init(){
        let chartDom = this.$refs['cicles'];
        this.lineChart = echarts.init(chartDom);
        this.lineChart.setOption(this.options);
      }
    },
    beforeDestroy() {
      if (this.lineChart) {
        this.lineChart.clear();
        this.lineChart = null
      }
    },
    watch: {

    },
    mounted() {
      this.init();
      window.addEventListener('resize', () => {
        if (this.lineChart) {
          this.lineChart.resize();
        }
      });
    }
  }
</script>
<style scoped lang="scss">
  @import "../../assets/css/mixin";
  .g-clrclebox{
    position: relative;
    width:.88rem;
    height:.88rem;
  }
  .g-nowcir{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -.8rem;
    margin-left: -.8rem;
    width:1.6rem;
    height:1.6rem;
  }
  .g-centerimg{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -.24rem;
    margin-left: -.22rem;
    width:.48rem;
    height:.48rem;
  }
</style>

