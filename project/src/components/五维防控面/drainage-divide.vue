<template>
<!-- 安防监控 中空 -->
  <div class="box-offside">
    <v-water-area></v-water-area>
    <div class="water-quality">
      <h4 class="box-headline">水质评价指数变化情况</h4>
      <ul class="box-content">
        <li class="flex-box water-box">
          <p>A水系</p>
          <v-water-line-chart class="water-line-chart"></v-water-line-chart>
        </li>
        <li class="flex-box water-box">
          <p>B水系</p>
          <v-water-line-chart class="water-line-chart"></v-water-line-chart>
        </li>
        <li class="flex-box water-box">
          <p>C水系</p>
          <v-water-line-chart class="water-line-chart"></v-water-line-chart>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import waterArea from '../lanwan/water-area.vue';//安全等级
import waterLineChart from '../lanwan/water-line-chart.vue';//水质评价指数变化情况
export default {
  data() {
    return {
      number1:9.3,
      number2:9.3,
      number3:9.3,
    };
  },
  mounted() {
    
  },
  methods: {},
  components: {
    'v-water-area': waterArea,
    'v-water-line-chart': waterLineChart,
  }
};
</script>
<style scoped lang="scss">
  @import '../../assets/css/mixin';
    .box-offside {//外框
      width:100%;
      display:flex;
      flex-direction: column;
      align-items: flex-end;
    }
    .box-headline {//标题
      padding:.18rem 0 0 .26rem;
      font-size: .18rem;
      font-family: RTWS ShangGothic G0v1;
      font-weight: 400;
      color: #FEFEFE;
    }
    .box-bg {
      width: 4.59rem;
      height: 2.20rem;
      background: url("../../../static/lanwan/box-bg.png") no-repeat;
      background-size: 100% 100%;
    }

    .safety-index {
      margin-top: .14rem; 
      width: 4.59rem;
      height: 2.58rem;
      background: url("../../../static/lanwan/safety-index.png") no-repeat;
      background-size: 100% 100%;
    }

    .water-quality {
      margin-top: .14rem; 
      width: 4.59rem;
      height: 2.88rem;
      background: url("../../../static/lanwan/monitor-picture.png") no-repeat;
      background-size: 100% 100%;

      .water-box {
        padding: 0 .25rem;
        margin-bottom: .18rem;
        justify-content: flex-start;
        align-items: center;
        P {
          font-size: .16rem;
          font-family: PingFang SC;
          font-weight: 400;
          color: #FEFEFE;
        }
        .water-line-chart {
          width: 3.48rem;
          height: .6rem;
        }

        &:nth-of-type(1) {
          margin-top: .18rem;
        }
      }
      
    }
</style>