<template>
<!-- 移动监测 监控点位 -->
  <div class="pop-box">
    <div class="box-tit">
      <h4>监控点位名称</h4>
      <img @click.stop="close" src="../../../static/lanwan/red-close.png" alt="">
    </div>
    <div class="box-img">
      <img src="../../../static/lanwan/buhuo.png" alt="">
    </div>
    <!-- 异常点位 -->
    <ul class="box-con" v-if="true">
      <li>
        <h4>检测地点：</h4>
        <p>二期室外</p>
      </li>
      <li>
        <h4>告警时间：</h4>
        <p>2021-05-03  21:26:07</p>
      </li>
      <li>
        <h4>告警原因：</h4>
        <p>不明物体频繁移动</p>
      </li>
    </ul>
    <!-- 正常点位 -->
    <ul class="box-con" v-else>
      <li>
        <h4>设备详细地址：</h4>
        <p>二期室外</p>
      </li>
      <li>
        <h4>设备识别编码：</h4>
        <p>05232526562</p>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  data() {
    return {
      
    };
  },
  props:["info"],
  mounted() {
    
  },
  destroyed() {
    
  },
  methods: {
    close(){
      // this.$emit("closeDailog",this.info);
      this.map.clearInfoWindow();
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/mixin";
.pop-box {
  width: 4.01rem;
  // height: 3.81rem;
  background: url("../../../static/lanwan/abnormal-point.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  pointer-events: auto;//不可操作地图，可操作按钮
  left: 48%;
  top: 50%;
  padding: 0 .24rem;
  z-index: 20;
}

.box-tit {
  h4 {
    font-size: .18rem;
    font-weight: bold;
    color: #FFFFFF;
    font-family: PingFang SC;
    padding: .33rem 0 0.15rem 0;
  }
  img {
    width: .2rem;
    height: .2rem;
    position: absolute;
    right: .23rem;
    top: .23rem;
    cursor: pointer;
  }
}

.box-img {
  width: 3.52rem;
  height: 1.98rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.box-con {
  padding-bottom: .4rem;
  li {
    display: flex;
    line-height: .24rem;
    // margin-top: .1rem;
    h4, p {
      font-size: .14rem;
      font-family: Adobe Heiti Std;
      font-weight: bold;
      color: #FFFFFF;
    }
    h4 {
      flex-shrink: 0;
    }
  }
}


</style>
