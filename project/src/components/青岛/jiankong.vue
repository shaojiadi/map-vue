<template>
  <ul class="camera">
    <li
      class="camera-item"
      v-for="(item, index) in cameraList"
      :key="index"
      :style="`left: ${item.pos[0]}rem;top: ${item.pos[1]}rem;`"
      :class="[
        'camera-position-' + (index + 1),
        cameraId === item.id ? 'active' : '',
        'hiddened',
      ]"
      :ref="'camera-' + (index + 1)"
    >
      <div
        class="f-camera-popup"
        ref="camera-popup"
        v-if="cameraId === item.id"
      >
        <div class="f-camera-popup-header">
          <div class="f-camera-popup-btn" :class="{ active: btnActive === 1 }">
            <p class="head-title">重点监控点位-{{ item.local }}</p>
            <img
              src="/static/bounced-img/jk-close.png"
              @click.stop="closeCamera"
              alt=""
            />
          </div>
        </div>
        <div class="f-camera-popup-content" v-show="btnActive === 1">
          <div class="f-camera-popup-video">

                 <v-video  :src="item.video"     v-if="item.videojs"></v-video>
            <v-hikVideo
              :id="'iframeT' + item.id"
              :activeCameraIndexCode="getUrl(item.local)"
             v-else 
            ></v-hikVideo>

       
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

      <img
        class="bottom-img"
        @click.stop="changeCameraJianKongByUrl(item, index)"
        src="/static/bounced-img/jiankong.png"
        alt
      />
    </li>
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
      videoTianWangUrl: "",
      inNum: 4356,
      outNum: 3216,
      interval1: null,
      videoList: [],
      btnActive: 1,
      warnRadioShow: false,
      activeCameraIndexCode: "",
      cameraId: "",
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
  mounted() {
    console.log(this.$store.state.videoList);
    // this.getScreenIndex();
    // this.getMonitoList();
    // monitoList()
    //   .then((res) => {
    //     console.log(1);
    //     this.videoList = JSON.parse(res.data.data);
    //   })
    //   .catch((_) => {
    //     console.log(_);
    //   });
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
      console.log(cameraIndexCode);
      return cameraIndexCode;
    },
    getMonitoList() {
      waiweimonitoList()
        .then((res) => {
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
      monitorMediaUrlList(row.cameraIndexCode, row.cameraName)
        .then((res) => {
          this.videoTianWangUrl = JSON.parse(res.data.data).url;
        })
        .catch((_) => {
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
  .camera-item {
    position: absolute;
    width: 0.45rem;
    height: 0.53rem;
    cursor: pointer;

    &.hiddened {
      .f-camera-popup {
        background-size: 100% 100%;
        top: 0.8rem;
        margin-top: 0.5rem;
        padding-top: 0.2rem;
        padding-bottom: 0;

        .f-close {
          top: 0.45rem;
        }
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
      width: 100%;
      height: 100%;
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
  display: none;
  flex-direction: column;
  position: fixed;
  width: 6.62rem;
  height: 7.95rem;
  background: url("/static/bounced-img/big-jk-bg.png") no-repeat;
  background-size: 100% 100%;
  padding: 0.4rem 0.6rem;
  box-sizing: border-box;
  left: 12.37rem;
  top: 8.82rem;
  transform: translateX(-50%);
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
