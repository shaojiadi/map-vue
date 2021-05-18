<template>
  <v-popup class="f-personnel-popup" title="人行管理" @close="close">
    <div class="personnel">
      <div class="personnel-left">
        <v-wrap class="item-wrap" style="height: 4.53rem">
          <h3 class="title" style="margin-top: 0.25rem">人员进出统计</h3>
          <div class="line-area-chart">
            <v-p-line-area-chart7
              :list="personnelEntryList"
              :list2="personnelExitList"
              :dataX="personnelListX"
              msg="kwh"
            ></v-p-line-area-chart7>
          </div>
        </v-wrap>
        <v-wrap class="item-wrap" style="height: 3.72rem">
          <h3 class="snap-title" style="margin-top: 0.25rem">通行人员详情</h3>
          <div class="snap">
            <div class="snap-img">
              <img
                :src="
                  snapInfo.facePhoto +
                  '?x-oss-process=image/resize,w_500/auto-orient,1'
                "
                alt
              />
            </div>

            <div class="snap-info">
              <p>人员姓名：{{ snapInfo.facePassName | empty }}</p>
              <!-- <p>
                <span class="user-label">
                  {{ snapInfo.label || "企业办公人员" }}</span
                > -->
                <!-- <span class="user-label"> 企业</span>  -->
              <!-- </p> -->
              <!-- <p>账号/联系方式：{{ snapInfo.facePassPhone | empty }}</p> -->
              <p>人员类型：{{ snapInfo.facePassType | facePassType }}</p>
              <!-- <p>所属企业：{{ snapInfo.facePassCompany | empty }}</p> -->
              <p>区域范围：蓝海智谷</p>
              <!-- <p>出入时间：{{ snapInfo.facePassTime | datetime }}</p> -->
              <p>出入时间：{{ snapInfo.facePassTime| datetime  }}</p>
              <!-- <p>
                验证类型：
                <template v-if="snapInfo.facePassCheckType === 1"
                  >人脸</template
                >
                <template v-else-if="snapInfo.facePassCheckType === 2"
                  >二维码</template
                >
              </p> -->
              <p>
                温度监测：
                <template>{{snapInfo.facePassTemperature | empty}}</template>
              </p>
            </div>
          </div>
        </v-wrap>
      </div>
      <div class="personnel-right">
        <div class="table-list">
          <div
            class="table"
            :class="{ active: filter.direct === 1 }"
            @click="changeDirect(2)"
          >
            入园情况明细
          </div>
          <div
            class="table"
            :class="{ active: filter.direct === 2 }"
            @click="changeDirect(1)"
          >
            出园情况明细
          </div>
        </div>
        <div class="filter">
          <v-mini-select
            v-model="filter.type"
            placeholder="出入人员类型"
            @select="search"
            :optionList="accessPersonnelTypeList"
          ></v-mini-select>
          <!--<v-mini-select v-model="filter.accessPersonnelTime" placeholder="人员出入时间" @select="accessPersonnelTimeSelect"-->
          <!--:optionList="accessPersonnelTime" style="margin-left: .18rem;"></v-mini-select>-->
          <div class="f-select">
            <el-date-picker
              v-model="filter.time"
              value-format="yyyy-MM-dd 00:00:00"
              size="mini"
              type="date"
              @change="search"
              placeholder="人员出入时间"
            ></el-date-picker>
          </div>
          <v-min-input
            v-model="filter.keyWord"
            style="margin-left: 0.4rem"
            placeholder="请输入人员信息"
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
              prop="facePassName"
              label="人员名称"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="facePassType"
              label="人员类型"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <!--<div v-if="scope.row.facePassType===1">企业员工</div>-->
                <!--<div v-else-if="scope.row.facePassType===2">园区员工</div>-->
                <!--<div v-else-if="scope.row.facePassType===3">访客</div>-->
                <!--<div v-else>&#45;&#45;</div>-->
                {{ scope.row.facePassType | facePassType | empty }}
              </template>
            </el-table-column>
            <el-table-column
              prop="facePassTemperature"
              label="温度监测"
              show-overflow-tooltip
            >
            <template slot-scope="scope">
                {{ scope.row.facePassTemperature  | empty }}
              </template></el-table-column>
            <el-table-column
              prop="entryTime"
              label="出入时间"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <!-- {{ scope.row.facePassTime | datetime }} -->
                {{ scope.row.facePassTime | datetime}}
              </template>
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
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </v-popup>
</template>

<script>
import * as global from "../../config/mUtils";
import { mapState, mapMutations, mapActions } from "vuex";
import { peoplePassRecord, passDataList } from "../../service/getData";

export default {
  name: "App",
  data() {
    return {
      inter: "",
      tableActive: "in",
      personnelEntryList: [
        { value: 136, name: "08:00" },
        { value: 158, name: "09:00" },
        { value: 121, name: "10:00" },
        { value: 193, name: "11:00" },
        { value: 96, name: "12:00" },
        { value: 87, name: "13:00" },
        { value: 154, name: "14:00" },
        { value: 67, name: "当前" },
      ],
      personnelExitList: [
        { value: 120, name: "08:00" },
        { value: 117, name: "09:00" },
        { value: 166, name: "10:00" },
        { value: 141, name: "11:00" },
        { value: 101, name: "12:00" },
        { value: 63, name: "13:00" },
        { value: 172, name: "14:00" },
        { value: 32, name: "当前" },
      ],
      personnelListX: [
        new Date().add("d", -8).format("MM-dd"),
        new Date().add("d", -7).format("MM-dd"),
        new Date().add("d", -6).format("MM-dd"),
        new Date().add("d", -5).format("MM-dd"),
        new Date().add("d", -4).format("MM-dd"),
        new Date().add("d", -3).format("MM-dd"),
        new Date().add("d", -2).format("MM-dd"),
        new Date().add("d", -1).format("MM-dd"),
      ],
      personnelAnomaliesList: [
        {
          imgUrl:
            "http://yqwfhy-view.zhihuipk.com/static/property-img/personnel-1.png",
          title: "异常进入!",
          exceptionType: "黑名单人员进入",
          alarmTime: "2019-04-02 07:30",
          exceptionLocation: "园区东门人脸识别入口",
          vigilanceMechanism: "警戒中",
        },
        {
          imgUrl:
            "http://yqwfhy-view.zhihuipk.com/static/property-img/personnel-2.png",
          title: "异常进入!",
          exceptionType: "无人脸信息",
          alarmTime: "2019-3-28 12:45",
          exceptionLocation: "园区西门人脸识别入口",
          vigilanceMechanism: "已解除",
        },
        {
          imgUrl:
            "http://yqwfhy-view.zhihuipk.com/static/property-img/personnel-3.png",
          title: "异常进入!",
          exceptionType: "黑名单人员进入",
          alarmTime: "2019-3-26 19:27",
          exceptionLocation: "园区西门人脸识别入口",
          vigilanceMechanism: "已解除",
        },
      ],
      filter: {
        type: "",
        time: "",
        keyWord: "",
        direct: 1,
        pageIndex: 1,
        pageSize: 12,
        pageTotal: 12,
      },
      accessPersonnelTypeList: [
        { label: "企业人员", value: 1 },
        { label: "园区人员", value: 2 },
        { label: "访客", value: 3 } /*{label: '园区主管', value: 4},*/,
      ],
      tableData: [],
      lastTabelData: [],
      snapInfo: {
        facePassId: 297908,
        facePassName: "张旭琛",
        facePassPhone: "13780100529",
        facePassCompany: "青岛泽玖网络科技有限公司",
        buildName: "楼宇外围",
        facePassTime: "当日 8:53",
        facePassTemperature:'36',
        facePassCheckType: 1,
        facePassWay: 2,
        visitorRegisterType: null,
        facePassPersonId: 67523,
        facePassType: 3,
        facePhoto: "../../../static/images/img/5.png",
        active: false,
        label: "企业办公人员",
      },
    };
  },
  props: {
    title: {
      type: String,
    },
  },
  destroyed() {
    if (this.inter) {
      window.clearInterval(this.inter);
    }
  },
  mounted() {
    // this.inter = setInterval(() => {
    //     this.init(true);
    //   }, 100000);
      this.init();
      this.getPassDataList();
    // this.handleRowClick(this.tableData[0])
  },
  components: {},
  computed: {},
  methods: {
    changeDirect(type) {
      this.filter.direct = type;
     
      // this.handleRowClick(this.filter.direct==2  ? this.tableData[0] :this.tableData2[0] )
      // if(this.filter.direct==1){
      //   this.snapInfo = this.tableData2[0];
      // }else if((this.filter.direct==2)) {
      //   this.snapInfo = this.tableData[0];
      // }
      this.search();
    },
    getPassDataList() {
      passDataList()
        .then((res) => {
          if (res.data.code != 1) {
            return;
          }

          let enterList = res.data.data.enterDataList;
          let leaveList = res.data.data.outDataList;
          let enterListX = [];
          enterList.forEach((item, index) => {
            let startTime = new Date(global.replaceTime(item.startTime)).format(
              "hh:mm"
            );
            item.name = startTime;
            enterListX.push(item.name);
            item.value = item.passNum;
          });
          this.personnelEntryList = enterList;
          this.personnelExitList = leaveList.map((item) => {
            let startTime = new Date(global.replaceTime(item.startTime)).format(
              "hh:mm"
            );
            item.name = startTime;
            item.value = item.passNum;
            return item;
          });
          this.personnelListX = enterListX;
        })
        .catch((_) => {
          console.log(_);
        });
    },
    close() {
      this.$emit("close");
    },
    init(inter) {
      peoplePassRecord(this.filter).then(res => {
          if (res.data.code != 1) {
            return;
          }
          let data = res.data;
          this.tableData = data.list ? data.list : [];
          this.filter.pageTotal = res.data.total;
          if (!inter) {
            this.tableData.length && this.handleRowClick(this.tableData[0]);
          } else {
            //设置选中高亮
            this.tableData.forEach(item => {
              if (item.facePassTime === this.snapInfo.facePassTime) {
                item.active = true;
              }
              item.newAdd = this.lastTabelData.every(lastItem => {
                return item.facePassTime !== lastItem.facePassTime
              })
            });
          }
          this.lastTabelData = data.list ? data.list : [];
        }).catch(_ => {
          console.log(_);
        });
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
    handleRowClick(val) {
      this.snapInfo = val;

      //设置选中高亮
      this.tableData.forEach((item) => {
        item.active = !!(item.facePassTime === this.snapInfo.facePassTime);
      });

      this.tableData = JSON.parse(JSON.stringify(this.tableData))
    },
    search(val) {
      this.filter.pageIndex = 1;
      this.init();
    },
    handleSizeChange(val) {
      this.filter.pageSize = val;
      this.search();
    },
    handleCurrentChange(val) {
      this.filter.pageIndex = val;
      this.init();
    },
  },
  filters: {
    facePassType(val) {
      switch (val) {
        case 1:
          return "流动人口";
        case 2:
          return "常驻办公人口";
        case 3:
          return "租客";
        case 4:
          return "访客";
        case 5:
          return "业主";
        default:
          return val;
      }
    },
  },
};
</script>

<style lang="scss">
  .f-personnel-popup {
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
  }

  // 时间筛选
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
</style>

<style scoped lang="scss">
@import "../../assets/css/mixin";
.user-label {
  padding: 0.02rem 0.1rem;
  margin-right: 0.1rem;
  background: rgba(13, 85, 137, 0.4);
  color: rgba(138, 207, 253, 1);
}
.f-personnel-popup {
  .personnel {
    width: 100%;
    height: 100%;
    display: flex;

    &-left {
      width: 7.15rem;
      height: 100%;
      display: flex;
      flex-direction: column;

      .item-wrap {
        width: 100%;
        /*flex: 1;*/
        overflow: hidden;
        display: flex;
        flex-direction: column;

        .title {
          font-size: 0.18rem;
          font-family: FZLTZHK--GBK1-0;
          font-weight: bold;
          color: rgba(194, 231, 255, 1);
          padding-left: 0.1rem;
        }

        .btn-list {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          /*padding-right: .1rem;*/
          box-sizing: border-box;

          > span {
            font-size: 0.14rem;
            font-family: FZLTZHK--GBK1-0;
            font-weight: 600;
            color: rgba(34, 145, 227, 1);
            cursor: pointer;
            transition: all 0.3s ease-in-out;
          }

          > span.active {
            color: rgba(0, 204, 251, 1);
          }

          .btn {
            display: flex;
            width: 0.56rem;
            height: 0.14rem;
            background: rgba(0, 204, 251, 0.2);
            border-radius: 0.07rem;
            margin: 0 0.05rem;

            > span {
              display: block;
              flex: 1;
              height: 100%;
              cursor: pointer;
              transition: all 0.3s ease-in-out;
            }

            .active {
              width: 0.3rem;
              height: 0.14rem;
              background: rgba(0, 204, 251, 1);
              border-radius: 0.07rem;
            }
          }
        }

        .line-area-chart {
          flex: 1;
          width: 100%;
          padding-top: 0.4rem;
          padding-bottom: 0.3rem;
          box-sizing: border-box;
        }

        .snap-title {
          font-size: 0.18rem;
          font-family: FZLTZHK--GBK1-0;
          font-weight: bold;
          color: rgba(194, 231, 255, 1);
        }

        .snap {
          display: flex;
          align-items: center;
          margin-top: 0.18rem;

          .snap-img {
            width: 2.02rem;
            height: 2.4rem;
            margin-right: 0.3rem;

            img {
              width: 100%;
              height: 100%;
            }
          }
        }

        .snap-info {
          flex: 1;
          overflow: hidden;

          .license-plate {
            width: 1.46rem;
            height: 0.43rem;
            background: url("http://yqwfhy-view.zhihuipk.com/static/property-img/license-plate-1.png")
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
            /*margin-top: 0.12rem;*/
            line-height: 0.5rem;
          }

          .green {
            color: rgba(0, 236, 67, 1);
          }

          .danger {
            color: #ff1414;
          }
        }
      }

      .personnel-anomalies-ranking {
        flex: 1;
        width: 100%;
        margin-top: 0.19rem;
        padding-bottom: 0.1rem;
        box-sizing: border-box;
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
        background: url("http://yqwfhy-view.zhihuipk.com/static/property-img/table-1.png")
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
          width: 2.5rem;
          height: 100%;
          background: url("http://yqwfhy-view.zhihuipk.com/static/property-img/table-2.png")
            no-repeat;
          background-size: 100% 100%;
          color: rgba(121, 201, 252, 1);

          &.active {
            background: url("http://yqwfhy-view.zhihuipk.com/static/property-img/table-3.png")
              no-repeat;
            background-size: 100% 100%;
          }
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
        margin-top: 0.2rem;

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
        margin-top: 0.2rem;

        /deep/ .el-table__body {
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
        margin-top: 0.2rem;
        width: 8.9rem;
        height: 0.7rem;
        background: rgba(13, 85, 137, 0.6);
        box-shadow: 0 0.07rem 0.16rem 0 rgba(8, 1, 2, 0.03);
        border-radius: 0.04rem;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>

