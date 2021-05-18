<template>
  <v-popup2 class="f-energy-manage-popup" title="企业能耗" @close="close">
    <div class="f-energy-manage-warp">
      <div class="f-energy-left">
        <div class="g-box-tit">企业用电列表</div>
        <div class="search-box">
          <input type="text" v-model="filters.key" placeholder="请输入企业名称" />
          <div class="search-btn">搜索</div>
        </div>
        <div class="table-list-warp">
          <div class="f-table">
            <el-table
              :data="tableData | pagination(filters.pageIndex,filters.pageSize)"
              style="width: 100%;height: 100%;overflow: auto;"
              @row-click="handleRowClick"
              :row-class-name="tableRowClassName"
            >
              <el-table-column prop="name" label="企业名称" show-overflow-tooltip min-width="180">
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
              <el-table-column prop="num1" label="本期水表读数" show-overflow-tooltip>
                <template slot-scope="scope">{{scope.row.num1}}</template>
              </el-table-column>
              <el-table-column prop="num2" label="本期电表读数" show-overflow-tooltip>
                <template slot-scope="scope">{{scope.row.num2}}</template>
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
          <div class="f-energy-title f-energy-title-mar">该企业近期能耗柱状图</div>
          <div class="line-area-chart">
            <!-- <div class="btn-list">
              <span
                :class="{'active':energyActiveId === 'electricity'}"
                @click.stop="changeEnergyActive('electricity')"
              >用电量</span>
              <p class="btn">
                <span
                  :class="{'active':energyActiveId === 'electricity'}"
                  @click.stop="changeEnergyActive('electricity')"
                ></span>
                <span
                  :class="{'active':energyActiveId === 'water'}"
                  @click.stop="changeEnergyActive('water')"
                ></span>
              </p>
              <span
                :class="{'active':energyActiveId === 'water'}"
                @click.stop="changeEnergyActive('water')"
              >用水量</span>
            </div> -->
            <div class="bar-chart">
              <!-- <v-p-bar-chart
                :list="activeData[energyActiveId]"
                :dataX="energyListX"
                :msg="energyActiveId === 'water'?'m³':'kwh'"
                :type2="true"
              ></v-p-bar-chart> -->
               <v-bar-bar-chart-option
                  :list="electricityTemp"
                  :list2="waterTemp"
                  :dataX="barListX1"
                  :maxNumberY="maxNumberY"
                  :minIntervalY="1"
                  :userOption = 'userOption'
            ></v-bar-bar-chart-option>
            </div>
          </div>
          <div class="area-info area-info-mar">
            <div class="area-tit">企业能耗情况分析</div>
            <div class="area-con">
              <p class="p1">
                近7日企业用电情况评估——
                <template v-if="activeData.isWarn"><span class="red">异常</span>：较去年同期用电量<span class="red">下降</span>，较上月用电量下降幅度较大。</template>
                <template v-else><span class="green">正常</span>：较去年同期用电量变化幅度小，较上月用电量变化幅度小。</template>
              </p>
              <p class="p1">
                近7日企业用水情况评估——
                <template v-if="activeData.isWarn"><span class="red">异常</span>：较去年同期用水量<span class="red">下降</span>，较上月用水量下降幅度较大。</template>
                <template v-else><span class="green">正常</span>：较去年同期用水量变化幅度小，较上月用水量变化幅度小。</template>
              </p>
              <p class="p1">
                <template v-if="activeData.isWarn">建议：<span class="red">建议多关注企业发展状况。</span></template>
                <template v-else>未来用电安全隐患：<span class="green"> 空气较为干燥需注意火灾</span></template>             
                
              </p>
            </div>
          </div>
        </div>
        <div class="f-energy-right-bottom">
          <div class="area-info">
            <div class="area-tit">
              本月园区整体耗能情况——
              <span style="#D4ECFC">略有上涨</span>
            </div>
            <div class="area-con">
              <p class="p1">
                <span class="blue">未来园区耗能优化建议：</span>及时关注耗能异常企业，提前做好企业运行状况调查
              </p>
            </div>
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
        this.electricityTemp.push(this.randonNumber(8000, 11000))
        this.waterTemp.push(this.randonNumber(6500, 9500))
      }
      this.maxNumberY = 12000
  },
  type1 () {
    for(let i = 0; i < 7; i++) {
        this.electricityTemp.push(this.randonNumber(200, 420))
        this.waterTemp.push(this.randonNumber(100, 300))
      }
      //  this.maxNumberY = Math.ceil(Math.max(... this.electricityTemp)/100) * 100
      this.maxNumberY = 500
  }
}
export default {
  name: "App",
  data() {
    return {
       tabIndex1: 0,
       tabArray1: [
        {id: 0, name: '用电量'},
        // {id: 1, name: '用水量'}
      ],
      maxNumberY: 12000,
      userOption: {
          name1 : '今年能耗（KWh）',
          name2 : '去年能耗（KWh）',
      },
      waterTemp: [],
      electricityTemp: [],
      energyActiveId: "electricity",
      energyListX: [
        new Date().add("d", -6).format("yyyy-MM-dd"),
        new Date().add("d", -5).format("yyyy-MM-dd"),
        new Date().add("d", -4).format("yyyy-MM-dd"),
        new Date().add("d", -3).format("yyyy-MM-dd"),
        new Date().add("d", -2).format("yyyy-MM-dd"),
        new Date().add("d", -1).format("yyyy-MM-dd"),
        "当前"
      ],
      electricity: [
        { value: 280, name: "08:00" },
        { value: 380, name: "09:00" },
        { value: 250, name: "10:00" },
        { value: 330, name: "11:00" },
        { value: 265, name: "12:00" },
        { value: 190, name: "13:00" },
        { value: 205, name: "14:00" },
        { value: 297, name: "当前" }
      ],
      water: [
        { value: 190, name: "08:00" },
        { value: 300, name: "09:00" },
        { value: 180, name: "10:00" },
        { value: 220, name: "11:00" },
        { value: 265, name: "12:00" },
        { value: 390, name: "13:00" },
        { value: 120, name: "14:00" },
        { value: 80, name: "当前" }
      ],
      personnelListX: [
        new Date().add("m", -6).format("yyyy-MM-dd"),
        new Date().add("m", -5).format("yyyy-MM-dd"),
        new Date().add("m", -4).format("yyyy-MM-dd"),
        new Date().add("m", -3).format("yyyy-MM-dd"),
        new Date().add("m", -2).format("yyyy-MM-dd"),
        new Date().add("m", -1).format("yyyy-MM-dd"),
        "当前"
      ],
      barListX1: [
        new Date().add("m", -6).format("yyyy-MM"),
        new Date().add("m", -5).format("yyyy-MM"),
        new Date().add("m", -4).format("yyyy-MM"),
        new Date().add("m", -3).format("yyyy-MM"),
        new Date().add("m", -2).format("yyyy-MM"),
        new Date().add("m", -1).format("yyyy-MM"),
        "当前"
      ],
      tableData1: [
          {
          id: 1,
          name: "海克斯康方案应用与系统集成（青岛）有限公司",
          num1: "400㎡",
          num2: "10856kwh",
          electricity: [
            { value: 10290 },
            { value: 14380 },
            { value: 13250 },
            { value: 12330 },
            { value: 10005 },
            { value: 10090 },
            { value: 10396 }
          ],
          water: [
            { value: 190 },
            { value: 300 },
            { value: 180 },
            { value: 220 },
            { value: 265 },
            { value: 390 },
            { value: 391 }
          ],
          isWarn: 0
        },
         {
          id: 2,
          name: "青岛润扬环境科技有限公司",
          num1: "380㎡",
          num2: "10276kwh",
          electricity: [
            { value: 10290 },
            { value: 14380 },
            { value: 13250 },
            { value: 12330 },
            { value: 10005 },
            { value: 10090 },
            { value: 10396 }
          ],
          water: [
            { value: 190 },
            { value: 300 },
            { value: 180 },
            { value: 220 },
            { value: 265 },
            { value: 390 },
            { value: 391 }
          ],
          isWarn: 0
        },

        {
          id: 3,
          name: "青岛中科国版发展有限公司",
          num1: "391㎡",
          num2: "10396kwh",
          electricity: [
            { value: 10290 },
            { value: 14380 },
            { value: 13250 },
            { value: 12330 },
            { value: 10005 },
            { value: 10090 },
            { value: 10396 }
          ],
          water: [
            { value: 190 },
            { value: 300 },
            { value: 180 },
            { value: 220 },
            { value: 265 },
            { value: 390 },
            { value: 391 }
          ],
          isWarn: 0
        },

        {
          id: 4,
          name: "青岛优康智能科技有限公司",
          num1: "777㎡",
          num2: "9743kwh",
          electricity: [
            { value: 9300 },
            { value: 9380 },
            { value: 8250 },
            { value: 9330 },
            { value: 10265 },
            { value: 9190 },
            { value: 9743 }
          ],
          water: [
            { value: 790 },
            { value: 700 },
            { value: 580 },
            { value: 620 },
            { value: 565 },
            { value: 690 },
            { value: 777 }
          ],
          isWarn: 0
        },

        {
          id: 5,
          name: "青岛印象投资管理有限公司",
          num1: "137㎡",
          num2: "11677kwh",
          electricity: [
            { value: 10908 },
            { value: 10380 },
            { value: 10250 },
            { value: 9330 },
            { value: 9265 },
            { value: 10899 },
            { value: 11677 }
          ],
          water: [
            { value: 190 },
            { value: 200 },
            { value: 180 },
            { value: 220 },
            { value: 165 },
            { value: 190 },
            { value: 137 }
          ],
          isWarn: 0
        },

        {
          id: 6,
          name: "北京华茂嘉华国际贸易有限公司",
          num1: "234㎡",
          num2: "31734kwh",
          electricity: [
            { value: 9300 },
            { value: 9380 },
            { value: 9250 },
            { value: 10330 },
            { value: 12065 },
            { value: 10190 },
            { value: 3009 }
          ],
          water: [
            { value: 290 },
            { value: 200 },
            { value: 280 },
            { value: 320 },
            { value: 165 },
            { value: 290 },
            { value: 89 }
          ],
          isWarn: 1
        },

        {
          id: 7,
          name: "中国电信高新区分公司",
          num1: "367㎡",
          num2: "12642kwh",
          electricity: [
            { value: 10300 },
            { value: 10380 },
            { value: 9250 },
            { value: 9330 },
            { value: 9265 },
            { value: 10190 },
            { value: 12642 }
          ],
          water: [
            { value: 390 },
            { value: 300 },
            { value: 380 },
            { value: 220 },
            { value: 265 },
            { value: 390 },
            { value: 367 }
          ],
          isWarn: 0
        },

        {
          id: 8,
          name: "青岛猎城网络信息有限公司",
          num1: "350㎡",
          num2: "7434kwh",
          electricity: [
            { value: 6300 },
            { value: 7380 },
            { value: 6250 },
            { value: 7330 },
            { value: 7265 },
            { value: 7190 },
            { value: 7434 }
          ],
          water: [
            { value: 190 },
            { value: 200 },
            { value: 180 },
            { value: 220 },
            { value: 265 },
            { value: 290 },
            { value: 350 }
          ],
          isWarn: 0
        },

        {
          id: 9,
          name: "青岛星岳软件技术有限公司",
          num1: "595㎡",
          num2: "14734kwh",
          electricity: [
            { value: 13300 },
            { value: 14380 },
            { value: 13250 },
            { value: 10330 },
            { value: 12265 },
            { value: 13190 },
            { value: 14734 }
          ],
          water: [
            { value: 390 },
            { value: 500 },
            { value: 480 },
            { value: 420 },
            { value: 565 },
            { value: 490 },
            { value: 595 }
          ],
          isWarn: 0
        },

        {
          id: 10,
          name: "青岛网信荣创信息科技有限公司",
          num1: "107㎡",
          num2: "8734kwh",
          electricity: [
            { value: 9300 },
            { value: 8380 },
            { value: 6250 },
            { value: 7330 },
            { value: 8265 },
            { value: 8190 },
            { value: 8734 }
          ],
          water: [
            { value: 190 },
            { value: 100 },
            { value: 180 },
            { value: 120 },
            { value: 165 },
            { value: 190 },
            { value: 107 }
          ],
          isWarn: 0
        },

        {
          id: 11,
          name: "青岛禧泰房地产数据有限公司",
          num1: "195㎡",
          num2: "9310kwh",
          electricity: [
            { value: 8300 },
            { value: 8380 },
            { value: 9250 },
            { value: 8330 },
            { value: 9265 },
            { value: 9190 },
            { value: 9310 }
          ],
          water: [
            { value: 190 },
            { value: 300 },
            { value: 180 },
            { value: 220 },
            { value: 265 },
            { value: 190 },
            { value: 195 }
          ],
          isWarn: 0
        },

        {
          id: 12,
          name: "青岛职务帮科技有限公司",
          num1: "629㎡",
          num2: "12734kwh",
          electricity: [
            { value: 11300 },
            { value: 11380 },
            { value: 13250 },
            { value: 13330 },
            { value: 12265 },
            { value: 12190 },
            { value: 12734 }
          ],
          water: [
            { value: 590 },
            { value: 600 },
            { value: 680 },
            { value: 520 },
            { value: 565 },
            { value: 690 },
            { value: 629 }
          ],
          isWarn: 0
        },

        {
          id: 13,
          name: "青岛裕树环保科技有限公司",
          num1: "361㎡",
          num2: "42121kwh",
          electricity: [
            { value: 13300 },
            { value: 13380 },
            { value: 14250 },
            { value: 13330 },
            { value: 14265 },
            { value: 14900 },
            { value: 4789 }
          ],
          water: [
            { value: 390 },
            { value: 300 },
            { value: 380 },
            { value: 320 },
            { value: 265 },
            { value: 390 },
            { value: 167 }
          ],
          isWarn: 0
        },

        {
          id: 14,
          name: "青岛艾优维仪器科技有限公司",
          num1: "493㎡",
          num2: "8335kwh",
          electricity: [
            { value: 8335 },
            { value: 8380 },
            { value: 8250 },
            { value: 8330 },
            { value: 8265 },
            { value: 8190 },
            { value: 8335 }
          ],
          water: [
            { value: 590 },
            { value: 400 },
            { value: 480 },
            { value: 420 },
            { value: 465 },
            { value: 390 },
            { value: 493 }
          ],
          isWarn: 0
        },

        {
          id: 15,
          name: "青岛企盈盈企业管理有限公司",
          num1: "102㎡",
          num2: "7304kwh",
          electricity: [
            { value: 7000 },
            { value: 7380 },
            { value: 7250 },
            { value: 7330 },
            { value: 7265 },
            { value: 7190 },
            { value: 7304 }
          ],
          water: [
            { value: 190 },
            { value: 100 },
            { value: 180 },
            { value: 120 },
            { value: 165 },
            { value: 190 },
            { value: 102 }
          ],
          isWarn: 0
        },

        {
          id: 16,
          name: "青岛普思教育科技有限公司",
          num1: "391㎡",
          num2: "10396kwh",
          electricity: [
            { value: 10290 },
            { value: 14380 },
            { value: 13250 },
            { value: 12330 },
            { value: 10005 },
            { value: 10090 },
            { value: 10396 }
          ],
          water: [
            { value: 190 },
            { value: 300 },
            { value: 180 },
            { value: 220 },
            { value: 265 },
            { value: 390 },
            { value: 391 }
          ],
          isWarn: 0
        },

        {
          id: 17,
          name: "锦茂安全科技集团有限公司",
          num1: "777㎡",
          num2: "9743kwh",
          electricity: [
            { value: 9300 },
            { value: 9380 },
            { value: 8250 },
            { value: 9330 },
            { value: 10265 },
            { value: 9190 },
            { value: 9743 }
          ],
          water: [
            { value: 790 },
            { value: 700 },
            { value: 580 },
            { value: 620 },
            { value: 565 },
            { value: 690 },
            { value: 777 }
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
    this.$nextTick(() => {
      this.handleRowClick(this.tableData1[this.activeIndex]);
    });
  },
  created () {
    //  初始化数据
      this._initData()
      console.log(this.activeIndex);
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
      //  默认用电量和用水数据
      handleData.type0.call(this)
    },
    randonNumber (m, n) {
        return Math.floor(Math.random() * (n - m ) + m)
    },
    changeTab1 (val) {
        if (val === 1) {
            this.userOption = {
               name1 : '今年能耗（m³）',
               name2 : '去年能耗（m³）',
            }
        }
        this.tabIndex1 = val
        this.electricityTemp = []
        this.waterTemp = []
        handleData[`type${val}`] && handleData[`type${val}`].call(this)      
    },
    handleRowClick(val) {
      //设置选中高亮
      this.activeData = val;
      //  默认用电量和用水数据
      this.electricityTemp = []
      this.waterTemp = []
      handleData.type0.call(this)

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
    changeEnergyActive(type) {
      this.energyActiveId = type;
    },
    handleSizeChange(val) {
      this.filters.pageSize = val;
    },
    handleCurrentChange(val) {
      this.filters.pageIndex = val;
    }
  },
  watch:{
      'activeIndex':{
          handle(){
              console.log('213213123');
              this.handleRowClick(this.tableData1[this.activeIndex]);
          }
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
    background: url("http://qsxw-screen.zhihuipk.com//static/property-img/through_left_bg.png")
      no-repeat;
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
        background: url("http://qsxw-screen.zhihuipk.com//static/property-img/table-1.png") no-repeat;
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
          background: url("http://qsxw-screen.zhihuipk.com//static/property-img/table-2.png") no-repeat;
          background-size: 100% 100%;
          color: rgba(121, 201, 252, 1);

          &.active {
            background: url("http://qsxw-screen.zhihuipk.com//static/property-img/table-3.png")
              no-repeat;
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
    background: url("http://qsxw-screen.zhihuipk.com//static/property-img/through_right_top_bg.png");
    background-size: 100% 100%;
    width: 8.4rem;
    height: 6.18rem;
    padding: 0.4rem 0.45rem 0.23rem 0.5rem;
    .line-area-chart {
      // height: 3.1rem;
      // height: 2.37rem;
      height: 2.2rem;
      width: 7.54rem;
      margin-top: -0.25rem;
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

      .bar-chart {
        flex: 1;
        width: 100%;
        height: 2.8rem;
        box-sizing: border-box;
      }
    }
    .area-info {
      width: 7.5rem;
      height: 1.7rem;
      background: rgba(13, 85, 137, 0.3);
      box-shadow: 0rem 0rem 0rem 0rem rgba(8, 1, 2, 0.03);
      border-radius: 0.04rem;
      margin-top: 0.2rem;
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
    .area-info-mar {
      margin-top: .73rem;
    }
  }
  .f-energy-right-bottom {
    margin-top: -0.1rem;
    background: url("http://qsxw-screen.zhihuipk.com//static/property-img/through_right_bottom_bg.png");
    background-size: 100% 100%;
    width: 8.4rem;
    height: 3rem;
    padding: 0.4rem 0.45rem 0.23rem 0.5rem;
    .area-info {
      width: 7.5rem;
      height: 1.8rem;
      background: rgba(13, 85, 137, 0.3);
      box-shadow: 0rem 0rem 0rem 0rem rgba(8, 1, 2, 0.03);
      border-radius: 0.04rem;
      margin-top: 0.2rem;
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
          font-size: 0.14rem;
          line-height: 0.35rem;
        }
        span {
          font-size: 0.14rem;
        }
        .red {
          color: #ff1414;
        }
        .green {
          color: #00ec43;
        }
        .blue {
          color: #8cd2ff;
        }
      }
    }
  }

  .f-energy-right {
    .f-energy-title {
      font-size: 0.18rem;
      font-family: Lantinghei SC;
      font-weight: bold;
      line-height: 0.36rem;
      color: rgba(194, 231, 255, 1);
    }
    .f-energy-title-mar {
      transform: translateY(-.05rem);
    }
  }
}

@keyframes increase {
  from {
    width: 0;
  }
}
</style>
