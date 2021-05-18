<template>
<!-- 监控轮播图 -->
  <div class="bottom-m">
    <div class="park-main-mid-content">
      <div class="park-main-mid-left">
        <img :src="activeImg" alt />
      </div>
      <div style="position:relative;margin-top: 0.14rem;">
        <swiper ref="mySwiper" :options="swiperOptions" class="swiper" :class="{'swiper-padding':imgList.length >= 3}">
          <swiper-slide v-for="(item,index) in imgList" class="swiper-item" :key="index">
            <img :src="item.imgUrl" @click="getScreenFloors(item,index)" alt />
          </swiper-slide>
        </swiper>
        <div class="swiper-button-prev" v-if="imgList.length >= 3" @click="swiperPrev"></div>
        <div class="swiper-button-next" v-if="imgList.length >= 3" @click="swiperNext"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["title", "imgList"],
  data() {
    return {
      swiperOptions: {
        el: ".swiper-pagination",
        // loop: true,
        // loopedSlides: 3, //looped slides should be the same
        spaceBetween: 10,
        // normalizeSlideIndex:false,
        // slidesPerGroup: 1,
        slidesPerView: 3,
        // centeredSlides: true,
        // observer: true, //修改swiper自己或子元素时，自动初始化swiper
        // observeParents: true, //修改swiper的父元素时，自动初始化swiper
        // centeredSlidesBounds: true,
        // slideToClickedSlide: true,
        // pagination: ".swiper-pagination"
        // prevButton: ".swiper-button-prev",
        // nextButton: ".swiper-button-next",
        // alert(this.activeIndex);
        // if (this.isEnd) {
        //   this.navigation.$nextEl.css("display", "none");
        // } else {
        //   this.navigation.$nextEl.css("display", "block");
        // }

        // nextEl: ".swiper-button-next",
        // prevEl: ".swiper-button-prev",
        // thumbs: {
        //   swiper: galleryThumbs,
        // },
        // Some Swiper option/callback...
      },
      activeImg: "",
    };
  },

  mounted() {
    // this.activeImg = this.$refs.mySwiper.activeIndex;
    this.activeImg = this.imgList[0].imgUrl;
  },
  methods: {
    swiperPrev() {
      this.$refs.mySwiper.swiper.slidePrev();
    },
    swiperNext() {
      this.$refs.mySwiper.swiper.slideNext();
    },

    getScreenFloors(item, index) {
      console.log(item);
      this.activeImg = item.imgUrl;
      //   this.activeIndex = index;
    },
    tabImg(val) {
      this.imgn = val.imgUrl;
    },
    timeout() {
      this.intervalHandel = setTimeout(() => {
        this.clear();
        this.imgs.unshift(this.imgs.splice(this.imgs.length - 1, 1)[0]);
        this.imgn = this.imgs[0].imgUrl;
        this.timeout();
      }, (Math.random() * 10 + 5) * 1000);
    },
    clear() {
      if (this.intervalHandel) {
        window.clearTimeout(this.intervalHandel);
        this.intervalHandel = null;
      }
    },
  },
};
</script>
<style scoped lang="scss">
@import "~@/assets/css/mixin";

.swiper-button-prev {
  margin-top: -0.02rem;
  width: 0.2rem;
  height: 0.64rem;
  left: 0;
  transform: translateY(-50%);
  background: url("../../../static/lanwan/prev.png") no-repeat;
  background-size: 100% 100%;
}

.swiper-button-next {
  margin-top: -0.02rem;
  width: 0.2rem;
  height: 0.64rem;
  right: 0;
  transform: translateY(-50%);
  background: url("../../../static/lanwan/next.png") no-repeat;
  background-size: 100% 100%;
}

.bottom-m {
  z-index: 9999;
  width: 100%;
  .park-main-mid-content {
    width: 3.78rem;
    height: 2.88rem;
    // background: url("../../static/hz-img/mainbg.png") no-repeat;
    background-size: 100% 100%;
    margin: .2rem auto ;

    .park-main-mid-left {
      //   width: 2.75rem;
      height: 2rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    // .park-main-mid-right {
    //   width: 1rem;
    //   height: 1.52rem;
    // }
  }
}

.swiper {
  width: 100%;
  // margin-top: 0.14rem;
  &-padding {
    padding: 0 0.25rem;
  }
  .swiper-item {
    width: 25%;
    cursor: pointer;
    // z-index: 999;
    img {
      width: 100%;
      height: 0.64rem;
    }
  }
}

.slide-enter, .slide-leave-to
/* .list-complete-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(30px);
}
.slide-leave-active {
  position: absolute;
}
</style>

