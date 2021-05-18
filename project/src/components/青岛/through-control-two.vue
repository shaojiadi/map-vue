<template>
  <v-popup2 class="f-energy-manage-popup" title="企业人流" @close="close">
    <div class="f-energy-manage-warp">
      <div class="f-energy-left">
        <div class="g-box-tit">园区企业列表</div>
        <div class="search-box">
          <input type="text" v-model="filters.key" placeholder="请输入企业名称" />
          <div class="search-btn">搜索</div>
        </div>
        <div class="table-list-warp">
          <div class="f-table">
            <el-table
              :data="tableData| pagination(filters.pageIndex,filters.pageSize)"
              style="width: 100%;height: 100%;overflow: auto;"
              @row-click="handleRowClick"
              :row-class-name="tableRowClassName"
            >
              <el-table-column prop="name" label="企业名称" show-overflow-tooltip min-width="240">
                <template slot-scope="scope">
                  <div class="company-td">
                    <i
                      v-if="scope.row.isWarn"
                      class="fa"
                      :class="scope.row.isWarn?'fa-exclamation-circle':''"
                    ></i>
                    {{scope.row.name}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="num1" label="当前在职人数" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{scope.row.num1}}人
                  <i
                    class="fa"
                    :class="scope.row.num1Arrow?'fa-long-arrow-up':'fa-long-arrow-down'"
                  ></i>
                </template>
              </el-table-column>
              <el-table-column prop="num2" label="本月来访人数" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{scope.row.num2}}人
                  <i
                    class="fa"
                    :class="scope.row.num2Arrow?'fa-long-arrow-up':'fa-long-arrow-down'"
                  ></i>
                </template>
              </el-table-column>
              <el-table-column prop="lastResidue" label="本月通行量" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{scope.row.num3}}
                  <i
                    class="fa"
                    :class="scope.row.num3Arrow?'fa-long-arrow-up':'fa-long-arrow-down'"
                  ></i>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="pagination-box">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="filters.pageIndex"
              :page-size="filters.pageSize"
              layout="total, prev, pager, next"
              :total="filters.pageTotal"
            ></el-pagination>
          </div>
        </div>
      </div>
      <div class="f-energy-right" v-if="activeData">
        <div class="f-energy-right-top">
          <!-- 新增tab栏目切换 -->
          <div class="tab-change">
              <div class="tab-item" v-for="item in tabArray1"
               :key='item.id'
               :class="{'tab-item-active': tabIndex1 === item.id}"
               @click='changeTab1(item.id)'>{{item.name}}</div>
          </div>
          <div class="f-energy-title">该企业人流量变化柱状图</div>
          <div class="line-area-chart">
            <!-- <v-p-line-area-chart4
              :list="activeData.personnelEntryList"
              :list2="activeData.personnelExitList"
              :dataX="personnelListX1"
              msg="kwh"
              :key="activeData.id"
            ></v-p-line-area-chart4> -->
            <!-- <v-bar-bar-chart
              :list="activeData.personnelEntryList"
              :list2="activeData.personnelExitList"
              :dataX="personnelListX1"
              :maxNumberY="5"
              :minIntervalY="1"
            ></v-bar-bar-chart> -->
            <v-bar-bar-chart-option
              :list="staff"
              :list2="vistor"
              :dataX="personnelListX1"
              :maxNumberY="150"
              :minIntervalY="1"
            ></v-bar-bar-chart-option>
          </div>
          <div class="area-info">
            <div class="area-tit">企业人流量情况分析</div>
            <div class="area-con">
              <p class="p1">
                访客人流量变化趋势——近期呈
                <template v-if="!activeData.num2Arrow">
                  <span class="red">下降趋势</span>
                  ,企业发展存在一定风险
                </template>

                <template v-else>
                  <span class="green">上升趋势</span>,企业发展势头良好
                </template>
              </p>
              <p class="p1">
                在职工人流量变化趋势——近期呈
                <template v-if="!activeData.num1Arrow">
                  <span class="red">下降趋势</span>
                  ,企业发展存在一定风险
                </template>
                <template v-else>
                  <span class="green">平稳上升</span>,企业稳步发展
                </template>

              </p>
              <p class="p1">
                整体人流量变化趋势——
                <span class="red" v-if="!activeData.num3Arrow">下降</span>
                <span class="green" v-else>上升</span>:建议多关注企业发展，及时了解企业需求
              </p>
            </div>
          </div>
        </div>
        <div class="f-energy-right-bottom">
           <!-- 新增tab栏目切换 -->
          <div class="tab-change">
              <div class="tab-item" v-for="item in tabArray2"
               :key='item.id'
               :class="{'tab-item-active': tabIndex2 === item.id}"
               @click='changeTab2(item.id)'>{{item.name}}</div>
          </div>
          <div class="f-energy-title f-energy-title-handle">区域人流量分析图</div>
          <div class="line-area-chart line-area-chart2">
            <!-- <v-p-line-area-chart2
              :list="personnelEntryList"
              :list2="personnelExitList"
              :dataX="personnelListX2"
              msg="kwh"
            ></v-p-line-area-chart2> -->
             <v-bar-bar-chart-option
              :list="areaList1"
              :list2="areaList2"
              :dataX="areaDataX"
              :maxNumberY="400"
              :minIntervalY="1"
              :userOption='option'
            ></v-bar-bar-chart-option>
          </div>
        </div>
      </div>
    </div>
  </v-popup2>
</template>

<script>
import * as mobile from "../../config/mUtils";
import { mapState, mapMutations, mapActions } from "vuex";
import { energyList } from "../../service/getData";
let handleData = {
  type0 () {
      for(let i = 0; i < 7; i++) {
        this.areaList1.push(this.randonNumber(200, 120))
        this.areaList2.push(this.randonNumber(250, 310))
      }
  },
  type1 () {
    for(let i = 0; i < 7; i++) {
        this.areaList1.push(this.randonNumber(660, 1100))
        this.areaList2.push(this.randonNumber(600, 900))
      }
  },
  type2 () {
      for(let i = 0; i < 7; i++) {
        this.areaList1.push(this.randonNumber(500, 800))
        this.areaList2.push(this.randonNumber(600, 1100))
      }
  },
  type3 () {
    for(let i = 0; i < 7; i++) {
            this.areaList1.push(this.randonNumber(400, 1100))
            this.areaList2.push(this.randonNumber(600, 1200))
          }
      },
}
let handleData2 = {
  type0 () {
      for(let i = 0; i < 7; i++) {
        this.staff.push(this.randonNumber(90, 110))
        this.vistor.push(this.randonNumber(80, 100))
      }
  },
  type1 () {
    for(let i = 0; i < 7; i++) {
        this.staff.push(this.randonNumber(40, 60))
        this.vistor.push(this.randonNumber(30, 50))
      }
  }
}
export default {
  name: "App",
  data() {
    return {
      tabIndex1: 0,
      tabIndex2: 0,
      personnelExitListTemp: [],
      personnelEntryListTemp: [],
      option: {
        color: ['#00CCFB', '#2291E3'],
        title: ['今年能耗（KWh）', '去年能耗（KWh']
      },
      tabArray1: [
        {id: 0, name: '在职员工'},
        {id: 1, name: '访客'}
      ],
       tabArray2: [
        {id: 0, name: '全部区域'},
        // {id: 1, name: '园区一期'},
        // {id: 2, name: '园区二期'},
        // {id: 3, name: '园区三期'},
      ],
      //  人行右下，区域人流量分析图数据
      areaList1: [],
      areaList2: [],
      //  人行右上， 该企业人流量变化柱状数据
      staff: [],
      vistor: [],
      areaDataX: [
        new Date().add("d", -6).format("yyyy-MM-dd"),
        new Date().add("d", -5).format("yyyy-MM-dd"),
        new Date().add("d", -4).format("yyyy-MM-dd"),
        new Date().add("d", -3).format("yyyy-MM-dd"),
        new Date().add("d", -2).format("yyyy-MM-dd"),
        new Date().add("d", -1).format("yyyy-MM-dd"),
         "当前",
      ],
      personnelEntryList: [
        { value: 1000 },
        { value: 1500 },
        { value: 1000 },
        { value: 1300 },
        { value: 1000 },
        { value: 1800 },
        { value: 1600 }
      ],
      personnelExitList: [
        { value: 490 },
        { value: 500 },
        { value: 680 },
        { value: 420 },
        { value: 365 },
        { value: 390 },
        { value: 320 }
      ],
      personnelListX1: [
        new Date().add("m", -6*3).format("yyyy-MM-dd"),
        new Date().add("m", -5*3).format("yyyy-MM-dd"),
        new Date().add("m", -4*3).format("yyyy-MM-dd"),
        new Date().add("m", -3*3).format("yyyy-MM-dd"),
        new Date().add("m", -2*3).format("yyyy-MM-dd"),
        new Date().add("m", -1*3).format("yyyy-MM-dd"),
        "当前"
      ],
      personnelListX2: [
        "当前",
        new Date().add("d", 1 * 7).format("yyyy-MM-dd"),
        new Date().add("d", 2 * 7).format("yyyy-MM-dd"),
        new Date().add("d", 3 * 7).format("yyyy-MM-dd"),
        new Date().add("d", 4 * 7).format("yyyy-MM-dd"),
        new Date().add("d", 5 * 7).format("yyyy-MM-dd"),
        new Date().add("d", 6 * 7).format("yyyy-MM-dd")
      ],
      tableData1: [
          {
          id: 1,
          name: "海克斯康方案应用与系统集成（青岛）有限公司",
          num1: "189",
          num1Arrow: 1,
          num2: "28",
          num2Arrow: 1,
          num3: "3810",
          num3Arrow: 1,
          personnelEntryList: [
            { value: 110 },
            { value: 124 },
            { value: 139 },
            { value: 130 },
            { value: 145 },
            { value: 153 },
            { value: 167 }
          ],
          personnelExitList: [
            { value: 25 },
            { value: 20 },
            { value: 23 },
            { value: 27 },
            { value: 25 },
            { value: 26 },
            { value: 29 }
          ],
          isWarn: 0
        },
          {
          id: 2,
          name: "青岛润扬环境科技有限公司",
          num1: "120",
          num1Arrow: 1,
          num2: "23",
          num2Arrow: 1,
          num3: "3740",
          num3Arrow: 1,
          personnelEntryList: [
            { value: 110 },
            { value: 124 },
            { value: 139 },
            { value: 130 },
            { value: 145 },
            { value: 153 },
            { value: 167 }
          ],
          personnelExitList: [
            { value: 25 },
            { value: 20 },
            { value: 23 },
            { value: 27 },
            { value: 25 },
            { value: 26 },
            { value: 29 }
          ],
          isWarn: 0
        },

        {
          id: 3,
          name: "青岛中科国版发展有限公司",
          num1: "167",
          num1Arrow: 1,
          num2: "29",
          num2Arrow: 1,
          num3: "3870",
          num3Arrow: 1,
          personnelEntryList: [
            { value: 110 },
            { value: 124 },
            { value: 139 },
            { value: 130 },
            { value: 145 },
            { value: 153 },
            { value: 167 }
          ],
          personnelExitList: [
            { value: 25 },
            { value: 20 },
            { value: 23 },
            { value: 27 },
            { value: 25 },
            { value: 26 },
            { value: 29 }
          ],
          isWarn: 0
        },

        {
          id: 4,
          name: "青岛优康智能科技有限公司",
          num1: "125",
          num1Arrow: 0,
          num2: "45",
          num2Arrow: 1,
          num3: "2639",
          num3Arrow: 1,
          personnelEntryList: [
            { value: 115 },
            { value: 110 },
            { value: 126 },
            { value: 121 },
            { value: 128 },
            { value: 127 },
            { value: 125 }
          ],
          personnelExitList: [
            { value: 41 },
            { value: 30 },
            { value: 38 },
            { value: 47 },
            { value: 40 },
            { value: 43 },
            { value: 45 }
          ],
          isWarn: 0
        },

        {
          id: 5,
          name: "青岛印象投资管理有限公司",
          num1: "109",
          num1Arrow: 1,
          num2: "11",
          num2Arrow: 1,
          num3: "4287",
          num3Arrow: 0,
          personnelEntryList: [
            { value: 101 },
            { value: 90 },
            { value: 90 },
            { value: 98 },
            { value: 105 },
            { value: 100 },
            { value: 109 }
          ],
          personnelExitList: [
            { value: 19 },
            { value: 30 },
            { value: 18 },
            { value: 22 },
            { value: 21 },
            { value: 10 },
            { value: 11 }
          ],
          isWarn: 0
        },

        {
          id: 6,
          name: "北京华茂嘉华国际贸易有限公司",
          num1: "101",
          num1Arrow: 0,
          num2: "16",
          num2Arrow: 0,
          num3: "3013",
          num3Arrow: 0,
          personnelEntryList: [
            { value: 115 },
            { value: 119 },
            { value: 123 },
            { value: 120 },
            { value: 109 },
            { value: 109 },
            { value: 101 }
          ],
          personnelExitList: [
            { value: 40 },
            { value: 43 },
            { value: 33 },
            { value: 27 },
            { value: 31 },
            { value: 20 },
            { value: 16 }
          ],
          isWarn: 1
        },

        {
          id: 7,
          name: "中国电信高新区分公司",
          num1: "184",
          num1Arrow: 1,
          num2: "22",
          num2Arrow: 0,
          num3: "3830",
          num3Arrow: 1,
          personnelEntryList: [
            { value: 180 },
            { value: 180 },
            { value: 190 },
            { value: 180 },
            { value: 185 },
            { value: 180 },
            { value: 184 }
          ],
          personnelExitList: [
            { value: 19 },
            { value: 30 },
            { value: 18 },
            { value: 22 },
            { value: 31 },
            { value: 30 },
            { value: 22 }
          ],
          isWarn: 0
        },

        {
          id: 8,
          name: "青岛猎城网络信息有限公司",
          num1: "178",
          num1Arrow: 1,
          num2: "19",
          num2Arrow: 1,
          num3: "2870",
          num3Arrow: 0,
          personnelEntryList: [
            { value: 180 },
            { value: 200 },
            { value: 201 },
            { value: 200 },
            { value: 205 },
            { value: 190 },
            { value: 178 }
          ],
          personnelExitList: [
            { value: 19 },
            { value: 30 },
            { value: 18 },
            { value: 22 },
            { value: 26 },
            { value: 24 },
            { value: 19 }
          ],
          isWarn: 0
        },

        {
          id: 9,
          name: "青岛星岳软件技术有限公司",
          num1: "188",
          num1Arrow: 1,
          num2: "24",
          num2Arrow: 0,
          num3: "3672",
          num3Arrow: 1,
          personnelEntryList: [
            { value: 180 },
            { value: 180 },
            { value: 209 },
            { value: 200 },
            { value: 190 },
            { value: 185 },
            { value: 188 }
          ],
          personnelExitList: [
            { value: 29 },
            { value: 30 },
            { value: 28 },
            { value: 22 },
            { value: 26 },
            { value: 29 },
            { value: 24 }
          ],
          isWarn: 0
        },

        {
          id: 10,
          name: "青岛网信荣创信息科技有限公司",
          num1: "80",
          num1Arrow: 0,
          num2: "45",
          num2Arrow: 0,
          num3: "3585",
          num3Arrow: 0,
          personnelEntryList: [
            { value: 109 },
            { value: 102 },
            { value: 99 },
            { value: 95 },
            { value: 95 },
            { value: 90 },
            { value: 80 }
          ],
          personnelExitList: [
            { value: 39 },
            { value: 30 },
            { value: 38 },
            { value: 42 },
            { value: 55 },
            { value: 54 },
            { value: 45 }
          ],
          isWarn: 0
        },

        {
          id: 11,
          name: "青岛禧泰房地产数据有限公司",
          num1: "133",
          num1Arrow: 0,
          num2: "48",
          num2Arrow: 1,
          num3: "2990",
          num3Arrow: 0,
          personnelEntryList: [
            { value: 170 },
            { value: 160 },
            { value: 150 },
            { value: 160 },
            { value: 165 },
            { value: 148 },
            { value: 133 }
          ],
          personnelExitList: [
            { value: 29 },
            { value: 30 },
            { value: 40 },
            { value: 50 },
            { value: 55 },
            { value: 40 },
            { value: 48 }
          ],
          isWarn: 0
        },

        {
          id: 12,
          name: "青岛职务帮科技有限公司",
          num1: "100",
          num1Arrow: 1,
          num2: "43",
          num2Arrow: 0,
          num3: "4170",
          num3Arrow: 1,
          personnelEntryList: [
            { value: 91 },
            { value: 89 },
            { value: 95 },
            { value: 95 },
            { value: 100 },
            { value: 90 },
            { value: 100 }
          ],
          personnelExitList: [
            { value: 19 },
            { value: 30 },
            { value: 50 },
            { value: 20 },
            { value: 65 },
            { value: 40 },
            { value: 43 }
          ],
          isWarn: 0
        },

        {
          id: 13,
          name: "青岛裕树环保科技有限公司",
          num1: "87",
          num1Arrow: 0,
          num2: "37",
          num2Arrow: 0,
          num3: "4070",
          num3Arrow: 1,
          personnelEntryList: [
            { value: 90 },
            { value: 80 },
            { value: 85 },
            { value: 83 },
            { value: 85 },
            { value: 90 },
            { value: 87 }
          ],
          personnelExitList: [
            { value: 19 },
            { value: 30 },
            { value: 18 },
            { value: 20 },
            { value: 45 },
            { value: 39 },
            { value: 37 }
          ],
          isWarn: 0
        },

        {
          id: 14,
          name: "青岛艾优维仪器科技有限公司",
          num1: "138",
          num1Arrow: 0,
          num2: "9",
          num2Arrow: 0,
          num3: "3523",
          num3Arrow: 1,
          personnelEntryList: [
            { value: 140 },
            { value: 150 },
            { value: 150 },
            { value: 130 },
            { value: 145 },
            { value: 139 },
            { value: 138 }
          ],
          personnelExitList: [
            { value: 39 },
            { value: 30 },
            { value: 18 },
            { value: 20 },
            { value: 45 },
            { value: 20 },
            { value: 9 }
          ],
          isWarn: 0
        },

        {
          id: 15,
          name: "青岛企盈盈企业管理有限公司",
          num1: "143",
          num1Arrow: 0,
          num2: "26",
          num2Arrow: 0,
          num3: "3666",
          num3Arrow: 0,
          personnelEntryList: [
            { value: 180 },
            { value: 165 },
            { value: 150 },
            { value: 160 },
            { value: 165 },
            { value: 150 },
            { value: 143 }
          ],
          personnelExitList: [
            { value: 19 },
            { value: 30 },
            { value: 50 },
            { value: 40 },
            { value: 65 },
            { value: 39 },
            { value: 26 }
          ],
          isWarn: 0
        },

        {
          id: 16,
          name: "青岛普思教育科技有限公司",
          num1: "99",
          num1Arrow: 1,
          num2: "15",
          num2Arrow: 1,
          num3: "3284",
          num3Arrow: 1,
          personnelEntryList: [
            { value: 160 },
            { value: 150 },
            { value: 150 },
            { value: 130 },
            { value: 115 },
            { value: 91 },
            { value: 99 }
          ],
          personnelExitList: [
            { value: 19 },
            { value: 30 },
            { value: 18 },
            { value: 22 },
            { value: 25 },
            { value: 14 },
            { value: 15 }
          ],
          isWarn: 0
        },

        {
          id: 17,
          name: "锦茂安全科技集团有限公司",
          num1: "119",
          num1Arrow: 1,
          num2: "27",
          num2Arrow: 1,
          num3: "3870",
          num3Arrow: 1,
          personnelEntryList: [
            { value: 80 },
            { value: 80 },
            { value: 95 },
            { value: 110 },
            { value: 105 },
            { value: 100 },
            { value: 119 }
          ],
          personnelExitList: [
            { value: 46 },
            { value: 30 },
            { value: 10 },
            { value: 20 },
            { value: 25 },
            { value: 19 },
            { value: 27 }
          ],
          isWarn: 0
        }
      ],
      activeData: null,
      filters: {
        pageIndex: 1,
        pageSize: 16,
        pageTotal: 0,
        key: ""
      }
    };
  },
  props: {
    title: {
      type: String
    },
     activeIndex: {
      type: Number
    }
  },
  mounted() {
    this._initData()
    this.$nextTick(() => {
      this.handleRowClick(this.tableData1[this.activeIndex]);
    });
  },
  components: {},
  computed: {
    tableData() {
      let array = [...this.tableData1];

      let data = array.filter(item => {
        return item.name.indexOf(this.filters.key) > -1;
      });
      this.filters.pageTotal = data.length;
      return data;
    }
  },
  filters: {
    pagination(array, pageNo, pageSize) {
      let offset = (pageNo - 1) * pageSize; //当前页第一条的索引
      let data =
        offset + pageSize >= array.length
          ? array.slice(offset, array.length)
          : array.slice(offset, offset + pageSize);
      return data;
    }
  },
  methods: {
    _initData () {
      //  默认人行，区域人流量分析
      handleData.type0.call(this)
      //  默认人行,在职员工
      handleData2.type0.call(this)
    },
    randonNumber (m, n) {
        return Math.floor(Math.random() * (n - m ) + m)
    },
    changeTab1 (val) {
        this.tabIndex1 = val
        //  在职员工
        this.staff = []
        this.vistor = []
        handleData2[`type${val}`] && handleData2[`type${val}`].call(this)
    },
    


    changeTab2 (val) {
        this.tabIndex2 = val
        //  处理全部区域，一期等数据
        this.areaList1 = []
        this.areaList2 = []
        handleData[`type${val}`] && handleData[`type${val}`].call(this)
    },
    handleRowClick(val) {
      //设置选中高亮
      this.activeData = val;
      //  备份数据
      this.personnelExitListTemp = [...val.personnelExitList]
      this.personnelEntryListTemp = [...val.personnelEntryList]
      //  默认人行,在职员工
      this.staff = []
      this.vistor = []
      handleData2.type0.call(this)
      //  
      this.tableData1.forEach(item => {
        item.active = false;
        if (item.id == val.id) {
          item.active = true;
        }
      });
      this.tableData1 = JSON.parse(JSON.stringify(this.tableData1));
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.isWarn && row.active) {
        return "active-warn-row";
      }
      if (row.active) {
        return "active-row";
      }
    },
    search() {
      this.filters.pageIndex = 1;
    },

    close() {
      this.$emit("close");
    },
    handleSizeChange(val) {
      this.filters.pageSize = val;
    },
    handleCurrentChange(val) {
      this.filters.pageIndex = val;
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/css/mixin";
/deep/ .f-popup-content {
  padding: 0.3rem 0.2rem;
}
.f-energy-manage-warp {
  display: flex;

  .f-energy-left {
    width: 8.4rem;
    height: 9.11rem;
    padding: 0.4rem 0.45rem 0.23rem 0.5rem;
    background: url("http://qsxw-screen.zhihuipk.com/static/property-img/through_left_bg.png") no-repeat;
    background-size: 100% 100%;
    position: relative;

    .g-box-tit {
      font-size: 0.18rem;
      font-family: Lantinghei SC;
      font-weight: bold;
      line-height: 0.36rem;
      color: #c2e7ff;
    }
    .search-box {
      display: flex;
      align-items: center;
      position: absolute;
      right: 0.6rem;
      top: 0.5rem;
      input {
        margin-right: 0.15rem;
        padding: 0 0.15rem;
        padding-right: 0.41rem;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background: rgba(13, 85, 137, 1);
        font-size: 0.16rem;
        font-family: FZLTZHK--GBK1-0;
        font-weight: bold;
        color: #8acffd;
        width: 2.52rem;
        height: 0.44rem;
        box-sizing: border-box;
        border: 1px solid rgba(144, 219, 255, 1);
        border-radius: 0.06rem;
        &::placeholder {
          font-size: 0.16rem;
          color: #8acffd;
        }
      }
      .search-btn {
        width: 0.93rem;
        height: 0.44rem;
        background: linear-gradient(
          180deg,
          rgba(0, 210, 255, 1) 0%,
          rgba(62, 166, 255, 1) 100%
        );
        border-radius: 0.04rem;
        line-height: 0.44rem;
        text-align: center;
        font-size: 0.18rem;
        font-weight: bold;
        color: #0b3959;
      }
    }
    .table-list-warp {
      width: 100%;
      margin-top: 0.4rem;
      box-sizing: border-box;

      .table-list {
        height: 0.64rem;
        width: 10.1rem;
        background: url("http://qsxw-screen.zhihuipk.com/static/property-img/table-1.png") no-repeat;
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
          background: url("http://qsxw-screen.zhihuipk.com/static/property-img/table-2.png") no-repeat;
          background-size: 100% 100%;
          color: rgba(121, 201, 252, 1);

          &.active {
            background: url("http://qsxw-screen.zhihuipk.com/static/property-img/table-3.png") no-repeat;
            background-size: 100% 100%;
          }
        }
      }

      .filter {
        width: 100%;
        height: 0.7rem;
        background: rgba(13, 85, 137, 0.6);
        box-shadow: 0 0.07rem 0.16rem 0 rgba(8, 1, 2, 0.03);
        border-radius: 0.04rem;
        display: flex;
        align-items: center;
        padding: 0.14rem 0.17rem 0.12rem 0.16rem;
        margin-top: 0.2rem;
      }

      .f-table {
        flex: 1;
        width: 100%;
        overflow: hidden;
        height: 6.85rem;
        /deep/ .el-table tr {
          cursor: pointer;
          &:nth-child(even) {
            background-color: rgba(9, 48, 83, 0.4);
          }
          &.active-row {
            background-color: rgba(13, 85, 137, 0.4);
          }
          &.active-warn-row {
            background-color: rgba(255, 20, 20, 0.2);
          }
        }

        /deep/ .el-table th,
        /deep/ .el-table td {
          padding: 0.08rem 0;
        }

        /deep/ .el-table thead {
          height: 0.4rem;
          background: rgba(13, 85, 137, 0.4);
        }
        .fa {
          margin-left: 0.1rem;
        }
        .fa-long-arrow-down {
          color: #ff1414;
        }
        .fa-long-arrow-up {
          color: #00ec43;
        }
        .company-td {
          position: relative;
          padding-left: 0.2rem;
        }
        .fa-exclamation-circle {
          color: #ff1414;
          left: -0.1rem;
          @include ct();
        }
      }

      .pagination-box {
        width: 100%;
        margin-top: 0.1rem;
        height: 0.4rem;
        background: rgba(13, 85, 137, 0.6);
        box-shadow: 0 0.07rem 0.16rem 0 rgba(8, 1, 2, 0.03);
        border-radius: 0.04rem;
        display: flex;
        align-items: center;

        /deep/ .el-pagination {
          .el-pagination__total {
            font-size: 0.14rem;
          }

          .el-pager li {
            font-size: 0.16rem;
          }
        }
      }
    }
  }
  .f-energy-right-top {
    background: url("http://qsxw-screen.zhihuipk.com/static/property-img/through_right_top_bg.png");
    background-size: 100% 100%;
    width: 8.4rem;
    height: 5.68rem;
    padding: 0.4rem 0.45rem 0.23rem 0.5rem;
    .line-area-chart {
      // height: 2.7rem;
      height: 2.2rem;
      width: 7.54rem;
      margin-top: -0.1rem;
    }
   
    .area-info {
      width: 7.5rem;
      height: 1.64rem;
      background: rgba(13, 85, 137, 0.3);
      box-shadow: 0rem 0rem 0rem 0rem rgba(8, 1, 2, 0.03);
      border-radius: 0.04rem;
      // margin-top: 0.2rem;
      margin-top: .1rem;
      padding: 0 0.24rem;
      .area-tit {
        height: 0.47rem;
        line-height: 0.47rem;
        color: #c2e7ff;
        font-size: 0.18rem;
        font-weight: bold;
        border-bottom: 1px solid rgba(191, 221, 255, 0.2);
      }
      .area-con {
        padding: 0.1rem 0;
        p {
          color: #eef8ff;
          font-size: 0.16rem;
          line-height: 0.35rem;
        }
        .red {
          color: #ff1414;
        }
        .green {
          color: #00ec43;
        }
      }
    }
  }
  .f-energy-right-bottom {
    margin-top: -0.1rem;
    background: url("http://qsxw-screen.zhihuipk.com/static/property-img/through_right_bottom_bg.png");
    background-size: 100% 100%;
    width: 8.4rem;
    height: 3.53rem;
    padding: 0.4rem 0.45rem 0.23rem 0.5rem;
    .line-area-chart {
      height: 2.5rem;
      width: 7.54rem;
      margin-top: -0.4rem;
    }
  }

  .f-energy-right {
    .f-energy-title {
      font-size: 0.18rem;
      font-family: Lantinghei SC;
      font-weight: bold;
      line-height: 0.36rem;
      color: rgba(194, 231, 255, 1);
      // transform: translateY(-.05rem);
    }
    .f-energy-title-handle {
      transform: translateY(-.09rem);
    }
  }
}

@keyframes increase {
  from {
    width: 0;
  }
}
</style>
