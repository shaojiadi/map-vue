<template>
<!-- 入侵告警 异常入侵告警 -->
  <div class="pop-box">
    <div class="box-con">
      <div class="box-img">
        <img src="../../../static/lanwan/phenomenon-img.png" alt="">
      </div>
      <div class="box-info">
        <h4 class="info-area">管廊3-2段001区</h4>
        <p class="info-name">{{info.name}}</p>
        <p class="info-enter" @click="into">进入管廊>></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  props:["info","type"],
  mounted() {
  },
  destroyed() {
    
  },
  methods: {
    close(){
      // this.$emit("closeDailog",this.info);
    },
    into(){
      this.map.clearInfoWindow();
      this.$store.state.guanLangValue = this.galleryType
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/mixin";
.pop-box {
  width: 3.2rem;
  height: 1.4rem;
  background: url("../../../static/lanwan/alarm-box.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  padding: 0 .15rem;
  pointer-events: auto;//不可操作地图，可操作按钮
}

.box-con {
  display: flex;
  margin-top: .22rem;
  height: 1.18rem;
  align-items: center;

  .box-img {
    flex-shrink: 0;
    width: .78rem;
    height: .78rem;
    margin-right: .15rem;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .box-info {
    .info-area {
      font-size: .18rem;
      font-family: PingFang SC;
      font-weight: bold;
      color: #E82C37;
    }

    .info-name {
      font-size: .24rem;
      font-family: PingFang SC;
      font-weight: bold;
      color: #FFFFFF;
      line-height: .4rem;
    }

    .info-enter {
      font-size: .16rem;
      font-family: PingFang SC;
      font-weight: bold;
      color: #E82C37;
      cursor: pointer;
    }
  }

}


</style>
