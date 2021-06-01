<template>
<!-- 气体监测-易燃气体告警 -->
  <div class="pop-box">
    <div class="box-tit">
      <h4>易燃气体告警</h4>
      <p @click="$emit('closeDailog')">消除</p>
    </div>
    <ul class="box-con">
      <li>
        <h4>告警事件：</h4>
        <p>CO浓度超过10ppm</p>
      </li>
      <li>
        <h4>告警时间：</h4>
        <p>2021-03-20 12:56:25</p>
      </li>
      <li>
        <h4>告警区域：</h4>
        <p>管廊西侧控制台</p>
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
    
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/mixin";
.pop-box {
  width: 4.67rem;
  height: 2.5rem;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  h4 {
    font-size: .18rem;
    font-weight: bold;
    color: #FFFFFF;
    font-family: PingFang SC;
    padding: .23rem 0 .17rem 0;
  }
  p {
    width: .63rem;
    height: .25rem;
    line-height: .25rem;
    text-align: center;
    background: url("../../../static/lanwan/red-box.png") no-repeat;
    background-size: 100% 100%;
    font-size: .14rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: #FFFFFF;
    cursor: pointer;
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
