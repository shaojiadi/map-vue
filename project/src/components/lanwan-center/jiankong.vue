<template>
  <ul class="camera">
      <div class="f-camera-popup" ref="camera-popup" v-if="cameraId === cameraList[0].id">
        <div class="f-camera-popup-header">
          <div class="f-camera-popup-btn">
            <p class="head-title">重点监控点位-{{ cameraList[0].local }}</p>
            <img src="/static/bounced-img/jk-close.png" @click.stop="closeCamera" alt=""/>
          </div>
        </div>
        <div class="f-camera-popup-content">
          <div class="f-camera-popup-video">
            <v-video src="/static/bounced-img/录制视频1.mp4"></v-video>
            <!-- <v-hikVideo :id="'iframeT' + cameraList[0].id" :activeCameraIndexCode="getUrl(cameraList[0].local)" v-else></v-hikVideo> -->
          </div>

          <div class="f-camera-popup-content-footer">
            <p class="detail-title">设备详情</p>
            <div class="f-camera-popup-detail">
              <img class="detail-img" src="/static/bounced-img/jk.png" alt="" />
              <ul>
                <li>
                  <span class="s-blue"> 设备类型： </span>
                  <span class="s-white"> 智能识别相机 </span>
                </li>
                <li>
                  <span class="s-blue"> 设备型号： </span>
                  <span class="s-white"> 海康hk-3001 </span>
                </li>
                <li>
                  <span class="s-blue">设备状态：</span>
                  <span class="s-white">在线</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="f-camera-popup-content-warn">
            <p class="detail-title" style="margin: 0.12rem 0">设备告警记录</p>
            <ul class="warn-ul">
              <li>
                <span class="s-blue"> 黑名单人员进入： </span>
                <span class="s-white"> 2020-11-9 14:42:13 </span>
              </li>
              <li>
                <span class="s-blue"> 黑名单人员进入： </span>
                <span class="s-white"> 2020-11-1 14:26:13 </span>
              </li>
              <li>
                <span class="s-blue"> 人员轨迹异常： </span>
                <span class="s-white"> 2020-10-21 14:13:26 </span>
              </li>
              <li>
                <span class="s-blue"> 人员轨迹异常： </span>
                <span class="s-white"> 2020-10-10 16:16:13 </span>
              </li>
            </ul>
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
      videoTianWangUrl: "",
      interval1: null,
      videoList: [],
      activeCameraIndexCode: "",
      cameraId: 1,
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

      cameraList: [
        {
          id: 1,
          pos: [8.1, 1.68],
          local: "蓝湾鹰眼",
          code: "31dbb2356b4c4a32acda301360339310",
          state: 1,
          hidden: 1,
          warns: [],
          video: "rtmp://47.97.107.52:1940/live/qdgx187",
        },
        {
          id: 2,
          pos: [8.7, 1.58],
          local: "蓝湾鹰眼追踪",
          code: "31dbb2356b4c4a32acda301360339310",
          state: 1,
          hidden: 1,
          warns: [],
          video: "rtmp://47.97.107.52:1940/live/qdgx43",
        },
        {
          id: 3,
          pos: [5.99 - 0.3, 3.92 - 0.2],
          local: "二号楼楼顶",
          code: "31dbb2356b4c4a32acda301360339310",
          state: 1,
          hidden: 1,
          warns: [],
          video: "rtmp://47.97.107.52:1940/live/qdgx33",
        },
        {
          id: 4,
          pos: [7.11 - 0.3, 5.87 - 0.2],
          local: "三号楼楼顶",
          code: "31dbb2356b4c4a32acda301360339310",
          state: 1,
          hidden: 1,
          warns: [],
          video: "rtmp://47.97.107.52:1940/live/qdgx31",
        },
        {
          id: 5,
          pos: [9.86 - 0.3, 8.04 - 0.2],
          local: "蓝湾警务室南",
          code: "31dbb2356b4c4a32acda301360339310",
          state: 1,
          hidden: 1,
          warns: [],
          video: "rtmp://47.97.107.52:1940/live/qdgx38",
        },
        {
          id: 6,
          pos: [8.3, 2.82 - 0.2],
          local: "蓝湾丰巢柜",
          code: "31dbb2356b4c4a32acda301360339310",
          state: 1,
          hidden: 1,
          warns: [],
          video: "rtmp://47.97.107.52:1940/live/qdgx36",
        },
        {
          id: 7,
          pos: [9.83 - 0.3, 2.62 - 0.2],
          local: "4楼电梯厅",
          code: "31dbb2356b4c4a32acda301360339310",
          state: 1,
          hidden: 1,
          warns: [],
          video: "rtmp://47.97.107.52:1940/live/qdgx36",
        },
        {
          id: 8,
          pos: [16.4, 6.64],
          local: "华贯路南段3-9北",
          code: "31dbb2356b4c4a32acda301360339310",
          state: 1,
          hidden: 1,
          warns: [],
          video: "/static/bounced-img/data/l.mp4",
          videojs: 1,
        },
        {
          id: 9,
          pos: [14.9, 5.64],
          local: "河东路北沟1-3A",
          code: "31dbb2356b4c4a32acda301360339310",
          state: 1,
          hidden: 1,
          warns: [],
          video: "/static/bounced-img/data/l2.mp4",
          videojs: 1,
        },
      ],
    };
  },
  props:["info"],
  mounted() {
    // console.log(this.$store.state.videoList);
  },
  destroyed() {
    window.clearTimeout(this.interval1);
  },
  methods: {
    getUrl(local) {
      let cameraIndexCode = "";
      this.$store.state.videoList.forEach((item) => {
        if (local == item.cameraName) {
          cameraIndexCode = item.cameraIndexCode;
        }
      });
      // console.log(cameraIndexCode);
      return cameraIndexCode;
    },
    getMonitoList() {
      waiweimonitoList().then((res) => {
        this.cameraList = JSON.parse(res.data.data);
        if (this.cameraList.length) {
          this.getMonitorMediaUrlList(this.cameraList[0]);
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
      monitorMediaUrlList(row.cameraIndexCode, row.cameraName).then((res) => {
        this.videoTianWangUrl = JSON.parse(res.data.data).url;
      }).catch((_) => {
        console.log(_);
      });
    },

    changeCameraJianKongByUrl(row, index) {
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

    closeCamera() {
      // this.cameraId = "";
      // this.$store.state.isShowjk = false;
      // this.popupInfo.left = 0;
      // this.popupInfo.top = 0;
      // this.$emit("closeDailog",this.info);
      this.map.clearInfoWindow();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/mixin";

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
  position: absolute;
  left: 39%;
  top: 22%;
  pointer-events: auto;//不可操作地图，可操作按钮
}

.f-camera-popup {
  display: flex;
  flex-direction: column;
  // position: absolute;
  width: 6.62rem;
  height: 7.95rem;
  background: url("/static/bounced-img/big-jk-bg.png") no-repeat;
  background-size: 100% 100%;
  padding: 0.4rem 0.6rem;
  box-sizing: border-box;
  // left: 50%;
  // top: 50%;
  // transform: translate(-30%,-35%);
  margin-left: 0.18rem;
  margin-bottom: 0.5rem;
  z-index: 100;

  .f-close {
    position: absolute;
    width: 0.14rem;
    height: 0.14rem;
    right: 0.27rem;
    top: 0.3rem;
    background: url("http://zjntx-screen.zhihuipk.com/static/tx-img/icon-close.png") no-repeat;
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
      cursor: pointer;
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
</style>
