<template>
  <v-popup class="f-device-popup" title="智慧消防" @close="close">
    <div class="device">
      <div class="device-left" style="margin-left: -0.3rem">
        <div class="g-left-top">
          <div class="flex-box g-jiankongbox">
            <h4 class="g-box-tit">近期消防信息统计</h4>
          </div>
          <div class="chart-box">
            <v-bar-bar-chart
              :list="chart.list1"
              :list2="chart.list2"
              :dataX="chart.dataX"
              :maxNumberY="5"
              :minIntervalY="1"
            ></v-bar-bar-chart>
          </div>
        </div>
        <div class="g-left-bottom" style="margin-top: -0.2rem">
          <h4 class="g-box-tit">最近消防设备告警</h4>
          <div class="g-basicbg " v-if="newWarn.name">
            <div class="g-shexiangtou">
              <img :src="newWarn.picUrl" alt />
            </div>
            <div>
              <h4 class="h-address">{{ newWarn.name }}</h4>
              <p class="p1">告警原因：{{ newWarn.typeInfo }}</p>
              <p class="p1">
                危险等级：
                <span class="span1">高</span>
              </p>
              <p class="p1">
                告警时间：{{
                  newWarn.startTime
                    ? new Date(newWarn.startTime).format("yyyy-MM-dd hh:mm:ss")
                    : "-"
                }}
              </p>
              <p class="p1">
                当前状态状态：
                <span
                  class="span-btn"
                  :class="newWarn.state != 1 ? 'span-warning' : 'span-success'"
                  >{{ newWarn.stateInfo }}</span
                >
              </p>
            </div>
            <!-- <div>
                           <div class="g-btn-item" style="margin-bottom: .34rem"><img src="../../assets/img/btn-anfangliandong.png" alt=""></div>
                           <div class="g-btn-item"><img src="../../assets/img/btn-tongzhi.png" alt=""></div>
            </div> -->
          </div>
        </div>
      </div>

      <div class="device-right" style="margin-left: -0.2rem">
        <div class="g-right-top">
          <h4 class="g-box-tit">建议重点关注区域列表</h4>
          <ul class="g-recolist">
            <!-- <li class="flex-box" v-for="(item, index) in recordList" :key="index">
              <div class="g-baojing">
                <img :src='item.picUrl' alt />
              </div>
              <div>
                <h4 class="h-title">
                  {{item.name}}
                  <span
                    :class="item.state != 1 ? 'span-warning' : 'span-success'"
                  >{{item.stateInfo}}</span>
                </h4>
                <p
                  class="p2"
                >报警时间：{{item.startTime?new Date(item.startTime).format('yyyy-MM-dd hh:mm'):'-'}}</p> -->
            <!-- <p class="p2">告警位置：{{item.areaInfo}}</p> -->
            <!-- <p class="p3">查看></p>
              </div>
            </li> -->

            <li
              v-for="(item, index) in recordListTemp"
              :key="index"
              class="haddle-bfc"
            >
              <div class="top-container">
                <div class="floorWhere">{{item.where}}</div>
                <div class="go-detaile">>> 查看详情</div>
              </div>
              <div class="center-container">
                <div class="month-warn">
                  本月警告次数：
                  <span class="warn-number">{{ item.num }}次</span>
                </div>
                <div class="recent-device">
                  近期告警设备：
                  <span class="device-number">{{ item.device }}</span>
                </div>
              </div>
              <div class="bottom-container">
                消防情况分析：
                <span :class="item.isRed ? 'g-red' : 'g-green'">{{
                  item.title
                }}</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="g-right-bottom" style="margin-top: -0.2rem">
          <!-- <h4 class="g-box-tit">消防管控优秀区域列表</h4>
          <div class="g-basicbg1">
            <p class="p1">
              近7日消防情况评估：
              <span class="span-green">良</span>
            </p>
            <p class="p1">未来消防隐患推测：空气较为干燥</p>
            <p class="p1">
              消防情况最佳区域：
              <span class="span-green">园区一期区域</span>
            </p>
            <p class="p1">
              消防情况最差区域：
              <span class="span-red">园区二期区域</span>
            </p>
          </div> -->
          <div class="g-right-top">
            <h4 class="g-box-tit">消防管控优秀区域列表</h4>
            <ul class="g-recolist">
              <li
                v-for="(item, index) in recordListTemp2"
                :key="index"
                class="haddle-bfc"
              >
                <div class="top-container">
                  <div class="floorWhere">{{ item.where }}</div>
                  <div class="go-detaile">>> 查看详情</div>
                </div>
                <div class="center-container">
                  <div class="month-warn">
                    本月警告次数：
                    <span class="warn-number">{{ item.num }}次</span>
                  </div>
                  <div class="recent-device">
                    近期告警设备：
                    <span class="device-number">{{ item.device }}</span>
                  </div>
                </div>
                <div class="bottom-container">
                  消防情况分析：
                  <span :class="item.isRed ? 'g-red' : 'g-green'">{{
                    item.title
                  }}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </v-popup>
</template>

<script>
import * as mobile from "../../config/mUtils";
// import * as getData from "../../service/getData.js";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "App",
  data() {
    return {
      chart: {
        list1: [1, 2, 4, 2, 1, 2, 1],
        list2: [1, 2, 4, 2, 1, 2, 1],
        dataX: [
          new Date().add("m", -6).format("yyyy-MM-dd"),
          new Date().add("m", -5).format("yyyy-MM-dd"),
          new Date().add("m", -4).format("yyyy-MM-dd"),
          new Date().add("m", -3).format("yyyy-MM-dd"),
          new Date().add("m", -2).format("yyyy-MM-dd"),
          new Date().add("m", -1).format("yyyy-MM-dd"),
          "当前",
        ],
      },
      recordList: [
        {
          picUrl:
            "http://py-intellect-screen.zhihuipk.com/static/property-img/device-3.png",
          name: "smoke-147665",
          startTime: "2019-03-12 11:21",
          state: 1,
          stateInfo: "已消警",
        },
        {
          picUrl:
            "http://py-intellect-screen.zhihuipk.com/static/property-img/device-3.png",
          name: "smoke-83595",
          startTime: "2019-03-12 11:21",
          state: 0,
          stateInfo: "告警中",
        },
        {
          picUrl:
            "http://py-intellect-screen.zhihuipk.com/static/property-img/device-3.png",
          name: "smoke-144445",
          startTime: "2019-03-12 11:21",
          state: 0,
          stateInfo: "告警中",
        },
        {
          picUrl:
            "http://py-intellect-screen.zhihuipk.com/static/property-img/device-3.png",
          name: "smoke-82291",
          startTime: "2019-03-12 11:21",
          state: 0,
          stateInfo: "告警中",
        },
      ],
      recordListTemp: [
        {
          where: "园区1号楼",
          device: "烟感smoke-83595",
          num: 5,
          title: "该区域设备较少，告警次数较多，建议加大消防管控。",
          isRed: true,
        },
        {
          where: "园区2号楼",
          device: "烟感smoke-0017",
          num: 5,
          title: "该区域设备共167个，建议加大消防管控。",
          isRed: true,
        },
        // {
        //   where: "园区3号楼",
        //   device: "烟感smoke-83505",
        //   num: 3,
        //   title: "该区域设备较少，告警次数较多，建议加大消防管控。",
        //   isRed: true,
        // },
      ],
      recordListTemp2: [
        {
          where: "园区4号楼",
          device: "无",
          num: 0,
          title: "该区域设备数量较多，近期无设备告警，消防管控良好。",
          isRed: false,
        },
        {
          where: "园区5号楼",
          device: "无",
          num: 0,
          title: "该区域设备数量较多，近期无设备告警，消防管控良好。",
          isRed: false,
        },
        {
          where: "园区3号楼",
          device: "无",
          num: 0,
          title: "该区域设备数量较多，告警次数较少，建议加大消防管控。",
          isRed: false,
        },
      ],
      newWarn: {
        picUrl:
          "http://py-intellect-screen.zhihuipk.com/static/property-img/device-3.png",
        name: "smoke-82290",
        typeInfo: "烟雾浓度过高",
        startTime: "2020-01-07 11:17:39",
        stateInfo: "告警中",
      },
    };
  },
  props: {
    title: {
      type: String,
    },
  },
  mounted() {
    // this.getSmokeGraph();
    // this.getSmokeList();
  },
  components: {},
  computed: {},
  methods: {
    close() {
      this.$emit("close");
    },
    // getSmokeGraph() {
    // getData
    //   .smokeGraph()
    //   .then(res => {
    //     this.chart = {
    //       list1: res.data.data.relieves,
    //       list2: res.data.data.warns,
    //       dataX: res.data.data.dates
    //     };
    //   })
    //   .catch(_ => {
    //     console.log(_);
    //   });
    // },
    // getSmokeList() {
    // getData
    //   .smokeList()
    //   .then(res => {
    //     this.recordList = res.data.data.partList;
    //     this.newWarn = res.data.data.newWarn;
    //   })
    //   .catch(_ => {
    //     console.log(_);
    //   });
    // }
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/css/mixin";
.chart-box {
  height: 4.7rem;
  padding: 0 0.4rem 0 0.4rem;
}
.g-box-tit {
  font-size: 0.18rem;
  font-family: Lantinghei SC;
  font-weight: bold;
  color: rgba(194, 231, 255, 1);
  padding-left: 0.5rem;
  padding-top: 0.4rem;
}

.f-device-popup {
  .device {
    width: 100%;
    height: 100%;
    display: flex;

    .device-left {
      width: 9.71rem;
      height: 100%;
      .g-left-top {
        width: 9.71rem;
        height: 5.9rem;
        background: url("../../assets/img/img-xiaofang-lefttop.png") no-repeat;
        background-size: 100% 100%;
        .g-jiankongbox {
          justify-content: space-between;
        }
        .g-imgboxs {
          width: 7.07rem;
          height: 4.37rem;
          margin-left: 1.6rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .g-left-bottom {
        width: 9.71rem;
        height: 3.33rem;
        background: url("../../assets/img/img-xiaofang-leftbot.png") no-repeat;
        background-size: 100% 100%;
        .g-basicbg {
          width: 8.76rem;
          height: 2.06rem;
          background: rgba(13, 85, 137, 0.3);
          box-shadow: 0px 0px 0.16rem 0px rgba(8, 1, 2, 0.36);
          border-radius: 0.04rem;
          margin-left: 0.5rem;
          margin-top: 0.2rem;
          padding: 0.05rem 0.51rem 0 0.13rem;
          display: flex;
          align-items: center;
          .g-shexiangtou {
            width: 1.6rem;
            height: 1.43rem;
            margin-right: 0.17rem;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .h-address {
            font-size: 0.24rem;
            font-family: Lantinghei SC;
            font-weight: bold;
            color: rgba(255, 255, 255, 1);
            line-height: 24px;
            width: 4.46rem;
            padding-bottom: 0.1rem;
            border-bottom: 1px solid rgba(191, 221, 255, 0.6);
          }
          .p1 {
            font-size: 0.16rem;
            font-family: Lantinghei SC;
            font-weight: bold;
            color: rgba(229, 245, 255, 1);
            margin-top: 0.02rem;
            .span1 {
              font-size: 0.16rem;
              font-family: Lantinghei SC;
              font-weight: bold;
              color: #ff1414;
            }
            .span-btn {
              padding: 0 0.1rem;
              border-radius: 0.04rem;
              line-height: 0.22rem;
              font-size: 0.14rem;
              font-family: Lantinghei SC;
              font-weight: bold;
            }
            .span-warning {
              color: rgba(255, 20, 20, 1);
              background: rgba(255, 20, 20, 0.2);
              border: 1px solid rgba(255, 20, 20, 1);
            }
            .span-success {
              color: #00ec43;
              background: rgba(0, 236, 67, 0.2);
              border: 1px solid rgba(0, 236, 67, 1);
            }
          }
          .g-btn-item {
            width: 1.6rem;
            height: 0.48rem;
            margin-left: 0.32rem;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }

    .device-right {
      width: 7.19rem;
      height: 100%;
      transform: translateY(0.04rem);
      .g-right-top {
        width: 7.19rem;
        height: 4.52rem;
        margin-bottom: 0.1rem;
        background: url("../../assets/img/7676.png") no-repeat;
        background-size: 100% 100%;
      }
      .g-recolist {
        padding-top: 0.2rem;
        padding-left: 0.5rem;
        height: 4.8rem;
        overflow: auto;
        width: 6.9rem;
        li {
          width: 6.25rem;
          height: 1rem;
          background: url("../../assets/img/libg.png") no-repeat;
          background-size: 100% 100%;
          margin-bottom: 0.18rem;
          padding: 0 0.34rem 0 0.1rem;
          .g-baojing {
            width: 0.88rem;
            height: 0.88rem;
            margin-right: 0.18rem;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .h-title {
            font-size: 0.16rem;
            font-family: Lantinghei SC;
            font-weight: bold;
            color: rgba(255, 255, 255, 1);
            line-height: 0.24rem;
            span {
              font-size: 0.14rem;
              line-height: 0.22rem;
              padding: 0 0.1rem;
              border-radius: 0.04rem;
              margin-left: 0.09rem;
            }
            .span-warning {
              color: rgba(255, 20, 20, 1);
              background: rgba(255, 20, 20, 0.2);
            }
            .span-success {
              color: #00ec43;
              background: rgba(0, 236, 67, 0.2);
            }
          }
          .p2 {
            color: #e5f5ff;
            font-size: 0.12rem;
            margin-top: 0.04rem;
          }
          .p3 {
            color: #8cd2ff;
            font-size: 0.14rem;
            margin-top: 0.06rem;
          }
        }
      }
      .g-right-bottom {
        width: 7.19rem;
        height: 3.33rem;
        background-size: 100% 100%;
        .g-basicbg1 {
          width: 6.35rem;
          height: 2.06rem;
          background: rgba(13, 85, 137, 0.3);
          box-shadow: 0px 0px 0.16rem 0px rgba(8, 1, 2, 0.36);
          border-radius: 0.04rem;
          margin-left: 0.5rem;
          margin-top: 0.2rem;
          padding: 0.34rem;
          .p1 {
            font-size: 0.16rem;
            font-family: PingFang SC;
            color: rgba(238, 248, 255, 1);
            margin-bottom: 0.1rem;
            span {
              font-size: 0.16rem;
              font-family: PingFang SC;
            }
            .span-green {
              color: #00ec43;
            }
            .span-red {
              color: #ff1414;
            }
          }
        }
      }
    }
  }
}

.device-green {
  color: #8bff74;
}
// 智慧消防右侧样式修改
.haddle-bfc {
  overflow: hidden;
}
.top-container,
.center-container,
.bottom-container {
  display: flex;
  font-family: Lantinghei SC;
}
.top-container {
  margin-top: 0.15rem;
  justify-content: space-between;
  .floorWhere {
    font-size: 0.16rem;
    color: #fff;
  }
  .go-detaile {
    font-size: 0.14rem;
    color: #8cd2ff;
  }
}
.center-container {
  margin-top: 0.07rem;
  justify-content: space-between;
  color: #e5f5ff;
  font-size: 0.14rem;
}
.bottom-container {
  margin-top: 0.04rem;
  color: #e5f5ff;
}
.month-warn,
.recent-device,
.bottom-container,
.device-number,
.warn-number {
  font-size: 0.14rem;
}
.warn-number {
  color: #e5f5ff;
}
.g-red,
.g-green {
  margin-left: 0.05rem;
  font-size: 0.14rem;
}
.g-red {
  color: #ff1414;
}
.g-green {
  color: #00ec43;
}
</style>
