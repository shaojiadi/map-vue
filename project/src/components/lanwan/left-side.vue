<template>
  <div>
    <div class="area-bg">
      <p class="title">片区安全指数分布</p>
      <v-area-safe-bar-chart></v-area-safe-bar-chart>
    </div>
    <div class="area-bg" style="margin-top:.1rem">
      <!-- <p class="title">区域告警处理统计</p> -->
      <h4 class="g-situations-tit week">
        区域安防统计分析
        <div class="week-rt">
          本周统计
          <img src="/static/bounced-img/data/down.png" alt="" />
        </div>
      </h4>
      <div class="area-title">
        <p class="blue" style="margin-right: 0.5rem">消警次数</p>
        <p class="yellow">告警次数</p>
      </div>
      <v-areaElectricity></v-areaElectricity>
    </div>
  </div>
</template>

<script>
import areaSafeBarChart from './area-safe-bar-chart.vue'
  export default {
    name: '',
    data() {
      return {
        
      }
    },
    components: {
      'v-area-safe-bar-chart': areaSafeBarChart,
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/css/mixin';
  .area-bg {
    @include  bis('../../../static/bounced-img/area-bg.png');
    @include wh(4.59rem,3.28rem );
    padding: .24rem .21rem;
    .title {
      font-size: 0.18rem;
      font-family: RTWS ShangGothic G0v1;
      font-weight: 400;
      color: #FEFEFE;
    }
  }


   .area-title {
    display: flex;
    justify-content: flex-end;
    margin: 0.23rem 0 .1rem 0;

  p {
    font-size: 0.16rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;

    position: relative;
    &::before {
      content: "";
      width: 0.08rem;
      height: 0.02rem;
      position: absolute;
      bottom: 50%;
      left: -35%;
    }
    &.blue::before {
      background: linear-gradient(90deg, #54fefe 0%, #3ea6ff 100%);
    }
    &.yellow::before {
      background: linear-gradient(90deg, #fff77c 0%, #ff952d 100%);
    }
  }
}


.g-situations-tit {
  font-size: 0.18rem;
  font-family: PingFang SC;
  font-weight: 400;
  color: #FEFEFE;;
  &.week {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .week-rt {
      width: 1.04rem;
      height: 0.25rem;
      border: 1px solid rgba(255, 255, 255, 0.4);
      color: white;
      padding: 0 0.05rem;
      @include fjqd(space-between);
      img {
        width: 0.08rem;
        height: 0.06rem;
      }
    }
  }
}
</style>