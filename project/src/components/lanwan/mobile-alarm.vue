<template>
<!-- 移动告警 -->
  <div class="alarm-box">
    <div class="box-left">
      <div class="box-item">
        <p class="alarm-num"><span>10</span>次</p>
        <p class="alarm-title">安防风险</p>
      </div>
      <div class="box-item">
        <p class="alarm-num"><span>10</span>次</p>
        <p class="alarm-title">资产风险</p>
      </div>
    </div>
    <div class="box-center">
      <p class="alarm-num">10</p>
      <p class="alarm-title">移动告警</p>
    </div>
    <div class="box-right">
      <div class="box-item">
        <p class="alarm-num"><span>10</span>次</p>
        <p class="alarm-title">安防风险</p>
      </div>
      <div class="box-item">
        <p class="alarm-num"><span>10</span>次</p>
        <p class="alarm-title">资产风险</p>
      </div>
    </div>
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
  .alarm-box {
    width: 4.56rem;
    height: 1.98rem;
    background: url("../../../static/lanwan/mobile-alarm.png") no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    position: relative;

    .alarm-num {
      font-size: .16rem;
      font-family: PingFang SC;
      font-weight: bold;
      text-align: center;
      span {
        font-size: .24rem;
        font-family: AliHYAiHei;
        font-weight: bold;
        color: #FFFFFF;
      }
    }

    .alarm-title {
      font-size: .14rem;
      font-family: PingFang SC;
      font-weight: bold;
      color: #7AF4FD;
      text-align: center;
    }

    .box-left,.box-right {
      width: 50%;
      height: 100%;

      .box-item {
        height: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }

    .box-center {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      .alarm-num {
        font-size: .18rem;
        font-family: AliHYAiHei;
        font-weight: bold;
        color: #FFFFFF;
      }
      .alarm-title {
        font-size: .14rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: #7AF4FD;
      }
    }
  }
</style>