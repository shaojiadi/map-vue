<template>
<!-- 区域安防指数 -->
  <div class="security-box">
    <div class="box-left">
      <h4 class="box-title">区域安防指数</h4>
      <p class="box-content"><span>9.2</span>分</p>
    </div>
    <ul class="box-right">
      <li>监控覆盖率<span class="box-num">94</span> <span class="box-unit">%</span></li>
      <li>布控面积<span class="box-num">860</span> <span class="box-unit">k㎡</span></li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      yellowWidth: 0,
    };
  },
  mounted() {
    
  },
  methods: {},
};
</script>
<style scoped lang="scss">
  @import '../../assets/css/mixin';
  .security-box{
    display: flex;
    margin-bottom: .16rem;

    .box-left {
      width: 1.92rem;
      height: 1.1rem;
      padding: .14rem .25rem;
      background: url("../../../static/lanwan/security-left.png") no-repeat;
      background-size: 100% 100%;
      .box-title {
        font-size: .18rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: #7AF4FD;
      }

      .box-content {
        font-size: .16rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba($color: #fff, $alpha: 0.4);
        text-align: center;
        line-height: .66rem;
        span {
          font-size: .24rem;
          font-family: AliHYAiHei;
          font-weight: bold;
          color: #FFFFFF;
          margin-right: .1rem;
        }
      }
    }

    .box-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      li {
        width: 2.62rem;
        height: .51rem;
        background: url("../../../static/lanwan/security-right.png") no-repeat;
        background-size: 100% 100%;
        font-size: .18rem;
        padding: .16rem .19rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: #7AF4FD;

        .box-num {
          font-size: .2rem;
          font-family: AliHYAiHei;
          font-weight: bold;
          color: #FFFFFF;
          margin-left: .12rem;
        }

        .box-unit {
          font-size: .16rem;
          font-family: PingFang SC;
          font-weight: bold;
          color: rgba($color: #fff, $alpha: 0.4);
        }
      }
    }
  }
</style>