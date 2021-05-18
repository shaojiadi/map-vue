<template>
  <v-popup class="f-device-popup" title="电梯监测" @close="close">
    <div class="device">
      <div class="device-left" style="margin-left: -0.3rem">
        <div class="g-left-top">
          <h4 class="g-box-tit">电梯运行数据</h4>
          <div class="filter">
            <div class="f-select">
              <el-date-picker
                v-model="filter.elevatorInfoDate"
                value-format="yyyy-MM-dd HH:mm:ss"
                size="mini"
                type="date"
                clearable
                @change="search"
                placeholder="选择日期"
              ></el-date-picker>
            </div>
            <v-min-input
              class="f-select2"
              v-model="filter.elevatorName"
              style="margin-left: 0.4rem"
              placeholder="请输入电梯名称"
              @input="search"
            ></v-min-input>
          </div>
          <div class="f-table personnel">
            <el-table
              :data="tableData"
              style="width: 100%; height: 100%; overflow: auto"
              @row-click="handleRowClick"
              :row-class-name="tableRowClassName"
            >
              <el-table-column
                prop="elevatorName"
                label="电梯名称"
                show-overflow-tooltip
                min-width="150"
              >
                <template slot-scope="scope">
                  {{ scope.row.elevatorName | empty }}
                </template>
              </el-table-column>
              <el-table-column
                prop="elevatorInfoRunUp"
                label="上行/下行次数"
                show-overflow-tooltip
              >
                <template slot-scope="scope"
                  >{{ scope.row.elevatorInfoRunUp | empty }}/{{
                    scope.row.elevatorInfoRunDown | empty
                  }}</template
                >
              </el-table-column>
              <el-table-column
                prop="elevatorInfoStop"
                label="停站次数"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{
                    scope.row.elevatorInfoStop
                      ? scope.row.elevatorInfoStop + "次"
                      : "-"
                  }}
                </template>
              </el-table-column>
              <el-table-column
                prop="allDistance"
                label="运行距离"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{
                    scope.row.allDistance ? scope.row.allDistance + "米" : "-"
                  }}
                </template>
              </el-table-column>
              <el-table-column
                prop="elevatorInfoDate"
                label="日期"
                show-overflow-tooltip
              >
                <template slot-scope="scope">{{
                  scope.row.elevatorInfoDate | date
                }}</template>
              </el-table-column>
            </el-table>
          </div>
          <div class="pagination-box">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="filter.pageIndex"
              :page-size="filter.pageSize"
              layout="total, prev, pager, next"
              :total="filter.total"
            ></el-pagination>
          </div>
        </div>
        <div class="g-left-bottom" style="margin-top: -0.2rem">
          <h4 class="g-box-tit">最新故障告警信息</h4>
          <div class="g-basicbg flex-box-my" v-if="newWarn">
            <div class="g-shexiangtou">
              <img :src="newWarn.elevatorFailurePhoto" alt />
            </div>
            <div>
              <p class="h-address">{{ newWarn.elevatorName }}</p>
              <p class="p1">设备编号：{{ newWarn.deviceCode | empty }}</p>
              <p class="p1">
                故障名称：
                <span class="spanred">{{
                  newWarn.elevatorFailureName | empty
                }}</span>
                <span class="span1"
                  >故障发生楼层：{{
                    newWarn.elevatorFailureFloor | empty
                  }}</span
                >
              </p>
              <p class="p1">
                故障发生时间：{{
                  newWarn.elevatorFailureStartTime
                    ? new Date(newWarn.elevatorFailureStartTime).format(
                        "yyyy-MM-dd hh:mm"
                      )
                    : "-"
                }}
              </p>
              <p class="p1">
                故障恢复时间：
                <span
                  class="span-btn span-success"
                  v-if="newWarn.elevatorFailureState == 1"
                  >{{
                    newWarn.elevatorFailureRecoverTime
                      ? new Date(newWarn.elevatorFailureRecoverTime).format(
                          "yyyy-MM-dd hh:mm"
                        )
                      : "-"
                  }}</span
                >
                <span
                  class="span-btn span-warning"
                  v-if="newWarn.elevatorFailureState == 0"
                  >未恢复</span
                >
              </p>
            </div>
            <div>
              <!--              <div class="g-btn-item" style="margin-bottom: .34rem"><img src="../../assets/img/btn-anfangliandong.png" alt=""></div>-->
              <!--              <div class="g-btn-item"><img src="../../assets/img/btn-tongzhi.png" alt=""></div>-->
            </div>
          </div>
          <div class="empty-list1" v-else>
            <img src="static/img/ren-empty2.png" alt />
            <p>暂无故障告警信息</p>
          </div>
        </div>
      </div>

      <div class="device-right" style="margin-left: -0.2rem">
        <div class="g-right-top">
          <div class="g-online">
            <h4 class="g-box-tit">设备在线情况</h4>
            <div class="pie-chart">
              <v-p-pie-chart
                :online="online"
                :offline="offline"
              ></v-p-pie-chart>
            </div>
          </div>
          <div class="g-analyse">
            <h4 class="g-box-tit" style="padding-left: 0rem">
              当前电梯运行分析
            </h4>
            <div class="g-analyse-con">
              <ul>
                <li>
                  <img
                    src="../../../static/bounced-img/log-dianti1.png"
                    alt=""
                  />
                  <div class="spantext">
                    电梯名称：{{ snapInfo.elevatorName | empty }}
                  </div>
                </li>
                <li>
                  <img
                    src="../../../static/bounced-img/log-dianti2.png"
                    alt=""
                  />
                  <div class="spantext">
                    近7日故障处理/发生次数：
                    <span class="spanred"
                      >{{ elevatorNew.sure | empty }}/{{
                        elevatorNew.failure | empty
                      }}</span
                    >
                  </div>
                </li>
                <li>
                  <img
                    src="../../../static/bounced-img/log-dianti3.png"
                    alt=""
                  />
                  <div class="spantext">
                    当日设备使用频率排名：{{
                      elevatorNew.top && elevatorNew.top != 0
                        ? "No." + elevatorNew.top
                        : "-"
                    }}
                  </div>
                </li>
                <li>
                  <img
                    src="../../../static/bounced-img/log-dianti4.png"
                    alt=""
                  />
                  <div class="spantext">
                    当日运行高峰时段：
                    <span class="spanred"
                      >{{ elevatorNew.starTime | empty }}-{{
                        elevatorNew.endTIme | empty
                      }}</span
                    >
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="g-right-bottom" style="margin-top: -0.2rem">
          <h4 class="g-box-tit">实时电梯故障记录</h4>
          <ul class="g-recolist">
            <template v-if="recordList">
              <li
                class="flex-box-my"
                v-for="(item, index) in recordList"
                :key="index"
              >
                <div class="g-baojing">
                  <img :src="item.elevatorFailurePhoto" alt />
                </div>
                <div>
                  <h4 class="h-title">
                    {{ item.elevatorName }}
                    <span
                      :class="
                        item.elevatorFailureState != 1
                          ? 'span-warning'
                          : 'span-success'
                      "
                      >{{
                        item.elevatorFailureState == 1
                          ? "已恢复"
                          : item.elevatorFailureState == 0
                          ? "未恢复"
                          : null
                      }}</span
                    >
                  </h4>
                  <p class="p2">
                    故障发生时间：{{
                      item.elevatorFailureStartTime
                        ? new Date(item.elevatorFailureStartTime).format(
                            "yyyy-MM-dd hh:mm"
                          )
                        : "-"
                    }}
                  </p>
                  <p class="p2">故障名称：{{ item.elevatorFailureName }}</p>
                  <!-- <p class="p3">查看></p> -->
                </div>
              </li>
            </template>

            <div class="empty-list" v-else>
              <img src="static/img/ren-empty1.png" alt />
              <p>暂无故障记录</p>
            </div>
          </ul>
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
  name: "elevatorManger",
  data() {
    return {
      chart: {
        list1: [1, 2, 1, 2, 1, 2, 1],
        list2: [1, 2, 1, 2, 1, 2, 1],
        dataX: ["1", "2", "1", "2", "1", "2", "1"],
      },
      online: 10,
      offline: 0,
      newWarn: {
        elevatorName: "蓝湾智谷二号楼2号梯",
        deviceCode: "TIM0220042171",
        elevatorFailureCode: "E02",
        elevatorFailureResource: 6,
        elevatorFailureName: "关门超时",
        elevatorFailureRecoverTime: null,
        elevatorFailureStartTime: 1608087366000,
        elevatorFailureFloor: 1,
        elevatorFailurePhoto:
          "http://47.104.162.108:8080/data/photo/TIM0220042171/20201216105607.jpg",
        elevatorFailureState: 0,
      },










      tableData: [
        {
          allDistance: 341537,
          elevatorId: 9,
          elevatorName: "蓝湾智谷二号楼2号梯",
          elevatorCode: "QSKJ0019",
          deviceCode: "TIM0220042172",
          elevatorInfoDate: 1604937600000,
          elevatorInfoRunUp: "130",
          elevatorInfoRunDown: "128",
          elevatorInfoRunDis: "341537.0",
          elevatorChannelId: null,
          elevatorInfoStop: "258",
          elevatorInfoOpenClose: "316",
          elevatorInfoType: 1,
          active: false,
        },
        {
          allDistance: 298179,
          elevatorId: 7,
          elevatorName: "蓝湾智谷一号楼1号梯",
          elevatorCode: "QSKJ0012",
          deviceCode: "TIM0220042170",
          elevatorInfoDate: 1604937600000,
          elevatorInfoRunUp: "106",
          elevatorInfoRunDown: "99",
          elevatorInfoRunDis: "298179.0",
          elevatorChannelId: null,
          elevatorInfoStop: "205",
          elevatorInfoOpenClose: "249",
          elevatorInfoType: 1,
          active: false,
        },
        {
          allDistance: 173543,
          elevatorId: 5,
          elevatorName: "蓝湾智谷一号楼2号梯",
          elevatorCode: "QSKJ0008",
          deviceCode: "TIM0220042108",
          elevatorInfoDate: 1604937600000,
          elevatorInfoRunUp: "91",
          elevatorInfoRunDown: "86",
          elevatorInfoRunDis: "173543.0",
          elevatorChannelId: null,
          elevatorInfoStop: "177",
          elevatorInfoOpenClose: "247",
          elevatorInfoType: 1,
          active: true,
        },
        {
          allDistance: 546234,
          elevatorId: 22,
          elevatorName: "蓝湾智谷二号楼1号梯",
          elevatorCode: "QSKJ0020",
          deviceCode: "TIM0220042185",
          elevatorInfoDate: 1604937600000,
          elevatorInfoRunUp: "164",
          elevatorInfoRunDown: "164",
          elevatorInfoRunDis: "546234.0",
          elevatorChannelId: null,
          elevatorInfoStop: "328",
          elevatorInfoOpenClose: "361",
          elevatorInfoType: 1,
          active: false,
        },
        {
          allDistance: 763195,
          elevatorId: 15,
          elevatorName: "蓝湾智谷三号楼1号梯",
          elevatorCode: "QSKJ0005",
          deviceCode: "TIM0220042178",
          elevatorInfoDate: 1604937600000,
          elevatorInfoRunUp: "287",
          elevatorInfoRunDown: "267",
          elevatorInfoRunDis: "763195.0",
          elevatorChannelId: null,
          elevatorInfoStop: "554",
          elevatorInfoOpenClose: "610",
          elevatorInfoType: 1,
          active: false,
        },
        {
          allDistance: 270855,
          elevatorId: 3,
          elevatorName: "蓝湾智谷五号楼2号梯",
          elevatorCode: "QSKJ0011",
          deviceCode: "TIM0220042106",
          elevatorInfoDate: 1604937600000,
          elevatorInfoRunUp: "126",
          elevatorInfoRunDown: "130",
          elevatorInfoRunDis: "270855.0",
          elevatorChannelId: null,
          elevatorInfoStop: "256",
          elevatorInfoOpenClose: "296",
          elevatorInfoType: 1,
          active: false,
        },
        {
          allDistance: 346290,
          elevatorId: 20,
          elevatorName: "蓝湾智谷四号楼1号梯",
          elevatorCode: "QSKJ0007",
          deviceCode: "TIM0220042183",
          elevatorInfoDate: 1604937600000,
          elevatorInfoRunUp: "96",
          elevatorInfoRunDown: "99",
          elevatorInfoRunDis: "346290.0",
          elevatorChannelId: null,
          elevatorInfoStop: "195",
          elevatorInfoOpenClose: "277",
          elevatorInfoType: 1,
          active: false,
        },
        {
          allDistance: 116489,
          elevatorId: 13,
          elevatorName: "蓝湾智谷三号楼2号梯",
          elevatorCode: "QSKJ0018",
          deviceCode: "TIM0220042176",
          elevatorInfoDate: 1604937600000,
          elevatorInfoRunUp: "55",
          elevatorInfoRunDown: "49",
          elevatorInfoRunDis: "116489.0",
          elevatorChannelId: null,
          elevatorInfoStop: "104",
          elevatorInfoOpenClose: "149",
          elevatorInfoType: 1,
          active: false,
        },
        {
          allDistance: 177024,
          elevatorId: 18,
          elevatorName: "蓝湾智谷五号楼1号梯",
          elevatorCode: "QSKJ0010",
          deviceCode: "TIM0220042181",
          elevatorInfoDate: 1604937600000,
          elevatorInfoRunUp: "80",
          elevatorInfoRunDown: "69",
          elevatorInfoRunDis: "177024.0",
          elevatorChannelId: null,
          elevatorInfoStop: "149",
          elevatorInfoOpenClose: "181",
          elevatorInfoType: 1,
          active: false,
        },
        {
          allDistance: 1039725,
          elevatorId: 8,
          elevatorName: "蓝湾智谷四号楼2号梯",
          elevatorCode: "QSKJ0002",
          deviceCode: "TIM0220042171",
          elevatorInfoDate: 1604937600000,
          elevatorInfoRunUp: "414",
          elevatorInfoRunDown: "390",
          elevatorInfoRunDis: "1039725.0",
          elevatorChannelId: null,
          elevatorInfoStop: "804",
          elevatorInfoOpenClose: "878",
          elevatorInfoType: 1,
          active: false,
        },







        {
          allDistance: 763195,
          elevatorId: 15,
          elevatorName: "蓝湾智谷三号楼1号梯",
          elevatorCode: "QSKJ0005",
          deviceCode: "TIM0220042178",
          elevatorInfoDate: 1604937600000,
          elevatorInfoRunUp: "287",
          elevatorInfoRunDown: "267",
          elevatorInfoRunDis: "763195.0",
          elevatorChannelId: null,
          elevatorInfoStop: "554",
          elevatorInfoOpenClose: "610",
          elevatorInfoType: 1,
          active: false,
        },
        {
          allDistance: 270855,
          elevatorId: 3,
          elevatorName: "蓝湾智谷五号楼2号梯",
          elevatorCode: "QSKJ0011",
          deviceCode: "TIM0220042106",
          elevatorInfoDate: 1604937600000,
          elevatorInfoRunUp: "126",
          elevatorInfoRunDown: "130",
          elevatorInfoRunDis: "270855.0",
          elevatorChannelId: null,
          elevatorInfoStop: "256",
          elevatorInfoOpenClose: "296",
          elevatorInfoType: 1,
          active: false,
        },
        {
          allDistance: 346290,
          elevatorId: 20,
          elevatorName: "蓝湾智谷四号楼1号梯",
          elevatorCode: "QSKJ0007",
          deviceCode: "TIM0220042183",
          elevatorInfoDate: 1604937600000,
          elevatorInfoRunUp: "96",
          elevatorInfoRunDown: "99",
          elevatorInfoRunDis: "346290.0",
          elevatorChannelId: null,
          elevatorInfoStop: "195",
          elevatorInfoOpenClose: "277",
          elevatorInfoType: 1,
          active: false,
        },
        {
          allDistance: 116489,
          elevatorId: 13,
          elevatorName: "蓝湾智谷三号楼2号梯",
          elevatorCode: "QSKJ0018",
          deviceCode: "TIM0220042176",
          elevatorInfoDate: 1604937600000,
          elevatorInfoRunUp: "55",
          elevatorInfoRunDown: "49",
          elevatorInfoRunDis: "116489.0",
          elevatorChannelId: null,
          elevatorInfoStop: "104",
          elevatorInfoOpenClose: "149",
          elevatorInfoType: 1,
          active: false,
        },
        {
          allDistance: 177024,
          elevatorId: 18,
          elevatorName: "蓝湾智谷五号楼1号梯",
          elevatorCode: "QSKJ0010",
          deviceCode: "TIM0220042181",
          elevatorInfoDate: 1604937600000,
          elevatorInfoRunUp: "80",
          elevatorInfoRunDown: "69",
          elevatorInfoRunDis: "177024.0",
          elevatorChannelId: null,
          elevatorInfoStop: "149",
          elevatorInfoOpenClose: "181",
          elevatorInfoType: 1,
          active: false,
        },
        {
          allDistance: 1039725,
          elevatorId: 8,
          elevatorName: "蓝湾智谷四号楼2号梯",
          elevatorCode: "QSKJ0002",
          deviceCode: "TIM0220042171",
          elevatorInfoDate: 1604937600000,
          elevatorInfoRunUp: "414",
          elevatorInfoRunDown: "390",
          elevatorInfoRunDis: "1039725.0",
          elevatorChannelId: null,
          elevatorInfoStop: "804",
          elevatorInfoOpenClose: "878",
          elevatorInfoType: 1,
          active: false,
        },
        {
          allDistance: 1039725,
          elevatorId: 8,
          elevatorName: "蓝湾智谷三号楼1号梯",
          elevatorCode: "QSKJ0002",
          deviceCode: "TIM0220042171",
          elevatorInfoDate: 1604937600000,
          elevatorInfoRunUp: "414",
          elevatorInfoRunDown: "390",
          elevatorInfoRunDis: "1039725.0",
          elevatorChannelId: null,
          elevatorInfoStop: "804",
          elevatorInfoOpenClose: "878",
          elevatorInfoType: 1,
          active: false,
        },
      ],
      snapInfo: {
        allDistance: 341537,
        elevatorId: 9,
        elevatorName: "蓝湾智谷三号楼1号梯",
        elevatorCode: "QSKJ0019",
        deviceCode: "TIM0220042172",
        elevatorInfoDate: 1604937600000,
        elevatorInfoRunUp: "130",
        elevatorInfoRunDown: "128",
        elevatorInfoRunDis: "341537.0",
        elevatorChannelId: null,
        elevatorInfoStop: "258",
        elevatorInfoOpenClose: "316",
        elevatorInfoType: 1,
        active: true,
      },
      inter: "",
      filter: {
        elevatorName: "",
        elevatorInfoDate: "",
        Pages: 10,
        total: 8,
        pageIndex: 1,
        // allDistance: 87,
        pageSize: 10,
      },
      elevatorNew: {
        starTime: "15:00",
        sure: 0,
        top: 3,
        failure: 0,
        endTIme: "15:30",
      },








      recordList: [
        {
          elevatorName: "蓝湾智谷五号楼2号梯",
          deviceCode: "TIM0220042172",
          elevatorFailureCode: "E02",
          elevatorFailureResource: 6,
          elevatorFailureName: "关门超时",
          elevatorFailureRecoverTime: 1608087468000,
          elevatorFailureStartTime: 1608087296000,
          elevatorFailureFloor: 1,
          elevatorFailurePhoto:
            "http://47.104.162.108:8080/data/photo/TIM0220042172/20201216105457.jpg",
          elevatorFailureState: 1,
        },
        {
          elevatorName: "蓝湾智谷四号楼1号梯",
          deviceCode: "TIM0220042172",
          elevatorFailureCode: "F04",
          elevatorFailureResource: 6,
          elevatorFailureName: "关门异常后行梯",
          elevatorFailureRecoverTime: 1608087054000,
          elevatorFailureStartTime: 1608087048000,
          elevatorFailureFloor: 1,
          elevatorFailurePhoto:
            "http://47.104.162.108:8080/data/photo/TIM0220042172/20201216105050.jpg",
          elevatorFailureState: 1,
        },
        {
          elevatorName: "蓝湾智谷三号楼2号梯",
          deviceCode: "TIM0220042185",
          elevatorFailureCode: "E02",
          elevatorFailureResource: 6,
          elevatorFailureName: "关门超时",
          elevatorFailureRecoverTime: 1608086526000,
          elevatorFailureStartTime: 1608086378000,
          elevatorFailureFloor: 1,
          elevatorFailurePhoto:
            "http://47.104.162.108:8080/data/photo/TIM0220042185/20201216103938.jpg",
          elevatorFailureState: 1,
        },
        {
          elevatorName: "蓝湾智谷五号楼1号梯",
          deviceCode: "TIM0220042171",
          elevatorFailureCode: "F04",
          elevatorFailureResource: 6,
          elevatorFailureName: "关门异常后行梯",
          elevatorFailureRecoverTime: 1608080013000,
          elevatorFailureStartTime: 1608080012000,
          elevatorFailureFloor: 5,
          elevatorFailurePhoto:
            "http://47.104.162.108:8080/data/photo/TIM0220042171/20201216085336.jpg",
          elevatorFailureState: 1,
        },
      ],
    };
  },
  props: {
    title: {
      type: String,
    },
  },

  mounted() {
    // this.runningList();
    // this.getFreshFailure();
    // this.getEquipmentNum()
  },
  components: {},
  computed: {},
  methods: {
    close() {
      this.$emit("close");
    },
    getSmokeGraph() {
      getData
        .smokeGraph()
        .then((res) => {
          this.chart = {
            list1: res.data.data.relieves,
            list2: res.data.data.warns,
            dataX: res.data.data.dates,
          };
        })
        .catch((_) => {
          console.log(_);
        });
    },
    // 电梯运行数据接口
    runningList(inter) {
      getData
        .runningList(this.filter)
        .then((res) => {
          this.tableData = res.data.data.list;
          this.filter.total = res.data.data.total;
          this.filter.pageIndex = res.data.data.pageIndex;
          if (!inter) {
            this.tableData.length && this.handleRowClick(this.tableData[0]);
          } else {
            //设置选中高亮
            this.tableData.forEach((item) => {
              if (item.elevatorId == this.snapInfo.elevatorId) {
                item.active = true;
              }
              item.newAdd = this.lastTabelData.every((lastItem) => {
                return item.cpPassTime != lastItem.cpPassTime;
              });
            });
          }
        })
        .catch((_) => {
          console.log(_);
        });
    },
    // getFreshFailure() {
    //   getData
    //     .getFreshFailure(this.filter)
    //     .then((res) => {
    //       this.recordList = res.data.data.list;
    //       this.newWarn = res.data.data.elevatorFailureFresh;
    //     })
    //     .catch((_) => {
    //       console.log(_);
    //     });
    // },
    // getEquipmentNum() {
    //   getData
    //     .getEquipmentNum()
    //     .then((res) => {
    //       this.online = res.data.data.onlineCount;
    //       this.offline = res.data.data.offlineCount;
    //     })
    //     .catch((_) => {
    //       console.log(_);
    //     });
    // },

    handleSizeChange(val) {
      this.filter.pageSize = val;
      this.runningList();
    },
    handleCurrentChange(val) {
      this.filter.pageIndex = val;
      this.runningList();
    },

    handleRowClick(val) {
      this.snapInfo = val;
      let data = {
        elevatorCode: this.snapInfo.elevatorCode,
        deviceCode: this.snapInfo.deviceCode,
        elevatorInfoDate: new Date(this.snapInfo.elevatorInfoDate).format(
          "yyyy-MM-dd hh:mm:ss"
        ),
      };
      getData
        .elevatorAnalyze(data)
        .then((res) => {
          this.elevatorNew = res.data.data;
        })
        .catch((_) => {
          console.log(_);
        });
      //设置选中高亮
      this.tableData.forEach((item) => {
        console.log(item);
        item.active = false;
        if (item.elevatorId == this.snapInfo.elevatorId) {
          item.active = true;
        }
      });
      this.tableData = JSON.parse(JSON.stringify(this.tableData));
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.active && row.newAdd) {
        return "active-row add-row";
      } else if (row.newAdd) {
        return "add-row";
      } else if (row.active) {
        return "active-row";
      }
    },
    search(val) {
      this.runningList();
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/css/mixin";

.flex-box-my {
  display: flex;
  //   justify-content: space-between;
  align-items: center;
}

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
        display: flex;
        flex-direction: column;
        .filter {
          width: 8.9rem;
          height: 0.7rem;
          margin-top: -0.36rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-left: 2.88rem;

          .f-select {
            width: 2.64rem;
            height: 0.44rem;
            // margin-left: 2.5rem;
          }
          .f-select2 {
          }
        }

        .f-table {
          flex: 0.82;
          width: 88%;
          overflow: hidden;
          margin-top: 0rem;
          margin-left: 0.6rem;

          /deep/ .el-table__body-wrapper {
            overflow: inherit;
          }
          /deep/ .el-table__body {
            .personnel td {
              padding: 0.18rem 0;
            }
            .el-table__row {
              cursor: pointer;
              &:hover {
                background-color: rgba(0, 0, 0, 0.1);
              }
              &.active-row {
                background-color: rgba(0, 0, 0, 0.2);
              }
              &.add-row {
                animation: flicker 0.9s 3;
              }
            }
          }
        }

        .pagination-box {
          flex: 0.08;
          margin-top: 0rem;
          width: 8.9rem;
          height: 0.5rem;
          background: rgba(13, 85, 137, 0.6);
          box-shadow: 0 0.07rem 0.16rem 0 rgba(8, 1, 2, 0.03);
          border-radius: 0.04rem;
          display: flex;
          align-items: center;
          margin-left: 0.45rem;
        }
      }
      .g-left-bottom {
        width: 9.71rem;
        height: 3.33rem;
        background: url("../../assets/img/img-xiaofang-leftbot.png") no-repeat;
        background-size: 100% 100%;
        h4 {
          font-size: 0.3rem;
          font-family: Lantinghei SC;
          font-weight: bold;
          font-size: 0.18rem;
          color: rgba(194, 231, 255, 1);
          padding-left: 0.5rem;
          padding-top: 0.4rem;
        }
        .empty-list1 {
          width: 4.2rem;
          height: 2.3rem;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 50%;
            // height: 100%;
          }
        }

        .g-basicbg {
          width: 8.76rem;
          height: 2.06rem;
          background: rgba(13, 85, 137, 0.3);
          box-shadow: 0px 0px 0.16rem 0px rgba(8, 1, 2, 0.36);
          border-radius: 0.04rem;
          margin-left: 0.5rem;
          margin-top: 0.2rem;
          padding: 0.05rem 0.51rem 0 0.2rem;
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
            .spanred {
              color: red;
              font-family: Lantinghei SC;
              font-weight: bold;
            }
            .span1 {
              font-size: 0.16rem;
              margin-left: 0.8rem;
              color: rgba(229, 245, 255, 1);
              // font-family: Lantinghei SC;
              // font-weight: bold;
              // color: #ff1414;
            }
            .span-btn {
              padding: 0 0.1rem;
              background: rgba(255, 20, 20, 0.2);
              border-radius: 0.04rem;
              line-height: 0.22rem;
              font-size: 0.14rem;
              font-family: Lantinghei SC;
              font-weight: bold;
              color: rgba(255, 20, 20, 1);
              border: 1px solid rgba(255, 20, 20, 1);
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
      .g-right-top {
        width: 7.19rem;
        height: 3.33rem;
        background: url("../../assets/img/7575.png") no-repeat;
        background-size: 100% 100%;
        display: flex;
        .g-online {
          flex: 0.4;
        }
        .g-analyse {
          flex: 0.6;
          .g-analyse-con {
            margin-top: 0.2rem;
            width: 3.76rem;
            height: 2.06rem;
            background: rgba(13, 85, 137, 0.3);
            box-shadow: 0px 0px 0.16rem 0px rgba(8, 1, 2, 0.36);
            border-radius: 0.04rem;
            padding-left: 0.35rem;
            padding-top: 0.31rem;
            ul {
              li {
                height: 0.36rem;
                display: flex;
                img {
                  padding-top: 0.06rem;
                  width: 0.2rem;
                  height: 0.2rem;
                }
                .spantext {
                  display: inline-block;
                  font-size: 0.16rem;
                  font-family: PingFang SC;
                  font-weight: bold;
                  color: #eef8ff;
                  line-height: 0.28rem;
                  margin-left: 0.1rem;
                }
                .spanred {
                  color: red;
                }
              }
            }
          }
        }
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
      .g-right-bottom {
        width: 7.19rem;
        height: 5.9rem;
        background: url("../../assets/img/7676.png") no-repeat;
        background-size: 100% 100%;
        .g-recolist {
          .empty-list {
            width: 3.6rem;
            height: 4.4rem;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            img {
              width: 70%;
              // height: 100%;
            }
          }
          padding-top: 0.2rem;
          padding-left: 0.5rem;
          height: 4.8rem;
          overflow: auto;
          width: 6.9rem;
          overflow-y: hidden;
          li {
            width: 6.25rem;
            height: 1rem;
            background: url("../../assets/img/libg.png") no-repeat;
            background-size: 100% 100%;
            margin-bottom: 0.18rem;
            padding: 0 0.1rem;
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
              width: 280px;
              font-family: Lantinghei SC;
              font-weight: bold;
              color: #e5f5ff;
              font-size: 0.14rem;
              margin-top: 0.04rem;
            }
            .p3 {
              color: #8cd2ff;
              font-size: 0.14rem;
              margin-top: 0.06rem;
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
</style>

