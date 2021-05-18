<template>
<!-- 五维防控面-水系-安全等级 -->
<div>
  <div class="invasion-box">
    <div class="d1">
      <span class="p-title">当前安全等级：</span>
      <span class="p-des">高</span>
    </div>
    <div class="d1" style="background:none">
      <span class="p-title">当前防控预案：</span>
      <span class="p-des">一级预案</span>
    </div>
    <div class="d1" style="height:auto;">
      <p class="p-title">当前防控预案：</p>
      <p class="p-des" style="margin-left:.27rem">加强中心层区水系防空，以及B级区域河道整改</p>
    </div>

    <ul class="safety-grade">
      <li class="grade-item" v-for="(item,index) in gradeList" :key="index">
        <img src="../../../static/lanwan/water-quality.png" alt="">
        <div class="item-content">
          <h4>{{item.title}}</h4>
          <p>{{item.content}}</p>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>


<script>

export default {
  data() {
    return {
      gradeList:[
        {
          title:"辖区海域",
          content:"今日无异常警告记录",
        },
        {
          title:"防潮坝",
          content:"捕获违停船只：2艘",
        },
        {
          title:"辖区海域",
          content:"今日无异常警告记录",
        },
      ]
    };
  },
  mounted() {
    
  },
  methods: {},
  components: {
    
  }
};
</script>
<style scoped lang="scss">
  @import '../../assets/css/mixin';
  .invasion-box {
    width: 4.59rem;
    height: 4.6rem;
    @include bis('../../../static/lanwan/pipe-bg.png');
    padding: .32rem .21rem .32rem .28rem;
    .d1 {
      width: 100%;
      height: .34rem;
      line-height: .34rem;
      background: rgba(122, 244, 253, .15);
      p,span {
        font-size: 0.16rem;
        font-family: PingFang SC;
        font-weight: bold;
      }
    }
     .p-title {
      color: #FFFFFF;
      margin-left: .27rem;
    }
    .p-des {
      color: rgba(122, 244, 253, 1);
    }
  }

  .safety-grade {
    margin-top: .1rem;
    .grade-item {
      height: .9rem;
      width: 100%;
      display: flex;
      align-items: center;

      img {
        width: .74rem;
        height: .74rem;
        margin-right: .18rem;
      }

      .item-content {
        h4 {
          font-size: .18rem;
          font-family: PingFang SC;
          font-weight: bold;
          color: #FFFFFF;
          line-height: .36rem;
        }
        p {
          font-size: .16rem;
          font-family: PingFang SC;
          font-weight: bold;
          color: #7AF4FD;
          line-height: .32rem;
        }
      }
    }
  }
</style>