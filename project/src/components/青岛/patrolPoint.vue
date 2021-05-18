<template>
  <ul class="camera">
    <li
      class="camera-item"
      v-for="(item, index) in patrolList"
      :key="item.id"
      :style="`left: ${item.pos[0]}rem;top: ${item.pos[1]}rem;`"
      :class="[
        'camera-position-' + (index + 1),
        cameraId === item.id ? 'active' : '',
        item.toRight ? 'toRight' : 'toLeft',
        index == 3 ? 'toTright' : '',
      ]"
      :ref="'camera-' + (index + 1)"
    >
      <div
        class="f-camera-popup"
        ref="camera-popup"
        v-if="cameraId === item.id"
      >
        <div class="f-camera-popup-header">
          <div class="f-camera-popup-btn">
            <ul class="tab-list">
              <li
                v-for="(item, index) in tabList"
                :key="index"
                @click="isInPut = item.isIn"
                class="show-item"
                :class="item.isIn == isInPut ? 'active' : ''"
              >
                {{ item.name }}
              </li>
            </ul>
            <img
              src="/static/bounced-img/jk-close.png"
              @click.stop="closeCamera"
              alt=""
            />
          </div>
        </div>
        <div class="f-camera-popup-content">
          <div class="f-camera-popup-video" v-if="isInPut === 0">
            <v-hikVideo
              :activeCameraIndexCode="activeCameraIndexCode"
            ></v-hikVideo>
            <p class="popup-content-bottom">
              <img src="/static/bounced-img/small-patrol.png" alt="" />
              <span>{{ item.local }}</span>
            </p>
          </div>
          <div class="f-camera-popup-content-warn" v-if="isInPut === 1">
            <ul class="warn-ul">
              <li
                v-for="(item, index) in patrolRecordList"
                :key="index"
                :class="item.isError ? 'error' : 'normal'"
              >
                <span class="s-white">
                  {{ item.time }} &nbsp;&nbsp;&nbsp;&nbsp; 14:26:13
                </span>
                <span>
                  {{ item.isError ? `异常:${item.errorMessage}` : "正常" }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <img
        class="bottom-img"
        @click.stop="changeCameraJianKongByUrl(item, index)"
        src="/static/bounced-img/patrol.png"
        alt
      />
    </li>
    <div class="build-tips">
      <img
        class="intevalSwitch"
        :src="
          autoChangeCompany
            ? 'http://txkcy-screen.zhihuipk.com/static/property-img/closeInterveal.png'
            : 'http://txkcy-screen.zhihuipk.com/static/property-img/openInterveal.png'
        "
        @click="closeOrOpenIterveal"
        alt
      />
    </div>
  </ul>
</template>

<script>
import * as getData from "@/service/getData";
import axios from "axios";
let waiweimonitoList = () =>
  axios.get(
    `/mortar/screen/waiweimonitoList?regionIndexCode=` +
      "46ef687b-e0ed-4490-bfb1-b3d0dabaeec4"
  );

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
      isInPut: 0,
      videoTianWangUrl: "",
      inNum: 4356,
      outNum: 3216,
      interval1: null,
      videoList: [],
      btnActive: 1,
      warnRadioShow: false,
      activeCameraIndexCode: "",
      cameraId: 1,
      cameraWarningId: "",
      cameraUrl: "http://zjntx-screen.zhihuipk.com/static/tx-img/camera.png",
      cameraActiveUrl:
        "http://zjntx-screen.zhihuipk.com/static/tx-img/camera-active.png",
      cameraWarningUrl:
        "http://zjntx-screen.zhihuipk.com/static/tx-img/camera-warning.png",
      cameraAutoUrl:
        "http://zjntx-screen.zhihuipk.com/static/tx-img/camera-auto-warning.png",
      popupInfo: {
        title: "制药工厂A幢西北角",
        address: "制药工厂A幢西北角高点",
        code: "LKJLSA341",
        left: 0,
        top: 0,
        warns: [
          {
            pic: "http://zjntx-screen.zhihuipk.com/static/tx-img/warn1.png",
            type: "非法入侵",
            onTime: "2019-03-22  11:23",
            unTime: "2019-03-22  12:45",
          },
        ],
      },

      patrolRecordList: [
        {
          time: "巡检画面",
          isError: 0,
        },
        {
          time: "巡检记录",
          isError: 0,
        },
        {
          time: "巡检画面",
          isError: 0,
        },
        {
          time: "巡检记录",
          isError: 0,
        },
        {
          time: "巡检画面",
          isError: 0,
        },
        {
          time: "巡检记录",
          isError: 1,
          errorMessage: "人员聚集",
        },
        {
          time: "巡检画面",
          isError: 0,
        },
        {
          time: "巡检记录",
          isError: 0,
        },
        {
          time: "巡检画面",
          isError: 0,
        },
        {
          time: "巡检记录",
          isError: 1,
          errorMessage: "周界入侵",
        },
        {
          time: "巡检记录",
          isError: 1,
          errorMessage: "黑名单人员",
        },
      ],
      tabList: [
        {
          name: "巡检画面",
          isIn: 0,
        },
        {
          name: "巡检记录",
          isIn: 1,
        },
      ],
      
      patrolList: [
        {
          id: 1,
          pos: [8.1, 1.58],
          local: "蓝湾鹰眼",
          code: "31dbb2356b4c4a32acda301360339310",
          state: 1,
          toRight: 1,
          warns: [],
          video: "rtmp://47.97.107.52:1940/live/qdgx38",
        },
        {
          id: 2,
          pos: [4.44, 2.38],
          local: "一号楼楼顶",
          code: "31dbb2356b4c4a32acda301360339310",
          state: 1,
          toRight: 1,
          warns: [],
          video: "rtmp://47.97.107.52:1940/live/qdgx187",
        },
        {
          id: 3,
          pos: [5.27, 4.79],
          local: "西马路中间",
          code: "31dbb2356b4c4a32acda301360339310",
          state: 1,
          toRight: 1,
          warns: [],
          video: "rtmp://47.97.107.52:1940/live/qdgx31",
        },
        {
          id: 4,
          pos: [10.41, 7.19],
          local: "蓝湾警务室南",
          code: "31dbb2356b4c4a32acda301360339310",
          state: 1,
          toRight: 1,
          warns: [],
          video: "rtmp://47.97.107.52:1940/live/qdgx38",
        },
        {
          id: 5,
          pos: [11.7, 6.46],
          local: "蓝湾内街南入口",
          code: "31dbb2356b4c4a32acda301360339310",
          state: 1,
          toRight: 0,
          warns: [],
          video: "rtmp://47.97.107.52:1940/live/qdgx43",
        },
      ],
      isOpenInterval: true,
      autoChangeCompany: "",
      tempNum: 0,
    };
  },
  mounted() {
    this.initRandom();
    // this.getScreenIndex();
    // this.getMonitoList();
    monitoList()
      .then((res) => {
        this.videoList = JSON.parse(res.data.data);
        this.getUrl();
      })
      .catch((_) => {
        console.log(_);
      });
    this.autoChange();
  },
  destroyed() {
    window.clearTimeout(this.interval1);
  },
  methods: {
    getUrl() {
      let cameraIndexCode = "";
      let local = this.patrolList[this.cameraId - 1].local;
      this.videoList.forEach((item) => {
        if (local == item.cameraName) {
          cameraIndexCode = item.cameraIndexCode;
        }
      });
        this.activeCameraIndexCode = cameraIndexCode;
      //   monitorMediaUrlList(cameraIndexCode, local).then((res) => {
      //     this.videoTianWangUrl = JSON.parse(res.data.data).url;
      //   });
    },
    initRandom() {
      let temp = 1;
      let patrolRecordList = this.patrolRecordList;
      let _this = this;
      for (let index = 0; index < patrolRecordList.length; index++) {
        temp += Math.floor(Math.random() * 3) + 1;
        let recordDate = new Date().add("d", -temp).format("yyyy-MM-dd");
        this.patrolRecordList[index].time = recordDate;
        // this.patrolRecordList.push({
        //   name: this.firstWarnArr[Math.floor(Math.random() * 5)],
        //   recordDate: new Date().add("d", -temp).format("yyyy-MM-dd"),
        // });
      }
    },
    closeOrOpenIterveal() {
      if (this.autoChangeCompany) {
        clearInterval(this.autoChangeCompany);
        this.autoChangeCompany = null;
      } else {
        this.autoChange();
      }
    },
    autoChange() {
      this.autoChangeCompany = setInterval(() => {
        // this.tempNum++;
        // if (this.tempNum == 15) {
        if (this.cameraId == this.patrolList.length) {
          this.cameraId = 0;
        }
        this.cameraId += 1;
        //   this.tempNum = 0;
        // }
      }, 15 * 1000);
    },

    getMonitoList() {
      waiweimonitoList()
        .then((res) => {
          this.patrolList = JSON.parse(res.data.data);
          if (this.patrolList.length) {
            this.getMonitorMediaUrlList(this.patrolList[0]);
          }
        })
        .catch((_) => {
          console.log(_);
        });
    },
    getMonitorMediaUrlList(row, index) {
      if (!row.cameraIndexCode) {
        return;
      }
      this.cameraId = row.id;
      monitorMediaUrlList(row.cameraIndexCode, row.cameraName)
        .then((res) => {
          this.videoTianWangUrl = JSON.parse(res.data.data).url;
        })
        .catch((_) => {
          console.log(_);
        });
    },

    changeCameraJianKongByUrl(row, index) {
      this.tempNum = 0;
      this.videoTianWangUrl = row.video;
      if (this.cameraId === row.id) {
        this.videoTianWangUrl = "";
        this.cameraNameJianKong = "";
        this.cameraId = "";
      } else {
        this.cameraId = row.id;
        if (this.videoList.length) {
          this.cameraNameJianKong = row.local;
          let cameraIndexCode = "";
          this.videoList.forEach((item) => {
            if (row.local == item.cameraName) {
              cameraIndexCode = item.cameraIndexCode;
            }
          });
          this.activeCameraIndexCode = cameraIndexCode;
          monitorMediaUrlList(cameraIndexCode, row.local).then((res) => {
            this.videoTianWangUrl = JSON.parse(res.data.data).url;
          });
        }
      }
    },

    changeBtnActive(type) {
      this.btnActive = type;
    },
    closeCamera() {
      this.cameraId = "";
      this.popupInfo.left = 0;
      this.popupInfo.top = 0;
    },
    getImgUrl(id) {
      // cameraWarningUrl cameraActiveUrl cameraAutoUrl cameraUrl
      if (id === this.cameraId && !this.cameraWarningId) {
        return this.cameraActiveUrl;
      } else if (id === this.cameraId && this.cameraWarningId) {
        return this.cameraWarningUrl;
      } else if (id !== this.cameraId && this.cameraWarningId === id) {
        return this.cameraAutoUrl;
      } else {
        return this.cameraUrl;
      }
    },
    // 摄像头智能管控
    changeCameraJianKong(row, index) {
      this.videoTianWangUrl = row.video;
      this.cameraNameJianKong = row.local;
      this.cameraId = row.id;
    },
  },
  watch: {
    cameraId: {
      handler() {
        // let cameraIndexCode = "";
        // let local = this.patrolList[this.cameraId - 1].local;
        // this.videoList.forEach((item) => {
        //   if (local == item.cameraName) {
        //     cameraIndexCode = item.cameraIndexCode;
        //   }
        // });
        // monitorMediaUrlList(cameraIndexCode, local).then((res) => {
        //   this.videoTianWangUrl = JSON.parse(res.data.data).url;
        // });
        this.getUrl();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/mixin";

.build-tips {
  position: absolute;
  right: 4.07rem;
  bottom: 0.55rem;
  display: flex;
  align-items: center;
  .intevalSwitch {
    position: absolute;
    top: -0.5rem;
    cursor: pointer;
    width: 1rem;
  }

  p {
    font-size: 0.18rem;
    font-family: PingFangSC-Regular;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
  }
}

.tab-list {
  display: flex;
  z-index: 9;
  cursor: pointer;
  li {
    height: 0.16rem;
    font-size: 0.16rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
    margin-right: 0.49rem;
  }
  .show-item {
    opacity: 0.5;
    position: relative;
    &.active {
      opacity: 1;

      &::after {
        content: "";
        position: absolute;
        width: 50%;
        height: 0.02rem;
        background: linear-gradient(90deg, #2b84b2 0%, #32cced 100%);
        bottom: -0.1rem;

        transform: translateX(-50%);
        left: 50%;
      }
    }
  }
}

.s-white {
  color: white;
  font-size: 0.16rem;
  font-family: PingFang SC;
  font-weight: bold;
  color: #ffffff;
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
    height: 3.3rem;
    overflow: auto;
    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 0.2rem;
      height: 0.34rem;
      span {
        font-size: 0.16rem;
        font-family: PingFang SC;
        font-weight: bold;
      }
    }
    .normal:nth-child(2n + 1) {
      background: rgba(122, 244, 253, 0.15);
    }
    .normal:nth-child(2n) {
      background: rgba(20, 33, 43, 0.4);
    }
    .error {
      background: rgba(232, 44, 55, 0.15);
      span:nth-child(2) {
        color: rgba(232, 44, 55, 1);
      }
    }
  }
}

.camera {
  .camera-item {
    position: absolute;
    width: 0.45rem;
    height: 0.53rem;
    cursor: pointer;

    &.toRight {
      .f-camera-popup {
        background-size: 100% 100%;
        margin-top: 0.5rem;
        padding-top: 0.2rem;
        padding-bottom: 0;
        top: -1.8rem;
        right: -7.4rem;
      }
    }
    &.toTright {
      .f-camera-popup {
        transform: translateY(-1rem);
        &::before {
          width: 1.8rem;
          top: 1.3rem;
          left: -1.5rem;
          transform: rotate(-51deg);
        }
      }
    }
    &.toLeft {
      .f-camera-popup {
        background-size: 100% 100%;
        margin-top: 0.5rem;
        padding-top: 0.2rem;
        padding-bottom: 0;
        top: -1.6rem;
        right: 1.6rem;
        transform: rotateY(-180deg);
      }
      .f-camera-popup-header,
      .f-camera-popup-content {
        transform: rotateY(-180deg);
      }
    }

    &.active {
      .f-camera-popup {
        display: flex;
      }
    }

    .bottom-img {
      position: relative;
      z-index: 99;
      width: 0.59rem;
      height: 0.71rem;
    }
  }
}

.f-camera-popup {
  display: none;
  flex-direction: column;
  position: absolute;
  width: 6.23rem;
  height: 4.53rem;
  background: url("/static/bounced-img/patrol-bg.png") no-repeat;
  background-size: 100% 100%;
  padding: 0.4rem 0.6rem;
  box-sizing: border-box;
  margin-left: 0.18rem;
  margin-bottom: 0.5rem;
  z-index: 100;

  &::before {
    content: "";
    position: absolute;
    width: 1.3rem;
    height: 0.02rem;
    background-image: linear-gradient(
      to right,
      rgba(232, 44, 55, 0) 0%,
      rgba(122, 244, 253, 1) 20%,
      rgba(122, 244, 253, 1) 100%
    );
    left: -1.3rem;
    transform: rotate(-31deg);
    top: 0.8rem;
  }

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
    margin-bottom: 0.25rem;
  }

  &-btn {
    width: 100%;
    height: 0.18rem;
    font-size: 0.18rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
    padding-top: 0.17rem;
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
      position: relative;
      top: 0.05rem;
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
    .popup-content-bottom {
      margin: 0.05rem 0;

      display: flex;
      align-items: center;
      img {
        width: 0.16rem;
        height: 0.2rem;
        margin-right: 0.2rem;
      }
      span {
        font-size: 0.16rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
      }
    }
  }
}
</style>
