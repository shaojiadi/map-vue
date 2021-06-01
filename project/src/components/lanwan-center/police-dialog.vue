<template>
  <div class="pop-wrap flex-box">
    <div class="box4">
      <img class="closeBox" src="static/lanwan/close_icon.png" alt @click.stop="close" />
      <div class="pop-content diy-scroller">
        <header class="garden-item">
          <div class="img-container">
            <img :src="activeService.imgUrl" alt class="garden-img" />
          </div>
          <div class="title-container">
            <span class="name">{{activeService.name}}</span>
            <!-- <div class="company-info" v-html="activeService.subTitle"></div> -->
          </div>
          <p class="p-show">{{activeService.info}}</p>
        </header>

        <template>
          <el-carousel :interval="4000" type="card" class="myCarousel">
            <el-carousel-item
              v-for="(item, index) in activeService.imgShowArr"
              :key="index"
              class="myCarousel-item"
            >
              <img :src="item" alt />
            </el-carousel-item>
          </el-carousel>
          <ul class="bottom-label">
            <li
              v-for="(item, index) in activeService.labelArr"
              :key="index"
              class="bottom-label-item"
              :class="activeService.labelArr.length >=4 ? 'bottom-label-item4' :''"
            >
              <!-- <div class="lable-title">{{item.label}}</div> -->
              <div class="lable-message">{{item.message}}</div>
            </li>
          </ul>
        </template>
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
  props: ["activeService","info"],
  methods: {
    close(){
      this.$emit("closeDailog",this.info);
      // this.map.clearInfoWindow();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/mixin";
@import "~@/assets/css/content";

.pop-wrap {
  pointer-events: auto;//不可操作地图，可操作按钮
  .box4 {
    width: 11.96rem;
    height: 6.8rem;
    background-size: 100% 100%;
    padding: 0.6rem;

    .closeBox {
      position: absolute;
      top: 0.18rem;
      right: 0.3rem;
      width: 0.34rem;
      height: 0.35rem;
      cursor: pointer;
      z-index: 100;
    }
    .name {
      font-size: 0.24rem;
    }
    .p-show {
      flex: 1;
      padding-left: 0.5rem;
      color: rgba(0, 251, 249, 1);
      font-size: 0.16rem;
      line-height: .24rem;
      font-weight: 400;
    }
    .myCarousel {
      margin: 0.2rem 0;
       /deep/ .el-carousel__container{
        height: 3rem;
            
        }
      .myCarousel-item {
        width: 6.28rem;
        height: 3.17rem;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
    .bottom-label {
      @include fj();
      // align-items: flex-start;
      justify-content: space-between;
      flex-direction: row;
      flex-wrap: wrap;

      border-top: 1px solid rgba(113, 191, 227, 1);
      padding-top: 0.2rem;
      // overflow: auto;
      // height: 1.4rem;
      .bottom-label-item {
        width: 25%;
        // flex: 1;
        .lable-title {
          color: rgba(81, 207, 254, 1);
          line-height: 0.3rem;
          font-size: 0.18rem;
          font-family: PingFang SC;
          font-weight: bold;
        }
        .lable-message {
          font-size: .18rem;
          font-family: PingFang SC;
          font-weight: bold;
          color: #EBFAFF;
          line-height: .36rem;
        }
      }
      .bottom-label-item4 {
        .lable-title {
          margin-right: 0.2rem;
        }
      }
    }
    .pop-content{
      height: 6rem;
      overflow: auto;
      padding-right: .1rem;
    }
  }
}
</style>
