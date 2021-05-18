<template>
  <div style="width:100%;height:100%">
    <div ref="linechart" class="barchart"></div>
    <div style="display:flex;flex-wrap:wrap;margin-left:.3rem">
      <div v-for="(item,index) in qList" :key="index" class="area-item">
        <div :style="{background:`${item.color}`}" style="width:.28rem;height:.12rem;opacity:.4"></div>
        <p class="content">{{item.title}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  let echarts = require('echarts');
  export default {
    data() {
      return {
        qList: [
          {
            color: 'linear-gradient(180deg, #94E225 0%, #3EFFAB 100%)',
            title: '高危人员'
          },
          {
            color: 'linear-gradient(180deg, #94E225 0%, #3EFFAB 100%)',
            title: '安全生产'
          },
          {
            color: 'linear-gradient(180deg, #94E225 0%, #3EFFAB 100%)',
            title: '公共卫生'
          },
          {
            color: 'linear-gradient(0deg, #54FEFE 0%, #3EA6FF 100%)',
            title: '危险边坡'
          },
          {
            color: 'linear-gradient(0deg, #54FEFE 0%, #3EA6FF 100%)',
            title: '自然灾害'
          },
          {
            color: 'linear-gradient(0deg, #54FEFE 0%, #3EA6FF 100%)',
            title: '治安安全'
          }
        ],
        lineChart: null,
        options: {
          grid: {
            top: '18%',
            left: '8%',
            right: '3%',
            bottom: '18%',
            // containLabel: true
          },
         /*  legend: {
              data: ['长安', '潘桥', '未央', '雁塔', '莲湖','碑林','新城','扈邑','临潼','阎良']
          },  */
          xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisLine: { //坐标轴轴线相关设置。数学上的x轴
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255,.4)',
              },
            },
            axisLabel: { //坐标轴刻度标签的相关设置
              color: '#fff',
            /*   textStyle: {
                color: 'rgba(0,0,0)',
                margin: 14,
                fontSize: '70%',
              }, */
            },
            axisTick: {        //刻度
              show: false,
            },
            data: ['长安', '潘桥', '未央', '雁塔', '莲湖','碑林','新城','扈邑','临潼','阎良'],
          }],
          yAxis: [{
            nameGap: 15,   //坐标轴名称与轴线之间的距离
            type: 'value',
            min: 0,
            splitNumber: 4,
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255,.2)',
                widh: 1,
                type: 'solid'
              }
            },
            axisLine: {  
              show: false,   
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: 'rgba(255,255,255,0.8)',
              },
            },
            textStyle: {
              color: '#d1e6eb',
            },
            axisTick: {
              show: false,
            },
          }],
          series: [
            {
              type: 'bar',
              animation: false,
              barWidth: '30%',    //柱状图宽度
              hoverAnimation: false,
              data: [120, 132, 101, 180, 215, 174,101,140,176,250],
              tooltip: {
                show: false
              },
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: '#00EAFF'
                  }, {
                      offset: 1,
                      color: '#0096EF'
                  }]),
                  label: {
                    show: true, //开启显示
									  position: 'top', //数据在上方显示
                    textStyle: { //数值样式
                      color: 'white',
                      fontSize: 11
                    }
                  }
                }
              },
            },
        /*     {
              name: '背景',
              type: 'bar',
              barWidth: '30%',
              barGap: '-100%',
              data: [250, 250, 250, 250, 250, 250],
              itemStyle: {
                normal: {
                  color: 'rgba(255,255,255,0.1)'
                }
              },
              zlevel: 9
            }, */
          ],
          textStyle: {
            color: '#fff'
          }
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
      list: {
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
    height: 2rem;
  }

  .area-item {
    display: flex;
    align-items: center;
    margin: 0 .4rem .1rem 0;
    .content {
      margin-left: .1rem;
      font-size: 0.12rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
    }
  }

</style>
