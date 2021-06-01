<template>
<!-- 违规捕获 -->
  <div class="pop-box">
    <div class="box-tit">
      <h4>{{$attrs.title}}</h4>
      <img @click="close" src="../../../static/lanwan/red-close.png" alt="">
    </div>
    <div class="box-img">
      <img src="../../../static/lanwan/buhuo.png" alt="">
    </div>
    <ul class="box-con">
      <li>
        <h4>告警时间：</h4>
        <p>2020-11-22  11:12:35</p>
      </li>
      <li>
        <h4>预警区域：</h4>
        <p>北区A1</p>
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
  mounted() {
    
  },
  destroyed() {
    
  },
  methods: {
    close(){
      this.$emit("closeDailog");
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/mixin";
.pop-box {
  width: 5.17rem;
  height: 4rem;
  background: url("../../../static/lanwan/red-alarm.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  left: 48%;
  top: 50%;
  padding: .25rem .5rem 0 .57rem;
  z-index: 20;
  pointer-events: auto;//不可操作地图，可操作按钮
}

.box-tit {
  h4 {
    font-size: .18rem;
    font-weight: bold;
    color: #FFFFFF;
    font-family: PingFang SC;
    padding: .23rem 0 .17rem 0;
  }
  img {
    width: .2rem;
    height: .2rem;
    position: absolute;
    right: .33rem;
    top: .43rem;
    cursor: pointer;
  }
}

.box-img {
  width: 4rem;
  height: 2.02rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.box-con {
  li {
    display: flex;
    margin-top: .1rem;
    h4 {
      font-size: .18rem;
      font-family: PingFang SC;
      font-weight: bold;
      color: #E82C37;
    }
    p {
      color: #FFFFFF;
    }
  }
}


</style>
