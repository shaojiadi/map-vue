<template>
  <div class="pop-box">
    <div class="box-tit">
      <h4>企业详情</h4>
      <img @click.stop="close" src="../../../static/lanwan/detail-close.png" alt="">
    </div>
    <ul class="box-con">
      <li>
        <span class="blue-color">企业名称：</span>
        <p>青岛艾尔兄弟科技有限公司</p>
      </li>
      <li>
        <span class="blue-color">风险隐患：</span>
        <p></p>
      </li>
      <li>
        <span>风险分布：</span>
        <p><span class="blue-num">全部6个</span><span class="blue-num">重大0个</span><span class="blue-num">较大1个</span><span class="blue-num">一般1个</span><span class="blue-num">低风险4个</span></p>
      </li>
      <li>
        <span>隐患分布：</span>
        <p><span class="blue-num">全部6个</span><span class="blue-num">重大0个</span><span class="blue-num">一般1个</span></p>
      </li>
      <li>
        <span>视频总数：</span>
        <p><span class="blue-num">全部0个</span></p>
      </li>
      <li>
        <span>本周点检率：</span>
        <p>应点检19个，已点检16个，点检率84%</p>
      </li>
      <li>
        <span>本周整改率：</span>
        <p>应整改19个，已整改16个，点整改100%</p>
      </li>
      <li>
        <span>本周检出率：</span>
        <p>100%</p>
      </li>
      <li>
        <span>本周检出率：</span>
        <p>100%</p>
      </li>
      <li>
        <span>最后隐患排查日期：</span>
        <p>2020-09-27</p>
      </li>
      <li>
        <span>最后隐患检出日期：</span>
        <p>2020-09-24</p>
      </li>
      <li>
        <span>企业安全生产健康码：</span>
        <p>94分</p>
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
  width: 4.68rem;
  height: 6.43rem;
  background: url("/static/bounced-img/big-jk-bg.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  left: 50%;
  top: 30%;
  padding: 0 .5rem;
  pointer-events: auto;//不可操作地图，可操作按钮
}

.box-tit {
  h4 {
    font-size: .24rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: #FFFFFF;
    padding: .31rem 0 .21rem 0;
  }
  img {
    width: .44rem;
    height: .44rem;
    position: absolute;
    right: .46rem;
    top: .28rem;
    cursor: pointer;
  }
}

.box-con {
  li {
    display: flex;
    margin-bottom: .1rem;
    span, p {
      font-size: .18rem;
      font-family: PingFang SC;
      font-weight: bold;
      color: #FFFFFF;
    }
    span {
      flex-shrink: 0;
    }
    p {
      line-height: .26rem;
    }

    .blue-color {
      color: #7AF4FD;
    }

    .blue-num {
      display: inline-block;
      border-bottom: 1px solid #7AF4FD;
      color: #7AF4FD;
      margin-right: .16rem;
      margin-bottom: .05rem;
    }
  }
}


</style>
