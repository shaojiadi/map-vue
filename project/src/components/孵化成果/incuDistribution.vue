<template>
  <div class="g-distypebox">
    <div class="g-distypebox-item">
      <img src="../../assets/image/img-type1.png" alt="">
      <p>纺织服装业</p>
    </div>
    <div class="g-distypebox-item">
      <img src="../../assets/image/img-type2.png" alt="">
      <p>塑料制品</p>
    </div>
    <div class="g-distypebox-item">
      <img src="../../assets/image/img-type5.png" alt="">
      <p>其他</p>
    </div>
    <div class="g-distypebox-item" style="margin-left: .56rem">
      <img src="../../assets/image/img-type4.png" alt="">
      <p>医疗制造业</p>
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
  .g-distypebox{
    padding-top: .23rem;
    margin-left: -.1rem;
    margin-right: -.1rem;
    display: flex;
    flex-wrap: wrap;
    & div:first-child{
      margin-left: .4rem;
    }
    & div:nth-child(2){
      margin-left: .5rem;
    }
    & div:nth-child(3){
      margin-left: 1.1rem;
    }
  }
  .g-distypebox-item{
    margin-bottom: .09rem;
    // margin-right: .6rem;
    img{
      display: block;
      width: .92rem;
      height: .92rem;
    }
    p{
      text-align: center;
      font-size:.12rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(255,255,255,1);
      line-height:1;
      opacity:0.8;
    }
  }
</style>
