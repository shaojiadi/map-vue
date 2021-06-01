<template>
  <div class="pop-box">
    <div class="box-tit">
      <img @click.stop="close" src="../../../static/lanwan/pop-close.png" alt="">
    </div>
    <div class="box-con">
      <img src="../../../static/lanwan/hospital.png" alt="">
      <div class="box-info">
        <h4 class="info-title">青岛市第三人民医院</h4>
        <p class="info-con">是青岛市卫生计生委直属的三级综合性医院，可集中收治新型冠状病毒肺炎疫情者，集中专家27位，床位1025张，医疗资源配备齐全。</p>
        <p class="info-notice">本院已开设发热门诊</p>
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
  width: 5.61rem;
  height: 2.20rem;
  background: url("../../../static/lanwan/current-water.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  left: 45%;
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
  align-items: center;
  height: 2rem;

  img {
    flex-shrink: 0;
    width: 1.8rem;
    height: 1.3rem;
    background: #00283C;
    border: 1px solid #00DEFF;
    margin-right: .15rem;
  }

  .box-info {
    
    .info-title {
      font-size: .18rem;
      font-family: RTWS ShangGothic G0v1;
      font-weight: bold;
      color: #FFFFFF;
      padding-bottom: .2rem;
    }

    .info-con {
      font-size: .14rem;
      font-family: RTWS ShangGothic G0v1;
      font-weight: bold;
      color: #FFFFFF;
      line-height: .2rem;
    }

    .info-notice {
      font-size: .14rem;
      font-family: RTWS ShangGothic G0v1;
      font-weight: bold;
      color: #FF8795;
      padding-top: .2rem;
    }
  }
}


</style>
