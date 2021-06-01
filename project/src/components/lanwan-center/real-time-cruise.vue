<template>
  <div class="pop-box">
    <div class="box-tit">
      <h4>无人机实时巡航</h4>
      <div class="box-img-tit">
        <p>A区电力巡检点001</p>
        <p>实时轨迹</p>
      </div>
      <img @click.stop="close" src="../../../static/lanwan/pop-close.png" alt="">
    </div>
    <div class="box-con">
      <ul class="box-img">
        <li>
          <img src="../../../static/lanwan/video-img.jpg" alt="">
        </li>
        <li>
          <img src="../../../static/lanwan/video-img.jpg" alt="">
        </li>
      </ul>
      <ul class="box-ul">
        <li>
          <h4>操作人</h4>
          <p>吴丹丹</p>
        </li>
        <li>
          <h4>设备编号</h4>
          <p>NO.212221</p>
        </li>
        <li>
          <h4>巡航时长</h4>
          <p>0.5 h</p>
        </li>
        <li>
          <h4>巡航里程</h4>
          <p>3.2 km</p>
        </li>
        <li v-if="hasProblem">
          <h4>上报问题</h4>
          <p>0 个</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      
    };
  },
  props:["hasProblem","info"],
  mounted() {
    
  },
  destroyed() {
    
  },
  methods: {
    close(){
      this.map.clearInfoWindow();
      // this.$emit("closeDailog",this.info);
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/mixin";
.pop-box {
  width: 5.21rem;
  height: 3.81rem;
  background: url("../../../static/lanwan/current-water.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  left: 48%;
  top: 40%;
  padding: 0 .25rem;
  pointer-events: auto;//不可操作地图，可操作按钮
  z-index: 100;
}

.box-tit {
  h4 {
    font-size: .18rem;
    font-family: Adobe Heiti Std;
    font-weight: bold;
    color: #7AF4FD;
    padding: .35rem 0 .05rem 0;
  }
  p {
    font-size: .16rem;
    font-family: PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
  }
  img {
    width: .14rem;
    height: .14rem;
    position: absolute;
    right: .23rem;
    top: .23rem;
    cursor: pointer;
  }

  .box-img-tit {
    display: flex;
    justify-content: space-between;

    p {
      width: 2.3rem;
    }
  }
}

.box-con {
  margin-top: .12rem;

  .box-img {
    display: flex;
    justify-content: space-between;

    li {
      width: 2.3rem;
      height: 1.52rem;
      border: 1px solid #0a82cd;
      border-radius: .06rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: .06rem;
        object-fit: cover;
      }
    }
  }
}

.box-ul {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  margin-top: .15rem;
  li {
    h4 {
      font-size: .14rem;
      font-family: PingFang SC;
      font-weight: 500;
      color: #7AF4FD;
      line-height: .34rem;
    }
    p {
      font-size: .16rem;
      font-family: PingFang SC;
      font-weight: 500;
      color: #FFFFFF;
    }
  }
}


</style>
