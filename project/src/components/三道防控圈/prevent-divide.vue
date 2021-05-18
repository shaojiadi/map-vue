<template>
<!-- 防控圈划分 -->
    <ul class="box-offside">
      <li class="box-bg divide-box">
        <h4 class="box-headline">环高新区周界防控圈</h4>
        <div class="percent-content">
          <v-pie-percent class="percent-charts" title="区域安防指数" :num="number1"></v-pie-percent>
          <ul class="info-list">
            <li>进出高新区陆路通道和海岸线海路通道的圈层</li>
            <li>总面积约167万平米</li>
          </ul>
        </div>
      </li>
      <li class="box-bg divide-box">
        <h4 class="box-headline">环核心区防控圈</h4>
        <div class="percent-content">
          <v-pie-percent class="percent-charts" title="区域安防指数" :num="number2"></v-pie-percent>
          <ul class="info-list">
            <li>进出高新区陆路通道和海岸线海路通道的圈层</li>
            <li>总面积约167万平米</li>
          </ul>
        </div>
      </li>
      <li class="box-bg divide-box">
        <h4 class="box-headline">环中心区防控圈</h4>
        <div class="percent-content">
          <v-pie-percent class="percent-charts" title="区域安防指数" :num="number3"></v-pie-percent>
          <ul class="info-list">
            <li>进出高新区陆路通道和海岸线海路通道的圈层</li>
            <li>总面积约167万平米</li>
          </ul>
        </div>
      </li>
    </ul>
</template>


<script>
import piePercent from '../lanwan/pie-percent.vue'
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
    'v-pie-percent': piePercent,
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
    .divide-box {
      margin-bottom: .14rem;
    }
    .percent-charts {
      width: 1.2rem;
      height: 1rem;
    }
    .percent-content {
      height: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .info-list {
        
        li {
          width: 2.6rem;
          font-size: .16rem;
          font-family: PingFang SC;
          font-weight: 400;
          color: #FEFEFE;
          line-height: .24rem;
          padding: 0 0.14rem;
          position: relative;
          margin-bottom: .12rem;
          &::before {
            content: "";
            display: inline-block;
            position: absolute;
            left: 0;
            top: 0.08rem;
            width: 0.08rem;
            height: 0.08rem;
            background-color: #3EE09D;
            border-radius: 50%;
          }
        }
      }
    }
</style>