<template>
  <div class="g-contain second-page" @click="$setPoint">
    <div class="g-town-nav g-zindexs">
      <h4 class="g-town-tit">
        蓝湾智谷
        <p class="back-img" @click="$router.push('/indexMain')">返回</p>
      </h4>

      <ul class="g-leftnavbox">
        <li
          v-for="(item, index) in navList"
          :key="index"
          :class="tempId === item.id ? 'g-active' : 'g-left'"
          @click.stop="changeTempId(item.id)"
        >
          <p>{{ item.label }}</p>
        </li>
      </ul>
    </div>
    <div class="left-bottom" v-if="tempId === 1 && !dialogShow">
      <p class="safe-title">关键监控点位</p>
      <p class="left-bottom-w-title" @click.capture="getOrOpenUrl('蓝湾鹰眼',1)"></p>
      <div class="left-bottom-w">
          
        <div class="left-bottom-w-left" @click="getOrOpenUrl('蓝湾鹰眼',1)">
          <img src="/static/bounced-img/guanjian-1.jpg"  alt="" />
          <!-- <v-hikVideo
            id="ifram1"
            :activeCameraIndexCode="getOrOpenUrl('蓝湾鹰眼')"
          ></v-hikVideo> -->
        </div>

        <div class="left-bottom-w-right">
          <div class="left-bottom-right-itme">
            <div
              style="height: 0.92rem; width: 1.6rem"
              @click="getOrOpenUrl('二号楼楼顶',1)"
            >
              <img src="/static/bounced-img/video-img22.jpg" alt="" />
              <!-- <v-hikVideo
                id="ifram2"
                :activeCameraIndexCode="getOrOpenUrl('西马路中间')"
              ></v-hikVideo> -->
            </div>
            <!-- <p>片段四 2020:09:15</p> -->
          </div>
          <div class="left-bottom-right-itme">
            <div
              style="height: 0.92rem; width: 1.6rem"
              @click="getOrOpenUrl('4楼电梯厅',1)"
            >
              <img src="/static/bounced-img/video-img33.jpg" alt="" />
              <!-- <v-hikVideo
                id="ifram3"
                :activeCameraIndexCode="getOrOpenUrl('蓝湾警务室南')"
              ></v-hikVideo> -->
            </div>
            <!-- <p>片段四 2020:09:15</p> -->
          </div>
        </div>
      </div>
    </div>

    <!-- <v-safeDialog
      v-if="tempId === 1 && dialogShow"
      @close="dialogShow = false"
    ></v-safeDialog> -->

    <div v-if="tempId === 1" class="g-town-situation safe">
      <p class="safe-title">安防告警</p>
      <transition-group tag="ul" name="list">
        <li
          v-for="(item, index) in $store.state.warnList"
          :key="item.key"
          class="item-warn"
          :class="[item.isWarn == 1 ? 'warn' : 'resolve']"
        >
          <div class="f-camera-popup-warn">
            <img class="warn-img" src="/static/bounced-img/jk.png" alt="" />
            <div>
              <p class="warn-situation">
                {{ item.name }}
              </p>
              <p class="warn-area-p">
                <img
                  src="/static/bounced-img/warn-icon.png"
                  class="warn-area"
                  alt=""
                />
                园区正大门
              </p>
              <p class="warn-situation" @click="showWarnPoint(item, index)">
                {{ item.isWarn ? "查看详情>>" : "已解决" }}
              </p>
            </div>
          </div>
        </li>
      </transition-group>
    </div>

    <v-chelanPoint
      v-if="tempId === 1"
      @changeVehicle="toCheLiangManger"
    ></v-chelanPoint>

    <v-warnPoint
      v-if="tempId === 1"
      ref="warnPoint"
      @jiankong="showDialogVideo"
    ></v-warnPoint>

    <v-jiankong v-if="tempId === 1 && !dialogShow"></v-jiankong>

    <v-patrolPoint v-if="tempId === 7"></v-patrolPoint>

    <!-- <transition name="slide-sace"> -->
      <v-safeDialog v-if="saceShow && tempId === 1 " @close="saceShow = false"></v-safeDialog>
    <!-- </transition> -->

    <transition name="slide-left">
      <v-elevatorManage
        v-if="elevatorShow && tempId === 6"
        @close="elevatorShow = false"
      ></v-elevatorManage>
    </transition>

    <transition name="slide-left">
      <v-vehicle-manage
        ref="cheliang"
        v-show="vehiclePopupShow && tempId === 4"
        @close="vehiclePopupShow = false"
        :toID="toID"
      ></v-vehicle-manage>
    </transition>

    <transition name="slide-left">
      <v-energy-manage
        v-if="energyManagePopupShow && tempId === 3"
        @close="energyManagePopupShow = false"
      ></v-energy-manage>
    </transition>

    <transition name="slide-left">
      <v-intelligent-fire-control
        v-if="fireControlPopupShow && tempId === 2"
        @close="fireControlPopupShow = false"
      ></v-intelligent-fire-control>
    </transition>

    <transition name="slide-left">
      <v-throughControl
        v-if="pedestrianShow && tempId === 5"
        @close="pedestrianShow = false"
      ></v-throughControl>
    </transition>
    <div class="g-datacenterbox g-zindexs" v-if="tempId === 5">
      <div
        class="g-datacenter-item"
        v-for="(item, index) in parkingLotList"
        :key="index"
      >
        <div>
          <p class="g-names">{{ item.title }}</p>
          <p class="g-nums">
            {{ item.number }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { companyListSearch, companyBaseInfoXW } from "../service/getData";
import axios from "axios";
let monitoList = () => axios.get(`/mortar/screen/monitoList`);

export default {
  name: "index",
  data() {
    return {
      parkingLotList: [
        { title: "今日入园", number: 173 },
        { title: "今日出园", number: 72 },
        { title: "今日访客", number: 76 },
        { title: "异常通行", number: 3 },
      ],
      toID: 0,
      tempId: 1,
      compLists: [],
      saceShow: false,
      warnList: [],
      dialogShow: false,
      cameraPopupShow: false,
      pedestrianShow: false,
      monitorEquipmentShow: false,
      energyPopupShow: false,
      pedestrianPopupShow: false,
      devicePopupShow: false,
      buildPopupShow: false,
      vehiclePopupShow: false,
      protectionPopupShow: false,
      fireControlPopupShow: false,
      environmentManagePopupShow: false,
      personnelManagePopupShow: false,
      energyManagePopupShow: false,
      elevatorShow: false,
      navList: [
        {
          id: 1,
          label: "安防视频",
        },
        {
          id: 4,
          label: "车辆管理",
        },
        {
          id: 5,
          label: "人行管理",
        },
        {
          id: 7,
          label: "智慧巡检",
        },
        {
          id: 2,
          label: "消防监测",
        },
        {
          id: 3,
          label: "能耗监测",
        },
        {
          id: 6,
          label: "智慧梯控",
        },
      ],
      data1: [],
      areaId: 0,
      intervalHandel: null,
      time: 0,
      carNum: 1000,
      visitorNum: 0,
    };
  },
  created() {},
  mounted() {
    monitoList()
      .then((res) => {
        this.$store.state.videoList = JSON.parse(res.data.data);
      })
      .catch((_) => {
        console.log(_);
      });
    this.initWarnList();
    this.randomFn({
      dataName: "carNum", // 字段名
      defNum: 895, // 默认数值
      direction: 0, // 数值自增或自减  （-1：自减，0：自增或自减， 1：自增）
      changeTimeMin: 5, // 数值切换时间的最小值
      changeTimeMax: 180, // 数值切换时间的最大值
      visitorNumMin: 1, // 数值切换的最小数量
      visitorNumMax: 2, // 数值切换的最大数量
      numMin: 0, // 数值的最小值
      numMax: 1000, // 数值的最大值
    });
    this.randomFn({
      dataName: "visitorNum",
      defNum: 38,
      direction: 1,
      changeTimeMin: 5,
      changeTimeMax: 180,
      visitorNumMin: 1,
      visitorNumMax: 6,
      numMin: 0,
      numMax: 2000,
    });
  },
  destroyed() {
    this.closeinterval();
  },
  methods: {
    getOrOpenUrl(local, isOpen) {
      let cameraIndexCode = "";
      this.$store.state.videoList.forEach((item) => {
        if (local == item.cameraName) {
          cameraIndexCode = item.cameraIndexCode;
        }
      });
      if (isOpen) {
        this.$store.state.activeCameraIndexCode = cameraIndexCode;
        this.saceShow = true;
      }else{
          return cameraIndexCode;
      }
    },
    initWarnList() {
        
      let inList = [
        {
          name: "人员聚集告警！",
          isWarn: 1,
          key: 1,
          id: 1,
          pos: [12.94, 6.24],
          reason: "人员聚集告警点",
          video: "rtmp://47.97.107.52:1940/live/qdgx31",
          active: 0,
          rotate: 1,
          title: "人员聚集告警",
          record: "2020-11-22 11:12",
          locals: "蓝湾智谷-园区大门监控",
          area: "银行区域",
          localName:'西马路中间',
        },
        {
          name: "消防运行告警！",
          isWarn: 1,
          key: 2,
          id: 2,
          pos: [9.61, 2.35],
          reason: "消防运行告警点",
          video: "rtmp://47.97.107.52:1940/live/qdgx38",
          active: 0,
          rotate: 1,
          title: "消防运行告警",
          record: "2020-11-22 11:12",
          locals: "蓝湾智谷-楼内监控",
          area: "-",
          localName:'4楼电梯厅',
        },
        {
          name: "异常人员出入！",
          isWarn: 1,
          key: 3,
        },
        // {
        //   name: "人员轨迹异常！",
        //   isWarn: 0,
        //   key: 4,
        // },
        // {
        //   name: "人员轨迹异常！",
        //   isWarn: 0,
        //   key: 5,
        // },
      ];
      let tempI = 0;
      let interval = setInterval(() => {
        if (this.$store.state.warnList.length < 3) {
          this.$store.state.warnList.push(inList[tempI]);
        } else {
          window.clearInterval(interval);
        }
        tempI++;
      }, 1000);
    },

    showDialogVideo(localName) {
     
console.log(localName);
this.getOrOpenUrl(localName,1)
    //   this.$store.state.videoList.forEach((item) => {
    //     if (bk == item.cameraName) {
    //        this.$store.state.activeCameraIndexCode = item.cameraIndexCode;
    //              this.saceShow = true;
    //     }
    //   });



    },

    toCheLiangManger(bk) {
      let tempId = 0;
      if (bk.local == "园区大数据中心") {
        tempId = 2;
      } else {
        tempId = 1;
      }
      this.toID = tempId;
      this.changeTempId(4);
    },
    showWarnPoint(item, index) {
      if (item.name == "人员聚集告警！" || item.name == "消防运行告警！") {
        this.$store.state.warnList[index].active = 1;
      }
    },
    go(url) {
      window.open(url);
    },
    changeTempId(id) {
      this.tempId = id;
      if (id === 1) {
        this.devicePopupShow = true;
      } else if (id === 2) {
        this.fireControlPopupShow = true;
      } else if (id === 3) {
        this.energyManagePopupShow = true;
      } else if (id === 4) {
        this.vehiclePopupShow = true;
      } else if (id === 5) {
        this.pedestrianShow = true;
      } else if (id === 6) {
        this.elevatorShow = true;
      }
    },
    detail(item) {
      companyBaseInfoXW({ companyId: item.companyId })
        .then((res) => {
          this.$store.state.companyInfo = res.data.data.company;
          this.$store.state.companyInfoShow = true;
        })
        .catch((_) => {
          console.log(_);
        });
    },
    randomFn(def) {
      let time = null;
      let _this = this;
      _this[def.dataName] = def.defNum;
      function fn() {
        clearTimeout(time);
        let random = parseInt(
          (def.changeTimeMin + Math.random() * def.changeTimeMax) * 1000
        ); //5-55 s
        let randompep = parseInt(
          def.visitorNumMin + Math.random() * def.visitorNumMax
        ); //1-6 人
        if (def.direction == 0) {
          Math.random() > 0.75 ? (def.direction = 1) : (def.direction = -1);
        }
        let hours = new Date().getHours();
        if (hours == 7 || hours == 0) {
          _this[def.dataName] = def.defNum;
        }
        if (_this[def.dataName] <= def.numMin) {
          _this[def.dataName] = def.numMin;
        }
        if (_this[def.dataName] >= def.numMax) {
          _this[def.dataName] = def.numMax;
        }
        time = setTimeout(() => {
          _this[def.dataName] += randompep * def.direction;
          fn();
        }, random);
      }
      fn();
    },
    interval() {
      //this.closeinterval();
      this.intervalHandel = setInterval(() => {
        /* if (this.tempId === 6) {
          this.tempId = 1;
        } else {
          this.tempId++;
        } */
        this.time++;
        if (this.time > 900) {
          //3个小时刷新
          window.location.reload();
        }
      }, 12000);
    },
    closeinterval() {
      if (this.intervalHandel) {
        window.clearInterval(this.intervalHandel);
        this.intervalHandel = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/mixin";

.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(30px);
}
.list-move {
  transition: transform 1s;
}

.list-leave-active {
  position: absolute;
}

.slide-left-enter-active {
  animation: slide-in-left 1s;
}

.slide-left-leave-active {
  animation: slide-leave-left 1s;
}
@keyframes slide-in-left {
  0% {
    z-index: 190;
    opacity: 0;
    transform: scale(0.6) translateX(-200%);
  }

  50% {
    z-index: 190;
    opacity: 1;
    transform: scale(0.6) translateX(0);
  }

  100% {
    z-index: 200;
    opacity: 1;
    transform: scale(1) translateX(0);
  }
}

@keyframes slide-leave-left {
  0% {
    z-index: 190;
    opacity: 1;
  }

  50% {
    z-index: 190;
    transform: scale(0.6);
  }

  100% {
    z-index: 190;
    opacity: 0;
    transform: scale(0.6) translateX(-200%);
  }
}

.left-bottom {
  width: 6rem;
  position: absolute;
  bottom: 0.2rem;
  margin: 0 0 0 0.2rem;
  .left-bottom-w-title {
    width: 3.6rem;
    height: 0.18rem;
    border: 0.01px solid rgba(43, 132, 178, 0.68);
    @include bis("/static/bounced-img/全局鹰眼.png");
  }
  .left-bottom-w {
    height: 2.3rem;
    display: flex;
    img {
      width: 100%;
      height: 100%;
    }
    &::after {
      content: "";
      width: 1rem;
      height: 1rem;
      background-image: url("/static/bounced-img/point-right.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      position: relative;
      bottom: 0rem;
      right: 0.4rem;
      position: absolute;
    }
    .left-bottom-w-left {
      width: 3.6rem;
      height: 2.02rem;
      border: 1px solid;
      margin-right: 0.17rem;
    }
    .left-bottom-w-right {
      .left-bottom-right-itme {
        width: 1.6rem;
        height: 0.9rem;
        margin-bottom: 0.22rem;
      }
      p {
        color: white;
        width: 1.6rem;
        padding: 0 0.05rem;
        background: #494d5b;
      }
    }
  }
}

.g-contain {
  width: 100%;
  height: 100%;
}

/*左边*/
.g-town-nav {
  position: absolute;
  top: 1.09rem;
  padding: 0 0 0 0.3rem;
  .g-town-tit {
    width: 3rem;
    height: 0.23rem;
    font-size: 0.24rem;
    font-family: AliHYAiHei;
    font-weight: bold;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .back-img {
      cursor: pointer;
      color: #ffffff;
      width: 1.01rem;
      height: 0.51rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: url("/static/bounced-img/back.png") no-repeat;
      background-size: 100% 100%;
    }
  }
  .g-tit-botline {
    position: relative;
    width: 2rem;
    height: 1px;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 0)
    );
    opacity: 0.6;
    &:after {
      position: absolute;
      right: 0;
      bottom: 0.02rem;
      content: "";
      width: 0.18rem;
      height: 0.02rem;
      background: rgba(255, 255, 255, 1);
      opacity: 0.8;
    }
  }
  .g-townarea {
    margin-top: 0.11rem;
    width: 2rem;
    height: 0.46rem;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0px 0.06rem 0.1rem 0px rgba(2, 41, 85, 0.75);
    text-align: center;
    line-height: 0.46rem;
    font-size: 0.36rem;
    font-family: alterbatebold;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    span {
      font-size: 0.26rem;
      color: rgba(255, 255, 255, 1);
      margin-top: 0.05rem;
    }
  }
}

.safe-title {
  width: 1.51rem;
  height: 0.23rem;
  font-size: 0.24rem;
  font-family: AliHYAiHei;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 0.27rem;
}

.safe {
  @mixin warnP() {
    font-size: 0.18rem;
    font-family: PingFang SC;
    font-weight: bold;
  }

  .warn {
    @include bis("/static/bounced-img/warn.png");
    .warn-situation {
      cursor: pointer;
      color: #e82c37;
    }
  }
  .resolve {
    @include bis("/static/bounced-img/resolve.png");
    .warn-situation {
      color: #1fb0d9;
    }
  }

  .item-warn {
    width: 2.79rem;
    height: 1.4rem;
    margin-bottom: 0.16rem;
    padding-top: 0.35rem;
    padding-left: 0.2rem;

    &:last-of-type {
      //   box-shadow: inset 0rem -0.5rem 1rem #2f4f4f;
    }

    .f-camera-popup-warn {
      display: flex;

      .warn-img {
        width: 0.86rem;
        height: 0.86rem;
        margin-right: 0.13rem;
      }
      .warn-situation {
        @include warnP();
      }

      .warn-area-p {
        display: flex;
        align-items: center;
        height: 0.14rem;
        font-size: 0.14rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
        opacity: 0.6;

        .warn-area {
          width: 0.15rem;
          height: 0.18rem;
          margin-right: 0.1rem;
        }
      }

      p {
        margin-bottom: 0.1rem;
      }
    }
  }
}

/*右边*/
.g-town-situation {
  position: absolute;
  top: 1.05rem;
  height: 9.26rem;
  right: 0.5rem;
  width: 2.78rem;

  .screen-btn {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -0.6rem;
    border: 1px solid #3ea6ff;
    border-radius: 0.05rem;
    color: #4fe9fe;
    background: linear-gradient(6deg, #54fefe 0%, #3ea6ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    font-size: 0.16rem;
    width: 1.8rem;
    height: 0.36rem;
    line-height: 0.34rem;
    text-align: center;
    cursor: pointer;
  }
  .empty-wrap {
    margin: 1rem auto;
    text-align: center;
    img {
      @include wh(2.12rem, 1.63rem);
    }
    .empty-companyLists {
      margin-top: 0.22rem;
      font-size: 0.18rem;
      font-family: Adobe Heiti Std;
      font-weight: normal;
      color: rgba(99, 183, 251, 1);
    }
  }
  .company-list {
    overflow: auto;
    height: 8.6rem;
    width: 3.9rem;
    padding-right: 0.1rem;
    margin-top: 0.2rem;
    .total-company {
      position: absolute;
      right: 0.4rem;
      top: 0;

      height: 0.17rem;
      font-size: 0.14rem;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 0.17rem;
      color: #a4a8b3;
      .totoal-company-number {
        color: white;
        font-size: 0.18rem;
      }
    }
    &::-webkit-scrollbar {
      width: 0.01rem;
      height: 0.01rem;
      background-color: rgba(212, 234, 250, 0.8);
      border-radius: 0.03rem;
      border-color: #97c4dd;
    }
  }
  .company-item {
    cursor: pointer;
    display: flex;
    margin-bottom: 0.2rem;
    background: url(../../static/images/li-bg.png);
    padding: 0.15rem 0 0.17rem 0.11rem;
    background-size: 100% 100%;
    align-items: center;
    &:hover {
      background: rgba(24, 52, 115, 1);
    }
    &:last-child {
      margin-bottom: 0;
    }
    img {
      @include wh(0.48rem, 0.48rem);
      margin-right: 0.1rem;
    }
    .company-info {
      flex: 1;
      padding-right: 0 0.1rem;
    }
    .p1 {
      line-height: 1;
      font-size: 0.16rem;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
    }
    .p2 {
      font-size: 0.14rem;
      margin-top: 0.08rem;
      position: relative;
      display: flex;
      .p-l {
        flex: 1;
        margin-right: 0.1rem;
      }
      .time,
      .more {
        font-size: 0.14rem;
        font-family: PingFang SC;
        font-weight: 600;
        color: rgba(79, 233, 254, 1);
        margin-right: 0.1rem;
        background: linear-gradient(
          6deg,
          rgba(84, 254, 254, 1) 0%,
          rgba(62, 166, 255, 1) 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .more {
        flex-shrink: 0;
      }
    }
  }

  .g-situations {
    position: relative;
    margin-bottom: 0.28rem;
    &:before {
      position: absolute;
      bottom: -0.02rem;
      left: -0.03rem;
      content: "";
      width: 1.57rem;
      height: 0.06rem;
      background: linear-gradient(
        90deg,
        rgba(0, 150, 239, 1),
        rgba(0, 253, 252, 0)
      );
      z-index: 21;
    }
    p {
      position: relative;
      z-index: 22;
      font-size: 0.2rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 1;
    }
  }
  .g-situations-line {
    position: relative;
    width: 3.8rem;
    height: 1px;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 0)
    );
    opacity: 0.5;
    &:after {
      position: absolute;
      right: 0;
      bottom: -0.02rem;
      content: "";
      width: 0.18rem;
      height: 0.02rem;
      background: rgba(255, 255, 255, 1);
      opacity: 0.8;
    }
  }
  .g-situations-tit {
    margin-top: 0.2rem;
    font-size: 0.16rem;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 1;
  }
  .g-situations-activity {
    width: 3.8rem;
    height: 2.38rem;
  }
  .g-situations-type {
    .g-typebox {
      display: flex;
      justify-content: space-between;
      padding: 0.25rem 0 0.4rem 0;
      .p-type-name {
        font-size: 0.14rem;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        opacity: 0.8;
        margin-bottom: 0.07rem;
        text-align: center;
      }
      .p-type-per {
        line-height: 0.16rem;
        font-size: 0.2rem;
        font-family: alterbatebold;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        margin-bottom: 0.26rem;
      }
    }
  }
}

.g-leftnavbox {
  margin-top: 0.42rem;
  margin-left: -0.2rem;
  height: 5.8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  li {
    position: relative;
    // margin-bottom: 0.48rem;
    transition: all 0.4s;
    @include fjqd();
  }

  .g-left {
    width: 1.85rem;
    height: 0.6rem;
    @include bis("/static/bounced-img/left.png");
    margin-bottom: 0.34rem;
  }
  .g-active {
    width: 3.25rem;
    height: 1.13rem;
    @include bis("/static/bounced-img/left-active.png");
    p {
      position: relative;
      top: -0.1rem;
    }
  }
}

.g-situaflex {
  display: flex;
  justify-content: space-between;
  p {
    margin-top: 0.2rem;
    font-size: 0.14rem;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1;
    span {
      font-family: alterbatebold;
      font-size: 0.17rem;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
    }
  }
}
.g-situaflex1 {
  display: flex;
  justify-content: space-between;
  p {
    margin-top: 0.2rem;
    font-size: 0.12rem;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1;
    span {
      font-family: alterbatebold;
      font-size: 0.14rem;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
    }
  }
}
/*小镇人流量概况*/
.g-structure {
  width: 100%;
  height: 2.61rem;
}
.g-output {
  width: 100%;
  height: 2.33rem;
}
.g-advantaged {
  width: 100%;
  height: 2rem;
}

/*投资者情况*/
.g-financing {
  width: 100%;
  height: 2.24rem;
}
.g-investment {
  width: 100%;
  height: 2.38rem;
}
.g-proportion {
  width: 100%;
  height: 2.8rem;
}

/*人才概况*/
.g-leadingtalents {
  width: 100%;
  height: 3.44rem;
}
.g-demand {
  width: 100%;
  height: 5.01rem;
}

/*小镇概况*/
.g-residence {
  width: 100%;
  height: 3.64rem;
}
.g-numberofenterprises {
  width: 100%;
  height: 2.34rem;
}
.g-patenttypes {
  width: 100%;
  height: 2.2rem;
}

/*孵化成果*/
.g-incubation {
  width: 100%;
  height: 1.68rem;
}
.g-companytypes {
  width: 100%;
  height: 2.78rem;
}

.g-areaboxs {
  position: absolute;
  width: 2.04rem;
  height: 2.04rem;
  left: 0.3rem;
  bottom: 0.31rem;
  padding-left: 0.23rem;
  padding-top: 0.13rem;
  background: url("../assets/image/img-caozuo.png") no-repeat;
  background-size: 100% 100%;
  .g-areamap {
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 50%;
    overflow: hidden;
  }
  .g-handlebox {
    position: absolute;
    top: 0.13rem;
    left: 0.23rem;
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 50%;
    overflow: hidden;
    .g-imgmask {
      width: 1.3rem;
      height: 1.35rem;
      margin-top: 0.11rem;
      margin-left: 0.15rem;
    }
    .g-imgup1,
    .g-imgdown1 {
      position: absolute;
      left: 0.72rem;
      width: 0.16rem;
      height: 0.09rem;
      cursor: pointer;
    }
    .g-imgup1 {
      top: 0.54rem;
    }
    .g-imgdown1 {
      top: 0.97rem;
    }
    .g-imgcir1 {
      position: absolute;
      top: 0.77rem;
      left: 0.77rem;
      width: 0.06rem;
      height: 0.06rem;
    }
  }
}
.g-datacenterbox {
  position: absolute;
  top: 0.76rem;
  display: flex;
  align-items: center;
  left: 5.35rem;
  .g-datacenter-item {
    position: relative;
    display: flex;
    align-items: center;
    margin-right: 2rem;
    &:last-child {
      margin-right: 0;
    }
    img {
      display: block;
      width: 0.45rem;
      height: 0.45rem;
      margin-right: 0.18rem;
    }
    .g-nums {
      font-size: 0.36rem;
      font-family: RTWS ShangGothic G0v1;
      font-weight: bold;
      color: #ffffff;
      .unit {
        width: 0.18rem;
        height: 0.18rem;
        font-size: 0.18rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
        opacity: 0.4;
        margin-left: 0.05rem;
      }
    }
    .g-names {
      width: 1.67rem;
      height: 0.24rem;
      @include bis("/static/bounced-img/top-center-bg.png");
      font-size: 0.16rem;
      font-family: PingFang SC;
      font-weight: bold;
      color: rgba(122, 244, 253, 1);
      margin-bottom: 0.13rem;
      padding: 0 0.2rem;
    }
  }
}
</style>
