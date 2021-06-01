<template>
  <div class="pop-box">
    <div class="box-tit">
      <h4>当前水系：红岛河套7号水系</h4>
      <img @click.stop="close" src="../../../static/lanwan/pop-close.png" alt="">
    </div>
    <div class="box-con">
      <img src="" alt="">
      <ul class="box-ul">
        <li>水系历程：27公里</li>
        <li>水域面积：63平方千米</li>
        <li>分系支流：7条</li>
        <li>水域面积：63平方千米</li>
        <li>监理单位：青岛土地规划局</li>
        <li>水质评级：优</li>
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
  height: 2.86rem;
  background: url("../../../static/lanwan/current-water.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  padding: 0 .25rem;
  pointer-events: auto;//不可操作地图，可操作按钮
}

.box-tit {
  h4 {
    font-size: .18rem;
    font-family: Adobe Heiti Std;
    font-weight: bold;
    color: #FFFFFF;
    padding: .23rem 0 .17rem 0;
    border-bottom: 1px solid #00F6FF;
  }
  img {
    width: .14rem;
    height: .14rem;
    position: absolute;
    right: .23rem;
    top: .23rem;
    cursor: pointer;
  }
}

.box-con {
  display: flex;
  margin-top: .15rem;

  img {
    flex-shrink: 0;
    width: 1.3rem;
    height: 1.3rem;
    background: #00283C;
    border: 1px solid #00DEFF;
    margin-right: .15rem;
  }

  .box-ul {
    height: 1.8rem;
    overflow: auto;
    li {
      font-size: .14rem;
      font-family: PingFang SC;
      font-weight: bold;
      color: #00F6FF;
      margin-bottom: .1rem;
    }
  }
}


</style>
