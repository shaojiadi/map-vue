<template>
<!-- 安防监控 中空 -->
  <div class="box-offside">
    <v-security-index></v-security-index>
    <v-high-risk-phenomenon></v-high-risk-phenomenon>
    <div class="monitor-swiper">
      <h4 class="swiper-title">重点区域监控画面</h4>
      <div class="swiper-content">
        <v-monitoring-swiper :imgList="imgList"></v-monitoring-swiper>
      </div>
    </div>
  </div>
</template>


<script>
import securityIndex from '../lanwan/security-index.vue';//移动监测画面
import highRiskPhenomenon from '../lanwan/high-risk-phenomenon.vue';//区域安防指数
import monitoringSwiper from '../lanwan/monitoring-swiper.vue';//监控轮播
export default {
  data() {
    return {
      number1:9.3,
      number2:9.3,
      number3:9.3,
      imgList: [
        {
          imgUrl: "../../../static/lanwan/guanjian-1.jpg",
        },
        {
          imgUrl: "../../../static/lanwan/video-img22.jpg",
        },
        {
          imgUrl: "../../../static/lanwan/video-img33.jpg",
        },
        {
          imgUrl: "../../../static/lanwan/video-img22.jpg",
        },
      ],
    };
  },
  mounted() {
    
  },
  methods: {},
  components: {
    'v-high-risk-phenomenon': highRiskPhenomenon,
    'v-security-index': securityIndex,
    'v-monitoring-swiper': monitoringSwiper
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

    .monitor-swiper {
      width: 4.5rem;
      height: 3.6rem;
      background: url("../../../static/lanwan/monitor-swiper-bg.png") no-repeat;
      background-size: 100% 100%;
      padding: .16rem .23rem;

      .swiper-title {
        font-size: .18rem;
        font-family: RTWS ShangGothic G0v1;
        font-weight: 400;
        color: #FEFEFE;
      }
    }
</style>