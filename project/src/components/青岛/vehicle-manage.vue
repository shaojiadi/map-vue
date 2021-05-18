<template>
  <v-popup class="f-vehicle-popup" title="车辆管理" @close="close">
    <div class="vehicle">
      <div class="vehicle-left">
        <v-wrap class="item-wrap" style="min-height: 4.8rem">
          <h3
            class="snap-title"
            style="margin-top: 0.25rem; margin-bottom: 0rem"
          >
            车位概览
          </h3>
          <ul class="garage">
            <li
              class="garage-item"
              v-for="(item, index) in parkingLotList"
              :key="index"
              :class="{ active: garageActiveId === item.cpgId }"
              @click.stop="changeGarageActive(item, index, false)"
            >
              {{ item.name }}
            </li>
          </ul>
          <ul class="garage-statistics">
            <li
              class="garage-statistics-item"
              v-for="(item, index) in garageStatisticsList"
              :key="index"
            >
              <h3
                class="garage-statistics-number"
                v-if="typeof item.number != 'number'"
              >
                {{ item.number }}
              </h3>
              <v-countup
                v-else
                tag="h3"
                class="garage-statistics-number"
                :end-value="item.number"
                :duration="1"
              ></v-countup>
              <p class="garage-statistics-title">{{ item.title }}</p>
            </li>
          </ul>
          <!-- 停车数 -->
          <div style="margin-bottom: 6%; display: inline-flex">
            <div class="parkinglot">
              <ul class="parking">
                <li
                  class="parking-item"
                  v-for="(item, index) in parkingList"
                  :key="index"
                  :class="item.state"
                  @click.stop="look(item, index)"
                ></li>
              </ul>
            </div>
            <div style="width: 3rem">
              <p
                class="parking-info"
                style="
                  padding-top: 40%;
                  padding-left: 30%;
                  font-size: 0.3rem;
                  font-family: PingFang SC;
                  font-weight: bold;
                  color: rgba(0, 251, 248, 1);
                "
              >
                {{ carStop }}
              </p>
              <p
                style="
                  padding-left: 25%;
                  font-size: 0.2rem;
                  padding-top: 5%;
                  font-family: PingFang SC;
                  color: rgba(255, 255, 255, 1);
                "
              >
                停车场状态
              </p>
            </div>
          </div>
        </v-wrap>
        <v-wrap class="item-wrap" style="min-height: 4.8rem">
          <h3
            class="snap-title"
            style="margin-top: 0.25rem; margin-bottom: 0rem"
          >
            车流分析
          </h3>
          <ul class="garage-statistics">
            <li
              class="garage-statistics-item"
              v-for="(item, index) in carStatisticsList"
              :key="index"
            >
              <h3
                class="garage-statistics-number"
                v-if="typeof item.number != 'number'"
              >
                {{ item.number }}
              </h3>
              <v-countup
                v-else
                tag="h3"
                class="garage-statistics-number"
                :end-value="item.number"
                :duration="1"
              ></v-countup>
              <p class="garage-statistics-title">{{ item.title }}</p>
            </li>
          </ul>
          <div class="big-data">
            <div class="chart-box">
              <v-p-line-area-chart6
                :list="carChart"
                :carDate="carDate"
              ></v-p-line-area-chart6>
            </div>
          </div>
        </v-wrap>
      </div>
      <div class="vehicle-right">
        <div class="filter">
          <v-mini-select
            v-model="filter.doorwayName"
            placeholder="车库出入口"
            @select="garageEntrySelect"
            :optionList="garageEntryList"
            :template="{ value: 'label' }"
          ></v-mini-select>
          <div class="f-select">
            <el-date-picker
              v-model="time"
              value-format="yyyy-MM-dd"
              size="mini"
              type="date"
              @change="accessPersonnelTimeSelect"
              placeholder="人员出入时间"
            ></el-date-picker>
            <!-- <el-date-picker
               v-model="time"
               value-format="yyyy-MM-dd"
               type="daterange"
               range-separator="至"
               start-placeholder="开始日期"
               end-placeholder="结束日期"
               @change="accessPersonnelTimeSelect">
            </el-date-picker>-->
          </div>
          <v-min-input
            v-model="filter.number"
            style="margin-left: 0.4rem"
            placeholder="请输入车牌号"
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
              prop="cpPassVehicleNumber"
              label="车牌号"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{ scope.row.cpPassVehicleNumber | empty }}
              </template>
            </el-table-column>
            <el-table-column
            min-width="150"
              prop="company"
              label="所属企业"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{ scope.row.company}}
              </template>
            </el-table-column>
            <el-table-column
              prop="cpPassDoorwayName"
              label="出入口"
              show-overflow-tooltip
            >
              <template slot-scope="scope">{{
                scope.row.cpPassDoorwayName | empty
              }}</template>
            </el-table-column>
            <el-table-column
              prop="cpPassType"
              label="出/入库"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div v-if="scope.row.cpPassType === 1">入库</div>
                <div v-else-if="scope.row.cpPassType === 2">出库</div>
                <div v-else>--</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="cpPassTime"
              label="出入时间"
              show-overflow-tooltip
            >
              <template slot-scope="scope">{{
                scope.row.cpPassTime | datetime
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
            :total="filter.pageTotal"
          ></el-pagination>
        </div>
        <v-wrap class="item-wrap" style="height: 3.72rem">
          <h3 class="snap-title" style="margin-top: 0.25rem">入园抓拍</h3>
          <div class="snap">
            <div class="snap-img">
              <img :src="snapInfo.cpPassImgUrl" alt />
            </div>
            <div class="snap-info">
              <div class="license-plate">
                {{ snapInfo.cpPassVehicleNumber }}
              </div>
              <p style="margin-top: 0.23rem">
                所属企业：{{ snapInfo.company }}
              </p>
              <p>车辆入口：{{ snapInfo.entry }}</p>
              <p>车辆类型：{{ snapInfo.cpPassVehicleType | vehicleType }}</p>
              <p>入园时间：{{ snapInfo.cpPassTime | datetime }}</p>
              <p>
                通行状态：

                <span class="green">通行</span>
              </p>
            </div>
          </div>
        </v-wrap>
      </div>
    </div>
  </v-popup>
</template>

<script>
import * as mobile from "../../config/mUtils";
import { mapState, mapMutations, mapActions } from "vuex";

import {
  carParkList,
  findCarParkPasslist,
  entranceDownlist,
  carPassAnalysis,
} from "../../service/getData";
import { log } from 'util';

export default {
  name: "App",
  data() {
    return {
      activeArea: "",
      carChart: [255, 246, 286, 235, 245, 234, 238, 235],
      carDate: [],
      carStatisticsList: [
        { title: "今日入园", number: 252 },
        { title: "今日出园", number: 195 },
        { title: "今日临时车辆", number: 59 },
        { title: "临时车辆平均在园时间", number: "3h" },
      ],
      garageStatisticsList: [
        { title: "总车位数量", number: 65 },
        { title: "当前车辆数", number: 195 },
        { title: "当前比例", number: "76.8%" },
      ],
      garageList: [],
      parkingLotList: [
        {
          cpgId: 48,
          inParkNum: 48,
          allTotalNum: 260,
          percentage: "18.46%",
          name: "园区整体出入情况",
          surplusNum: 212,
          status: "空闲",
        },
        {
          cpgId: 49,
          inParkNum: 27,
          allTotalNum: 55,
          percentage: "49.09%",
          name: "银行区域出入情况",
          surplusNum: 140,
          status: "空闲",
        },
        {
          cpgId: 71,
          inParkNum: 28,
          allTotalNum: 65,
          percentage: "43.08%",
          name: "园区大数据中心",
          surplusNum: 88,
          status: "空闲",
        },
      ],
      garageActiveId: 1,
      garageIndex: 0,
      parkingList: [],
      carStop: "",
      inter: null,
      filter: {
        cpgId: "",
        doorwayName: "",
        number: "",
        beginTime: "",
        endTime: "",
        pageIndex: 1,
        pageSize: 7,
        pageTotal: 12,
      },
      time: "",
      garageEntryList: [
        { label: "西二门入口", value: 1 },
        { label: "A车库3号出口", value: 2 },
        { label: "C车库4号出口", value: 3 },
        { label: "D车库1号出口", value: 4 },
        { label: "B车库1号出口 ", value: 5 },
        { label: "E车库1号出口", value: 6 },
        { label: "K车库1号出口", value: 7 },
        { label: "J车库1号出口", value: 8 },
      ],
      tableData: [
        {
          cpPassId: 3092337,
          cpPassVehicleNumber: "浙F75K76",
          cpPassVehicleType: 2,
          cpPassOwnerName: null,
          cpPassOwnerPhone: null,
          cpPassOwnerCompany: null,
          cpPassType: 1,
          cpPassTime: 1607042522000,
          cpPassGate: "园区大门出入口",
          cpPassGroupId: 48,
          cpPassDoorwayId: null,
          cpPassImgUrl:
            "http://property-static.zhihuipk.com/py/1607042123326monitor.jpg",
          cpPassChannelId: 43,
          cpPassParkId: 48,
          cpPassParkName: "电商基地-停车场",
          cpPassDoorwayName: "园区大门出入口",
          mqttRecordNo: null,
          cpPassEnterTime: null,
          active: true,
          newAdd: false,
          company: "青岛科技有限公司",
        },
        {
          cpPassId: 3092207,
          cpPassVehicleNumber: "浙FP512Y",
          cpPassVehicleType: 2,
          cpPassOwnerName: null,
          cpPassOwnerPhone: null,
          cpPassOwnerCompany: null,
          cpPassType: 1,
          cpPassTime: 1607042219000,
          cpPassGate: "园区大门出入口",
          cpPassGroupId: 48,
          cpPassDoorwayId: null,
          cpPassImgUrl:
            "http://property-static.zhihuipk.com/py/1607041819471monitor.jpg",
          cpPassChannelId: 43,
          cpPassParkId: 48,
          cpPassParkName: "电商基地-停车场",
          cpPassDoorwayName: "银行出入口",
          mqttRecordNo: null,
          cpPassEnterTime: null,
          newAdd: false,
          company: "青岛科技有限公司",
        },
        {
          cpPassId: 3092199,
          cpPassVehicleNumber: "浙FL177D",
          cpPassVehicleType: 2,
          cpPassOwnerName: null,
          cpPassOwnerPhone: null,
          cpPassOwnerCompany: null,
          cpPassType: 1,
          cpPassTime: 1607042191000,
          cpPassGate: "园区大门出入口",
          cpPassGroupId: 48,
          cpPassDoorwayId: null,
          cpPassImgUrl:
            "http://property-static.zhihuipk.com/py/1607041791393monitor.jpg",
          cpPassChannelId: 43,
          cpPassParkId: 48,
          cpPassParkName: "电商基地-停车场",
          cpPassDoorwayName: "银行出入口",
          mqttRecordNo: null,
          cpPassEnterTime: null,
          newAdd: false,
          company: "青岛科技有限公司",
        },
        {
          cpPassId: 3091647,
          cpPassVehicleNumber: "浙F338R9",
          cpPassVehicleType: 2,
          cpPassOwnerName: null,
          cpPassOwnerPhone: null,
          cpPassOwnerCompany: null,
          cpPassType: 1,
          cpPassTime: 1607041123000,
          cpPassGate: "园区大门出入口",
          cpPassGroupId: 48,
          cpPassDoorwayId: null,
          cpPassImgUrl:
            "http://property-static.zhihuipk.com/py/1607040723248monitor.jpg",
          cpPassChannelId: 43,
          cpPassParkId: 48,
          cpPassParkName: "电商基地-停车场",
          cpPassDoorwayName: "园区大门出入口",
          mqttRecordNo: null,
          cpPassEnterTime: null,
          newAdd: false,
          company: "青岛科技有限公司",
        },
        {
          cpPassId: 3091208,
          cpPassVehicleNumber: "浙F8802Z",
          cpPassVehicleType: 2,
          cpPassOwnerName: null,
          cpPassOwnerPhone: null,
          cpPassOwnerCompany: null,
          cpPassType: 1,
          cpPassTime: 1607040087000,
          cpPassGate: "园区大门出入口",
          cpPassGroupId: 48,
          cpPassDoorwayId: null,
          cpPassImgUrl:
            "http://property-static.zhihuipk.com/py/1607039687414monitor.jpg",
          cpPassChannelId: 43,
          cpPassParkId: 48,
          cpPassParkName: "电商基地-停车场",
          cpPassDoorwayName: "银行出入口",
          mqttRecordNo: null,
          cpPassEnterTime: null,
          newAdd: false,
          company: "青岛科技有限公司",
        },
        {
          cpPassId: 3090967,
          cpPassVehicleNumber: "沪C382M1",
          cpPassVehicleType: 2,
          cpPassOwnerName: null,
          cpPassOwnerPhone: null,
          cpPassOwnerCompany: null,
          cpPassType: 1,
          cpPassTime: 1607039546000,
          cpPassGate: "园区大门出入口",
          cpPassGroupId: 48,
          cpPassDoorwayId: null,
          cpPassImgUrl:
            "http://property-static.zhihuipk.com/py/1607039146793monitor.jpg",
          cpPassChannelId: 43,
          cpPassParkId: 48,
          cpPassParkName: "电商基地-停车场",
          cpPassDoorwayName: "园区大门出入口",
          mqttRecordNo: null,
          cpPassEnterTime: null,
          newAdd: false,
          company: "青岛科技有限公司",
        },
        {
          cpPassId: 3090947,
          cpPassVehicleNumber: "浙F39Q28",
          cpPassVehicleType: 2,
          cpPassOwnerName: null,
          cpPassOwnerPhone: null,
          cpPassOwnerCompany: null,
          cpPassType: 1,
          cpPassTime: 1607039481000,
          cpPassGate: "园区大门出入口",
          cpPassGroupId: 48,
          cpPassDoorwayId: null,
          cpPassImgUrl:
            "http://property-static.zhihuipk.com/py/1607039084190monitor.jpg",
          cpPassChannelId: 43,
          cpPassParkId: 48,
          cpPassParkName: "电商基地-停车场",
          cpPassDoorwayName: "园区大门出入口",
          mqttRecordNo: null,
          cpPassEnterTime: null,
          newAdd: false,
          company: "青岛科技有限公司",
        },
      ],
      carTableList: [
        "青岛优康智能科技有限公司",
        "青岛印象投资管理有限公司",
        "中国电信高新区分公司",
        "青岛猎城网络信息有限公司",
        "青岛星岳软件技术有限公司",
        "青岛网信荣创信息科技有限公司",
        "青岛禧泰房地产数据有限公司",
        "青岛裕树环保科技有限公司",
        "青岛艾优维仪器科技有限公司",
        "红岛融媒体",
        "青岛中科国版发展有限公司",
        "青岛安正检测有限公司",
        "青岛企盈盈企业管理有限公司",
        "青岛普思教育科技有限公司",
        "锦茂安全科技集团有限公司",
        "青岛印象投资管理有限公司",
        "青岛猎城网络信息有限公司",
        "青岛禧泰房地产数据有限公司",
        "中国电信高新区分公司",
        "青岛星岳软件技术有限公司",
        "青岛普思教育科技有限公司",
        "青岛优康智能科技有限公司",
        "青岛企盈盈企业管理有限公司",
        "锦茂安全科技集团有限公司",
        "浦发银行",
      ],
      lastTabelData: [],
      singleTable: {},
      snapInfo: {
        imgUrl:
          "http://py-intellect-screen.zhihuipk.com/static/property-img/vehicle-1.png",
        licensePlate: "浙AED465",
        entry: "西二门入口",
        vehicleType: "临时车辆",
        entryTime: "2019-03-31 11:32:14",
        state: 1,
        company: "青岛科技有限公司",
      },
    };
  },
  props: {
    title: {
      type: String,
    },
    toID: {
      type: Number,
    },
  },
  destroyed() {
    window.clearInterval(this.inter);
  },

  mounted() {
    this.getCarParkList();
    this.getcarPassAnalysis(true);
    // this.inter = setInterval(() => {
    //   this.getCarParkList(true);
    //   this.getcarPassAnalysis(true);
    // }, 5000);

    // this.changeGarageActive(this.parkingLotList[0], this.garageIndex);

    this.handleRowClick(this.tableData[0]);
  },
  components: {},
  computed: {
    // garageStatisticsList() {
    //   return this.garageList.filter(item => {
    //     return item.id === this.garageActiveId
    //   })[0].garageStatisticsList
    // }
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (row.active && row.newAdd) {
        return "active-row add-row";
      } else if (row.newAdd) {
        return "add-row";
      } else if (row.active) {
        return "active-row";
      }
    },
    getCarParkList(inter) {
      carParkList()
        .then((res) => {
          if (res.data.code !== 1) {
            return;
          }
          this.parkingLotList = res.data.data ? res.data.data : {};
          console.log(this.parkingLotList)
          this.changeGarageActive(
            this.parkingLotList[this.garageIndex],
            this.garageIndex,
            inter
          );
        })
        .catch((_) => {
          console.log(_);
          this.getFindCarParkPasslist(inter);
        });
    },
    getcarPassAnalysis(inter) {
      carPassAnalysis()
        .then((res) => {
          if (res.data.code !== 1) {
            return;
          }
          this.carStatisticsList = [
            { title: "今日入园", number: res.data.data.todayAllInPass },
            { title: "今日出园", number: res.data.data.todayAllOutPass },
            { title: "今日临时车辆", number: res.data.data.todayTemporaryCar },
            {
              title: "临时车辆平均在园时间",
              number: res.data.data.todayDwellTime,
            },
          ];
          this.carChart = [];
          this.carDate = [];
          res.data.data.passList.forEach((item) => {
            this.carChart.push(item.passNum);
            this.carDate.push(item.passDay);
          });

          //   ? this.carStatisticsList[this.garageIndex]
        })
        .catch((_) => {
          console.log(_);
          // this.getFindCarParkPasslist(inter);
        });
    },
    getEntranceDownlist() {
      entranceDownlist(this.garageActiveId)
        .then((res) => {
          if (res.data.code != 1) {
            return;
          }
          let data = res.data.data ? res.data.data : [];
          this.garageEntryList = data.map((item) => {
            return {
              label: item,
            };
          });
        })
        .catch((_) => {
          console.log(_);
        });
    },
    getFindCarParkPasslist(inter) {
      findCarParkPasslist(this.filter)
        .then((res) => {
          if (res.data.code != 1) {
            return;
          }
          let data = res.data.data;
          this.tableData = data.list ? data.list : [];
          console.log(this.tableData);
              console.log(Math.floor((Math.random()*10)));
          this.tableData.forEach((val,index) => {
              this.$set(val,'company',this.carTableList[Math.floor((Math.random()*10))])
            //   val.company = this.carTableList[Math.floor((Math.random()*10))]
          })
          console.log(this.tableDate);
          this.filter.pageIndex = data.pageIndex;
          this.filter.pageTotal = data.total;
          if (!inter) {
            this.tableData.length && this.handleRowClick(this.tableData[0]);
          } else {
            //设置选中高亮
            this.tableData.forEach((item) => {
              if (item.cpPassTime == this.snapInfo.cpPassTime) {
                item.active = true;
              }
              item.newAdd = this.lastTabelData.every((lastItem) => {
                return item.cpPassTime != lastItem.cpPassTime;
              });
            });
          }
          this.lastTabelData = data.list ? data.list : [];
        })
        .catch((_) => {
          console.log(_);
        });
    },
    look(row, index) {},
    handleRowClick(val) {
      this.snapInfo = val;

      //设置选中高亮
      this.tableData.forEach((item) => {
        item.active = false;
        if (item.cpPassTime == this.snapInfo.cpPassTime) {
          item.active = true;
        }
      });
      this.tableData = JSON.parse(JSON.stringify(this.tableData));
    },
    close() {
      this.$emit("close");
    },
    garageEntrySelect(row, label, value) {
      this.search();
    },
    accessPersonnelTimeSelect(val) {
      // console.log(this.filter.accessPersonnelTime)
      if (val) {
        this.filter.beginTime = new Date(mobile.replaceTime(val)).format(
          "yyyy-MM-dd 00:00:00"
        );
        this.filter.endTime = new Date(mobile.replaceTime(val)).format(
          "yyyy-MM-dd 23:59:59"
        );
      } else {
        this.filter.beginTime = "";
        this.filter.endTime = "";
      }
      this.search();
    },
    search(val) {
      this.getFindCarParkPasslist();
    },
    handleSizeChange(val) {
      this.filter.pageSize = val;
      this.search();
    },
    handleCurrentChange(val) {
      this.filter.pageIndex = val;
      this.getFindCarParkPasslist();
    },
    changeGarageActive(row, index, inter) {
      if (!inter) {
        this.garageActiveId = row.cpgId;
        this.filter.cpgId = row.cpgId;
        this.garageIndex = index;
      }
     
      this.garageStatisticsList[0].number = row.allTotalNum;
      this.garageStatisticsList[1].number = row.inParkNum;
      this.garageStatisticsList[2].number = row.percentage;
      this.carStop = row.status;
       if ( index == 1)
      {
        this.garageStatisticsList[0].number = 65;
      }
      let num = row.inParkNum / row.allTotalNum;
      let changeColorNum = Math.ceil(18 * num);
      this.parkingList = [];
      for (let i = 0; i < 18; i++) {
        if (num >= 1) {
          this.parkingList.push({
            state: "activeDeep",
          });
        } else if (num > 0.8 && i < changeColorNum) {
          this.parkingList.push({
            state: "activeRed",
          });
        } else if (num < 0.8 && i < changeColorNum) {
          this.parkingList.push({
            state: "active",
          });
        } else {
          this.parkingList.push({
            state: "",
          });
        }
      }
       this.getEntranceDownlist();
       this.getFindCarParkPasslist(inter);
    },
  },
  filters: {
    vehicleType(val) {
      switch (val) {
        case 1:
          return "固定车辆";
        case 2:
          return "临时车辆";
        case 3:
          return "免费车辆";
        default:
          return val;
      }
    },
    empty(val) {
      switch (val) {
        case null:
        case undefined:
        case "":
          return "-";
        default:
          return val;
      }
    },
    datetime(val) {
      switch (val) {
        case null:
        case undefined:
        case "":
          return "-";
        default:
          return new Date(mobile.replaceTime(val)).format(
            "yyyy-MM-dd hh:mm:ss"
          );
      }
    },
    vehicleState(val) {
      switch (val) {
        case 1:
          return "通过";
        case 2:
          return "不通过";
        case 3:
          return "非法闯入";
        default:
          return val;
      }
    },
  },
  watch: {
    toID() {
      this.changeGarageActive(this.parkingLotList[this.toID], this.toID, false);
    },
  },
};
</script>


<style lang="scss">
.pagination-box {
  .el-pagination {
    margin: 0 auto;

    .el-pagination__total {
      font-size: 0.16rem;
      font-family: FZLTZHK--GBK1-0;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
    }

    .btn-prev,
    .btn-next {
      background: none;

      .el-icon {
        font-size: 0.22rem;
        font-family: FZLTZHK--GBK1-0;
        font-weight: bold;
        color: rgba(158, 217, 255, 1);
      }
    }

    .el-pager li {
      //height: .19rem;
      font-size: 0.22rem;
      font-family: FZLTZHK--GBK1-0;
      font-weight: bold;
      color: #9ed9ff;
      background: none;
    }

    .el-pager li.active {
      color: #00a8ff;
    }
  }
}

.el-popper[x-placement^="bottom"] .popper__arrow {
  border-bottom-color: #2b9ced;
}

.el-popper[x-placement^="bottom"] .popper__arrow::after {
  border-bottom-color: rgba(17, 72, 134, 0.75);
}

.el-picker-panel {
  background: rgba(17, 72, 134, 0.75);
  border: 0.02rem solid #2b9ced;

  .el-date-table {
    th {
      color: #c2e7ff;
      border-bottom: solid 1px #2b9ced;
    }
  }

  .el-picker-panel__icon-btn,
  .el-date-picker__header-label,
  .el-year-table td .cell,
  .el-month-table td .cell {
    color: #c2e7ff;
  }

  .el-date-table td span {
    color: #c2e7ff;
  }

  .el-year-table td .cell:hover,
  .el-month-table td .cell:hover {
    color: #0091ea;
  }

  .el-date-table td.available:hover {
    span {
      color: #0091ea;
    }
  }

  .el-date-picker__header--bordered {
    border-bottom: solid 1px #2b9ced;
  }
}

.f-select {
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
    height: 0.44rem;
    line-height: 0.44rem;
    background: none;
    border: none;
    border-radius: 0.06rem;
  }

  .el-input--mini .el-input__inner {
    height: 0.44rem;
    line-height: 0.44rem;
    background: rgba(13, 85, 137, 1);
    border: 1px solid rgba(144, 219, 255, 1);
    font-size: 0.16rem;
    font-family: FZLTZHK--GBK1-0;
    font-weight: bold;
    color: #8acffd;
  }

  .el-input--mini .el-input__inner::placeholder {
    font-size: 0.16rem;
    font-family: FZLTZHK--GBK1-0;
    font-weight: bold;
    color: #8acffd;
  }

  .el-input__prefix,
  .el-input__suffix {
    color: #8acffd;

    .el-input__icon {
      color: #8acffd;
    }
  }
}

.f-table {
  flex: 1;
  width: 100%;
  overflow: hidden;
  margin-top: 0rem;

  /deep/ .el-table__body-wrapper {
    overflow: hidden;
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
</style>

<style lang="scss">
.f-table {
  .el-table {
    background: none;
    display: flex;
    flex-direction: column;

    tr,
    th,
    td {
      background: none;
      border: none;
    }

    th.is-leaf,
    td {
      border: none;
    }
  }

  .el-table--group::after,
  .el-table--border::after,
  .el-table::before {
    background: none;
  }

  th,
  td {
    padding: 0.1rem 0;
  }

  th > .cell {
    font-size: 0.14rem;
    font-family: FZLTZHK--GBK1-0;
    font-weight: bold;
    color: rgba(138, 207, 253, 1);
  }

  .cell {
    padding-left: 0.1rem;
    padding-right: 0.1rem;
    font-size: 0.12rem;
    font-family: FZLTZHK--GBK1-0;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    line-height: 0.24rem;
  }

  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background: none;
  }

  .el-table__body-wrapper {
    flex: 1;
    overflow: auto;
  }
}
</style>

<style scoped lang="scss">
@import "../../assets/css/mixin";

.f-vehicle-popup {
  .vehicle {
    width: 100%;
    height: 100%;
    display: flex;

    &-left {
      width: 7.4rem;
      height: 100%;
      display: flex;
      flex-direction: column;

      .item-wrap {
        width: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        padding-left: 0.45rem;

        .garage {
          width: 100%;
          display: flex;
          border-bottom: 1px solid rgba(255, 255, 255, 0.4);
          padding-top: 0.2rem;

          &-item {
            font-size: 0.16rem;
            font-family: PingFangSC-Regular;
            font-weight: bold;
            color: rgba(41, 83, 176, 1);
            padding: 0.11rem 0.06rem;
            margin-right: 0.15rem;
            border-bottom: 0.03rem solid rgba(255, 255, 255, 0);
            cursor: pointer;
            transition: all 0.3s ease-in-out;
          }

          &-item.active {
            border-bottom-color: rgba(0, 158, 248, 1);
            color: rgba(92, 190, 255, 1);
          }
        }

        .garage-statistics {
          display: flex;
          padding: 0.29rem 0;

          &-item {
            flex: 1;
            border-right: 1px solid rgba(133, 211, 255, 0.4);
            text-align: center;
          }

          &-item:last-child {
            border-right: none;
          }

          &-number {
            font-size: 0.3rem;
            font-family: Adobe Heiti Std R;
            font-weight: bold;
            color: #9ed9ff;
          }

          &-title {
            font-size: 0.14rem;
            font-family: PingFangSC-Regular;
            font-weight: bold;
            color: rgba(255, 255, 255, 0.4);
            margin-top: 0.05rem;
          }
        }

        .big-data {
          .chart-box {
            margin: 0 0.45rem;
            width: 5rem;
            height: 1.95rem;
          }
        }
        .parkinglot {
          display: inline-flex;
          .parking {
            display: inline-flex;
            flex-wrap: nowrap;
            padding-bottom: 8%;
            margin-top: 3%;
            margin-left: 2%;
            padding-top: 10%;
            width: 5rem;
            height: 1.6rem;
            background: rgba(13, 85, 137, 0.2);
            border-radius: 10px;
            position: relative;
            &-item {
              width: 0.4rem;
              height: 1.3rem;
              margin-top: -7%;
              margin-right: 2%;
              background: rgb(40, 154, 236);
              border-left: 5px solid;
              border-color: rgb(40, 154, 236);
              .state {
                width: 0.6rem;
                height: 1.3rem;
                margin-top: -7%;
                margin-right: 1.5%;
                background: rgb(224, 39, 64);
                border-left: 5px solid;
                border-color: rgba(13, 85, 137, 1);
              }
            }
            &-item:first-child {
              margin-left: 1.8%;
            }

            &-item.active {
              display: block;
              border-left: 5px solid #00fbf8;
              background: #00fbf8;
            }
            &-item.activeRed {
              display: block;
              border-left: 5px solid #ff1414;
              background: #ff1414;
            }
            &-item.activeDeep {
              display: block;
              border-left: 5px solid #b01414;
              background: #b01414;
            }
          }
          .parking-info {
            font-size: 0.3rem;
            padding-top: 40%;
            display: inline-flex;
            font-family: PingFang SC;
            font-weight: bold;
            padding-left: 3%;
            color: #00fbf8;
          }
        }

        .snap-title {
          font-size: 0.18rem;
          font-family: FZLTZHK--GBK1-0;
          font-weight: bold;
          color: rgba(194, 231, 255, 1);
        }

        .snap {
          display: flex;
          margin-top: 0.18rem;

          .snap-img {
            width: 3.03rem;
            height: 2.26rem;
            margin-right: 0.24rem;

            img {
              width: 100%;
              height: 100%;
            }
          }
        }

        .snap-info {
          flex: 1;

          .license-plate {
            width: 1.46rem;
            height: 0.43rem;
            background: url("http://py-intellect-screen.zhihuipk.com/static/property-img/license-plate-1.png")
              no-repeat;
            background-size: 100% 100%;
            font-size: 0.2rem;
            font-family: PingFangSC-Regular;
            font-weight: bold;
            color: rgba(238, 248, 255, 1);
            line-height: 0.42rem;
            text-align: center;
            padding: 0 0.15rem;
          }

          > p {
            font-size: 0.16rem;
            font-family: PingFangSC-Regular;
            font-weight: bold;
            color: rgba(238, 248, 255, 1);
            margin-top: 0.12rem;
          }

          .green {
            color: rgba(0, 236, 67, 1);
          }

          .danger {
            color: #ff1414;
          }
        }
      }
    }

    &-right {
      flex: 1;
      overflow: hidden;
      height: 100%;
      padding: 0.04rem 0;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;

      .table-list {
        width: 8.95rem;
        height: 0.64rem;
        background: url("http://py-intellect-screen.zhihuipk.com/static/property-img/table-1.png")
          no-repeat;
        background-size: 100% 100%;
        display: flex;

        .table {
          padding: 0 0.25rem;
          font-size: 0.22rem;
          font-family: FZLTZHK--GBK1-0;
          font-weight: bold;
          line-height: 0.64rem;
          cursor: pointer;
        }

        .table-1 {
          width: 2.3rem;
          height: 100%;
          color: rgba(212, 236, 252, 1);
        }

        .table-2 {
          width: 2.5rem;
          height: 100%;
          background: url("http://py-intellect-screen.zhihuipk.com/static/property-img/table-2.png")
            no-repeat;
          background-size: 100% 100%;
          color: rgba(121, 201, 252, 1);
        }
      }

      .filter {
        width: 8.9rem;
        height: 0.7rem;
        background: rgba(13, 85, 137, 0.6);
        box-shadow: 0 0.07rem 0.16rem 0 rgba(8, 1, 2, 0.03);
        border-radius: 0.04rem;
        display: flex;
        align-items: center;
        padding: 0.14rem 0.17rem 0.12rem 0.16rem;

        .f-select {
          width: 2.64rem;
          height: 0.44rem;
          margin-left: 0.18rem;
        }
      }

      .f-table {
        flex: 1;
        width: 100%;
        overflow: hidden;
        margin-top: 0rem;

        /deep/ .el-table__body-wrapper {
          overflow: hidden;
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
        margin-top: 0rem;
        width: 8.9rem;
        height: 0.5rem;
        background: rgba(13, 85, 137, 0.6);
        box-shadow: 0 0.07rem 0.16rem 0 rgba(8, 1, 2, 0.03);
        border-radius: 0.04rem;
        display: flex;
        align-items: center;
      }
      .item-wrap {
        width: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        padding-left: 0.45rem;

        .garage {
          width: 100%;
          display: flex;
          border-bottom: 1px solid rgba(255, 255, 255, 0.4);
          padding-top: 0.2rem;

          &-item {
            font-size: 0.16rem;
            font-family: PingFangSC-Regular;
            font-weight: bold;
            color: rgba(41, 83, 176, 1);
            padding: 0.11rem 0.06rem;
            margin-right: 0.15rem;
            border-bottom: 0.03rem solid rgba(255, 255, 255, 0);
            cursor: pointer;
            transition: all 0.3s ease-in-out;
          }

          &-item.active {
            border-bottom-color: rgba(0, 158, 248, 1);
            color: rgba(92, 190, 255, 1);
          }
        }

        .garage-statistics {
          display: flex;
          padding: 0.29rem 0;

          &-item {
            flex: 1;
            border-right: 1px solid rgba(133, 211, 255, 0.4);
            text-align: center;
          }

          &-item:last-child {
            border-right: none;
          }

          &-number {
            font-size: 0.3rem;
            font-family: Adobe Heiti Std R;
            font-weight: bold;
            color: #9ed9ff;
          }

          &-title {
            font-size: 0.14rem;
            font-family: PingFangSC-Regular;
            font-weight: bold;
            color: rgba(255, 255, 255, 0.4);
            margin-top: 0.05rem;
          }
        }

        .parking {
          display: flex;
          flex-wrap: nowrap;
          padding-bottom: 0.6rem;
          margin-top: 3%;
          margin-left: 2%;
          padding-top: 10%;
          width: 5rem;
          height: 1.6rem;
          background: rgba(13, 85, 137, 1);
          opacity: 0.2;
          border-radius: 10px;
          &-item {
            width: 0.3rem;
            height: 1.3rem;
            margin-left: 1%;
            margin-top: -10%;
            background: rgb(40, 154, 236);
            border-bottom: 1px solid;
            border-left: 5px solid;
            border-color: rgba(13, 85, 137, 1);
            // box-sizing: border-box;
            // position: relative;

            .state {
              // display: none;
              // width: 0.3rem;
              // height: 1.3rem;
              // background:rgb(154, 230, 228);
              //   border-radius: 0.02rem;
              //   position: absolute;
              //   left: 50%;
              //   // top: 50%;
              //   margin-left: -0.09rem;
              //   margin-top: -0.09rem;
              //   cursor: pointer;
              //  background:rgba(0,251,248,1);
            }
          }

          // &-item:nth-child(27n) {
          //   border-right: 1px solid rgba(144, 219, 255, 1);
          // }

          // &-item:last-child {
          //   border-right: 1px solid rgba(144, 219, 255, 1);
          // }

          // &-item.border-top {
          //   border-top: 1px solid rgba(144, 219, 255, 1);
          // }

          .active {
            .state {
              display: block;
              background: red;
            }
          }
        }

        .snap-title {
          font-size: 0.18rem;
          font-family: FZLTZHK--GBK1-0;
          font-weight: bold;
          color: rgba(194, 231, 255, 1);
        }

        .snap {
          display: flex;
          margin-top: 0.18rem;

          .snap-img {
            width: 3.03rem;
            height: 2.26rem;
            margin-right: 0.24rem;

            img {
              width: 100%;
              height: 100%;
            }
          }
        }

        .snap-info {
          flex: 1;

          .license-plate {
            width: 1.46rem;
            height: 0.43rem;
            background: url("http://py-intellect-screen.zhihuipk.com/static/property-img/license-plate-1.png")
              no-repeat;
            background-size: 100% 100%;
            font-size: 0.2rem;
            font-family: PingFangSC-Regular;
            font-weight: bold;
            color: rgba(238, 248, 255, 1);
            line-height: 0.42rem;
            text-align: center;
            padding: 0 0.15rem;
          }

          > p {
            font-size: 0.16rem;
            font-family: PingFangSC-Regular;
            font-weight: bold;
            color: rgba(238, 248, 255, 1);
            margin-top: 0.12rem;
          }

          .green {
            color: rgba(0, 236, 67, 1);
          }

          .danger {
            color: #ff1414;
          }
        }
      }
    }
  }
}

@keyframes flicker {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
