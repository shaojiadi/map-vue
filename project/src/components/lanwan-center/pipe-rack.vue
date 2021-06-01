<template>
<!-- 入侵告警 地下管廊段 -->
  <div class="pop-box">
    <div class="box-tit">
      <h4>地下管廊3-2段</h4>
      <!-- <p @click="$emit('intoPage',type)">进入管廊>></p> -->
      <p @click="into">进入管廊>></p>
    </div>
    <div class="box-con">
      <div class="box-img">
        <img src="../../../static/lanwan/rick-img.png" alt="">
      </div>
      <ul class="box-ul">
        <li>管廊长度：<span>97米</span></li>
        <li>横断面尺寸：<span>3立方米</span></li>
        <li>监理单位：<span>青岛土地规划局</span></li>
        <li>监测传感器：<span>27个</span></li>
        <li>管廊负责人：<span>王君南</span></li>
        <li>管廊安全评级：<span>A</span></li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    type: {
      type: Number
    }
  },
  data() {
    return {
      
    };
  },
  mounted() {
    
  },
  destroyed() {
    
  },
  methods: {
    into(){
      this.map.clearInfoWindow();
      this.$store.state.guanLangValue = 1
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/mixin";
.pop-box {
  width: 3.5rem;
  // height: 2.08rem;
  background-color: rgba($color: #0A2339, $alpha: 0.7);
  position: absolute;
  left: 30%;
  top: 40%;
  padding: 0 .15rem .1rem;
  pointer-events: auto;//不可操作地图，可操作按钮
}

.box-tit {
  height: .4rem;
  width: 100%;
  display: flex;
  line-height: .4rem;
  border-bottom: 1px solid rgba($color: #fff, $alpha: 0.3);

  h4 {
    font-size: .16rem;
    font-family: PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    margin-right: .24rem;
  }

  p {
    font-size: .16rem;
    font-family: PingFang SC;
    font-weight: 500;
    color: #7AF4FD;
    cursor: pointer;
  }
}

.box-con {
  display: flex;
  margin-top: .18rem;

  .box-img {
    flex-shrink: 0;
    width: 1.06rem;
    height: 1.06rem;
    margin-right: .16rem;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .box-ul {
    li {
      font-size: .12rem;
      font-family: PingFang SC;
      font-weight: 500;
      color: #FFFFFF;
      padding-left: .1rem;
      margin-bottom: .06rem;
      position: relative;
      span {
        font-size: .12rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: #7AF4FD;
      }

      &::before {
        content: "";
        display: inline-block;
        width: .06rem;
        height: .06rem;
        border-radius: 50%;
        background-color: #7AF4FD;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translate(0,-50%);
      }
    }
  }
}

</style>
