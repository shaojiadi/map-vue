<template>
<!-- 五维防控面-地下管廊-管廊分布 -->
<div>
  <div class="invasion-box">
    <div class="d1">
      <span class="p-title">当前安全等级：</span>
      <span class="p-des">高</span>
    </div>
    <div class="d1" style="background:none">
      <span class="p-title">当前防控预案：</span>
      <span class="p-des">一级预案</span>
    </div>
    <div class="d1" style="height:1rem">
      <p class="p-title">当前防控预案：</p>
      <p class="p-des" style="margin-left:.27rem">当前管廊内一氧化碳浓度过高，存在一定安全隐患，请及时关注；</p>
    </div>
  </div>
  <div class="access-pipeline">
    <p class="base-title">入廊管线建设情况</p>
    <v-four-line-chart></v-four-line-chart>
  </div>
  <div class="access-pipeline">
    <p class="base-title">管廊告警设备统计</p>
    <v-bar-chart></v-bar-chart>
  </div>
</div>
</template>


<script>
import fourLinechart from '../lanwan/four-line-chart.vue'
import barChart from '../lanwan/bar-chart.vue'

export default {
  data() {
    return {
      
    };
  },
  mounted() {
    
  },
  methods: {},
  components: {
    'v-four-line-chart':fourLinechart,
    'v-bar-chart': barChart,
  }
};
</script>
<style scoped lang="scss">
  @import '../../assets/css/mixin';
  .invasion-box{
    width: 4.59rem;
    height: 2.33rem;
    @include bis('../../../static/lanwan/pipe-bg.png');
    padding: .32rem .21rem .32rem .28rem;
    .d1 {
      width: 100%;
      height: .34rem;
      line-height: .34rem;
      background: rgba(122, 244, 253, .15);
      p,span {
        font-size: 0.16rem;
        font-family: PingFang SC;
        font-weight: bold;
      }
    }
     .p-title {
      color: #FFFFFF;
      margin-left: .27rem;
    }
    .p-des {
      color: rgba(122, 244, 253, 1);
    }
  }

  .access-pipeline {
    width: 4.59rem;
    height: 2.78rem;
    @include bis('../../../static/lanwan/pipeline-bg.png');
    padding: .23rem .21rem;
    margin-top: .14rem;
  }
</style>