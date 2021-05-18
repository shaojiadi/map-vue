<template>
  <div class="g-contain">
    <v-map-town ref="mapTown"  />

    <!-- <img
      src="/static/bounced-img/gaojing.png"
      class="alarm"
      @click="toggle"
      alt=""
    />
    <div class="g-datacenterbox">
      <div class="g-datacenterbox-top">
        <div class="g-datacenter-item" v-for="item in unUsualList">
          <div>
            <p class="g-names">{{ item.title }}</p>
            <p class="g-nums">
              <v-countup
                tag="span"
                style="font-size: 0.4rem; color: white"
                :end-value="item.value"
                :duration="1"
              ></v-countup>
              <span class="unit">{{ item.unit }}</span>
            </p>
          </div>
        </div>
      </div>

      <div class="g-datacenterbox-bottom">
        <p class="g-names">附近安保人员</p>
        <ul class="g-datacenterbox-bottom-ul">
          <li
            :key="item"
            v-for="item in 10"
            :class="item <= 7 ? 'active' : ''"
            class="polie-item"
          >
            <img src="/static/bounced-img/police.png" alt="" />
          </li>
          <p class="b-unit">7 <span class="unit">人</span></p>
        </ul>
      </div>
    </div>

    <div
      class="g-right-history"
      ref="rightHistory"
      :class="!isOpen ? 'isopen' : ''"
    >
      <p class="g-right-history-title">历史告警记录</p>
      <div class="company-list-wrap">
        <ul class="company-list">
          <img
            class="turn-of"
            :src="`/static/bounced-img/turn-${!isOpen ? 'open' : 'off'}.png`"
            alt=""
            @click="isOpen = !isOpen"
          />

          <li
            class="company-list-item"
            v-for="(item, index) in wranRecordList"
            :key="index"
          >
            <i></i>
            <span class="history-title">{{ item.name }}</span>
            <span class="history-time"> {{ item.recordDate }}</span>
          </li>
        </ul>
      </div>
    </div> -->
  </div>
</template>

<script>
import {} from "../service/getData";
// import global from '/src/config/mUtils'

export default {
  name: "indexMain",
  data() {
    return {
      isOpen: false,
      firstWarnArr: [
        "周界入侵",
        "异常人员告警",
        "电梯关人",
        "烟感告警",
        "电压告警",
      ],
      wranRecordList: [],
      unUsualList: [
        {
          title: "本月异常告警",
          value: "21",
          unit: "次",
        },
        {
          title: "出入异常统计",
          value: "13",
          unit: "人",
        },
      ],
      policeList: [
        {
          isAct: 1,
        },
        {
          isAct: 1,
        },
        {
          isAct: 1,
        },
        {
          isAct: 0,
        },
      ],
    };
  },
  created() {},
  mounted() {
    let temp = 1;
    for (let index = 0; index < 30; index++) {
      temp += Math.floor(Math.random() * 3) + 1;
      this.wranRecordList.push({
        name: this.firstWarnArr[Math.floor(Math.random() * 5)],
        recordDate: new Date().add("d", -temp).format("yyyy-MM-dd"),
      });
    }

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
  destroyed() {},
  methods: {
    toggle() {
      if (this.isOpen) {
        this.isOpen = false;
        this.$parent.$refs.mapTown.clearMap();
      } else {
        this.isOpen = true;
        this.$parent.$refs.mapTown.clearMap();
        this.$parent.$refs.mapTown.addWarnPoint(true);
      }
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
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/mixin";
.g-maskbgs {
  pointer-events: none;
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
  }
}

.alarm {
  cursor: pointer;
  right: 1.67%;
  top: 8.7%;
  width: 0.35rem;
  height: 0.35rem;
  position: absolute;
  z-index: 9;
}

.g-right-history {
  position: absolute;
  bottom: 1.35rem;
  right: 0;
  z-index: 9;
  transform: translateX(0);
  transition: all 1s;
  &.isopen {
    transform: translateX(100%);
  }
  .g-right-history-title {
    font-size: 0.24rem;
    font-family: AliHYAiHei;
    font-weight: bold;
    color: #ffffff;
    margin-bottom: 0.01rem;
  }
  .company-list-wrap {
    height: 7.56rem;
    width: 3.06rem;
    @include bis("/static/bounced-img/history-shadow.png");
    padding: 0.21rem;
    ::-webkit-scrollbar {
      width: 0;
      height: 0;
      background-color: rgba(212, 234, 250, 0.8);
      border-radius: 0.03rem;
      border-color: #97c4dd;
    }
  }
  .company-list {
    height: 100%;
    width: 100%;
    overflow: auto;
    .turn-of {
      cursor: pointer;
      width: 0.24rem;
      height: 0.2rem;
      position: absolute;
      left: -13%;
      top: 50%;
      transform: translateY(-50%);
    }
    &::before {
      content: "";
      width: 0.2rem;
      height: 1.78rem;
      @include bis("/static/bounced-img/turn-shadow.png");
      position: absolute;
      left: -6%;
      top: 50%;
      transform: translateY(-50%);
    }
    li:nth-child(2n + 1) {
      background: rgba(122, 244, 253, 0.15);
    }
    li:nth-child(2n) {
      background: rgba(20, 33, 43, 0.4);
    }

    .company-list-item {
      width: 2.68rem;
      height: 0.34rem;
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.1rem;
      i {
        width: 0.08rem;
        height: 0.08rem;
        background: #f67c7c;
        border-radius: 50%;
      }
      .history-title {
        color: #7af4fd;
        display: block;
        width: 50%;
      }
      .history-time {
        color: white;
      }
    }
  }
}

.g-datacenterbox {
  position: absolute;
  bottom: 0.48rem;
  left: 0.31rem;
  z-index: 9;
  .g-datacenterbox-top {
    display: flex;
    align-items: center;
    .g-datacenter-item {
      position: relative;
      display: flex;
      align-items: center;
      margin-right: 0.8rem;

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
        }
      }
    }
  }

  .g-names {
    font-size: 0.18rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: #7af4fd;
    margin-bottom: 0.13rem;
  }

  .g-datacenterbox-bottom {
    margin-top: 0.29rem;
    .g-datacenterbox-bottom-ul {
      display: flex;
      margin-top: 0.16rem;
      .polie-item {
        opacity: 0.3;
        &.active {
          opacity: 1;
        }

        img {
          display: block;
          width: 0.15rem;
          height: 0.45rem;
          margin-right: 0.19rem;
        }
      }

      .b-unit {
        font-size: 0.36rem;
        font-family: RTWS ShangGothic G0v1;
        font-weight: bold;
        color: #ffffff;
        margin-left: 0.46rem;
        span {
          margin-left: 0.26rem;
          font-size: 0.18rem;
          font-family: PingFang SC;
          font-weight: bold;
          color: #ffffff;
          opacity: 0.4;
        }
      }
    }
  }
}
</style>
