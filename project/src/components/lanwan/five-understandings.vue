<template>
<!-- 一标五识别 -->
<div>
  <ul class="regional-box">
    <li class="regional-item">
      <div class="item-left item-bg">
        <h4 class="">实有单位</h4>
        <p><v-countup
          tag="span"
          class="font-count"
          :end-value="12"
          :duration="1"
          :decimals='0'
        ></v-countup>家</p>
      </div>
      <div class="item-right item-bg">
        <h4 class="">实有房屋27户</h4>
        <p><v-countup
          tag="span"
          class="font-count"
          :end-value="27"
          :duration="1"
          :decimals='0'
        ></v-countup>户</p>
      </div>
    </li>
    <li class="regional-item">
      <div class="item-left item-bg">
        <h4 class="">实有人口</h4>
        <p><v-countup
          tag="span"
          class="font-count"
          :end-value="2827"
          :duration="1"
          :decimals='0'
        ></v-countup>人</p>
      </div>
      <div class="item-right item-bg">
        <h4 class="">企业总数</h4>
        <p><v-countup
          tag="span"
          class="font-count"
          :end-value="73"
          :duration="1"
          :decimals='0'
        ></v-countup>家</p>
      </div>
    </li>
  </ul>
  <div class="five-under">
    <p class="base-title" style="margin-bottom:.2rem">区域人口分析</p>
    <div class="d1">
      <p class="dec">常住人口</p>
      <div class="bar" :style="{width:`${(info.number1/77*2.33).toFixed(2)}`+'rem'}"></div>
      <p class="dec">{{info.number1}}万人(82.7%)</p>
    </div>
    <div class="d1" style="margin:.1rem 0 .2rem 0">
      <p class="dec">流动人口</p>
      <div class="bar" :style="{width:`${(info.number2/77*2.33).toFixed(2)}`+'rem'}"></div>
      <p class="dec">{{info.number2}}万人(17.3%)</p>
    </div>
     <!--  <div class="d2">
        <div class="d3"></div>
      </div> -->
    <div class="flex-box" style="width:100%">
      <v-pie style="margin-right:.3rem" title="人口就业率" class="d2" :type="1"></v-pie>
      <v-pie style="margin-right:.3rem"  title="人口老龄化" class="d2" :type="2"></v-pie>
      <v-pie  title="贫困人口率" class="d2" :type="3"></v-pie>
    </div>
  </div>
  <div class="five-under">
    <p class="base-title">人口变化监测分析</p>
    <v-four-line-chart2></v-four-line-chart2>
  </div>
</div>
</template>


<script>
import pie from './pie.vue'
import fourLinechart2 from './four-line-chart2.vue'
export default {
  data() {
    return {
      info:{
        number1: 64,
        number2: 22.95
      }
    };
  },
  mounted() {
    
  },
  methods: {},
  components: {
    'v-pie': pie,
    'v-four-line-chart2':fourLinechart2,
  }
};
</script>
<style scoped lang="scss">
  @import '../../assets/css/mixin';
  .regional-box {
    width: 4.6rem;
    .regional-item {
      width: 100%;
      height: .8rem;
      display: flex;
      justify-content: space-between;
      .item-left,.item-right {
        width: 2.22rem;
        height: .8rem;
        padding: .1rem .2rem;

        h4 {
          font-size: .18rem;
          font-family: PingFang SC;
          font-weight: bold;
          color: #7AF4FD;
        }

        p {
          font-size: .16rem;
          font-family: PingFang SC;
          font-weight: bold;
          color: rgba($color: #fff, $alpha: 0.4);
          line-height: .4rem;

          .font-count {
            font-size: .24rem;
            font-family: AliHYAiHei;
            font-weight: bold;
            color: #FFFFFF;
            margin-right: .08rem;
          }
        }
      }
    }

    .item-bg {
      background: url("../../../static/lanwan/box-wide.png") no-repeat;
      background-size: 100% 100%;
    }
  }

  .five-under {
    @include bis('../../../static/lanwan/operation-bg.png');
    width: 4.59rem;
    height: 3.03rem;
    margin-top: .2rem;
    padding: .23rem;
    .d1 {
      width: 100%;
      overflow: hidden;
      align-items: center;
      display: flex;
      .dec {
        font-size: 0.14rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
      }
      .bar {
        height: 0.16rem;
        background: linear-gradient(90deg, #0090FF 0%, #00BAFF 100%);
        margin: 0 .05rem;
      }
    }
  /*   .d2 {
      width: 1rem;
      height: 1rem;
      background: conic-gradient(#7AF4FD 89.1/100*360deg, rgba(0,0,0,.2) 90deg);
      border-radius: 50%;
      position: relative;
      .d3 {
        position: absolute;
        top: 9.5%;
        left: 9.5%;
        width: .8rem;
        height: .8rem;
        background: #103657;
        // border: 1px solid #2ab0f2;
        border-radius: 50%;
      } 
    } */

    .d2 {
      width: 1rem;
      height: 1rem
    }
  }
</style>