<template>
  <v-popup class="f-energy-manage-popup" title="能效管理" @close="close">
    <div class="f-energy-manage-warp">
      <div class="f-energy-left">
        <ul class="garage">
          <li
            class="garage-item"
            v-for="(item, index) in garageList"
            :key="index"
            :class="{ active: garageActiveId === item.id }"
            @click.stop="changeGarageActive(item, index)"
          >
            {{ item.name }}
          </li>
        </ul>
        <div class="energy-line-warp">
          <h3 class="title" style="margin-top: 0.25rem" @click="histroyDataImportDialog=true">园区能耗折线图</h3>
          <div class="line-area-chart" :key="garageActiveId">
            <v-p-line-area-chart2
              :list="personnelEntryList1"
              :list2="waterUse"
              :dataX="personnelListX1"
              msg="kwh"
            ></v-p-line-area-chart2>
          </div>
        </div>
        <div class="table-list-warp">
          <div class="table-list">
            <div
              class="table"
              :class="{ active: activeId === 1 }"
              @click="selectTable(1)"
            >
              用电情况明细
            </div>
            <!-- <div class="table" :class="{active:activeId===2}" @click="selectTable(2)" style="margin-left: -.25rem;">
              用水情况明细
            </div> -->
            <div class="f-select" style="margin-left: 2.2rem">
              <!-- <el-date-picker
                v-model="filters.startTime"
                value-format="yyyy-MM-dd"
                size="mini"
                type="date"
                @change="accessPersonnelTimeSelect"
                placeholder="日期选择"
                :picker-options="pickerOptions"
              ></el-date-picker> -->
              <el-date-picker
            v-model="filters.searchDate"
            type="month"
            size="mini"
            @change="accessPersonnelTimeSelect"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions"
            placeholder="日期选择">
            </el-date-picker>
            </div>
          </div>
          <div class="f-table">
            <el-table
              :data="tableData1"
              style="
                height: 100%;
                overflow: hidden;
                width: 100%;
                overflow-x: hidden;
              "
              v-show="activeId === 1"
            >
              <el-table-column
                prop="companyName"
                label="户名"
                show-overflow-tooltip
                min-width="100"
              ></el-table-column>
              <el-table-column
                prop="tableNo"
                label="表号"
                show-overflow-tooltip
                min-width="90"
              ></el-table-column>
              <el-table-column
                prop="lastDegree"
                label="起始读数"
                show-overflow-tooltip
                min-width="90"
              ></el-table-column>
              <el-table-column
                prop="nowDegree"
                label="结束读数"
                show-overflow-tooltip
              >
                <template slot-scope="scope"
                  >{{ scope.row.nowDegree | empty }}kwh</template
                >
              </el-table-column>
              <el-table-column
                prop="userEnergy"
                label="用量"
                show-overflow-tooltip
              >
                <template slot-scope="scope"
                  >{{ scope.row.billElecValue | empty }}kwh</template
                >
              </el-table-column>
            </el-table>
            <el-table
              :data="
                tableData2.slice(
                  (currentPage - 1) * pageSize,
                  currentPage * pageSize
                )
              "
              style="
                height: 100%;
                overflow: hidden;
                width: 100%;
                overflow-x: hidden;
              "
              v-show="activeId === 2"
            >
              <el-table-column
                prop="companyName"
                label="公司名称"
                show-overflow-tooltip
                min-width="130"
              ></el-table-column>
              <el-table-column
                prop="number"
                label="表号"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="currentReadings"
                label="上月抄表"
                show-overflow-tooltip
              >
                <template slot-scope="scope"
                  >{{ scope.row.currentReadings | empty }}m³</template
                >
              </el-table-column>
              <el-table-column
                prop="previousReading"
                label="本月抄表"
                show-overflow-tooltip
              >
                <template slot-scope="scope"
                  >{{ scope.row.previousReading | empty }}m³</template
                >
              </el-table-column>
              <el-table-column
                prop="use"
                label="本月用水量（t）"
                show-overflow-tooltip
              >
                <template slot-scope="scope">{{
                  scope.row.use | empty
                }}</template>
              </el-table-column>
            </el-table>
          </div>
          <div class="pagination-box" v-if="activeId === 1">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="filters.pageIndex"
              :page-size="filters.pageSize"
              layout="total, prev, pager, next"
              :total="filters.pageTotal"
            ></el-pagination>
          </div>
          <div class="pagination-box" v-if="activeId === 2">
            <el-pagination
              @size-change="handleSizeChange2"
              @current-change="handleCurrentChange2"
              :current-page="currentPage"
              :page-size="filters2.pageSize"
              layout="total, prev, pager, next"
              :total="filters2.pageTotal"
            >
            </el-pagination>
          </div>
        </div>
      </div>
      <div class="f-energy-right">
        <div>
          <ul class="garage">
            <li
              class="garage-item"
              v-for="(item, index) in garageList1"
              :key="index"
              :class="{ active: garageActiveId1 === item.id }"
              @click.stop="changeGarageActive1(item, index)"
            >
              {{ item.name }}
            </li>
          </ul>   
          <!-- <div class="table" style="left:.6rem">月份选择:</div> -->
          <div
            class="filter"
            style="margin-left: 60%; margin-top: -0.45rem"
            v-show="garageActiveId1 == 1"
          >
            <v-mini-select
              class="mini-select"
              v-model="months"
              placeholder="月份选择"
              @select="getEnergyDetailByMonthInfo"
              :optionList="options"
              :template="{ value: 'label' }"
            ></v-mini-select>
          </div>
        </div>

        <ul class="company-list" v-show="garageActiveId1 == 1">
          <li class="company-item-top company-item" >
            <div class="company-top" v-for="(item,index) in rightInfo" :key="index">
              <p>
                <span>{{ item.totalName}}:</span>
                <span>{{ item.totalValue || 91342 }} kwh</span>
              </p>
              <p>
                <span v-if="item.totalRatio < 0">同比下降:</span>
                <span v-if="item.totalRatio >= 0">同比上升:</span>
                <span class="upgreen" :class="item.totalRatio >=0 ? 'upgreen' :'downRed'"
                  >{{ item.totalRatio || 0 }}%</span
                >
              </p>
            </div>
          </li>

          <li class="company-item" >
            <div class="company-name">
              {{dianti.totalName}}：{{ dianti.totalValue || 13291 }}kwh
            </div>
            <div style="display:flex;flex-wrap:wrap;"
            >
            <div class="company-content" v-for="(item,index) in centerInfo" :key="'info2-'+index">
              <p>
                {{item.totalName}}
                <span>{{ item.totalValue || 1609 }}</span
                >kwh
              </p>
            </div>
            </div>
          </li>

          <li class="company-item" >
            <div class="company-name">
              {{gonggong.totalName}}：{{ gonggong.totalValue || 26210 }}kwh
            </div>
            <div style="display:flex;flex-wrap:wrap;"
            >
            <div class="company-content" v-for="(item,index) in downInfo" :key="'info3-'+index">
              <p>
                <span class="publicLabel">{{item.totalName}}</span>
                <span>{{ item.totalValue || 2136 }}</span
                >kwh
              </p>
            </div>
            </div>
          </li>
        </ul>


        
      </div>
        <v-batch-import1 @init="reflash" v-if="ImportDialog" @closeDialog="ImportDialog = false" :importAddress="importAddress1" :exportAddress="exportAddress"></v-batch-import1>
        <v-batch-import @init="reflash" v-if="histroyDataImportDialog" @closeDialog="histroyDataImportDialog = false" :importAddress="importAddress" :exportAddress="exportAddress"></v-batch-import>
    </div>
  </v-popup>
</template>

<script>
import * as mobile from "../../config/mUtils";
import { mapState, mapMutations, mapActions } from "vuex";
 import {
  // energyList,
   getAllElectricList,
  // getEnergyDetailByMonth,
 //  areaInfo,
 electricityTotal,
 screenElectricityList,
 downloadTemplate,
 screenElectricityCharList,
 electricityMonthOptionList,
 importLanWanExcelElectric,
 importLanWanExcelTotal
 } from "../../service/getData";
import { log } from 'util';

export default {
  name: "App",
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
    importAddress1:'lwElectric/importLanWanExcelTotal',
    importAddress:'lwElectric/importLanWanExcelElectric',
    exportAddress:'lwElectric/downloadTemplate',
     options: [],
     ImportDialog:false,
     histroyDataImportDialog: false,
      value: '',
      dianti:{},
      gonggong:{},
      currentPage: 1,
      newRank: [
        {
          name: "杭州推宝科技有限公司",
          use: "1100",
        },
        {
          name: "浙江浙石油综合能源销售有限公司",
          use: "256",
        },
        {
          name: "招商银行股份有限公司杭州分行",
          use: "189",
        },
        {
          name: "杭州蓝坤餐饮管理有限公司",
          use: "127",
        },
        {
          name: "北京华品博睿网络科技有限公司",
          use: "125",
        },
        {
          name: "浙江运达风电股份有限公司",
          use: "86",
        },
      ],
      garageList1: [
        {
          id: 1,
          name: "用电情况分析",
          value: 0,
        },
        // {
        //   id: 2,
        //   name: "用水情况分析",
        //   value: 0
        // },
      ],
      garageList: [
        {
          id: 1,
          name: "全部区域",
          value: 0,
        },
        // {
        //   id: 2,
        //   name: "A座",
        //   value: "1551"
        // },
        // {
        //   id: 3,
        //   name: "B座",
        //   value: "1552"
        // },
        // {
        //   id: 4,
        //   name: "C座",
        //   value: "1553"
        // },
        // {
        //   id: 5,
        //   name: "D座",
        //   value: "1554"
        // },
        // {
        //   id: 6,
        //   name: "E座",
        //   value: "1555"
        // }
      ],
      rightInfo: [],
      centerInfo:[],
      downInfo:[],
      dayTime: new Date().add("d", -1).format("yyyy-MM-dd"),
      months: new Date().format("yyyyMM"),
      months1: new Date().format("yyyy-MM"),
      garageEntryList: [
        { label: new Date().add("m", -6).format("yyyy-MM"), value: 202001 },
        { label: new Date().add("m", -5).format("yyyy-MM"), value: 202104 },
        { label: new Date().add("m", -4).format("yyyy-MM"), value: 202101 },
        { label: new Date().add("m", -3).format("yyyy-MM"), value: 202102 },
        { label: new Date().add("m", -2).format("yyyy-MM"), value: 202103 },
        { label: new Date().add("m", -1).format("yyyy-MM"), value: 202012 },
      ],
      garageActiveId: 1,
      garageActiveId1: 1,
      waterUse: [
        { value: 422.45 },
        { value: 253.47 },
        { value: 225.23 },
        { value: 514.48 },
        { value: 496.5 },
        { value: 487.46 },
        { value: 457.64 },
        { value: 457.64 },
      ],
      personnelEntryList: [
        { value: 280, name: "08:00" },
        { value: 380, name: "09:00" },
        { value: 250, name: "10:00" },
        { value: 330, name: "11:00" },
        { value: 265, name: "12:00" },
        { value: 190, name: "13:00" },
        { value: 205, name: "14:00" },
        { value: 297, name: "当前" },
      ],
      personnelExitList: [
        { value: 190, name: "08:00" },
        { value: 300, name: "09:00" },
        { value: 180, name: "10:00" },
        { value: 220, name: "11:00" },
        { value: 265, name: "12:00" },
        { value: 390, name: "13:00" },
        { value: 120, name: "14:00" },
        { value: 80, name: "当前" },
      ],
      personnelEntryList1: [
        { value: 3123, name: "11-05" },
        { value: 3422, name: "11-06" },
        { value: 3327, name: "11-07" },
        { value: 4862, name: "11-08" },
        { value: 4611, name: "11-09" },
        { value: 4022, name: "11-10" },
        { value: 3401, name: "11-11" },
      ],
      personnelExitList1: [
        { value: 222, name: "11-05" },
        { value: 123, name: "11-06" },
        { value: 234, name: "11-07" },
        { value: 118, name: "11-08" },
        { value: 265, name: "11-09" },
        { value: 390, name: "11-10" },
        { value: 120, name: "11-11" },
        { value: 80, name: "当前" },
      ],
      personnelEntryList2: [
        { value: 258, name: "11-05" },
        { value: 165, name: "11-06" },
        { value: 125, name: "11-07" },
        { value: 225, name: "11-08" },
        { value: 224, name: "11-09" },
        { value: 142, name: "11-10" },
        { value: 180, name: "11-11" },
        { value: 190, name: "当前" },
      ],
      personnelExitList2: [
        { value: 245, name: "11-05" },
        { value: 233, name: "11-06" },
        { value: 209, name: "11-07" },
        { value: 180, name: "11-08" },
        { value: 160, name: "11-09" },
        { value: 300, name: "11-10" },
        { value: 180, name: "11-11" },
        { value: 199, name: "当前" },
      ],
      personnelEntryList3: [
        { value: 180, name: "11-05" },
        { value: 222, name: "11-06" },
        { value: 199, name: "11-07" },
        { value: 240, name: "11-08" },
        { value: 180, name: "11-09" },
        { value: 222, name: "11-10" },
        { value: 142, name: "11-11" },
        { value: 160, name: "当前" },
      ],
      personnelExitList3: [
        { value: 163, name: "11-05" },
        { value: 280, name: "11-06" },
        { value: 260, name: "11-07" },
        { value: 180, name: "11-08" },
        { value: 196, name: "11-09" },
        { value: 233, name: "11-10" },
        { value: 250, name: "11-11" },
        { value: 231, name: "当前" },
      ],
      personnelEntryList4: [
        { value: 196, name: "11-05" },
        { value: 216, name: "11-06" },
        { value: 254, name: "11-07" },
        { value: 233, name: "11-08" },
        { value: 200, name: "11-09" },
        { value: 160, name: "11-10" },
        { value: 160, name: "11-11" },
        { value: 220, name: "当前" },
      ],
      personnelExitList4: [
        { value: 222, name: "11-05" },
        { value: 165, name: "11-06" },
        { value: 160, name: "11-07" },
        { value: 162, name: "11-08" },
        { value: 218, name: "11-09" },
        { value: 233, name: "11-10" },
        { value: 189, name: "11-11" },
        { value: 253, name: "当前" },
      ],
      personnelListX: [
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "当前",
      ],
      personnelListX1: [
        //new Date().add("d", -7).format("MM-dd"),
        //new Date().add("d", -6).format("MM-dd"),
        //new Date().add("d", -5).format("MM-dd"),
        //new Date().add("d", -4).format("MM-dd"),
        //new Date().add("d", -3).format("MM-dd"),
        //new Date().add("d", -2).format("MM-dd"),
        //new Date().add("d", -1).format("MM-dd"),
      ],
      tableData1: [
        {
          hh: null,
          hm: null,
          customerid: null,
          type: 0,
          disc: "锦茂安全科技集团有限公司",
          pointid: 9986,
          datatime: "2020-12-17 00:00:00",
          datatimestr: null,
          startBm: 3409.97,
          endBm: 3412.32,
          userEnergy: 188,
          rate: 80,
          loopUsedType: null,
          commaddress: "000000035312",
          loopUsedTypeName: null,
          regionid: 156,
          regionName: "节能科技大厦-E中",
        },
        {
          hh: null,
          hm: null,
          customerid: null,
          type: 0,
          disc: "山东锦茂检测技术服务有限公司",
          pointid: 10095,
          datatime: "2020-12-17 00:00:00",
          datatimestr: null,
          startBm: 36473.42,
          endBm: 36610.19,
          userEnergy: 136.77,
          rate: 1,
          loopUsedType: null,
          commaddress: "000000043062",
          loopUsedTypeName: null,
          regionid: 156,
          regionName: "节能科技大厦-E中",
        },
        {
          hh: null,
          hm: null,
          customerid: null,
          type: 0,
          disc: "山东锦茂物联科技有限公司",
          pointid: 10073,
          datatime: "2020-12-17 00:00:00",
          datatimestr: null,
          startBm: 17992.45,
          endBm: 18034.82,
          userEnergy: 142.37,
          rate: 1,
          loopUsedType: null,
          commaddress: "000000043085",
          loopUsedTypeName: null,
          regionid: 156,
          regionName: "节能科技大厦-E中",
        },
        {
          hh: null,
          hm: null,
          customerid: null,
          type: 0,
          disc: "青岛锦茂智华消防科技有限公司",
          pointid: 10722,
          datatime: "2020-12-17 00:00:00",
          datatimestr: null,
          startBm: 11757.09,
          endBm: 11758.14,
          userEnergy: 105,
          rate: 1,
          loopUsedType: null,
          commaddress: "000000332356",
          loopUsedTypeName: null,
          regionid: 156,
          regionName: "节能科技大厦-E中",
        },
        {
          hh: null,
          hm: null,
          customerid: null,
          type: 0,
          disc: "北信源信息技术（青岛）有限公司",
          pointid: 10096,
          datatime: null,
          datatimestr: null,
          startBm: 2132,
          endBm: 2257,
          userEnergy: 125,
          rate: 1,
          loopUsedType: null,
          commaddress: "000000583525",
          loopUsedTypeName: null,
          regionid: 156,
          regionName: "节能科技大厦-E中",
        },
        {
          hh: "00090005",
          hm: "杭州荣毅资产管理有限公司",
          customerid: "4134",
          type: 0,
          disc: "瑞达保密设备（青岛）有限公司",
          pointid: 9980,
          datatime: "2020-12-17 00:00:00",
          datatimestr: null,
          startBm: 630.23,
          endBm: 630.55,
          userEnergy: 196,
          rate: 30,
          loopUsedType: null,
          commaddress: "000000035737",
          loopUsedTypeName: null,
          regionid: 156,
          regionName: "节能科技大厦-E中",
        },
        {
          hh: "00090005",
          hm: "杭州荣毅资产管理有限公司",
          customerid: "4134",
          type: 0,
          disc: "中孚股份有限公司青岛分公司",
          pointid: 9979,
          datatime: "2020-12-17 00:00:00",
          datatimestr: null,
          startBm: 931.27,
          endBm: 935.33,
          userEnergy: 121,
          rate: 30,
          loopUsedType: null,
          commaddress: "000000035739",
          loopUsedTypeName: null,
          regionid: 156,
          regionName: "节能科技大厦-E中",
        },
        {
          hh: "00090006",
          hm: "杭州童易软件技术有限公司",
          customerid: "4135",
          type: 0,
          disc: "青岛方寸微电子科技有限公司",
          pointid: 9981,
          datatime: "2020-12-17 00:00:00",
          datatimestr: null,
          startBm: 1132.54,
          endBm: 1133.65,
          userEnergy: 113,
          rate: 30,
          loopUsedType: null,
          commaddress: "000000035738",
          loopUsedTypeName: null,
          regionid: 156,
          regionName: "节能科技大厦-E中",
        },
        {
          hh: "00090009",
          hm: "浙江立元通信技术股份有限公司",
          customerid: "4138",
          type: 0,
          disc: "青岛东方拓讯信息技术有限公司",
          pointid: 9985,
          datatime: "2020-12-17 00:00:00",
          datatimestr: null,
          startBm: 4711.05,
          endBm: 4719.44,
          userEnergy: 171.2,
          rate: 80,
          loopUsedType: null,
          commaddress: "000000035309",
          loopUsedTypeName: null,
          regionid: 156,
          regionName: "节能科技大厦-E中",
        },
        {
          hh: "00090010",
          hm: "浙江兰德纵横网络技术股份有限公司",
          customerid: "4139",
          type: 0,
          disc: "青岛图易网络科技有限公司",
          pointid: 10134,
          datatime: "2020-12-17 00:00:00",
          datatimestr: null,
          startBm: 123649.21,
          endBm: 123520.33,
          userEnergy: 147,
          rate: 1,
          loopUsedType: null,
          commaddress: "100000035312",
          loopUsedTypeName: null,
          regionid: 156,
          regionName: "节能科技大厦-E中",
        },
        {
          hh: "00090011",
          hm: "杭州智语网络科技有限公司",
          customerid: "4329",
          type: 0,
          disc: "青岛奇安信科技有限公司",
          pointid: 10008,
          datatime: "2020-12-17 00:00:00",
          datatimestr: null,
          startBm: 70933.63,
          endBm: 71050.08,
          userEnergy: 116.45,
          rate: 1,
          loopUsedType: null,
          commaddress: "000000332325",
          loopUsedTypeName: null,
          regionid: 156,
          regionName: "节能科技大厦-E中",
        },
        {
          hh: "00090011",
          hm: "浙江道生云信息科技有限公司",
          customerid: "4328",
          type: 0,
          disc: "青岛启明星辰信息安全技术有限公司",
          pointid: 9988,
          datatime: "2020-12-17 00:00:00",
          datatimestr: null,
          startBm: 4603.51,
          endBm: 4604.81,
          userEnergy: 132,
          rate: 1,
          loopUsedType: null,
          commaddress: "000000281554",
          loopUsedTypeName: null,
          regionid: 156,
          regionName: "节能科技大厦-E中",
        },
        {
          hh: "00090015",
          hm: "杭州博亦远科技有限公司",
          customerid: "4144",
          type: 0,
          disc: "青岛申威科技有限责任公司",
          pointid: 10091,
          datatime: "2020-12-17 00:00:00",
          datatimestr: null,
          startBm: 167375.5,
          endBm: 167692.64,
          userEnergy: 117,
          rate: 1,
          loopUsedType: null,
          commaddress: "000000043073",
          loopUsedTypeName: null,
          regionid: 156,
          regionName: "节能科技大厦-E中",
        },
        {
          hh: "00090018",
          hm: "深圳机械院建筑设计有限公司杭州分公司",
          customerid: "4147",
          type: 0,
          disc: "青岛中科方德软件有限公司",
          pointid: 9990,
          datatime: "2020-12-17 00:00:00",
          datatimestr: null,
          startBm: 74646.47,
          endBm: 74693.93,
          userEnergy: 176,
          rate: 1,
          loopUsedType: null,
          commaddress: "000000332324",
          loopUsedTypeName: null,
          regionid: 156,
          regionName: "节能科技大厦-E中",
        },
        {
          hh: "00090026",
          hm: "杭州十足便利店有限公司",
          customerid: "4155",
          type: 0,
          disc: "青岛优康智能科技有限公司",
          pointid: 10009,
          datatime: "2020-12-17 00:00:00",
          datatimestr: null,
          startBm: 6530.89,
          endBm: 6539.78,
          userEnergy: 177.8,
          rate: 20,
          loopUsedType: null,
          commaddress: "000000035709",
          loopUsedTypeName: null,
          regionid: 156,
          regionName: "节能科技大厦-E中",
        },
      ],
      tableData2: [
        {
          use: "950t",
          number: "327200320012",
          name: "          天宇1幢604单元1号",
          companyName: "杭州推宝科技有限公司",
          currentReadings: "650",
          previousReading: "1600",
        },
        {
          use: "189t",
          number: "327191224033",
          name: "天宇2幢404单元5号",
          companyName: "招商银行股份有限公司杭州分行",
          currentReadings: "12635",
          previousReading: "12824",
        },
        {
          use: "150t",
          number: "327200320009",
          name: "天宇1幢802单元2号",
          companyName: "杭州推宝科技有限公司",
          currentReadings: "6600",
          previousReading: "6750",
        },
        {
          use: "129t",
          number: "327191224025",
          name: "天宇2幢1204单元",
          companyName: "浙江浙石油综合能源销售有限公司",
          currentReadings: "12525",
          previousReading: "12654",
        },
        {
          use: "127t",
          number: "40095494",
          name: "          天宇1幢604单元1号",
          companyName: "杭州蓝坤餐饮管理有限公司",
          currentReadings: "849",
          previousReading: "976",
        },
        {
          use: "127t",
          number: "40092026",
          name: "天宇2幢404单元5号",
          companyName: "浙江浙石油综合能源销售有限公司",
          currentReadings: "10703",
          previousReading: "10830",
        },
        {
          use: "127t",
          number: "40092457",
          name: "天宇1幢802单元2号",
          companyName: "浙江浙石油综合能源销售有限公司",
          currentReadings: "10703",
          previousReading: "10830",
        },
        {
          use: "125t",
          number: "40091989",
          name: "天宇2幢1204单元",
          companyName: "北京华品博睿网络科技有限公司",
          currentReadings: "11243",
          previousReading: "11368",
        },
        {
          use: "86t",
          number: "40092057",
          name: "          天宇1幢604单元1号",
          companyName: "浙江运达风电股份有限公司",
          currentReadings: "12195",
          previousReading: "12281",
        },
        {
          use: "80t",
          number: "290614001044",
          name: "天宇2幢404单元5号",
          companyName: "慧川智能",
          currentReadings: "5321",
          previousReading: "5401",
        },
        {
          use: "80t",
          number: "290614001026",
          name: "天宇1幢802单元2号",
          companyName: "廖章晋",
          currentReadings: "5321",
          previousReading: "5401",
        },
        {
          use: "80t",
          number: "290614001085",
          name: "天宇2幢1204单元",
          companyName: "通力",
          currentReadings: "5321",
          previousReading: "5401",
        },
        {
          use: "80t",
          number: "290614001033",
          name: "          天宇1幢604单元1号",
          companyName: "盈思商贸（深圳）有限公司",
          currentReadings: "5321",
          previousReading: "5401",
        },
        {
          use: "76t",
          number: "327191224061",
          name: "天宇2幢404单元5号",
          companyName: "北京三块在线科技有限公司",
          currentReadings: "10562",
          previousReading: "10638",
        },
        {
          use: "76t",
          number: "327191224015",
          name: "天宇1幢802单元2号",
          companyName: "杭州勤恒教育咨询有限公司",
          currentReadings: "10562",
          previousReading: "10638",
        },
        {
          use: "76t",
          number: "327191224044",
          name: "天宇2幢1204单元",
          companyName: "杭州睿蒂教育科技有限公司",
          currentReadings: "10562",
          previousReading: "10638",
        },
        {
          use: "76t",
          number: "327191224035",
          name: "          天宇1幢604单元1号",
          companyName: "杭州易友商务咨询有限公司",
          currentReadings: "10562",
          previousReading: "10638",
        },
        {
          use: "76t",
          number: "327191224073",
          name: "天宇2幢404单元5号",
          companyName: "浙江广西商会",
          currentReadings: "10562",
          previousReading: "10638",
        },
        {
          use: "76t",
          number: "327191224059",
          name: "天宇1幢802单元2号",
          companyName: "浙江华坤道威数据科技有限公司",
          currentReadings: "10562",
          previousReading: "10638",
        },
        {
          use: "73t",
          number: "40092059",
          name: "天宇2幢1204单元",
          companyName: "浙江浙石油综合能源销售有限公司",
          currentReadings: "7648",
          previousReading: "7721",
        },
        {
          use: "72t",
          number: "327191224019",
          name: "          天宇1幢604单元1号",
          companyName: "杭州朗基科学仪器",
          currentReadings: "10627",
          previousReading: "10699",
        },
        {
          use: "72t",
          number: "327191224048",
          name: "天宇2幢404单元5号",
          companyName: "杭州仁迈电脑有限公司503",
          currentReadings: "10627",
          previousReading: "10699",
        },
        {
          use: "72t",
          number: "327191224014",
          name: "天宇1幢802单元2号",
          companyName: "杭州仁迈电脑有限公司510",
          currentReadings: "10627",
          previousReading: "10699",
        },
        {
          use: "72t",
          number: "327191224001",
          name: "天宇2幢1204单元",
          companyName: "杭州思码文化创意有限公司",
          currentReadings: "10627",
          previousReading: "10699",
        },
        {
          use: "72t",
          number: "327191224008",
          name: "天宇1幢604单元1号",
          companyName: "杭州用安软件有限公司",
          currentReadings: "10627",
          previousReading: "10699",
        },
        {
          use: "72t",
          number: "327191224058",
          name: "天宇2幢404单元5号",
          companyName: "深圳银澎云计算有限公司",
          currentReadings: "10627",
          previousReading: "10699",
        },
        {
          use: "71t",
          number: "327200320014",
          name: "天宇1幢802单元2号",
          companyName: "浙江金道律师事务所",
          currentReadings: "11451",
          previousReading: "11522",
        },
        {
          use: "66t",
          number: "327191224007",
          name: "天宇2幢1204单元",
          companyName: "海南铭远投资发展有限公司",
          currentReadings: "8232",
          previousReading: "8298",
        },
        {
          use: "66t",
          number: "327200320011",
          name: "          天宇1幢604单元1号",
          companyName: "杭州凯贸进出口有限公司",
          currentReadings: "8232",
          previousReading: "8298",
        },
        {
          use: "66t",
          number: "327191224038",
          name: "天宇2幢404单元5号",
          companyName: "杭州靓音科技有限公司",
          currentReadings: "8229",
          previousReading: "8295",
        },
        {
          use: "66t",
          number: "327191224047",
          name: "天宇1幢802单元2号",
          companyName: "杭州天阅佳禾商务信息咨询有限公司",
          currentReadings: "8232",
          previousReading: "8298",
        },
        {
          use: "66t",
          number: "327191224042",
          name: "天宇2幢1204单元",
          companyName: "上海商沛商贸有限工商",
          currentReadings: "8229",
          previousReading: "8295",
        },
        {
          use: "66t",
          number: "327200320016",
          name: "          天宇1幢604单元1号",
          companyName: "浙江安诚数盈投资管理有限公司",
          currentReadings: "8232",
          previousReading: "8298",
        },
        {
          use: "61t",
          number: "327191224060",
          name: "天宇2幢404单元5号",
          companyName: "广州市玄武无线科技股份有限公司上海分公司",
          currentReadings: "7745",
          previousReading: "7806",
        },
        {
          use: "61t",
          number: "327191224018",
          name: "天宇1幢802单元2号",
          companyName: "杭州高辂丝绸有限公司",
          currentReadings: "7745",
          previousReading: "7806",
        },
        {
          use: "61t",
          number: "327191224020",
          name: "天宇2幢1204单元",
          companyName: "杭州新迪数字工程系统有限公司",
          currentReadings: "7745",
          previousReading: "7806",
        },
        {
          use: "61t",
          number: "327191224065",
          name: "          天宇1幢604单元1号",
          companyName: "林跃",
          currentReadings: "7745",
          previousReading: "7806",
        },
        {
          use: "61t",
          number: "327191224062",
          name: "天宇2幢404单元5号",
          companyName: "茅广超",
          currentReadings: "7745",
          previousReading: "7806",
        },
        {
          use: "61t",
          number: "327191224071",
          name: "天宇1幢802单元2号",
          companyName: "浙江舒云互联网有限公司",
          currentReadings: "11042",
          previousReading: "11103",
        },
        {
          use: "61t",
          number: "327191224063",
          name: "天宇2幢1204单元",
          companyName: "浙江中达工程造价事务所",
          currentReadings: "11042",
          previousReading: "11103",
        },
        {
          use: "60t",
          number: "40095425",
          name: "          天宇1幢604单元1号",
          companyName: "工商银行",
          currentReadings: "5420",
          previousReading: "5480",
        },
        {
          use: "60t",
          number: "40092013",
          name: "天宇2幢404单元5号",
          companyName: "杭州非奇科技有限公司",
          currentReadings: "9425",
          previousReading: "9485",
        },
        {
          use: "59t",
          number: "40095512",
          name: "天宇1幢802单元2号",
          companyName: "杭州友笑网络科技有限公司",
          currentReadings: "7682",
          previousReading: "7741",
        },
        {
          use: "59t",
          number: "40095491",
          name: "天宇2幢1204单元",
          companyName: "杭州犀照科技有限公司",
          currentReadings: "7682",
          previousReading: "7741",
        },
        {
          use: "59t",
          number: "327191224050",
          name: "          天宇1幢604单元1号",
          companyName: "盈思商贸（深圳）有限公司",
          currentReadings: "7682",
          previousReading: "7741",
        },
        {
          use: "56t",
          number: "327191224053",
          name: "天宇2幢404单元5号",
          companyName: "海南志荣",
          currentReadings: "7200",
          previousReading: "7256",
        },
        {
          use: "56t",
          number: "327191224034",
          name: "天宇1幢802单元2号",
          companyName: "杭州帝舒进出口",
          currentReadings: "7202",
          previousReading: "7258",
        },
        {
          use: "56t",
          number: "327191224011",
          name: "天宇2幢1204单元",
          companyName: "杭州泓牛信息科技有限公司",
          currentReadings: "7202",
          previousReading: "7258",
        },
        {
          use: "56t",
          number: "327191224036",
          name: "          天宇1幢604单元1号",
          companyName: "杭州西典空间设计",
          currentReadings: "7202",
          previousReading: "7258",
        },
        {
          use: "56t",
          number: "327200320017",
          name: "天宇2幢404单元5号",
          companyName: "杭州知多课科技有限公司",
          currentReadings: "7200",
          previousReading: "7256",
        },
        {
          use: "56t",
          number: "290614001087",
          name: "天宇1幢802单元2号",
          companyName: "中国市政工程",
          currentReadings: "5169",
          previousReading: "5225",
        },
        {
          use: "56t",
          number: "290614001071",
          name: "天宇2幢1204单元",
          companyName: "中国市政工程华北设计院",
          currentReadings: "5169",
          previousReading: "5225",
        },
        {
          use: "55t",
          number: "40092025",
          name: "          天宇1幢604单元1号",
          companyName: "英普教育",
          currentReadings: "6297",
          previousReading: "6352",
        },
        {
          use: "55t",
          number: "40092078",
          name: "天宇2幢404单元5号",
          companyName: "中节能智慧营销策划有限公司",
          currentReadings: "6297",
          previousReading: "6352",
        },
        {
          use: "50t",
          number: "40095423",
          name: "天宇1幢802单元2号",
          companyName: "工商银行",
          currentReadings: "5900",
          previousReading: "5950",
        },
        {
          use: "50t",
          number: "40092587",
          name: "天宇2幢1204单元",
          companyName: "工商银行",
          currentReadings: "1350",
          previousReading: "1400",
        },
        {
          use: "50t",
          number: "40095447",
          name: "          天宇1幢604单元1号",
          companyName: "工商银行",
          currentReadings: "1650",
          previousReading: "1700",
        },
        {
          use: "50t",
          number: "40092060",
          name: "天宇2幢404单元5号",
          companyName: "浙江富华睿银投资管理有限公司",
          currentReadings: "8335",
          previousReading: "8385",
        },
        {
          use: "49t",
          number: "290614001086",
          name: "天宇1幢802单元2号",
          companyName: "杭州盼达教育咨询有限公司",
          currentReadings: "7632",
          previousReading: "7681",
        },
        {
          use: "49t",
          number: "290614001089",
          name: "天宇2幢1204单元",
          companyName: "杭州盼达教育咨询有限公司",
          currentReadings: "7632",
          previousReading: "7681",
        },
      ],
      currentPage: 1,
      pageSize: 10,
      pageTotal: 100,
      nowMaxValue: 10000,
      lastMaxValue: 10000,

      filters: {
        pageIndex: 1,
        pageSize: 10,
        searchDate: '',
        channelId:287,
      },
      filters2: {
        pageIndex: 1,
        pageSize: 10,
        pageTotal: 60,
        type: 1,
      },
      activeId: 1,
    };
  },
  props: {
    title: {
      type: String,
    },
  },
  created() {
    //let arr = [1950, 3422, 3327, 4862, 4611, 4022, 1720];
    //this.personnelEntryList1.forEach((val, index) => {
      //let day = new Date().add("d", -index + 1).getDay();

      //   if (day == 0 || day == 6) {
     // val.value = arr[day];
     // val.name = this.personnelListX1[6-index]
      //   } else {
      //     val.value = Math.floor(Math.random() * 2000) + 3000;
      //   }
    //});
    //this.personnelEntryList1.reverse();
    this.getMonthOptionList();
    this.getEnergyDetailByMonthInfo();
  },
  mounted() {
    // this.personnelEntryList1.forEach((val, index) => {
    //   let day = new Date().add("d", -index).getDay();
    //   if (day == 0 || day == 6) {
    //     val.value = Math.floor(Math.random() * 1000) + 2000;
    //   } else {
    //     val.value = Math.floor(Math.random() * 2000) + 3000;
    //   }
    // });
    this.accessPersonnelTimeSelect();
     this.getEnergyList(0);
    
     
     //this.getAreaInfo();
  },
  components: {},
  computed: {},
  methods: {
    // 每户用电情况
    accessPersonnelTimeSelect() {
      // let startTime = this.dayTime;
      // let obj = Object.assign();
      screenElectricityList(this.filters)
        .then((res) => {
          if (res.data.code != 1) {
            return;
          }
          this.tableData1 = res.data.data.list;
          this.filters.pageIndex = res.data.data.pages;
          this.filters.pageTotal = res.data.data.total;
        })
        .catch((_) => {
          console.log(_);
        });
    },
    reflash() {

    },
    daoru(){
      this.$store.state.daoru = true;
      console.log(this.$store.state.daoru);
    },
    selectTable(val) {
      this.activeId = val;
      this.histroyDataImportDialog=true
      this.search();
    },
    getMonthOptionList() {
      electricityMonthOptionList({
        channelId:287
      }).then((res) => {
          if (res.data.code != 1) {
            return;
          }
          let result = res.data.data
          this.options = result.map(val=>{
            return{
               label:val.value,
               value:val.key
            }
          })
          
          console.log(result)
        })
        .catch((_) => {
          console.log(_);
        });
    },
    search() {
      this.filters.pageIndex = 1;
      this.filters2.pageIndex = 1;
      this.getEnergyList();
    },
    getAreaInfo() {
      areaInfo()
        .then((res) => {
          if (res.data.code != 1) {
            return;
          }
          console.log(res.data.data.info);
          for (let i = 0; i < res.data.data.info[0].areaVos.length; i++) {
            this.garageList.push({
              id: i + 2,
              value: res.data.data.info[0].areaVos[i].value,
              name: res.data.data.info[0].areaVos[i].label,
            });
          }
          console.log(this.garageList);
        })
        .catch((_) => {
          console.log(_);
        });
    },
    //右边
    getEnergyDetailByMonthInfo() {
      let monthTime = this.months;
      // .replace("年", "-").slice(0, -1);
      electricityTotal({
        channelId:287, yearMonth:monthTime.split('-').join(''),
      })
        .then((res) => {
          if (res.data.code != 1) {
            return;
          }
          let arr = []
          let result  = res.data.data
          for (let i in result){
            arr.push(result[i]);
          }
          let info = result[2];
          let info2 = result[3];
          this.rightInfo = result[1];
          this.centerInfo = result[2].slice(1);
          this.downInfo = result[3].slice(1);
          this.dianti = info[0];
          this.gonggong = info2[0];
          
        })
        .catch((_) => {
          console.log(_);
        });
    },

    // 7日能耗折线
    getEnergyList(value) {
      screenElectricityCharList({ channelId:287 })
        .then((res) => {
          if (res.data.code != 1) {
            return;
          }
          this.personnelListX1 = res.data.data.xAxis;
          this.personnelEntryList1 = res.data.data.dataList;
        })
        .catch((_) => {
          console.log(_);
        });
    },
    close() {
      this.$emit("close");
    },
    changeGarageActive(row, index) {
      this.garageActiveId = row.id;
      if (this.garageActiveId == 2) {
        this.waterUse = [
          { value: 141.8 },
          { value: 85.08 },
          { value: 70.9 },
          { value: 174.4 },
          { value: 170.16 },
          { value: 163.07 },
          { value: 153.1 },
        ];
      }
      if (this.garageActiveId == 3) {
        this.waterUse = [
          { value: 55.1 },
          { value: 33.06 },
          { value: 30.3 },
          { value: 69.4 },
          { value: 66.12 },
          { value: 65.02 },
          { value: 62.26 },
        ];
      }
      if (this.garageActiveId == 4) {
        this.waterUse = [
          { value: 33.0 },
          { value: 19.8 },
          { value: 18.15 },
          { value: 39.6 },
          { value: 37.95 },
          { value: 37.95 },
          { value: 36.3 },
        ];
      }
      if (this.garageActiveId == 5) {
        this.waterUse = [
          { value: 63.45 },
          { value: 38.07 },
          { value: 34.89 },
          { value: 76.14 },
          { value: 69.79 },
          { value: 72.96 },
          { value: 67.25 },
        ];
      }
      if (this.garageActiveId == 6) {
        this.waterUse = [
          { value: 81.45 },
          { value: 48.87 },
          { value: 44.79 },
          { value: 97.74 },
          { value: 89.59 },
          { value: 93.66 },
          { value: 86.33 },
        ];
      }
      if (this.garageActiveId == 7) {
        this.waterUse = [
          { value: 47.65 },
          { value: 28.59 },
          { value: 26.2 },
          { value: 57.2 },
          { value: 61.9 },
          { value: 54.8 },
          { value: 52.4 },
        ];
      }
      this.getEnergyList(row.value);
    },
    changeGarageActive1(row, index) {
      this.garageActiveId1 = row.id;
      this.ImportDialog=true;
      this.$store.state.fenxidaoru = true;
      this.getEnergyList(row.value);
    },
    handleSizeChange(val) {
      this.filters.pageSize = val;
      this.accessPersonnelTimeSelect();
    },
    handleCurrentChange(val) {
      this.filters.pageIndex = val;
      this.accessPersonnelTimeSelect();
    },
    handleSizeChange2(val) {
      // this.filters2.pageIndex = 1;
      this.filters2.pageSize = val;
      // this.search()
    },
    handleCurrentChange2(val) {
      this.currentPage = val;
      // this.getEnergyList()
    },
  },
  filters: {
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
  },
};
</script>


<style >
.el-picker-panel__content .disabled div {
  background-color: slategray !important;
}
</style>

<style scoped lang="scss">
@import "../../assets/css/mixin";

.mini-select {
  width: 1.8rem !important;
  height: 0.4rem !important;
}
.f-camera-popup {
  flex-direction: column;
  position: fixed;
  width: 6.62rem;
  height: 5.2rem;
  background: url("/static/bounced-img/daoru.png") no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
  left: 7.37rem;
  top: 0.82rem;
  transform: translateX(-50%);
  margin-left: 0.18rem;
  margin-bottom: 0.5rem;
  z-index: 999;
  .f-camera-popup-header{
    width: 100%;
    height: 0.8rem;
    p{
      line-height: 0.8rem;
      font-size:0.3rem;
      text-align: center;
    }
  }
  .content{
    background: url('/static/bounced-img/tuo.png')no-repeat;
    background-size: 100% 100%;
    margin:0.2rem .5rem;
    height: 2rem;
    img{
      padding: 0.2rem 2.5rem;
    }
    p{
      text-align: center;
    }
  }
  .downRed{
    display: flex;
    height: 0.4rem;
    line-height: 0.4rem;
    padding-left: 0.5rem;
    .circle{
    width: 0.08rem;
    height: 0.08rem;
    background: #FF7070;
    border-radius: 50%;
    margin-top: 0.2rem;
    margin-right: 0.2rem;
  }
  }
  .fanhui{
    width:1.5rem;
    cursor: pointer;
    height:0.5rem;
    margin: auto;
    margin-top:0.3rem;
    line-height: 0.5rem;
    text-align: center;
    background: #0D5589;
    border: 0px solid #90DBFF;
    border-radius: 0.1rem;
  }
}
.f-camera-popup.active{
  height:6rem;
  width:8rem;
}
.f-energy-manage-warp {
  display: flex;

  .f-energy-left {
    width: 10.94rem;
    height: 9.11rem;
    padding: 0.13rem 0.45rem 0.23rem 0.4rem;
    background: url("http://py-intellect-screen.zhihuipk.com/static/property-img/energy_left_bg.png")
      no-repeat;
    background-size: 100% 100%;

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

    .energy-line-warp {
      width: 100%;
      height: 4rem;
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
        padding-bottom: 0.11rem;
        box-sizing: border-box;
      }
    }

    .table-list-warp {
      width: 100%;
      padding-left: 0.1rem;
      box-sizing: border-box;

      // .filter {
      //   width: 100%;
      //   height: 0.7rem;
      //   background: rgba(13, 85, 137, 0.6);
      //   box-shadow: 0 0.07rem 0.16rem 0 rgba(8, 1, 2, 0.03);
      //   border-radius: 0.04rem;
      //   display: flex;
      //   align-items: center;
      //   padding: 0.14rem 0.17rem 0.12rem 0.16rem;
      //   margin-top: 0.2rem;
      // }

      .f-table {
        flex: 1;
        width: 100%;
        overflow: hidden;
        overflow-x: hidden;
        height: 2.65rem;
        /deep/ .el-table th,
        /deep/ .el-table td {
          padding: 0.08rem 0;
        }

        /deep/ .el-table thead {
          height: 0.4rem;
          background: rgba(13, 85, 137, 0.4);
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

  .f-energy-right {
    width: 5.81rem;
    height: 9.11rem;
    padding: 0.4rem 0.45rem 0.23rem 0.4rem;
    background: url("http://py-intellect-screen.zhihuipk.com/static/property-img/energy_right_bg.png")
      no-repeat -0.14rem 0;
    background-size: 100% 100%;
    .garage {
      width: 100%;
      display: flex;
      border-bottom: 1px solid rgba(255, 255, 255, 0.4);
      padding-top: -0.2rem;

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
    .f-energy-title {
      font-size: 0.18rem;
      font-family: Lantinghei SC;
      font-weight: bold;
      line-height: 0.36rem;
      color: rgba(194, 231, 255, 1);
    }

    .f-energy-company {
      margin-top: 0.1rem;
      font-size: 0.22rem;
      font-family: Lantinghei SC;
      font-weight: bold;
      color: rgba(212, 236, 252, 1);
      line-height: 0.44rem;
    }

    .company-list {
      width: 5rem;
      margin-top: 0.1rem;

      .company-item {
        width: 100%;
        height: 2.1rem;
        background: rgba(13, 85, 137, 0.3);
        box-shadow: 0 0.07rem 0.16rem 0 rgba(8, 1, 2, 0.03);
        border-radius: 4px;
        padding: 0 0.2rem;
        box-sizing: border-box;
        margin-top: 0.2rem;
        // display: flex;
        // justify-content: space-evenly;
        font-size: 0.18rem;
        font-family: Lantinghei SC;
        font-weight: bold;
        color: rgba(140, 210, 255, 1);
        .company-name {
          margin-bottom: 0.18rem;
          font-size: 0.18rem;
          font-family: Lantinghei SC;
          font-weight: bold;
          color: rgba(140, 210, 255, 1);
          line-height: 0.38rem;
          border-bottom: 1px solid rgba(191, 221, 255, 0.6);
        }
        .ranking {
          width: 100%;
          height: 100%;

          &-item {
            display: flex;
            /*align-items: center;*/

            .number-icon {
              width: 0.7rem;
              height: 0.62rem;
              margin-right: 0.18rem;
              background-size: 100% 100%;
            }
          }

          .ranking-content {
            flex: 1;
            height: 100%;
            overflow: hidden;

            .ranking-company {
              font-size: 0.14rem;
              font-family: FZLTZHK--GBK1-0;
              font-weight: bold;
              color: rgba(230, 247, 251, 1);
            }

            .number-box {
              display: flex;
              align-items: center;
            }

            .number-value {
              font-size: 0.12rem;
              font-family: FZLTZHK--GBK1-0;
              font-weight: bold;
              color: rgba(0, 204, 251, 1);
              margin-left: 0.11rem;
              white-space: nowrap;
            }

            .number {
              height: 0.08rem;
              animation: increase 3s infinite;
              animation-iteration-count: 1;
            }

            .electric {
              .number {
                background: rgba(0, 204, 251, 1);
              }
            }

            .water {
              .number {
                background: rgba(34, 145, 227, 1);
              }
            }
          }
        }
        .company-content {
          display: flex;
          justify-content: space-between;
          margin: 0.1rem 0;
          width: 2rem;
          height:0.3rem;
          margin-left: 0.2rem;
          .publicLabel {
            width: 0.8rem;
            display: inline-block;
            text-align: left;
            margin-right: 0.05rem;
          }
          p {
            flex: 1;
            // span {
            //   color: #00ccfb;
            //   margin-left: 0.2rem;
            // }
          }
        }
        .number-box {
          display: flex;
          align-items: center;
        }

        .number-value,
        .number-label {
          font-size: 0.12rem;
          font-family: Lantinghei SC;
          font-weight: bold;
          color: rgba(0, 204, 251, 1);
          margin-left: 0.11rem;
          white-space: nowrap;
        }

        .number-label {
          margin-left: 0;
          margin-right: 0.15rem;
        }

        .number {
          height: 0.08rem;
          animation: increase 3s infinite;
          animation-iteration-count: 1;
        }

        .electric {
          .number {
            background: rgba(0, 204, 251, 1);
          }
        }

        .water {
          margin-top: 0.1rem;

          .number {
            background: rgba(34, 145, 227, 1);
          }
        }

        .warning-warp {
          display: flex;
          margin-top: 0.2rem;

          .warning-label {
            font-size: 0.14rem;
            font-family: PingFang SC;
            font-weight: bold;
            color: rgba(140, 210, 255, 1);
            line-height: 0.28rem;
          }

          .warning-value {
            font-size: 0.14rem;
            font-family: PingFang SC;
            font-weight: bold;
            color: #d4ecfc;
            line-height: 0.28rem;
          }
        }
      }
      .company-item-top {
        height: 2.5rem;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        .company-top {
          display: flex;
          justify-content: space-between;
          align-items: center;

          p:nth-child(1) {
            width: 60%;
          }
          p:nth-child(2) {
            width: 40%;
          }

          p {
            // flex: 1;
            img {
              vertical-align: bottom;
            }
            .upgreen {
              color: greenyellow;
            }
            .downRed {
              color: red;
            }
          }
        }
      }
    }

    .energy-analysis {
      width: 100%;
      height: 1.2rem;
      padding: 0.2rem;
      box-sizing: border-box;
      margin-top: 0.2rem;
      background: rgba(13, 85, 137, 0.3);
      box-shadow: 0 0.07rem 0.16rem 0 rgba(8, 1, 2, 0.03);
      border-radius: 0.04rem;

      .analysis-title {
        font-size: 0.22rem;
        font-family: Lantinghei SC;
        font-weight: bold;
        line-height: 0.22rem;
        color: rgba(212, 236, 252, 1);

        .trend {
          font-size: 0.22rem;
          font-family: Lantinghei SC;
          font-weight: bold;
          line-height: 0.22rem;
          color: #00ccfb;
        }
      }

      .analysis-proposal {
        margin-top: 0.15rem;
        font-size: 0.14rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba(140, 210, 255, 1);
        line-height: 0.24rem;

        .proposal {
          font-size: 0.14rem;
          font-family: PingFang SC;
          font-weight: bold;
          color: rgba(140, 210, 255, 1);
          line-height: 0.24rem;
          color: #d4ecfc;
        }
      }
    }

    .energy-forecast-warp {
      position: relative;
      width: 100%;
      height: 1.7rem;
      margin-top: 0.3rem;

      .title {
        position: absolute;
        left: 0;
        top: 0;
        font-size: 0.18rem;
        font-family: Lantinghei SC;
        font-weight: bold;
        color: rgba(194, 231, 255, 1);
      }

      .line-area-chart {
        width: 100%;
        height: 100%;
        // padding-bottom: 0.1rem;
        // box-sizing: border-box;
      }
    }
  }
}

.table-list {
  height: 0.64rem;
  width: 10.1rem;
  display: flex;
  background: url("http://py-intellect-screen.zhihuipk.com/static/property-img/table-1.png")
    no-repeat;
  background-size: 100% 100%;
  display: flex;
  padding-right: 0.1rem;
  justify-content: space-between;
  .filter {
    display: flex;
    width: 2rem;
  }
  .table {
    width: 1.17rem;
    height: 0.17rem;
    font-size: 0.17rem;
    font-family: Lantinghei SC;
    font-weight: bold;
    color: #c2e7ff;

    // padding: 0 .25rem;
    // font-size: .22rem;
    // font-family: FZLTZHK--GBK1-0;
    // font-weight: bold;
    // line-height: .64rem;
    // cursor: pointer;
    // width: 2.5rem;
    // height: 100%;
    // background: url("http://py-intellect-screen.zhihuipk.com/static/property-img/table-2.png") no-repeat;
    // background-size: 100% 100%;
    // color: rgba(121, 201, 252, 1);
    // &.active {
    //   background: url("http://py-intellect-screen.zhihuipk.com/static/property-img/table-3.png") no-repeat;
    //   background-size: 100% 100%;
    // }
  }
}

@keyframes increase {
  from {
    width: 0;
  }
}
</style>
