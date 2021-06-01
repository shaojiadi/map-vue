<template>
  <ul class="camera">
      <div class="g-left-bg" :class="{ rotate: warnPointList[0].rotate }">
        <div class="close-alarm" :class="{ rotateBack: warnPointList[0].rotate }" @click.stop="close"></div>
        <div :class="{ rotateBack: warnPointList[0].rotate }" class="rotateD">
          <p class="title" :class="{ 'title-right': warnPointList[0].rotate }">{{ warnPointList[0].title }}</p>
          <p class="q-rank">一级入侵告警</p>
          <div class="mt">
            <span class="q-title">告警时间：</span>
            <span class="q-text"> {{ warnPointList[0].record }} </span>
          </div>
          <div class="mt">
            <span class="q-title">告警地点：</span>
            <span class="q-text"> {{ warnPointList[0].locals }} </span>
          </div>
          <div class="mt">
            <span class="q-title">详细信息：</span>
            <span class="q-text"> {{ warnPointList[0].reason }} </span>
          </div>
          <div class="flex-box2">
            <div class="warn-btn" @click="showJianKong(warnPointList[0])">调取监控</div>
            <div class="warn-btn" @click="noWarnPoint(warnPointList[0], 0)">
              告警解除
            </div>
          </div>
        </div>
      </div>
  </ul>
</template>

<script>
import * as getData from "@/service/getData";
import axios from "axios";
let waiweimonitoList = () => axios.get(`/mortar/screen/waiweimonitoList?regionIndexCode=` + "46ef687b-e0ed-4490-bfb1-b3d0dabaeec4");

let monitorMediaUrlList = (cameraIndexCode, name) =>
  axios.get(`/mortar/screen/monitorMediaUrlList`, {
    params: {
      cameraIndexCode: cameraIndexCode,
      name: name,
    },
  });

let monitoList = () => axios.get(`/mortar/screen/monitoList`);

export default {
  data() {
    return {
      videoList: [],
      activeCameraIndexCode: "",

        warnPointList: [
          {
            active: 1,
            area: "银行区域",
            id: 1,
            isWarn: 1,
            key: 1,
            localName: "西马路中间",
            locals: "蓝湾智谷-园区大门监控",
            name: "人员聚集告警！",
            pos: [12.94, 6.24],
            reason: "办公楼仓库、动力机房",
            record: "2020-11-22 11:12",
            rotate: 0,
            title: "异常告警",
            video: "rtmp://47.97.107.52:1940/live/qdgx31",
          },
          /* {
            active: 1,
            area: "-",
            id: 2,
            isWarn: 1,
            key: 2,
            localName: "4楼电梯厅",
            locals: "蓝湾智谷-楼内监控",
            name: "消防运行告警！",
            pos: [9.61, 2.35],
            reason: "消防运行告警点",
            record: "2020-11-22 11:12",
            rotate: 1,
            title: "消防运行告警",
            video: "rtmp://47.97.107.52:1940/live/qdgx38",
          }, */
        ],
    };
  },
  props: ["info"],
  computed: {
    /* warnPointList() {
      let arr = [];
      this.$store.state.warnList.forEach((val) => {
        if (val.rotate) {
          arr.push(val);
        }
      });
      return arr;
    }, */
  },
  mounted() {
    this.init();
  },

 

  destroyed() {
    
  },
  methods: {
    init() {
      getData.monitoList().then((res) => {
        this.videoList = JSON.parse(res.data.data);
      })
      .catch((_) => {
        console.log(_);
      });
    },

    showJianKong(item) {//调取监控
      this.getOrOpenUrl(item.localName,1)
      // this.$emit("jiankong", item.localName);
    },
    getOrOpenUrl(local, isOpen) {
      let cameraIndexCode = "";
      this.$store.state.videoList.forEach((item) => {
        if (local == item.cameraName) {
          cameraIndexCode = item.cameraIndexCode;
        }
      });
      if (isOpen) {
        this.$store.state.activeCameraIndexCode = cameraIndexCode;
        this.$store.state.saceShow = true;
      }else{
          return cameraIndexCode;
      }
    },
    noWarnPoint(item, index) {
      //   this.$emit("WarnListSlice", item);
      /* this.$store.state.warnList.splice(index, 1); */
      this.warnPointList.splice(index, 1);
      //   this.warnPointList[index] = {};
      //   this.$set(this.warnPointList[index], "active", 0);
    },

    close(){
      // this.$emit("closeDailog",this.info);
      this.map.clearInfoWindow();
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/mixin";
.title {
  // top: -0.1rem;
  // left: 0.21rem;
  // height: 0.23rem;
  font-size: 0.24rem;
  font-family: AliHYAiHei;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: .15rem;
  // position: absolute;
}

.title-right {
  text-align: right;
}

.g-left-bg {
  @include bis("/static/lanwan/warn-point.png");
  @include wh(4.68rem, 2.92rem);
  position: relative;
  margin-top: 0.14rem;
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 100;

  .rotateD {
    padding: 0rem 0.5rem;
    margin-top: .4rem;
  }
  &.rotate {
    transform: rotateY(-180deg);
  }
  .rotateBack {
    transform: rotateY(180deg);
  }

  .q-rank {
    font-size: .18rem;
    font-family: RTWS ShangGothic G0v1;
    font-weight: 400;
    color: #FEFEFE;
    margin-bottom: .15rem;
  }

  .mt {
    margin-bottom: 0.1rem;
  }

  .q-title {
    color: #e82c37;
    cursor: pointer;
  }
  .q-text {
    color: #fff;
  }
  .q-text,
  .q-title {
    font-size: 0.18rem;
    font-family: PingFang SC;
    font-weight: bold;
  }

  .warn-btn {
    @include bis("/static/images/img/warn-btn.png");
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
    color: #fff;
  }

  .warn-btn2 {
    @include bis("/static/images/img/warn-btn2.png");
    @include wh(1.17rem, 0.43rem);
    margin: -0.1rem 0.15rem 0 0;
    text-align: center;
    line-height: 0.41rem;
    cursor: pointer;
  }
  .active-btn {
    @include bis("/static/images/img/active-btn.png");
    @include wh(1.57rem, 0.79rem);
    margin-right: 0.15rem;

    line-height: 0.79rem;

    cursor: pointer;
    margin: -0.1rem 0 0.1rem -0.26rem;
  }
}

.detail-title {
  height: 0.18rem;
  font-size: 0.18rem;
  font-family: PingFang SC;
  font-weight: bold;
  color: #7af4fd;
  margin: 0.31rem 0 0.14rem 0;
}

.s-blue {
  color: rgba(122, 244, 253, 1);
}
.s-white {
  color: white;
}

.f-camera-popup-content-footer {
  position: relative;
  .f-camera-popup-detail {
    display: flex;
    border-bottom: 1px solid;
    border-image: linear-gradient(
        to right,
        #000,
        #317698,
        #2c94c7,
        #317698,
        #f000
      )
      10 10;
    .detail-img {
      width: 0.86rem;
      height: 0.86rem;
      margin-right: 0.13rem;
    }
    li {
      margin-bottom: 0.15rem;
    }
  }
}
.f-camera-popup-content-warn {
  position: relative;
  .warn-ul {
    li {
      display: flex;
      align-items: center;
      padding: 0 0.2rem;
    }
    li:nth-child(2n + 1) {
      height: 0.34rem;
      background: rgba(122, 244, 253, 0.15);
    }
    li:nth-child(2n) {
      height: 0.34rem;
      background: rgba(20, 33, 43, 0.4);
    }
  }
}

.camera {
  pointer-events: auto;//不可操作地图，可操作按钮
  .camera-item {
    position: absolute;
    width: 0.45rem;
    height: 0.53rem;
    cursor: pointer;
    // opacity: 0;
    &.hiddened {
      .f-camera-popup {
        background-size: 100% 100%;
        top: 0;
        margin-top: 0.5rem;
        padding-top: 0.2rem;
        padding-bottom: 0;

        .f-close {
          top: 0.45rem;
        }
      }
    }

    &.active {
      opacity: 1;
      .f-camera-popup {
        display: flex;
      }
    }

    .bottom-img {
      position: relative;
      z-index: 99;
      width: 0.59rem;
      height: 0.79rem;
    }

    .g-imgposition {
      position: absolute;
      left: -0.31rem;
      top: -0.18rem;
      width: 1.01rem;
      height: 0.92rem;
      z-index: 98;
    }
  }
}

.f-camera-popup {
  // display: none;
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 50%;
  top: 50%;
  // transform: translate(-30%,-35%);
  width: 6.62rem;
  height: 7.95rem;
  background: url("/static/bounced-img/big-jk-bg.png") no-repeat;
  background-size: 100% 100%;
  padding: 0.4rem 0.6rem;
  box-sizing: border-box;
  margin-left: 0.18rem;
  margin-bottom: 0.5rem;
  z-index: 100;

  .f-close {
    position: absolute;
    width: 0.14rem;
    height: 0.14rem;
    right: 0.27rem;
    top: 0.3rem;
    background: url("http://zjntx-screen.zhihuipk.com/static/tx-img/icon-close.png")
      no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
  }

  &-header {
    width: 100%;
    height: 0.3rem;
    display: flex;
    align-items: center;
    margin-bottom: 0.15rem;
  }

  &-btn {
    width: 100%;
    height: 0.18rem;
    font-size: 0.18rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
    @include fjqd(space-between);
    .head-title {
      height: 0.18rem;
      font-size: 0.18rem;
      font-family: PingFang SC;
      font-weight: bold;
      color: #ffffff;
    }
    img {
      width: 0.44rem;
      height: 0.44rem;
    }
  }

  &-content {
    width: 100%;
    height: calc(100% - 0.6rem);
    flex: 1;
    overflow: hidden;

    > p {
      font-size: 0.12rem;
      font-family: MicrosoftYaHei;
      font-weight: bold;
      color: #00deff;
      margin-top: 0.1rem;
    }

    .g-p1 {
      color: #00f6ff;
    }

    .g-zaigang {
      padding: 0 0.08rem;
      font-size: 0.12rem;
      font-family: Adobe Heiti Std;
      font-weight: bold;
      color: rgba(114, 255, 107, 1);
      line-height: 0.18rem;
      border: 1px solid rgba(114, 255, 107, 1);
      border-radius: 0.04rem;
      margin-left: 0.1rem;
    }
  }

  .video-content {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 0.1rem;

    .video-img {
      width: 0.8rem;
      height: 0.8rem;
      border: 1px solid rgba(0, 246, 255, 1);
      margin-right: 0.1rem;
    }

    .video-info {
      flex: 1;
      overflow: auto;

      .video-title {
        font-size: 0.18rem;
        font-family: PingFang SC;
        font-weight: bold;
        line-height: 0.32rem;
        color: rgba(0, 246, 255, 1);
      }

      .video-address {
        font-size: 0.14rem;
        font-family: PingFang SC;
        font-weight: bold;
        line-height: 0.24rem;
        color: rgba(0, 246, 255, 1);
      }

      .video-alarm {
        font-size: 0.14rem;
        font-family: PingFang SC;
        font-weight: bold;
        line-height: 0.24rem;
        color: rgba(0, 246, 255, 1);
      }
    }

    .entrance {
      position: absolute;
      right: 0;
      top: 0;
      width: 0.81rem;
      height: 0.24rem;
      font-size: 0.14rem;
      font-family: PingFang SC;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      line-height: 0.24rem;
      text-align: center;
      background: url("http://zjntx-screen.zhihuipk.com/static/tx-img/input_icon.png")
        no-repeat;
      background-size: 100% 100%;
    }
  }

  &-title {
    margin-top: 0.11rem;
    width: 100%;
    /*height: .22rem;*/
    font-size: 0.12rem;
    font-family: MicrosoftYaHei;
    font-weight: bold;
    color: rgba(0, 222, 255, 1);
    background: rgba(0, 158, 248, 0.2);
    border: 1px solid rgba(0, 158, 248, 1);
    padding: 0.03rem 0.17rem;
    box-sizing: border-box;
  }

  .f-camera-popup-video {
    width: 100%;
    height: 3.14rem;
    margin: 0 auto;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.close-alarm {
  width: .53rem;
  height: .53rem;
  cursor: pointer;
  position: absolute;
}
</style>
