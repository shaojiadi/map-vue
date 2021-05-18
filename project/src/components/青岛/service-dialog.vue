<template>
  <div class="pop-wrap flex-box">
    <div class="box4">
      <img
        class="closeBox"
        src="static/images/img/close.png"
        alt
        @click="$emit('close')"
      />
      <!-- <div class="pop-content diy-scroller"> -->
      <p class="title">园区介绍</p>

      <div class="img-container">
        <img :src="activeService.imgUrl" alt class="garden-img" />
        <!-- <img src="/static/bounced-img/detail.png" alt=""> -->
        <p class="toMore" @click="$router.push('/index')" v-if="activeService.imgUrl == '../../static/images/img2.png'">
          <span>查看详情</span>
        </p>
      </div>

      <div class="p-show" v-html="activeService.info"></div>

      <!-- </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name:'serviceDialog',
  data() {
    
    return {
      // imgList: [
      //   {
      //     imgUrl: "../../static/ztkjy/bigPlace1.jpg",
      //     label: "食堂",
      //   },
      //   {
      //     imgUrl: "../../static/ztkjy/bigPlace2.jpg",
      //     label: "健身房",
      //   },
      //   {
      //     imgUrl: "../../static/ztkjy/bigPlace3.jpg",
      //     label: "篮球场",
      //   },
      // ],
      tableData: [
        {
          name: "倪勤华",
          academicDegree: "本科",
          job: "园区主任",
          workYear: "8年",
          haveCertificate: "是",
        },
        {
          name: "张海艇",
          academicDegree: "硕士",
          job: "园区副主任",
          workYear: "4年",
          haveCertificate: "是",
        },
        {
          name: "居忆悦",
          academicDegree: "本科",
          job: "办公室主任",
          workYear: "1年",
          haveCertificate: "是",
        },
        {
          name: "陈卫东",
          academicDegree: "本科",
          job: "办公室副主任",
          workYear: "8年",
          haveCertificate: "是",
        },
        {
          name: "朱惠明",
          academicDegree: "高中",
          job: "办公室",
          workYear: "7年",
          haveCertificate: "否",
        },
        {
          name: "刘灵",
          academicDegree: "大专",
          job: "办公室",
          workYear: "5年",
          haveCertificate: "是",
        },
        {
          name: "侯卫琴",
          academicDegree: "硕士",
          job: "招商局局长",
          workYear: "5年",
          haveCertificate: "是",
        },
        {
          name: "钱忠伟",
          academicDegree: "本科",
          job: "招商局副局长",
          workYear: "5年",
          haveCertificate: "是",
        },
        {
          name: "江浙沪",
          academicDegree: "本科",
          job: "招商局",
          workYear: "7年",
          haveCertificate: "是",
        },
        {
          name: "费亚萍",
          academicDegree: " 大专",
          job: " 服务部部长",
          workYear: "7年",
          haveCertificate: "是",
        },
        {
          name: "高程",
          academicDegree: " 大专",
          job: " 服务部",
          workYear: "4年",
          haveCertificate: "是",
        },
        {
          name: "陆宏鑫",
          academicDegree: " 大专",
          job: " 服务部",
          workYear: "4年",
          haveCertificate: "否",
        },
      ],
    };
  },
  props: ["activeService"],
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/mixin";

.title {
  font-size: 0.24rem;
  font-family: PingFang SC;
  font-weight: bold;
  color: #ffffff;
}
.pop-wrap {
  position: absolute;
  @include wh(100%, 100%);
  z-index: 9999;
  .box4 {
    position: absolute;
    @include wh(10.47rem, 8.8rem);
    background-image: url("http://hznth-screen.zhihuipk.com/static/img/enterBg.a17bacb.png");
    background-repeat: no-repeat;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0.65rem;
  }
}

.pop-wrap {
  .box4 {
    width: 11.96rem;
    height: 6.8rem;
    background-size: 100% 100%;
    padding: 0.6rem;

    .closeBox {
      position: absolute;
      top: 0.58rem;
      right: 0.6rem;
      width: 0.34rem;
      height: 0.35rem;
      cursor: pointer;
      z-index: 100;
    }
    .img-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 0.33rem;
      .toMore {
          margin-top: .2rem;
          cursor: pointer;
        width: 1.5rem;
        height: 0.6rem;
        @include bis("/static/bounced-img/detail.png");
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          position: relative;
          top: -0.05rem;
          left: .05rem;
          font-size: 0.18rem;
          font-family: PingFang SC;
          font-weight: bold;
          color: #ffffff;
        }
      }
    }

    .garden-img {
      width: 5.7rem;
      height: 3.4rem;
    }

    .p-show {
      flex: 1;
      color: #b0e0f4;
      text-indent: 0.3rem;
      font-size: 0.17rem;
      font-family: PingFang SC;
      font-weight: bold;
      line-height: 0.26rem;
      p{
         text-indent: 0.3rem;
      }
    }
  }
}
</style>
