<template>
  <div
    class="contain"
    style="position: relative; z-index: 10; width: 100%; height: 100%"
  >
    <v-mask />
    <div class="g-town-situation-left">
      <h4 class="g-situations-tit">设备运行状况监测</h4>

      <ul>
        <li
          v-for="(item, index) in conditionList"
          :key="index"
          class="company-item"
        >
          <img :src="item.Logo" alt="" class="logo" />
          <div class="p-l">
            <p class="p-l-t">
              {{ item.title }}
            </p>
            <v-countup
              tag="div"
              class="p-l-v"
              :end-value="item.value"
              :duration="1"
            ></v-countup>
          </div>
        </li>
      </ul>

      <h4 class="g-situations-tit week" style="margin: 0.4rem 0 0.27rem 0">
        设备运行状况监测
        <div class="week-rt">
          本周统计
          <img src="/static/bounced-img/data/down.png" alt="" />
        </div>
      </h4>
      <div style="height: 2.3rem; width: 4rem">
        <v-barPiecewise></v-barPiecewise>
        <!-- <v-barFinancingChart></v-barFinancingChart> -->
      </div>

      <h4 class="g-situations-tit" style="margin: 0.58rem 0 0 0">
        网络安全防御模型
      </h4>
      <div class="pieChart">
        <v-pieChart></v-pieChart>
        <img
          src="/static/bounced-img/data/person.png"
          class="center-per"
          alt=""
        />
      </div>
    </div>

    <!--  中间center  -->
    <div class="g-datacenterbox g-zindexs">
      <div class="g-datacenter-item">
        <div>
          <p class="g-names">实有人口数量</p>
          <p class="g-nums">
            <v-countup
              class="g-nums-value"
              tag="span"
              :end-value="320"
              :duration="1"
            ></v-countup>
            <span class="unit">人</span>
          </p>
        </div>
      </div>
      <div class="g-datacenter-item">
        <div>
          <p class="g-names">实有房屋数量</p>
          <p class="g-nums">
            <v-countup
              tag="span"
              class="g-nums-value"
              :end-value="216"
              :duration="1"
            ></v-countup>
            <span class="unit">套</span>
          </p>
        </div>
      </div>
      <div class="g-datacenter-item">
        <div>
          <p class="g-names">实有单位数量</p>
          <p class="g-nums">
            <v-countup
              tag="span"
              class="g-nums-value"
              :end-value="29"
              :duration="1"
            ></v-countup>
            <span class="unit">家</span>
          </p>
        </div>
      </div>
    </div>

    <div class="g-town-situation-right">
      <h4 class="g-situations-tit" style="margin: 0 0 0.26rem 0">
        人员信息统计情况
      </h4>

      <ul class="statistical-top">
        <li
          v-for="(item, index) in statisticalList"
          :key="index"
          class="company-item"
        >
          <p class="g-names">{{ item.title }}</p>
          <p class="g-nums">
            <v-countup
              tag="span"
              class="g-unms-svalue"
              :end-value="item.value"
              :duration="1"
            ></v-countup>
            <span class="unit">{{ item.unit || "人" }}</span>
          </p>
        </li>
      </ul>

      <h4 class="g-situations-tit week" style="margin: 0.58rem 0 0.21rem 0">
        人员流量频次分析
        <div class="week-rt">
          本周统计
          <img src="/static/bounced-img/data/down.png" alt="" />
        </div>
      </h4>

      <ul class="equipment-operation">
        <li class="f-li">
          <p>内部总体人数</p>
          <p class="equipment-bottom-value">
            <v-countup tag="i" :end-value="320" :duration="1"></v-countup>
            人
          </p>
        </li>
        <li>
          <p>外来访客人数</p>
          <p class="equipment-bottom-value">
            <v-countup tag="i" :end-value="210" :duration="1"></v-countup>
            人
          </p>
        </li>
      </ul>

      <ul class="tab-list">
        <li
          v-for="(item, index) in tabList"
          :key="index"
          @click="
            isInPut = item.isIn;
            inDate = item.inDate;
            outDate = item.outDate;
          "
          class="show-item"
          :class="item.isIn == isInPut ? 'active' : ''"
        >
          {{ item.name }}
        </li>
      </ul>

      <div style="width: 3.8rem; height: 1.64rem">
        <v-lineInvestmentChart
          :insideDate="inDate"
          :outsideDate="outDate"
        ></v-lineInvestmentChart>
      </div>

      <h4 class="g-situations-tit week" style="margin: 0.5rem 0 0.25rem 0">
        区域安防统计分析
        <div class="week-rt">
          本周统计
          <img src="/static/bounced-img/data/down.png" alt="" />
        </div>
      </h4>
      <div class="area-title">
        <p class="blue" style="margin-right: 0.5rem">消警次数</p>
        <p class="yellow">告警次数</p>
      </div>
      <v-areaElectricity></v-areaElectricity>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inDate:[472, 425, 491, 416, 457, 462, 486],
      outDate:    [124, 192, 153, 142, 105, 172, 135] ,
      isInPut: 1,
      conditionList: [
        {
          Logo: "/static/bounced-img/data/icon1.png",
          title: "周界入侵",
          value: "26",
        },
        {
          Logo: "/static/bounced-img/data/icon2.png",
          title: "人员异常",
          value: "31",
        },
        {
          Logo: "/static/bounced-img/data/icon3.png",
          title: "电梯关人",
          value: "20",
        },
        {
          Logo: "/static/bounced-img/data/icon4.png",
          title: "烟感告警",
          value: "06",
        },
      ],
      tabList: [
        {
          name: "进入",
          isIn: 1,
          inDate:[472, 425, 491, 416, 457, 462, 486],
          outDate:  [124, 192, 153, 142, 105, 172, 135] ,
        },
        {
          name: "离开",
          isIn: 0,
          inDate: [472, 425, 491, 416, 457, 462, 486],
          outDate: [98, 20, 56, 83, 204, 457, 109] ,
        },
      ],
      statisticalList: [
        {
          title: "业主",
          value: "129",
          unit: "",
        },
        {
          title: "租客",
          value: "191",
          unit: "",
        },
        {
          title: "常驻办公人员",
          value: "235",
          unit: "",
        },
        {
          title: "固定车辆",
          value: "651",
          unit: "辆",
        },
        {
          title: "流动人口数量",
          value: "763",
          unit: "",
        },
        {
          title: "安保人员数量",
          value: "25",
          unit: "",
        },
      ],
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="scss">
@import "../assets/css/mixin";

.pieChart {
  width: 4.5rem;
  height: 3.64rem;
  position: relative;
  .center-per {
    position: absolute;
    width: 0.7rem;
    height: 0.7rem;
    @include center();
  }
}

.tab-list {
  display: flex;
  position: absolute;
  z-index: 9;
  cursor: pointer;
  li {
    height: 0.16rem;
    font-size: 0.16rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
    margin-right: 0.38rem;
  }
  .show-item {
    opacity: 0.5;
    position: relative;
    &.active {
      opacity: 1;

      &::after {
        content: "";
        position: absolute;
        width: 0.24rem;
        height: 0.02rem;
        background: linear-gradient(90deg, #2b84b2 0%, #32cced 100%);
        bottom: -0.1rem;
        left: 0.05rem;
      }
    }
  }
}

.equipment-operation {
  display: flex;
  margin-bottom: 0.23rem;
  li {
    width: 1.6rem;
    height: 0.58rem;
    @include bis("/static/bounced-img/shadow-bg.png");
    margin: 0.1rem;
    padding: 0.05rem 0.2rem;
    &.f-li {
      margin-right: 0.55rem;
    }
    p {
      font-size: 0.16rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(254, 254, 254, 0.4);
      line-height: 0.22rem;
      &.equipment-bottom-value {
        margin-top: 0.05rem;
        i {
          width: 0.41rem;
          height: 0.18rem;
          font-size: 0.24rem;
          font-family: RTWS ShangGothic G0v1;
          font-weight: bold;
          color: #ffffff;
          margin-right: 0.16rem;
        }
      }
    }
  }
}

.g-datacenterbox {
  position: absolute;
  top: 0.96rem;
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
      .g-nums-value {
        color: white;
        font-size: 0.36rem;
        font-family: RTWS ShangGothic G0v1;
        font-weight: bold;
      }
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
      font-family: PingFangSC-Regular;
      font-weight: bold;
      color: rgba(122, 244, 253, 1);
      margin-bottom: 0.13rem;
      padding: 0 0.2rem;
    }
  }
}

.g-situations-tit {
  height: 0.18rem;
  font-size: 0.18rem;
  font-family: RTWS ShangGothic G0v1;
  font-weight: bold;
  color: #ffffff;
  &.week {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .week-rt {
      width: 1.04rem;
      height: 0.25rem;
      border: 1px solid rgba(255, 255, 255, 0.4);
      color: white;
      padding: 0 0.05rem;
      @include fjqd(space-between);
      img {
        width: 0.08rem;
        height: 0.06rem;
      }
    }
  }
}

.area-title {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.23rem;

  p {
    font-size: 0.16rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;

    position: relative;
    &::before {
      content: "";
      width: 0.08rem;
      height: 0.02rem;
      position: absolute;
      bottom: 50%;
      left: -35%;
    }
    &.blue::before {
      background: linear-gradient(90deg, #54fefe 0%, #3ea6ff 100%);
    }
    &.yellow::before {
      background: linear-gradient(90deg, #fff77c 0%, #ff952d 100%);
    }
  }
}

.g-town-situation-left {
  position: absolute;
  top: 0.6rem;
  margin-top: 0.37rem;
  height: 9.26rem;
  left: 0.5rem;
  width: 4.5rem;
  ul {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 0.4rem;
    .company-item {
      display: flex;
      align-items: center;
      margin: 0.2rem 0.66rem 0 0;
      .logo {
        margin-right: 0.19rem;
        width: 0.56rem;
        height: 0.56rem;
      }
      .p-l {
        .p-l-t {
          width: 0.76rem;
          height: 0.18rem;
          font-size: 0.18rem;
          font-family: PingFang SC;
          font-weight: bold;
          color: #7af4fd;
          margin-bottom: 0.13rem;
        }
        .p-l-v {
          width: 0.4rem;
          font-size: 0.36rem;
          font-family: RTWS ShangGothic G0v1;
          font-weight: bold;
          color: #ffffff;
        }
      }
    }
  }
}

.g-town-situation-right {
  position: absolute;
  top: 0.6rem;
  margin-top: 0.37rem;
  height: 9.26rem;
  right: 0.31rem;
  width: 3.81rem;

  .statistical-top {
    display: flex;
    flex-wrap: wrap;
  }
  .company-item:nth-child(1),
  .company-item:nth-child(2),
  .company-item:nth-child(3) {
    margin: 0 0 0.32rem 0;
  }
  .company-item:nth-child(1),
  .company-item:nth-child(4) {
    width: 0.76rem;
    margin-right: 0.39rem;
  }
  .company-item:nth-child(2),
  .company-item:nth-child(5) {
    width: 1.16rem;
    margin-right: 0.33rem;
  }
  .company-item:nth-child(3n) {
    margin-right: 0;
  }

  .g-nums {
    width: 0.52rem;
    height: 0.22rem;
    font-size: 0.24rem;
    font-family: AliHYAiHei;
    font-weight: bold;
    color: #ffffff;
    display: flex;
    align-items: center;
    .g-unms-svalue {
      font-size: 0.24rem;
      font-family: AliHYAiHei;
      font-weight: bold;
      color: #ffffff;
      font-style: italic;
    }
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
    font-size: 0.18rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: #7af4fd;
    margin-bottom: 0.11rem;
  }
}
</style>