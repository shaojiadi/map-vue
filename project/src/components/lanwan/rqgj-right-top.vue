<template>
  <!-- 五维防控-地下管廊-入侵告警 -->
  <div> 
    <div class="region-bg">
      <div>
        <span class="e-title">今日巡检完成度</span>
        <span class="e-rate">90%</span>
      </div>
      <ul class="flex-box" style="padding:0 1rem">
        <li>
          <span class="nums">27</span><span class="unit">个</span>
          <div class="describe">已完成:</div>
        </li>
        <li>
          <span class="nums">3</span><span class="unit">个</span>
          <div class="describe">待完成:</div>
        </li>
      </ul>
    </div>
    <div class="region-bg">
      <div>
        <span class="e-title">当前廊内人员</span>
        <span class="e-rate">73人%</span>
      </div>
      <ul class="flex-box"  style="padding:0 1rem">
        <li>
          <span class="nums">85</span><span class="unit">人</span>
          <div class="describe">累计进入:</div>
        </li>
        <li>
          <span class="nums">2</span><span class="unit">个</span>
          <div class="describe">异常人员</div>
        </li>
      </ul>
    </div>
  </div>
    
</template>


<script>
  export default {
    name: '',
    data() {
      return {
        equipmentList: [
          {
            title: '监测设备运行指数',
            rate: 90,

          }
        ]
      }
    }
  }
</script>

<style scoped lang="scss">
@import "../../assets/css/mixin";
  .region-bg {
    width: 4.59rem;
    height: 1.38rem;
    @include bis('../../../static/lanwan/equipment_item.png');
    padding: .18rem .2rem;
    .e-title {
      font-size: 0.18rem;
      font-family: RTWS ShangGothic G0v1;
      font-weight: 400;
      color: #FEFEFE;
      margin-right: .1rem;
    }
    .e-rate {
      font-size: 0.2rem;
      font-family: PingFang SC;
      font-weight: 500;
      color: #7AF4FD;
    }
    ul {
      padding: 0 .3rem;
      margin-top: .15rem;
      li {
        .nums {
          font-size: 0.24rem;
          font-family: AliHYAiHei;
          font-weight: bold;
          color: #FFFFFF;
          background: linear-gradient(6deg, #00C3D5 0%, #00FD83 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-right: .05rem;
        }
        .unit {
          font-size: 0.16rem;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(122, 244, 253, .5);
        }
        .describe {
          font-size: 0.16rem;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(122, 244, 253, .6);
          opacity: 0.6;
        }
      }
    }
  }
  

</style>