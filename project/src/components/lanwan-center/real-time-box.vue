<template>
  <div class="pop-wrap">
    <div class="pop-contain">
      <div class="company-name">实时环境监测数据</div>
      <ul class="company-list">
        <li class="company-item-top company-item">
          <div class="company-top">
            <p>
              <img src="../../../static/lanwan/realIcon1.png" alt />
              <span>温度：</span>
              <span>{{realInfo.rtemp}}℃</span>
            </p>
            <p>
              <img src="../../../static/lanwan/realIcon2.png" alt />
              <span>二氧化碳：</span>
              <span>{{realInfo.rcto2}}</span>
            </p>
          </div>
          <div class="company-top">
            <p>
              <img src="../../../static/lanwan/realIcon3.png" alt />
              <span>湿度：</span>
              <span>{{realInfo.rhumid}}%</span>
            </p>
            <p>
              <img src="../../../static/lanwan/realIcon4.png" alt />
              <span>TVOC：</span>
              <span>{{realInfo.rtvoc}}ppd</span>
            </p>
          </div>
          <div class="company-top">
            <p>
              <img src="../../../static/lanwan/realIcon5.png" alt />
              <span>PM 2.5：</span>
              <span>{{realInfo.rpm25c}}</span>
            </p>
            <p>
              <img src="../../../static/lanwan/realIcon6.png" alt />
              <span>PM 10：</span>
              <span>{{realInfo.rpm10c}}</span>
            </p>
          </div>
        </li>
      </ul>
      <div class="company-name lineTitle">PM2.5含量变化折线图</div>
      <div class="line-area-chart">
        <v-line-area-chart :dataX="personnelListX" :list="period1"></v-line-area-chart>
      </div>
    </div>
  </div>
</template>

<script>
import * as mobile from "../../config/mUtils";
import { environmentNew, environmentSeven } from "../../service/getData";
export default {
  data() {
    return {
      realInfo: {
        rpm10c: 17.74,
        rpm25c: 17.08,
        rhumid: 54.07,
        rtemp: 26.87,
        rtvoc: 493.7,
        rcto2: 539.5
      },
      period1: [
        { value: 280, name: "08:00" },
        { value: 380, name: "09:00" },
        { value: 250, name: "10:00" },
        { value: 330, name: "11:00" },
        { value: 265, name: "12:00" },
        { value: 190, name: "13:00" },
        { value: 205, name: "14:00" },
        { value: 297, name: "当前" }
      ],
      personnelListX: [
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "当前"
      ]
    };
  },
  mounted() {
    // this.getenvironmentSevenInfo();
    // this.getEnvironmentNew();
    setInterval(() => {
      // this.getEnvironmentNew();
    }, 100000);
  },
  components: {},
  computed: {},
  methods: {
    getenvironmentSevenInfo() {
      environmentSeven({ size: 10 })
        .then(res => {
          if (res.data.code != 1) {
            return;
          }
          this.personnelListX = [];
          res.data.data.dates.forEach(val => {
            this.personnelListX.push(val.slice(-2));
          });
          // this.personnelListX = res.data.data.dates;
          this.period1 = res.data.data.rpm25cs;
        })
        .catch(_ => {
          console.log(_);
        });
    },
    getEnvironmentNew() {
      environmentNew()
        .then(res => {
          if (res.data.code != 1) {
            return;
          }
          this.realInfo.rtemp = res.data.data.rtemp;
          this.realInfo.rcto2 = res.data.data.rcto2;
          this.realInfo.rhumid = res.data.data.rhumid;
          this.realInfo.rtvoc = res.data.data.rtvoc;
          this.realInfo.rpm25c = res.data.data.rpm25c;
          this.realInfo.rpm10c = res.data.data.rpm10c;
        })
        .catch(_ => {
          console.log(_);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/mixin";

.pop-wrap {
  pointer-events: auto;//不可操作地图，可操作按钮
/*   position: absolute;
  left: 50%;
  top: 50%; */
  width: 4rem;
  height: 3.9rem;
  // background: url("../../../static/lanwan/pointing-img.png");
  background-size: 100% 100%;
  // padding: 0.2rem;
  z-index: 20;
  .company-name {
    width: 1.67rem;
    height: 0.3rem;
    font-size: 0.18rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(0, 25, 59, 1);
    line-height: 0.3rem;
    background: url("../../../static/lanwan/real-title1.png");
    background-size: 100% 100%;
    text-align: center;
    border-bottom: 1px solid rgba(191, 221, 255, 0.6);
  }
  .lineTitle {
    background: url("../../../static/lanwan/real-title2.png");
    background-size: 100% 100%;
    width: 3.52rem;
    height: 0.27rem;
    text-align: initial;
    line-height: 0.27rem;
    padding-left: 0.1rem;
    color: #00f6ff;
  }

  .company-item-top {
    // display: flex;
    // flex-direction: column;
    // justify-content: space-evenly;
    .company-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 0.34rem;
      p,
      span {
        font-size: 0.14rem;
        display: flex;
        align-items: center;
        flex: 1;
      }
      span:nth-child(2) {
        color: #00f6ff;
      }
      span:nth-child(3) {
        color: white;
      }
    }
  }
  .company-item {
    width: 100%;
    height: 1.1rem;
    background: rgba(13, 85, 137, 0.3);
    box-shadow: 0 0.07rem 0.16rem 0 rgba(8, 1, 2, 0.03);
    border-radius: 4px;
    padding: 0.05rem;    box-sizing: border-box;
    font-size: 0.18rem;
    font-family: Lantinghei SC;
    font-weight: bold;
    border-top: 1px solid;
  }
}
.line-area-chart {
  width: 100%;
  height: 1.7rem;
}
</style>
