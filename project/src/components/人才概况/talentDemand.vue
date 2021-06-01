<template>
  <div class="g-talentbox">
    <div class="g-tabel-header">
      <p class="p1">职位</p>
      <p class="p2">人数</p>
      <p class="p3">学历</p>
      <p class="p4">比率</p>
    </div>
<!--    <ul class="g-table-cont">-->
<!--      <li v-for="(item, index) in 20" :key="index">-->
<!--        <div class="g-cont-item p1">-->
<!--          <p class="ellipsis">JAVA研发工程师</p>-->
<!--        </div>-->
<!--        <div class="p2 g-cont-item">-->
<!--          <img class="g-pnumimg" src="../../assets/image/numimg.png" alt="">-->
<!--          <p>48人</p>-->
<!--        </div>-->
<!--        <div class="p3 g-cont-item">-->
<!--          <img class="g-plearnimg" src="../../assets/image/learnimg.png" alt="">-->
<!--          <p>本科</p>-->
<!--        </div>-->
<!--        <div class="p4 g-cont-item">-->
<!--          <img v-if="index % 2 === 0" class="g-rankimg" src="../../assets/image/img-up.png" alt="">-->
<!--          <img v-else class="g-rankimg" src="../../assets/image/img-down.png" alt="">-->
<!--        </div>-->
<!--      </li>-->
<!--    </ul>-->
    <div class="g-zuiwaibox">
      <div class="g-tablebox" ref="tables" @scroll.stop="getScroll">
        <ul class="g-table-cont" ref="showul">
          <li v-for="(item, index) in list" :key="index">
            <div class="g-cont-item p1">
              <p class="ellipsis">{{item.name}}</p>
            </div>
            <div class="p2 g-cont-item">
              <img class="g-pnumimg" src="../../assets/image/numimg.png" alt="">
              <p>{{item.num}}</p>
            </div>
            <div class="p3 g-cont-item">
              <img class="g-plearnimg" src="../../assets/image/learnimg.png" alt="">
              <p>{{item.education}}</p>
            </div>
            <div class="p4 g-cont-item">
              <img v-if="item.up" class="g-rankimg" src="../../assets/image/img-up.png" alt="">
              <img v-else-if="item.balance" class="g-ranking" src="../../assets/image/img-balance.png" alt="">
              <img v-else class="g-rankimg" src="../../assets/image/img-down.png" alt="">
            </div>
          </li>
        </ul>
      </div>
      <div class="g-huakuai" ref="bars" :style="`top: ${upjuli}px`" @mousedown.stop="getStart" @mouseup.stop="getEnd" @mouseout.stop="getEnd"></div>
    </div>

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
        list:[{
          name:'厂长',
          num:'47人',
          education:'本科',
          up:true,
          balance:false
        },{
          name:'总工',
          num:'64人',
          education:'本科',
          up:false,
          balance:true
        },{
          name:'高级工程师',
          num:'76人',
          education:'本科',
          up:false,
          balance:true
        },{
          name:'研发工程师',
          num:'128人',
          education:'本科',
          up:true,
          balance:false
        },{
          name:'生产主管',
          num:'113人',
          education:'专科',
          up:false,
          balance:false
        },{
          name:'高级技师',
          num:'105人',
          education:'专科',
          up:false,
          balance:false
        },
        {
          name:'检测分析师',
          num:'172人',
          education:'专科',
          up:false,
          balance:false
        },
        {
          name:'电商经理',
          num:'189人',
          education:'专科',
          up:true,
          balance:false
        },
        {
          name:'新媒体运营',
          num:'216人',
          education:'专科',
          up:true,
          balance:false
        },
        ]
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
  @import '../../assets/css/mixin';
  .g-talentbox{
    width: 3.8rem;
  }
  .g-tabel-header{
    display: flex;
    padding: .23rem .18rem .12rem .01rem;
    p{
      font-size:.14rem;
      font-family:PingFang SC;
      font-weight:500;
      color:rgba(255,255,255,1);
      opacity:0.8;
      line-height: 1;
      text-align: center;
    }
  }
  .p1{
    width: 1.28rem;
  }
  .p2{
    width: .83rem;
  }
  .p3{
    width: .69rem;
  }
  .p4{
    width: .79rem;
  }
  .g-zuiwaibox{
    position: relative;
    width: 100%;
    height: 4.52rem;
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
  .g-tablebox{
    position: relative;
    width: 100%;
    height: 4.52rem;
    overflow-x: visible;
    overflow-y: auto;
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
  .g-table-cont{
    position: relative;
    padding-right: .18rem;
    /*width: 100%;*/
    /*height: 4.52rem;*/
    overflow-x: visible;
    overflow-y: auto;
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
    li{
      display: flex;
      width:100%;
      height:.42rem;
      border:1px solid rgba(255,255,255,.2);
      border-radius:.04rem;
      margin-bottom: .09rem;
      &:last-child{
        margin-bottom: 0;
      }
    }
    .g-cont-item{
      display: flex;
      justify-content: center;
      align-items: center;
      .g-pnumimg{
        width: .13rem;
        height: .12rem;
        margin-right: .08rem;
      }
      .g-plearnimg{
        width: .14rem;
        height: .12rem;
        margin-right: .05rem;
      }
      .g-rankimg{
        width: .12rem;
        height: .12rem;
      }
      p{
        font-size:.14rem;
        font-family:PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,1);
      }
    }
  }
</style>
