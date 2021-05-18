<template>
  <div
    class="flex-box"
    style="position: relative; z-index: 10; pointer-events: none"
  >
    <!-- 左侧 -->
    <transition name="left" appear before-appear="left-enter">
      <div class="contain-box">
        <h3>异常人员出入</h3>
        <div class="g-left-bg">
          <div class="mt">
            <span class="q-title">告警原因：</span>
            <span class="q-text">{{ info.reason }}</span>
          </div>
          <div class="mt">
            <span class="q-title">告警时间：</span>
            <span class="q-text">{{ info.time }}</span>
          </div>
          <div class="mt">
            <span class="q-title">告警位置：</span>
            <span class="q-text">{{ info.postion }}</span>
          </div>
          <div class="flex-box2">
            <div
              v-for="(item, index) in btnList"
              :key="index"
              class="warn-btn"
              @click="
                item.name == '进入区域'
                  ? $router.push('/index')
                  : (dialogShow = true)
              "
            >
              {{ item.name }}
            </div>
            <div class="warn-btn" @click="$store.state.addPlicePoint++">
              安保协调
            </div>
          </div>
          <div class="line"></div>
          <p class="q-title">疑似人员</p>
          <div class="user-info">
            <img src="static/images/img/user-icon.png" alt="" />
            <div class="flex-aligns">
              <p class="info-name">{{ info.name }}</p>
              <div>
                <span class="info-else">{{ info.sex }}</span>
                <span class="info-else">{{ info.age }}</span>
                <span class="info-else">{{ info.jg }}</span>
              </div>
              <div class="q-title" @click="$router.push('/archivesCenter')">
                调取档案>>
              </div>
            </div>
          </div>
          <div class="line"></div>
          <p class="q-title">现场监控片段</p>
          <div class="f-video">
            <div
              class="f-camera-popup-video"
              v-for="(items, index) in partList"
              :key="index"
            >
              <v-video
                v-if="items.url"
                :src="items.url"
                :id="'video' + index"
              ></v-video>
              <img :src="items.imgUrl" v-else alt="" />
            </div>
          </div>
          <div class="flex-box2">
            <div
              v-for="(item, index) in btnList2"
              :key="index"
              @click="showWay(item, index)"
              :class="isCheck == index ? 'active-btn' : 'warn-btn2'"
              class="bottom-red"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- 人员轨迹弹框 -->
    <transition name="slide-sace">
      <v-trajectory @closeDialog="isShowDialog = false" v-if="isShowDialog">
      </v-trajectory>
    </transition>

    <transition name="slide-sace">
      <v-safeDialog
        v-if="dialogShow"
        @close="dialogShow = false"
      ></v-safeDialog>
    </transition>

    <!-- 右侧 -->
    <transition
      name="right"
      appear
      before-appear="right-enter"
      v-if="$store.state.addPlicePoint"
    >
      <div class="contain-box2">
        <h3>智能应急方案推荐</h3>
        <div class="g-right-box">
          <p class="r-title">人员派遣</p>
          <div class="mt">
            <span class="r-text">安保人员：</span>
            <span class="r-content">{{ info2.number }} 人</span>
          </div>
          <div class="mt">
            <span class="r-text">采取行动：</span>
            <span class="r-content">{{ info2.content }} </span>
          </div>
          <div class="line2"></div>
          <div v-for="(item, index) in info2.userList" :key="index">
            <div class="r-user-info">
              <img src="static/images/img/user-icon2.png" alt="" />
              <div class="flex-aligns">
                <p class="info-name">{{ item.name }}</p>
                <p class="info-else">{{ item.ju }}</p>
                <div>
                  <span class="info-else" style="margin-right: 0">状态：</span>
                  <span class="info-state">{{ item.state }}</span>
                </div>
              </div>
              <div class="flex-aligns">
                <img
                  src="static/images/img/phone.png"
                  alt=""
                  class="phone-img"
                />
                <p class="info-else" style="margin-right: 0">
                  距离：{{ item.long }}米
                </p>
              </div>
            </div>
            <div class="line2"></div>
          </div>
          <p class="q-title mt">系统建议：</p>
          <p class="proposal">{{ info2.content2 }}</p>
          <div class="flex-box2">
            <div class="s-active-btn" @click="$store.state.policeGo++">
              方案调整
            </div>
            <div
              class="s-active-btn"
              @click="
                Toast('安保人员相应按照推荐路线抵达现场!', 2000);
                $parent.$refs.mapTown.movePliceMain();
              "
            >
              方案执行
            </div>
          </div>
        </div>
        <div class="view-scheme">查看其它推荐方案>></div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogShow: false,
      isShowDialog: false,
      partList: [
        {
          url: "/static/bounced-img/test (1).mp4",
       
        },
        {
          imgUrl:'/static/bounced-img/video-img.jpg',
        },
        {
          imgUrl:'/static/bounced-img/video-img2.jpg',
        },
        {
          imgUrl:'/static/bounced-img/video-img3.jpg',
        },
        {
          imgUrl:'/static/bounced-img/videoImg1.jpg',
        },
        {
          imgUrl:'/static/bounced-img/videoImg2.jpg',
        },
        {
          imgUrl:'/static/bounced-img/videoImg3.jpg',
        },
        {
          imgUrl:'/static/bounced-img/videoImg4.jpg',
        },
      ],
      info: {
        reason: "行为异常人员",
        time: "2020-11-22 11:12",
        postion: "蓝湾智谷-园区正大门监控",
        name: "黄华山",
        sex: "男",
        age: 42,
        jg: "山东淄博",
      },
      info2: {
        number: "2",
        content: "快速侦查，确认情况",
        userList: [
          {
            name: "马卫国",
            ju: "1号安保点",
            state: "执勤",
            long: "612",
          },
          {
            name: "周力伟",
            ju: "1号安保点",
            state: "执勤",
            long: "612",
          },
        ],
        content2: "完成初步派遣后，召开临时线上会议，商量下一步对策！",
      },
      btnList: [
        {
          name: "进入区域",
        },
        {
          name: "调取监控",
        },
      ],
      btnList2: [
        {
          name: "查看人员轨迹",
        },
        // {
        //   name: '联系园区管理'
        // },
        {
          name: "告警解除",
        },
      ],
      isCheck: 0,
      suggestionList: [
        {
          name: "方案执行",
        },
      ],
      isrActive: 0,
    };
  },
  mounted() {},
  methods: {
    getTrueActive() {
      if (this.isCheck == 0) {
        return "active-btn";
      } else if (this.isCheck == 1) {
        return "warn-btn2";
      }
    },
    showWay(item, index) {
      this.isCheck = index;
      this.isShowDialog = false;
      if (item.name == "查看人员轨迹") {
        this.isShowDialog = true;
      }
      if (item.name == "告警解除") {
        this.$store.state.addPlicePoint = 0;
        this.$router.push("/indexMain");
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/css/mixin";

.SecurityCenter {
  width: 4.78rem;
  height: 2.16rem;
  @include bis("/static/bounced-img/SecurityCenter.png");
  position: absolute;
  left: 7.72rem;
  top: 1.37rem;

  .center-box {
    position: absolute;
    left: 0.84rem;
    top: 0.8rem;
    @include fjqd();
  }
  i {
    width: 0.4rem;
    height: 0.4rem;
  }
  p {
    font-size: 0.24rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: #7af4fd;
  }
}
.mt {
  margin-bottom: 0.15rem;
}

.info-name {
  font-size: 0.22rem;
  font-family: PingFang SC;
  color: #ffffff;
}

.info-else {
  color: #ffffff;
  opacity: 0.8;
  margin-right: 0.15rem;
}

h3 {
  font-weight: bold;
  color: #ffffff;
  font-size: 0.24rem;
  font-family: AliHYAiHei;
}

.contain-box {
  pointer-events: auto;
  margin: 0.93rem 0 0 0.32rem;

  .g-left-bg {
    @include bis("../../static/images/img/contingency-left.png");
    @include wh(4.47rem, 9.04rem);
    position: relative;
    padding: 0.31rem 0.37rem;
    margin-top: 0.14rem;
    .q-title {
      color: #e82c37;
      cursor: pointer;
    }
    .q-text {
      color: #fff;
    }
    .q-text,
    .q-title {
      // font-size: 0.18rem;
      font-family: PingFang SC;
      // font-weight: bold;
    }

    .warn-btn {
      @include bis("../../static/images/img/warn-btn.png");
      @include wh(1.17rem, 0.43rem);
      margin-right: 0.15rem;
      text-align: center;
      line-height: 0.41rem;
      font-size: 0.14rem;
      color: #fff;
      cursor: pointer;
    }

    .line {
      margin: 0.09rem 0;
      width: 3.55rem;
      height: 0.01rem;
      background-image: linear-gradient(
        to right,
        rgba(255, 0, 0, 0),
        rgba(232, 44, 55, 1),
        rgba(255, 0, 0, 0)
      );
      opacity: 0.6;
    }

    .user-info {
      display: flex;
      img {
        @include wh(0.86rem, 0.86rem);
        margin-right: 0.11rem;
      }
    }
    .bottom-red {
      font-size: 0.12rem;
      color: #fff;
      text-align: center;
      font-size: 0.12rem;
      color: #fff;
    }

    .warn-btn2 {
      @include bis("../../static/images/img/warn-btn2.png");
      @include wh(1.17rem, 0.43rem);
      margin: -0.1rem 0.15rem 0 0;
      text-align: center;
      line-height: 0.41rem;
      cursor: pointer;
    }
    .active-btn {
      @include bis("../../static/images/img/active-btn.png");
      @include wh(1.57rem, 0.79rem);
      margin-right: 0.15rem;

      line-height: 0.79rem;

      cursor: pointer;
      margin: -0.1rem 0 0.1rem -0.26rem;
    }
  }
}

.f-video {
  display: flex;
  flex-wrap: wrap;
  .f-camera-popup-video {
    width: 1.66rem;
    height: 0.97rem;
    margin: 0 0.12rem 0.12rem 0;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.contain-box2 {
  pointer-events: auto;
  margin-top: 0.93rem;
  .g-right-box {
    @include bis("../../static/images/img/contingency-right.png");
    @include wh(4.5rem, 6.46rem);
    margin-top: 0.14rem;
    padding: 0.26rem 0.56rem 0 0.41rem;
    .r-title {
      font-size: 0.2rem;
      font-family: AliHYAiHei;
      color: #ffffff;
      margin-bottom: 0.18rem;
    }
    .r-text {
      color: rgba(122, 244, 253, 1);
      font-family: PingFang SC;
    }
    .line2 {
      width: 3.55rem;
      height: 0.01rem;
      background-image: linear-gradient(
        to right,
        rgba(255, 0, 0, 0),
        #317698,
        #2c94c7,
        #317698,
        rgba(255, 0, 0, 0)
      );
      opacity: 0.8;
      margin: 0.16rem 0;
    }
    .r-user-info {
      display: flex;
      justify-content: space-between;
      img {
        margin-right: 0.1rem;
        @include wh(0.87rem, 0.85rem);
      }
      .info-state {
        color: rgba(122, 244, 253, 1);
      }
      .phone-img {
        @include wh(0.48rem, 0.48rem);
      }
    }

    .proposal {
      color: #fff;
      height: 0.6rem;
      margin-bottom: 0.2rem;
    }

    .s-active-btn {
      @include bis("../../static/images/img/s-active-btn.png");
      @include wh(1.86rem, 0.86rem);
      margin-right: 0.15rem;
      text-align: center;
      line-height: 0.86rem;
      font-size: 0.12rem;
      color: #fff;
      cursor: pointer;
    }

    .s-btn {
      @include bis("../../static/images/img/s-btn.png");
      @include wh(1.3rem, 0.5rem);
      margin-right: 0.15rem;
      text-align: center;
      line-height: 0.5rem;
      font-size: 0.12rem;
      color: #fff;
      cursor: pointer;
    }
  }
  .view-scheme {
    @include bis("../../static/images/img/view-scheme.png");
    @include wh(4.24rem, 0.53rem);
    margin-top: 0.3rem;
    text-align: center;
    line-height: 0.53rem;
    color: #7af4fd;
    cursor: pointer;
  }
}

.left-enter-active,
.left-leave-active {
  transition: all 0.5s;
}
.left-enter, .left-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(-200px);
}

.right-enter-active,
.right-leave-active {
  transition: all 0.5s;
}

.right-enter,
.right-leave-to {
  opacity: 0;
  transform: translateX(200px);
}
</style>