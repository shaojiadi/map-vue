<template>
  <div class="g-incubationbox">
    <div class="g-incubationbox-item">
      <p class="g-pname">规上企业</p>
      <div class="g-incubationbox-nums">
        <p class="g-pnums"><span>62</span>家</p>
      </div>
    </div>
    <div class="g-incubationbox-item">
      <p class="g-pname">小升规后备企业</p>
      <div class="g-incubationbox-nums">
        <p class="g-pnums"><span>15</span>家</p>
      </div>
    </div>
    <div class="g-incubationbox-item">
      <p class="g-pname" style="margin-right: -.14rem">科技型企业</p>
      <div class="g-incubationbox-nums">
        <p class="g-pnums"><span>45</span>家</p>
      </div>
    </div>
    <div class="g-incubationbox-item">
      <p class="g-pname">国家高新技术企业</p>
      <div class="g-incubationbox-nums">
        <p class="g-pnums"><span>8</span>家</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    props: {
    },
    mounted() {
    },
    components: {},
    computed: {

    },
    methods: {
    },
    beforeDestroy() {

    },
    watch: {

    }
  }
</script>

<style scoped lang="scss">
  @import '../../assets/css/mixin';
  .g-incubationbox{
    padding-top: .31rem;
    display: flex;
    margin-left: -.09rem;
  }
  .g-incubationbox-item{
    margin-right: .08rem;
    &:last-child{
      margin-right: 0;
    }
    .g-pname{
      text-align: center;
      font-size:.12rem;
      font-family:PingFang SC;
      font-weight:400;
      color:rgba(255,255,255,1);
      opacity:0.8;
      line-height: 1;
      margin-bottom: .06rem;
      word-wrap: normal;
    }
    .g-incubationbox-nums{
      width: .89rem;
      height: .89rem;
      background: url("../../assets/image/img-circlebg.png") no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .g-pnums{
        font-size:.12rem;
        font-family:PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,0.8);
        span{
          font-size:.3rem;
          font-family:alterbatebold;
          font-weight:bold;
          color:rgba(255,255,255,1);
        }
      }
    }
  }
</style>
