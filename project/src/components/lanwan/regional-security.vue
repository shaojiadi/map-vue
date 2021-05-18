<template>
<!-- 区域安防指数 -->
  <ul class="regional-box">
    <li class="regional-item regional-bg">
      <div class="item-left ">
        <h4 class="">区域安防指数</h4>
        <p><v-countup
          tag="span"
          class="font-count"
          :end-value="9.2"
          :duration="1"
          :decimals='1'
        ></v-countup>分</p>
      </div>
      <div class="item-right">
        <h4 class="">环比变化</h4>
        <p><v-countup
          tag="span"
          class="font-count"
          :end-value="19"
          :duration="1"
          :decimals='0'
        ></v-countup>%</p>
      </div>
    </li>
    <li class="regional-item">
      <div class="item-left item-bg">
        <h4 class="">重点监控区域</h4>
        <p><v-countup
          tag="span"
          class="font-count"
          :end-value="7"
          :duration="1"
          :decimals='0'
        ></v-countup>个</p>
      </div>
      <div class="item-right item-bg">
        <h4 class="">设备在线率</h4>
        <p><v-countup
          tag="span"
          class="font-count"
          :end-value="100"
          :duration="1"
          :decimals='0'
        ></v-countup>%</p>
      </div>
    </li>
    <li class="regional-item">
      <div class="item-left item-bg">
        <h4 class="">监控覆盖率</h4>
        <p><v-countup
          tag="span"
          class="font-count"
          :end-value="94"
          :duration="1"
          :decimals='0'
        ></v-countup>分</p>
      </div>
      <div class="item-right item-bg">
        <h4 class="">布控面积</h4>
        <p><v-countup
          tag="span"
          class="font-count"
          :end-value="860"
          :duration="1"
          :decimals='0'
        ></v-countup>k㎡</p>
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      
    };
  },
  mounted() {
    
  },
  methods: {},
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

    .regional-bg {
      background: url("../../../static/lanwan/box-long.png") no-repeat;
      background-size: 100% 100%;
    }

    .item-bg {
      background: url("../../../static/lanwan/box-wide.png") no-repeat;
      background-size: 100% 100%;
    }
  }
</style>