<template>
  <div class="g-scrollbox" :style="`height: ${this.height}rem`">
    <div class="g-scrollbox-cont" :style="`height: ${this.height}rem`" ref="tables" @scroll.stop="getScroll">
      <ul class="g-simodel" ref="showul">
        <li v-for="(item, index) in data" :key="index">
          <div class="g-model-img"><img :src="item.imgUrl" alt=""></div>
          <div style="width:2rem;">
            <h4 class="ellipsis g-model-tit">{{item.title}}</h4>
            <p class="ellipsis4 g-model-cont">{{item.cont}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div v-show="height1 <= height2" class="g-huakuai" ref="bars" :style="`top: ${upjuli}px`" @mousedown.stop="getStart" @mouseup.stop="getEnd" @mouseout.stop="getEnd"></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        upjuli: 0,
        isIn: false,
        currentTop: '',
        clientY: '',

        height1: '',
        height2: '',
      }
    },
    props: {
      height: {
        type: Number,
        default: 3.41
      },
      data:{
        type: Array,
        default: []
      }
    },
    mounted() {
      //console.log(this.height)
      this.$nextTick(()=> {
        this.height1 = this.$refs.tables.getBoundingClientRect().height;
        this.height2 = this.$refs.showul.getBoundingClientRect().height;
      })

    },
    components: {},
    computed: {

    },
    methods: {
      getScroll(e){
        if (this.isIn) {
          return
        }
        let a = this.$refs.tables.getBoundingClientRect();
        let b = this.$refs.bars.getBoundingClientRect();
        this.upjuli = a.height * (e.target.scrollTop / (e.target.scrollHeight - e.target.offsetHeight))
        this.upjuli = this.upjuli - b.height > 0 ? this.upjuli - b.height : 0
      },
      getStart(e){
        this.isIn = true
        let event = e || window.e;
        event.preventDefault();
        this.currentTop = this.$refs.bars.offsetTop;
        this.clientY = event.clientY;
        this.$refs.bars.onmousemove = (e) => {
          this.getMove(e)
        }
      },
      getMove(e){
        if (!this.isIn) {
          return
        }
        let event = e || window.e;
        event.preventDefault();
        let nowY = event.clientY;
        let targetnum =  nowY - this.clientY + this.currentTop;
        let a =  this.$refs.tables.getBoundingClientRect();
        let b = this.$refs.bars.getBoundingClientRect();
        targetnum = targetnum < 0 ? 0 : targetnum;
        targetnum = targetnum > a.height - b.height  ? a.height - b.height : targetnum;
        this.$refs.tables.scrollTop = (this.$refs.showul.getBoundingClientRect().height - a.height) * targetnum / (a.height-b.height);
        this.upjuli = targetnum;
      },
      getEnd(e){
        this.isIn = false;
        this.$refs.bars.onmousemove = null
      },
    },
    beforeDestroy() {

    },
    watch: {

    }
  }
</script>

<style scoped lang="scss">
  @import '../assets/css/mixin';
  .g-scrollbox{
    position: relative;
    margin-top: .2rem;
    height: 3.41rem;
    border-right: 1px solid rgba(255,255,255,0.4);
    .g-huakuai{
      position: absolute;
      top: 50%;
      right: -2px;
      width:3px;
      height:.12rem;
      cursor: pointer;
      background:rgba(255,255,255,1);
      transition: all 0.001s;
    }
  }
  .g-scrollbox-cont{
    height: 3.41rem;
    overflow: auto;
    -webkit-mask: -webkit-gradient(linear, center 86%, center bottom, from(#000), to(transparent));
    /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
    &::-webkit-scrollbar {
      width: 0px;
      height: 0px;
      background-color: rgba(255,255,255,.2);
    }
    /*定义滑块 内阴影+圆角*/
    &::-webkit-scrollbar-thumb {
      width: 0.03rem !important;
      height: .12rem !important;
      background: #fff;
      border: 0;
      opacity: 1;
    }
  }
  .g-simodel{
    li{
      display: flex;
      margin-bottom: .2rem;
      padding-right: .15rem;
      &:last-child{
        margin-bottom: 0;
      }
      height: 1.08rem;
    }
    .g-model-img{
      flex: none;
      width: 1.62rem;
      height: 1.08rem;
      padding: 1px;
      margin-right: .14rem;
      background: url("../assets/image/imgbox.png") no-repeat;
      background-size: 100% 100%;
      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        background-color: #0ab0dc;
      }
    }
    .g-model-tit{
      position: relative;
      font-size:.12rem;
      font-family:PingFang SC;
      font-weight:500;
      color:rgba(255,255,255,1);
      padding-left: .06rem;
      line-height: 1;
      margin-bottom: .16rem;
      &:before{
        position: absolute;
        content: '';
        left: 0;
        top: -.01rem;
        width:.02rem;
        height:.13rem;
        background:linear-gradient(180deg,rgba(84,254,254,1) 0%,rgba(62,166,255,1) 100%);
      }
    }
    .g-model-cont{
      font-size:.12rem;
      font-family:PingFang SC;
      font-weight:400;
      color:rgba(255,255,255,1);
      line-height:.18rem;
      opacity:0.6;
      text-indent: 2em;
    }
  }
</style>
