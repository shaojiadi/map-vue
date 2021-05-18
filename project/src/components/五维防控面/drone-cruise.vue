<template>
<!-- 无人机巡航 -->
    <div class="box-offside">
      <v-wrj-right-top></v-wrj-right-top>
      <div class="accident-analyze">
        <h4 class="box-headline">高频事故影响因素分析五维图</h4>
        <v-accident-radar-chart class="accident-chart"></v-accident-radar-chart>
      </div>
    </div>
</template>


<script>
import accidentRadarChart from '../lanwan/accident-radar-chart.vue';//高频事故影响因素分析五维图
import wrjRightTop from '../lanwan/wrj-right-top.vue'
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
    'v-accident-radar-chart': accidentRadarChart,
    'v-wrj-right-top': wrjRightTop
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

    .accident-analyze {
      margin-top: .14rem; 
      width: 4.59rem;
      height: 3rem;
      background: url("../../../static/lanwan/monitor-picture.png") no-repeat;
      background-size: 100% 100%;

      .accident-chart {
        width:100%;
        height:2.8rem;
      }
    }
</style>