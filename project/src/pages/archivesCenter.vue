<template>
  <div style="position: relative; z-index: 10">
    <div class="contain-box">
      <div style="display: flex">
        <div
          v-for="(item, index) in tabList"
          :key="index"
          @click="changeTab(index)"
          class="tab"
          :class="changeIndex == index ? 'active-tab' : 'tab-color'"
        >
          {{ item.name }}
        </div>
      </div>
      <h3>档案搜索引擎</h3>
      <!-- 人员档案 -->
      <transition name="search" appear v-if="changeIndex == 0">
        <div class="g-top-bg">
          <div class="search-btn" @click.stop="searchTable">搜索</div>
          <div class="wrap" v-clickoutside:isArea="optionOutside">
            <el-row class="mt">
              <el-col :span="5" class="flex-box2">
                <p>搜索姓名:</p>
                <div class="input-bg">
                  <el-input
                    v-model="form.name"
                    @keyup.enter.native="search(form.name, 'name')"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="5" :offset="2" class="flex-box2">
                <p style="width:1.2rem;text-align:right">搜索单位地址:</p>
                <div class="input-bg">
                  <el-input
                    v-model="form.address"
                    @keyup.enter.native="search(form.address, 'address')"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="5" :offset="2" class="flex-box2 isArea">
                <p>搜索单位:</p>
                <div class="input-bg select-bg">
                  <el-input
                    v-model="form.unit"
                    @keyup.enter.native="search(form.unit, 'unit')"
                  ></el-input>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="5" class="flex-box2 isArea">
                <p>性别筛选:</p>
                <div class="input-bg select-bg">
                  <v-mini-select2
                    v-model="form.sex"
                    @select="search(form.sex, 'sex')"
                    :optionList="sexList"
                    :template="{ value: 'label' }"
                  ></v-mini-select2>
                </div>
              </el-col>
              <el-col :span="5" :offset="2" class="flex-box2 isArea">
                <p style="width:1.2rem;text-align:right">年龄筛选:</p>
                <div class="input-bg select-bg">
                  <v-mini-select2
                    v-model="form.age"
                    @select="search(form.age, 'ageId')"
                    :optionList="ageList"
                    :template="{ value: 'value' }"
                  ></v-mini-select2>
                </div>
              </el-col>
              <!-- <el-col :span="5" :offset="2" class="flex-box2 isArea">
                <p>人员身份:</p>
                <div class="input-bg select-bg">
                  <v-mini-select2
                    v-model="form.user"
                    @select="search(form.user, 'sf')"
                    :optionList="userList"
                    :template="{ value: 'label' }"
                  ></v-mini-select2>
                </div>
              </el-col> -->
            </el-row>
          </div>
        </div>
      </transition>
      <!-- 企业档案 -->
      <transition name="search" appear v-else>
        <div class="g-top-bg flex-items">
          <div
            class="search-btn"
            @click.stop="searchTable2"
            style="margin-top: 0.35rem"
          >
            搜索
          </div>
          <div class="wrap" v-clickoutside:isArea="optionOutside">
            <el-row class="mt">
              <el-col :span="5" class="flex-box2">
                <p>企业名称:</p>
                <div class="input-bg">
                  <el-input
                    v-model="form2.companyName"
                    @keyup.enter.native="
                      search2(form2.companyName, 'companyName')
                    "
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="5" :offset="2" class="flex-box2">
                <p>产业导向:</p>
                <div class="input-bg">
                  <el-input
                    v-model="form2.industryOrientation"
                    @keyup.enter.native="
                      search2(form2.industryOrientation, 'industryOrientation')
                    "
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="5" :offset="2" class="flex-box2 isArea">
                <p>风险等级:</p>
                <div class="input-bg select-bg">
                  <v-mini-select2
                    v-model="form2.riskLevel"
                    @select="search2(form2.riskLevel, 'riskLevel')"
                    :optionList="riskLevelList"
                    :template="{ value: 'value' }"
                  ></v-mini-select2>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </transition>

      <div class="flex-box">
        <!-- 人员档案 -->
        <transition name="people-detail" appear v-if="changeIndex == 0">
          <div class="left-bg" :key="info.name">
            <h3>人员档案</h3>
            <div style="display: flex">
              <img
                :src="info.imgUrl || 'static/images/img/user-pic.png'"
                alt=""
                class="user-pic"
              />
               <!-- class="flex-aligns" -->
              <div>
                <div>
                  <span class="info-name">{{ info.name }}</span>
                </div>
                <!-- <div>
                  <span class="info-text">职业：</span>
                  <span class="info-text w-color">{{ info.industry }}</span>
                </div> -->
                <div style="margin-top:.2rem">
                  <span class="info-text">人员身份：</span>
                  <span class="info-text w-color">{{ info.sf }}</span>
                </div>
              </div>
            </div>
            <div class="line"></div>
            <div class="mt2">
              <span class="info-text">标签：</span>
              <span
                class="info-text user-label"
                v-for="(item, index) in info.labelList"
                :key="index"
                >{{ item.name }}</span
              >
            </div>
            <div class="mt2">
              <span class="info-text">所属单位：</span>
              <span class="info-text w-color">{{ info.unit }}</span>
            </div>
            <div class="mt2">
              <span class="info-text">联系电话：</span>
              <span class="info-text w-color">{{ info.phone }}</span>
            </div>
            <div class="info-text mt2">单位地址：</div>
            <div class="info-text w-color mt2">
              {{ info.address }}
            </div>
            <div class="mt2">
              <span class="info-text">所有房屋：</span>
              <span class="info-text w-color">{{ info.fw }}</span>
            </div>
            <div class="mt2">
              <span class="info-text">所有车辆：</span>
              <span class="info-text w-color">{{ info.carId }}</span>
            </div>
            <div class="mt2">
              <span class="info-text">本月/历史出入记录</span>
              <span class="info-text w-color">{{ info.history }}</span>
            </div>
            <div class="mt2">
              <span class="info-text">安防警戒度分析：</span>
              <span class="info-text w-color">{{ info.fx }}</span>
            </div>
            <div class="user-btn" @click="showDialog">人员轨迹</div>
          </div>
        </transition>
        <!-- 企业档案 -->
        <transition name="people-detail" appear v-else>
          <div class="left-bg" :key="info2.companyName">
            <h3>企业档案</h3>
            <div class="flex-box2">
              <img
                :src="info2.imgUrl || '/static/images/img/company1.png'"
                alt=""
                class="user-pic"
              />
              <div class="flex-aligns">
                <div>
                  <span class="info-name2">{{ info2.companyName }}</span>
                </div>
                <div class="flex-box2" style="margin-top: 0.2rem">
                  <img
                    src="static/bounced-img/small-patrol.png"
                    alt=""
                    class="adress-img"
                  />
                  <p class="address">{{ info2.address }}</p>
                </div>
              </div>
            </div>
            <div class="line"></div>
            <div class="mt2">
              <span class="info-text">成立时间：</span>
              <span class="info-text w-color">{{ info2.establishTime }}</span>
            </div>

            <div class="mt2">
              <span class="info-text">入驻时间：</span>
              <span class="info-text w-color">{{
                info2.entryTime
              }}</span>
            </div>

            <div class="mt2">
              <span class="info-text">产业导向：</span>
              <span class="info-text w-color">{{ info2.industryOrientation }}</span>
            </div>

            <div class="mt2">
              <span class="info-text">企业风险分析：</span>
            </div>
            <div class="flex-btn mt2">
              <div class="company-btn" @click="throughDialog = true">
                企业人流
              </div>
              <div class="company-btn" @click="energyManagePopupShow = true">
                企业能耗
              </div>
              <div class="company-btn">企业风险信息</div>
              <div class="company-btn company-low" v-if="info2.riskLevel == 0">
                低风险
              </div>
              <div class="company-btn company-ping" v-if="info2.riskLevel == 1">
                中风险
              </div>
              <div
                class="company-btn company-danger"
                v-if="info2.riskLevel == 2"
              >
                高风险
              </div>
            </div>
            <div class="company-message">
              综合以上各类指标，该企业目前处于平稳运行阶段，
              <span v-if="info2.riskLevel == 0">风险等级较低</span>
              <span v-if="info2.riskLevel == 1" style="color: yellow"
                >存在一定风险</span
              >
              <span v-if="info2.riskLevel == 2" style="color: red"
                >风险等级较高</span
              >
              ，建议持续关注企业发展，及时了解企业需求
            </div>
          </div>
        </transition>

        <transition name="people-table" appear v-if="changeIndex == 0">
          <div class="right-bg flex-aligns">
            <div class="flex-box">
              <div class="flex-box2">
                <div class="right-item-title">实有人口</div>
                <div class="right-item-content">
                  {{ detailInfo.userNumber }} <span class="unit">人</span>
                </div>
              </div>
              <div class="flex-box2">
                <div class="right-item-title">本月新增人口</div>
                <div class="right-item-content">
                  {{ detailInfo.sjNumber }} <span class="unit">人</span>
                </div>
              </div>
              <div class="flex-box2">
                <div class="right-item-title">实有单位</div>
                <div class="right-item-content">
                  {{ detailInfo.addNUmber }} <span class="unit">家</span>
                </div>
              </div>
              <div class="flex-box2">
                <div class="right-item-title">实有车辆</div>
                <div class="right-item-content">
                  {{ detailInfo.zdNumber }} <span class="unit">辆</span>
                </div>
              </div>
            </div>
            <div class="f-table">
              <el-table
                :data="
                  tableData | pagination(filters.pageIndex, filters.pageSize)
                "
                style="
                  height: 100%;
                  overflow: hidden;
                  width: 100%;
                  overflow-x: hidden;
                "
                @row-click="handleRowClick"
                :row-class-name="tableRowClassName"
              >
                <el-table-column prop="name" label="姓名" show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{ scope.row.name }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="age"
                  label="年龄"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="sex"
                  label="性别"
                  show-overflow-tooltip
                ></el-table-column>
                <!-- <el-table-column
                  prop="industry"
                  label="职业"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    {{ scope.row.industry }}
                  </template>
                </el-table-column> -->
                <el-table-column
                  min-width="180"
                  prop="unit"
                  label="单位"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    {{ scope.row.unit }}
                  </template>
                </el-table-column>
                <el-table-column
                  min-width="100"
                  prop="sf"
                  label="身份"
                  show-overflow-tooltip
                ></el-table-column>

                <el-table-column
                  prop="address"
                  label="单位地址"
                  show-overflow-tooltip
                  min-width="150"
                ></el-table-column>
                <el-table-column
                  prop="carId"
                  label="所有车辆"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="phone"
                  label="联系人电话"
                  show-overflow-tooltip
                ></el-table-column>
              </el-table>
            </div>
            <div class="pagination-box">
              <span class="total-page">共3页</span>
              <span class="total-page">{{ tableData.length }}条信息</span>
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="filters.pageIndex"
                :page-size="filters.pageSize"
                layout="prev, pager, next"
                :total="filters.pageTotal"
              ></el-pagination>
            </div>
          </div>
        </transition>

        <transition name="people-table" appear v-if="changeIndex == 1">
          <div class="right-bg flex-aligns">
            <div class="flex-box">
              <div class="flex-box2">
                <div class="right-item-title">入驻企业数</div>
                <div class="right-item-content">
                  {{ detailInfo2.companyNumber }} <span class="unit">家</span>
                </div>
              </div>
              <div class="flex-box2">
                <div class="right-item-title">企业入驻率</div>
                <div class="right-item-content">
                  {{ detailInfo2.occupancyRate }}%
                </div>
              </div>
              <div class="flex-box2">
                <div class="right-item-title">本月新增企业</div>
                <div class="right-item-content">
                  {{ detailInfo2.addCompany }} <span class="unit">家</span>
                </div>
              </div>
              <div class="flex-box2">
                <div class="right-item-title">高风险企业</div>
                <div class="right-item-content">
                  {{ detailInfo2.dangerCompany }} <span class="unit">家</span>
                </div>
              </div>
            </div>
            <div class="f-table">
              <el-table
                :data="
                  tableData2 | pagination(filters.pageIndex, filters.pageSize)
                "
                style="
                  height: 100%;
                  overflow: hidden;
                  width: 100%;
                  overflow-x: hidden;
                "
                @row-click="handleRowClick2"
                :row-class-name="tableRowClassName2"
              >
                <el-table-column
                  prop="companyName"
                  label="企业名称"
                  min-width="160"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <div class="company-td">
                      <i
                        v-if="scope.row.riskLevel == 2"
                        class="fa"
                        :class="
                          scope.row.riskLevel == 2
                            ? 'fa-exclamation-circle'
                            : ''
                        "
                      ></i>
                      {{ scope.row.companyName }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="entryTime"
                  label="入驻时间"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="industryOrientation"
                  label="产业导向"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="riskLevel"
                  label="风险等级"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    {{ scope.row.riskLevel | riskLevel }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="user"
                  label="企业联系人"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="phone"
                  label="联系电话"
                  show-overflow-tooltip
                ></el-table-column>
              </el-table>
            </div>
            <div class="pagination-box">
              <span class="total-page">共2页</span>
              <span class="total-page">{{ tableData2.length }}条信息</span>
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="filters.pageIndex"
                :page-size="filters.pageSize"
                layout="prev, pager, next"
                :total="filters.pageTotal"
              ></el-pagination>
            </div>
          </div>
        </transition>

        <!-- 企业人流 -->
        <transition name="slide-left">
          <v-trough-control-two
            v-if="throughDialog"
            @close="throughDialog = false"
            :activeIndex="rowIndex"
          ></v-trough-control-two>
        </transition>

        <!-- 企业能耗 -->
        <transition name="slide-left">
          <v-energy-manage2
            v-if="energyManagePopupShow"
            @close="energyManagePopupShow = false"
            :activeIndex="rowIndex"
          ></v-energy-manage2>
        </transition>
      </div>

      <!-- 人员轨迹弹框 -->
      <transition name="slide-sace">
        <personnel-trajectory
          @closeDialog="isShowDialog = false"
          v-if="isShowDialog"
        >
        </personnel-trajectory>
      </transition>
    </div>
    <div :class="isShowDialog ? 'maske' : ''"></div>
  </div>
</template>

<script>
import trajectory from "../components/青岛/personnel-trajectory.vue";
export default {
  data() {
    return {
      tabList: [
        {
          name: "人员档案",
        },
        {
          name: "企业档案",
        },
      ],
      form: {
        name: "",
        address: "",
        unit: "",
        sex: "",
        user: "",
        age: "",
      },
      form2: {
        companyName: "",
        industryOrientation: "",
        riskLevel: "",
      },
      info: {
        name: "黄华山",
        industry: "个体工作者",
        unit: "青岛印象投资管理有限公司",
        imgUrl: "/static/images/img/user-icon.png",
        sf: "业主",
        jg: "山东省淄博市",
        tall: 172,
        xx: "B型",
        phone: "15166668888",
        address: "蓝湾智谷2号楼302室",
        fw: "无",
        carId: "鲁BFW369",
        history: "7/65",
        fx: "暂无安全隐患",
        labelList: [
        //   {
        //     name: "银行办事人员",
        //   },
          {
            name: "企业员工",
          },
        ],
      },
      info2: {
        companyName: "青岛中科国版发展有限公司",
        industryOrientation: "xxxx",
        entryTime: "cxccccc",
        establishTime: "xxxx",
        address: "高新区新业路31号远创国际蓝湾智谷A4号楼308室",
        message: "风险等级较低",
        riskLevel: 0,
      },
      detailInfo: {
        userNumber: 320,
        sjNumber: 11,
        addNUmber: 28,
        zdNumber: 145,
      },
      detailInfo2: {
        companyNumber: 58,
        occupancyRate: 79,
        addCompany: 0,
        dangerCompany: 1,
      },
      sexList: [
        {
          label: "男",
          value: 1,
        },
        {
          label: "女",
          value: 2,
        },
      ],
      ageList: [
        {
          label: "18岁以下",
          value: 1,
        },
        {
          label: "18-40岁",
          value: 2,
        },
        {
          label: "41-65岁",
          value: 3,
        },
        {
          label: "65岁以上",
          value: 4,
        },
      ],
      userList: [
        {
          label: "园区员工",
          value: 1,
        },
      ],
      riskLevelList: [
        {
          label: "低风险",
          value: 0,
        },
        {
          label: "中风险",
          value: 1,
        },
        {
          label: "高风险",
          value: 2,
        },
      ],
      isShow: false,
      isShow2: false,
      isShow3: false,
      isShow4: false,
      isShow5: false,
			

      tableData: [
        {
          id: 0,
          name: "杨少鹏",
          age: 36,
          imgUrl: "/static/images/tx/杨少鹏.jpg",
          sex: "男",
          industry: "个体工作者",
          unit: "海克斯康方案应用与系统集成（青岛）有限公司",
          sf: "园区员工",
          address: "蓝湾智谷2号楼302室",
          phone: "13567219427",
          active: 0,
          newAdd: 0,
          ageId: "2",
          isNormal: 0,
          carId: "鲁B0P23C",
        },
        {
          id: 1,
          name: "王亚鹏",
          age: 24,
          sex: "女",
          imgUrl: "/static/images/tx/王亚鹏.jpg",
          industry: "办公室职员",
          unit: "青岛高新区融媒体中心",
          sf: "园区员工",
          address: "蓝湾智谷3号楼201室",
          phone: "15166668888",
          active: 0,
          newAdd: 0,
          ageId: "2",
          isNormal: 1,
          carId: "鲁B55L0E",
        },
        {
          id: 2,
          name: "卢成祥",
          age: 25,
          sex: "男",
          imgUrl: "/static/images/tx/卢成祥.jpg",
          industry: "办公室职员",
          unit: "海克斯康方案应用与系统集成（青岛）有限公司",
          sf: "园区员工",
          address: "蓝湾智谷2号楼302室",
          phone: "17236578009",
          active: 0,
          newAdd: 0,
          ageId: "2",
          isNormal: 1,
          carId: "鲁G30K78",
        },
        {
          id: 3,
          name: "常彬",
          age: 30,
          sex: "男",
          imgUrl: "/static/images/tx/常彬.jpg",
          industry: "个体工作者",
          unit: "青岛高新区融媒体中心",
          sf: "园区员工",
          address: "蓝湾智谷3号楼201室",
          phone: "15624589203",
          active: 0,
          newAdd: 0,
          ageId: "3",
          isNormal: 0,
          carId: "鲁B335IJ",
        },
        {
          id: 4,
          name: "张锡江",
          age: 44,
          sex: "男",
          industry: "程序员",
          imgUrl: "/static/images/tx/张锡江.jpg",
          unit: "青岛润扬环境科技有限公司",
          sf: "园区员工",
          address: "蓝湾智谷5号楼6层7层",
          phone: "12618643764",
          active: 0,
          newAdd: 0,
          ageId: "2",
          isNormal: 1,
          carId: "鲁B6M2L6",
        },
        {
          id: 5,
          name: "孙丰欣",
          age: 35,
          sex: "女",
          imgUrl: "/static/images/tx/孙丰欣.jpg",
          industry: "办公室职员",
          unit: "青岛高新区融媒体中心",
          sf: "园区员工",
          address: "蓝湾智谷3号楼5楼",
          phone: "13667631942",
          active: 0,
          newAdd: 0,
          ageId: "2",
          isNormal: 1,
          carId: "鲁B6M31G",
        },
        {
          id: 6,
          name: "王淑秋",
          age: 29,
          sex: "女",
          imgUrl: "/static/images/tx/王淑秋.jpg",
          industry: "设计师",
          unit: "青岛高新区融媒体中心",
          sf: "园区员工",
          address: "蓝湾智谷3号楼201室",
          phone: "17842247683",
          active: 0,
          newAdd: 0,
          ageId: "2",
          isNormal: 1,
          carId: "鲁B2M7U7",
        },
        {
          id: 7,
          name: "陈娜娜",
          age: 31,
          sex: "女",
          industry: "房产销售",
          imgUrl: "/static/images/tx/陈娜娜.jpg",
          unit: "青岛润扬环境科技有限公司",
          sf: "园区员工",
          address: "蓝湾智谷5号楼6层7层",
          phone: "19274726421",
          active: 0,
          newAdd: 0,
          ageId: "2",
          isNormal: 1,
          carId: "鲁B33BU7",
        },
        {
          id: 8,
          name: "田福顺",
          age: 29,
          sex: "男",
          industry: "程序员",
          imgUrl: "/static/images/tx/田福顺.jpg",
          unit: "青岛高新区融媒体中心",
          sf: "园区员工",
          address: "蓝湾智谷3号楼5楼",
          phone: "17236578879",
          active: 0,
          newAdd: 0,
          ageId: "2",
          isNormal: 1,
          carId: "鲁B691QT",
        },
        {
          id: 9,
          name: "朱厚阳",
          age: 30,
          sex: "男",
          industry: "教师",
          imgUrl: "/static/images/tx/朱厚阳.jpg",
          unit: "海克斯康方案应用与系统集成（青岛）有限公司",
          sf: "园区员工",
          address: "蓝湾智谷2号楼302室",
          phone: "15312468203",
          active: 0,
          newAdd: 0,
          ageId: "2",
          isNormal: 1,
          carId: "鲁B06H5H",
        },
        {
          id: 10,
          name: "吕赛男",
          age: 32,
          sex: "女",
          imgUrl: "/static/images/tx/吕赛男.JPG",
          industry: "金融业务员",
          unit: "青岛润扬环境科技有限公司",
          sf: "园区员工",
          address: "蓝湾智谷5号楼6层7层",
          phone: "1561368244",
          active: 0,
          newAdd: 0,
          ageId: "3",
          isNormal: 1,
          carId: "鲁UZV393",
        },
        {
          id: 11,
          name: "孙伟",
          age: 35,
          sex: "男",
          imgUrl: "/static/images/tx/孙伟.jpg",
          industry: "外汇交易员",
          unit: "海克斯康方案应用与系统集成（青岛）有限公司",
          sf: "园区员工",
          address: "蓝湾智谷2号楼302室",
          phone: "13667631942",
          active: 0,
          newAdd: 0,
          ageId: "3",
          isNormal: 1,
          carId: "鲁B0NE90",
        },
        {
          id: 12,
          name: "孙雨雨",
          age: 24,
          sex: "女",
          imgUrl: "/static/images/tx/孙雨雨.jpg",
          industry: "设计师",
          unit: "青岛高新区融媒体中心",
          sf: "园区员工",
          address: "蓝湾智谷3号楼201室-2西",
          phone: "17853227383",
          active: 0,
          newAdd: 0,
          ageId: "2",
          isNormal: 1,
          carId: "鲁UKY209",
        },
        {
          id: 13,
          name: "毛广收",
          age: 52,
          sex: "男",
          imgUrl: "/static/images/tx/毛广收.jpg",
          industry: "办公室职员",
          unit: "青岛猎城网络信息有限公司",
          sf: "董事长",
          address: "蓝湾智谷1号楼301A",
          phone: "19274726421",
          active: 0,
          newAdd: 0,
          ageId: "2",
          state: 1,
          isNormal: 1,
          carId: "鲁BD62S2",
        },
        {
          id: 14,
          name: "朱复海",
          age: 44,
          sex: "男",
          imgUrl: "/static/images/tx/朱复海.jpg",
          industry: "办公室职员",
          unit: "青岛润扬环境科技有限公司",
          sf: "园区员工",
          address: "蓝湾智谷5号楼6层7层",
          phone: "19274726421",
          active: 0,
          newAdd: 0,
          ageId: "2",
          state: 1,
          isNormal: 1,
          carId: "鲁B1SH32",
        },
          {
          id: 15,
          name: "宋德龙",
          age: 34,
          sex: "男",
          imgUrl: "/static/images/tx/宋德龙.jpg",
          industry: "办公室职员",
          unit: "海克斯康方案应用与系统集成（青岛）有限公司",
          sf: "园区员工",
          address: "蓝湾智谷2号楼302室",
          phone: "19274726421",
          active: 0,
          newAdd: 0,
          ageId: "2",
          state: 1,
          isNormal: 1,
          carId: "鲁B6L78F",
        },
          {
          id: 16,
          name: "丁秀卓",
          age: 24,
          sex: "女",
          imgUrl: "/static/images/tx/丁秀卓.jpg",
          industry: "办公室职员",
          unit: "青岛高新区融媒体中心",
          sf: "园区员工",
          address: "蓝湾智谷3号楼5楼",
          phone: "19274726421",
          active: 0,
          newAdd: 0,
          ageId: "2",
          state: 1,
          isNormal: 1,
          carId: "鲁B2803E",
        },
          {
          id: 17,
          name: "陈娟",
          age: 39,
          sex: "女",
          imgUrl: "/static/images/tx/陈娟.jpg",
          industry: "办公室职员",
          unit: "青岛润扬环境科技有限公司",
          sf: "园区员工",
          address: "蓝湾智谷5号楼6层7层",
          phone: "19274726421",
          active: 0,
          newAdd: 0,
          ageId: "2",
          state: 1,
          isNormal: 1,
          carId: "鲁B8H6T0",
        },
          {
          id: 18,
          name: "孟琳达",
          age: 36,
          sex: "女",
          imgUrl: "/static/images/tx/孟琳达.jpg",
          industry: "办公室职员",
          unit: "青岛高新区融媒体中心",
          sf: "园区员工",
          address: "蓝湾智谷3号楼5楼",
          phone: "19274726421",
          active: 0,
          newAdd: 0,
          ageId: "2",
          state: 1,
          isNormal: 1,
          carId: "鲁BF6B36",
        },
          {
          id: 19,
          name: "李宗祥",
          age: 27,
          sex: "男",
          imgUrl: "/static/images/tx/李宗祥.jpg",
          industry: "办公室职员",
          unit: "青岛猎城网络信息有限公司",
          sf: "经理",
          address: "蓝湾智谷1号楼301A",
          phone: "19274726421",
          active: 0,
          newAdd: 0,
          ageId: "2",
          state: 1,
          isNormal: 1,
          carId: "鲁UWA510",
        },
          {
          id: 20,
          name: "孙运雷",
          age: 37,
          sex: "男",
          imgUrl: "/static/images/tx/孙运雷.jpg",
          industry: "办公室职员",
          unit: "海克斯康方案应用与系统集成（青岛）有限公司",
          sf: "园区员工",
          address: "蓝湾智谷2号楼302室",
          phone: "19274726421",
          active: 0,
          newAdd: 0,
          ageId: "2",
          state: 1,
          isNormal: 1,
          carId: "鲁B8N9R6",
        },
          {
          id: 21,
          name: "纪玉宁",
          age: 41,
          sex: "男",
          imgUrl: "/static/images/tx/纪玉宁.jpg",
          industry: "办公室职员",
          unit: "青岛润扬环境科技有限公司",
          sf: "园区员工",
          address: "蓝湾智谷5号楼6层7层",
          phone: "19274726421",
          active: 0,
          newAdd: 0,
          ageId: "2",
          state: 1,
          isNormal: 1,
          carId: "鲁B8GJ26",
        },
          {
          id: 22,
          name: "袁俊",
          age: 28,
          sex: "女",
          imgUrl: "/static/images/tx/袁俊.jpg",
          industry: "办公室职员",
          unit: "青岛高新区融媒体中心",
          sf: "园区员工",
          address: "蓝湾智谷3号楼5楼",
          phone: "19274726421",
          active: 0,
          newAdd: 0,
          ageId: "2",
          state: 1,
          isNormal: 1,
          carId: "鲁UWF652",
        },
          {
          id: 23,
          name: "王锡伟",
          age: 31,
          sex: "男",
          imgUrl: "/static/images/tx/王锡伟.jpg",
          industry: "办公室职员",
          unit: "海克斯康方案应用与系统集成（青岛）有限公司",
          sf: "园区员工",
          address: "蓝湾智谷2号楼302室",
          phone: "19274726421",
          active: 0,
          newAdd: 0,
          ageId: "2",
          state: 1,
          isNormal: 1,
          carId: "鲁B97WD0",
        },
          {
          id: 24,
          name: "王真",
          age: 40,
          sex: "女",
          imgUrl: "/static/images/tx/王真.jpg",
          industry: "办公室职员",
          unit: "青岛润扬环境科技有限公司",
          sf: "园区员工",
          address: "蓝湾智谷5号楼6层7层",
          phone: "19274726421",
          active: 0,
          newAdd: 0,
          ageId: "2",
          state: 1,
          isNormal: 1,
          carId: "鲁U29P91",
        },


        {
          id: 25,
          name: "邵青波",
          age: 49,
          imgUrl: "/static/images/tx/no-img.png",
          sex: "男",
          industry: "个体工作者",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "17842247683",
          active: 0,
          newAdd: 0,
          ageId: "2",
          isNormal: 0,
          carId: "鲁BM52P2",
        },
        {
          id: 26,
          name: "李金龙",
          age: 48,
          sex: "男",
          imgUrl: "/static/images/tx/no-img.png",
          industry: "办公室职员",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "19274726421",
          active: 0,
          newAdd: 0,
          ageId: "2",
          isNormal: 1,
          carId: "鲁BEX705",
        },
        {
          id: 27,
          name: "王丽",
          age: 39,
          sex: "女",
          imgUrl: "/static/images/tx/no-img.png",
          industry: "办公室职员",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "17236578879",
          active: 0,
          newAdd: 0,
          ageId: "2",
          isNormal: 1,
          carId: "鲁B87BQ7",
        },
        {
          id: 28,
          name: "孟鸿翔",
          age: 28,
          sex: "女",
          imgUrl: "/static/images/tx/no-img.png",
          industry: "个体工作者",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "15312468203",
          active: 0,
          newAdd: 0,
          ageId: "3",
          isNormal: 0,
          carId: "鲁B9K7K9",
        },
        {
          id: 29,
          name: "王政",
          age: 31,
          sex: "男",
          industry: "程序员",
          imgUrl: "/static/images/tx/no-img.png",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "15613682443",
          active: 0,
          newAdd: 0,
          ageId: "2",
          isNormal: 1,
          carId: "鲁B0D7V9",
        },
        {
          id: 30,
          name: "赵芳娟",
          age: 40,
          sex: "女",
          imgUrl: "/static/images/tx/no-img.png",
          industry: "办公室职员",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "13667631942",
          active: 0,
          newAdd: 0,
          ageId: "2",
          isNormal: 1,
          carId: "鲁UCB328",
        },
        {
          id: 31,
          name: "刘彬",
          age: 40,
          sex: "男",
          imgUrl: "/static/images/tx/no-img.png",
          industry: "设计师",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "17853227383",
          active: 0,
          newAdd: 0,
          ageId: "2",
          isNormal: 1,
          carId: "鲁B379R8",
        },
        {
          id: 32,
          name: "马先荣",
          age: 37,
          sex: "女",
          industry: "房产销售",
          imgUrl: "/static/images/tx/no-img.png",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "19274726421",
          active: 0,
          newAdd: 0,
          ageId: "2",
          isNormal: 1,
          carId: "鲁B87M03",
        },
        {
          id: 33,
          name: "韩晓彤",
          age: 29,
          sex: "女",
          industry: "程序员",
          imgUrl: "/static/images/tx/no-img.png",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "17263657829",
          active: 0,
          newAdd: 0,
          ageId: "2",
          isNormal: 1,
          carId: "鲁B78PE8",
        },
        {
          id: 34,
          name: "姜维",
          age: 39,
          sex: "男",
          industry: "教师",
          imgUrl: "/static/images/tx/no-img.png",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "15673829207",
          active: 0,
          newAdd: 0,
          ageId: "2",
          isNormal: 1,
          carId: "鲁BM0B63",
        },
        {
          id: 35,
          name: "申天琪",
          age: 35,
          sex: "男",
          imgUrl: "/static/images/tx/no-img.png",
          industry: "金融业务员",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "18364738290",
          active: 0,
          newAdd: 0,
          ageId: "3",
          isNormal: 1,
          carId: "鲁BH209A",
        },
        {
          id: 36,
          name: "王晓朦",
          age: 32,
          sex: "女",
          imgUrl: "/static/images/tx/no-img.png",
          industry: "外汇交易员",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "13904593677",
          active: 0,
          newAdd: 0,
          ageId: "3",
          isNormal: 1,
          carId: "鲁B0U73R",
        },
        {
          id: 37,
          name: "田野",
          age: 30,
          sex: "女",
          imgUrl: "/static/images/tx/no-img.png",
          industry: "设计师",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "13266065601",
          active: 0,
          newAdd: 0,
          ageId: "2",
          isNormal: 1,
          carId: "鲁B15EF9",
        },
        {
          id: 38,
          name: "刘福燕",
          age: 29,
          sex: "女",
          imgUrl: "/static/images/tx/no-img.png",
          industry: "办公室职员",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "15774726421",
          active: 0,
          newAdd: 0,
          ageId: "2",
          state: 1,
          isNormal: 1,
          carId: "鲁B56X9X/鲁B3600L",
        },
        {
          id: 39,
          name: "贺肖静",
          age: 28,
          sex: "女",
          imgUrl: "/static/images/tx/no-img.png",
          industry: "办公室职员",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "13578953772",
          active: 0,
          newAdd: 0,
          ageId: "2",
          state: 1,
          isNormal: 1,
          carId: "鲁B939YE",
        },
          {
          id: 40,
          name: "刘洁",
          age: 46,
          sex: "女",
          imgUrl: "/static/images/tx/no-img.png",
          industry: "办公室职员",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "17236578009",
          active: 0,
          newAdd: 0,
          ageId: "2",
          state: 1,
          isNormal: 1,
          carId: "鲁BS7V59/鲁B6Y9M2",
        },
          {
          id: 41,
          name: "于煦川",
          age: 31,
          sex: "女",
          imgUrl: "/static/images/tx/no-img.png",
          industry: "办公室职员",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "15624589203",
          active: 0,
          newAdd: 0,
          ageId: "2",
          state: 1,
          isNormal: 1,
          carId: "鲁B717SP/鲁B8D78A",
        },
          {
          id: 42,
          name: "任飞",
          age: 30,
          sex: "女",
          imgUrl: "/static/images/tx/no-img.png",
          industry: "办公室职员",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "12618643764",
          active: 0,
          newAdd: 0,
          ageId: "2",
          state: 1,
          isNormal: 1,
          carId: "鲁B015MR/鲁B2J5P7/鲁BGH775",
        },
          {
          id: 43,
          name: "周岩",
          age: 40,
          sex: "男",
          imgUrl: "/static/images/tx/no-img.png",
          industry: "办公室职员",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "13667631942",
          active: 0,
          newAdd: 0,
          ageId: "2",
          state: 1,
          isNormal: 1,
          carId: "鲁B71MR6",
        },
          {
          id: 44,
          name: "王诚",
          age: 31,
          sex: "男",
          imgUrl: "/static/images/tx/no-img.png",
          industry: "办公室职员",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "13567219427",
          active: 0,
          newAdd: 0,
          ageId: "2",
          state: 1,
          isNormal: 1,
          carId: "鲁B285NB",
        },
          {
          id: 45,
          name: "宋春宏",
          age: 41,
          sex: "男",
          imgUrl: "/static/images/tx/no-img.png",
          industry: "办公室职员",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "15166668888",
          active: 0,
          newAdd: 0,
          ageId: "2",
          state: 1,
          isNormal: 1,
          carId: "鲁BLB395",
        },
          {
          id: 46,
          name: "李志伟",
          age: 36,
          sex: "男",
          imgUrl: "/static/images/tx/no-img.png",
          industry: "办公室职员",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "17236578009",
          active: 0,
          newAdd: 0,
          ageId: "2",
          state: 1,
          isNormal: 1,
          carId: "鲁B7RB56",
        },
          {
          id: 47,
          name: "石德诚",
          age: 32,
          sex: "男",
          imgUrl: "/static/images/tx/no-img.png",
          industry: "办公室职员",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "15624589203",
          active: 0,
          newAdd: 0,
          ageId: "2",
          state: 1,
          isNormal: 1,
          carId: "鲁B2D1C3",
        },
          {
          id: 48,
          name: "傅妤",
          age: 34,
          sex: "女",
          imgUrl: "/static/images/tx/no-img.png",
          industry: "办公室职员",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "12618643764",
          active: 0,
          newAdd: 0,
          ageId: "2",
          state: 1,
          isNormal: 1,
          carId: "鲁UQL891",
        },
          {
          id: 49,
          name: "田德庆",
          age: 38,
          sex: "男",
          imgUrl: "/static/images/tx/no-img.png",
          industry: "办公室职员",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "13667631942",
          active: 0,
          newAdd: 0,
          ageId: "2",
          state: 1,
          isNormal: 1,
          carId: "鲁B6S56K",
        },
        {
          id: 50,
          name: "韩景昊",
          age: 32,
          imgUrl: "/static/images/tx/no-img.png",
          sex: "男",
          industry: "个体工作者",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "17842247683",
          active: 0,
          newAdd: 0,
          ageId: "2",
          isNormal: 0,
          carId: "鲁BY75U9/鲁U6L980",
        },
        {
          id: 51,
          name: "李单金",
          age: 36,
          sex: "男",
          imgUrl: "/static/images/tx/no-img.png",
          industry: "办公室职员",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "19274726421",
          active: 0,
          newAdd: 0,
          ageId: "2",
          isNormal: 1,
          carId: "鲁BQ136H",
        },
        {
          id: 52,
          name: "李翊",
          age: 46,
          sex: "男",
          imgUrl: "/static/images/tx/no-img.png",
          industry: "办公室职员",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "17236578879",
          active: 0,
          newAdd: 0,
          ageId: "2",
          isNormal: 1,
          carId: "鲁B6TM12",
        },
        {
          id: 53,
          name: "李新",
          age: 40,
          sex: "男",
          imgUrl: "/static/images/tx/no-img.png",
          industry: "个体工作者",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "15312468203",
          active: 0,
          newAdd: 0,
          ageId: "3",
          isNormal: 0,
          carId: "鲁B16T85",
        },
        {
          id: 54,
          name: "田祥野",
          age: 43,
          sex: "男",
          industry: "程序员",
          imgUrl: "/static/images/tx/no-img.png",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "1561368244",
          active: 0,
          newAdd: 0,
          ageId: "2",
          isNormal: 1,
          carId: "鲁B516PS",
        },
        {
          id: 55,
          name: "马书磊",
          age: 31,
          sex: "男",
          imgUrl: "/static/images/tx/no-img.png",
          industry: "办公室职员",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "13667631942",
          active: 0,
          newAdd: 0,
          ageId: "2",
          isNormal: 1,
          carId: "鲁B306YM",
        },
        {
          id: 56,
          name: "宋明辉",
          age: 31,
          sex: "男",
          imgUrl: "/static/images/tx/no-img.png",
          industry: "设计师",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "17853227383",
          active: 0,
          newAdd: 0,
          ageId: "2",
          isNormal: 1,
          carId: "鲁GHD350",
        },
        {
          id: 57,
          name: "乔天昱",
          age: 26,
          sex: "男",
          industry: "房产销售",
          imgUrl: "/static/images/tx/no-img.png",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "19274726421",
          active: 0,
          newAdd: 0,
          ageId: "2",
          isNormal: 1,
          carId: "鲁B65RB8",
        },
        
        {
          id: 58,
          name: "王志民",
          age: 45,
          sex: "男",
          industry: "程序员",
          imgUrl: "/static/images/tx/no-img.png",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "13567219427",
          active: 0,
          newAdd: 0,
          ageId: "2",
          isNormal: 1,
          carId: "鲁UVC877",
        },
        {
          id: 59,
          name: "吕品",
          age: 41,
          sex: "男",
          industry: "教师",
          imgUrl: "/static/images/tx/no-img.png",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "17236578009",
          active: 0,
          newAdd: 0,
          ageId: "2",
          isNormal: 1,
          carId: "鲁B37M3F",
        },
        {
          id: 60,
          name: "刘静",
          age: 47,
          sex: "女",
          imgUrl: "/static/images/tx/no-img.png",
          industry: "金融业务员",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "15624589203",
          active: 0,
          newAdd: 0,
          ageId: "3",
          isNormal: 1,
          carId: "鲁URU858",
        },
        {
          id: 61,
          name: "李星辰",
          age: 33,
          sex: "男",
          imgUrl: "/static/images/tx/no-img.png",
          industry: "外汇交易员",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "17842247683",
          active: 0,
          newAdd: 0,
          ageId: "3",
          isNormal: 1,
          carId: "鲁B5L95D",
        },
        {
          id: 62,
          name: "刘晟",
          age: 44,
          sex: "男",
          imgUrl: "/static/images/tx/no-img.png",
          industry: "设计师",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "19274726421",
          active: 0,
          newAdd: 0,
          ageId: "2",
          isNormal: 1,
          carId: "鲁B7CV06/鲁BD95970",
        },
        {
          id: 63,
          name: "段英蕾",
          age: 31,
          sex: "女",
          imgUrl: "/static/images/tx/no-img.png",
          industry: "办公室职员",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "17236578879",
          active: 0,
          newAdd: 0,
          ageId: "2",
          state: 1,
          isNormal: 1,
          carId: "鲁B9B8D0/鲁U00Y52",
        },
        {
          id: 64,
          name: "张宁",
          age: 35,
          sex: "男",
          imgUrl: "/static/images/tx/no-img.png",
          industry: "办公室职员",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "15312468203",
          active: 0,
          newAdd: 0,
          ageId: "2",
          state: 1,
          isNormal: 1,
          carId: "鲁B3P00S",
        },
          {
          id: 65,
          name: "张志强",
          age: 37,
          sex: "男",
          imgUrl: "/static/images/tx/no-img.png",
          industry: "办公室职员",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "1561368244",
          active: 0,
          newAdd: 0,
          ageId: "2",
          state: 1,
          isNormal: 1,
          carId: "鲁B2XB81",
        },
          {
          id: 66,
          name: "魏晓晖",
          age: 31,
          sex: "男",
          imgUrl: "/static/images/tx/no-img.png",
          industry: "办公室职员",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "13667631942",
          active: 0,
          newAdd: 0,
          ageId: "2",
          state: 1,
          isNormal: 1,
          carId: "鲁B1V2Q1",
        },
          {
          id: 67,
          name: "周峰",
          age: 30,
          sex: "男",
          imgUrl: "/static/images/tx/no-img.png",
          industry: "办公室职员",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "17853227383",
          active: 0,
          newAdd: 0,
          ageId: "2",
          state: 1,
          isNormal: 1,
          carId: "鲁B656VM/鲁B60K6L",
        },
          {
          id: 68,
          name: "韩腾飞",
          age: 32,
          sex: "男",
          imgUrl: "/static/images/tx/no-img.png",
          industry: "办公室职员",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "19274726421",
          active: 0,
          newAdd: 0,
          ageId: "2",
          state: 1,
          isNormal: 1,
          carId: "鲁BC53F9",
        },
          {
          id: 69,
          name: "于大海",
          age: 37,
          sex: "男",
          imgUrl: "/static/images/tx/no-img.png",
          industry: "办公室职员",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "17263657829",
          active: 0,
          newAdd: 0,
          ageId: "2",
          state: 1,
          isNormal: 1,
          carId: "鲁BJ17J6",
        },
          {
          id: 70,
          name: "苗程龙",
          age: 31,
          sex: "男",
          imgUrl: "/static/images/tx/no-img.png",
          industry: "办公室职员",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "15673829207",
          active: 0,
          newAdd: 0,
          ageId: "2",
          state: 1,
          isNormal: 1,
          carId: "鲁BP323J",
        },
          {
          id: 71,
          name: "赵李斐",
          age: 32,
          sex: "男",
          imgUrl: "/static/images/tx/no-img.png",
          industry: "办公室职员",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "18364738290",
          active: 0,
          newAdd: 0,
          ageId: "2",
          state: 1,
          isNormal: 1,
          carId: "鲁B20F9M",
        },
          {
          id: 72,
          name: "王富玲",
          age: 31,
          sex: "女",
          imgUrl: "/static/images/tx/no-img.png",
          industry: "办公室职员",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "13904593677",
          active: 0,
          newAdd: 0,
          ageId: "2",
          state: 1,
          isNormal: 1,
          carId: "鲁B9N65T",
        },
          {
          id: 73,
          name: "刘志磊",
          age: 28,
          sex: "男",
          imgUrl: "/static/images/tx/no-img.png",
          industry: "办公室职员",
          unit: "青岛蓝湾信息科技有限公司",
          sf: "员工",
          address: "蓝湾智谷4号楼401室",
          phone: "13266065601",
          active: 0,
          newAdd: 0,
          ageId: "2",
          state: 1,
          isNormal: 1,
          carId: "鲁B90D6W",
        },
    












      ],


      tableData2: [
         
        {
          id: 0,
          companyName: "海克斯康方案应用与系统集成（青岛）有限公司",
          entryTime: "2017-03",
          industryOrientation: "软件和信息技术服务业",
          riskLevel: "0",
          user: "孙运雷",
          phone: "13266065601",
          active: 0,
          newAdd: 0,
          imgUrl: "/static/images/tx/no-img.png",
          address: "青岛高新技术产业开发区创业中心103-E室",
        },
        {
          id: 1,
          companyName: "青岛润扬环境科技有限公司",
          entryTime: "2018-03",
          industryOrientation: "生态保护和环境治理业",
          riskLevel: "0",
          user: "朱复海",
          phone: "13578953772",
          active: 0,
          newAdd: 0,
          imgUrl: "/static/images/company_logo/17.png",
          address: "山东省青岛市高新区河东路368号蓝色生物医药产业园1号楼203-9",
        },
        {
          id: 2,
          companyName: "青岛中科国版发展有限公司",
          entryTime: "2016-09",
          industryOrientation: "商业服务业",
          riskLevel: "0",
          user: "王雅宣",
          phone: "17236578009",
          active: 0,
          newAdd: 0,
          imgUrl: "/static/images/img/company1.png",
          address: "高新区新业路31号远创国际蓝湾智谷A区5号楼",
        },
        {
          id: 3,
          companyName: "青岛优康智能科技有限公司",
          entryTime: "2018-02",
          industryOrientation: "科技推广和应用服务业",
          riskLevel: "0",
          user: "周怡星",
          phone: "15624589203",
          active: 0,
          newAdd: 0,
          imgUrl: "/static/images/img/company2.png",
          address: "高新区新业路31号远创国际蓝湾智谷A4号楼209室",
        },
        {
          id: 4,
          companyName: "青岛印象投资管理有限公司",
          entryTime: "2017-05",
          industryOrientation: "商务服务业",
          riskLevel: "0",
          user: "袁智杰",
          phone: "12618643764",
          active: 0,
          newAdd: 0,
          imgUrl: "/static/images/img/company3.png",
          address: "高新区新业路31号远创国际蓝湾智谷A4号楼308室",
        },
        {
          id: 5,
          companyName: "北京华茂嘉华国际贸易有限公司",
          entryTime: "2019-10",
          industryOrientation: "批发业",
          riskLevel: "2",
          user: "陈国信",
          phone: "13667631942",
          active: 0,
          newAdd: 0,
          imgUrl: "/static/images/company_logo/4.png",
          message: "风险等级较高",
          high: 1,
          address: "北京市怀柔区杨宋镇和平路22号231室",
        },
        {
          id: 6,
          companyName: "中国电信高新区分公司",
          entryTime: "2019-12",
          industryOrientation: "电信、广播电视和卫星传输服务",
          riskLevel: "0",
          user: "李欣怡",
          phone: "17842247683",
          active: 0,
          newAdd: 0,
          imgUrl: "/static/images/company_logo/5.png",
          address: "青岛市高新区火炬路91号蓝湾智2号楼401"
        },
        {
          id: 7,
          companyName: "青岛猎城网络信息有限公司",
          entryTime: "2019-04",
          industryOrientation: "软件和信息技术服务业",
          riskLevel: "0",
          user: "蒋晓冬",
          phone: "19274726421",
          active: 0,
          newAdd: 0,
          imgUrl: "/static/images/company_logo/6.png",
          address: "青岛市高新区火炬路91号蓝湾智1号楼301-A"
        },
        {
          id: 8,
          companyName: "青岛星岳软件技术有限公司",
          entryTime: "2017-07",
          industryOrientation: "软件和信息技术服务业",
          riskLevel: "0",
          user: "王一铭",
          phone: "17236578879",
          active: 0,
          newAdd: 0,
          imgUrl: "/static/images/company_logo/7.png",
          address: "青岛市市南区山东路16号甲1609户"
        },
        {
          id: 9,
          companyName: "青岛网信荣创信息科技有限公司",
          entryTime: "2019-07",
          industryOrientation: "软件和信息技术服务业",
          riskLevel: "0",
          user: "张昊天",
          phone: "15312468203",
          active: 0,
          newAdd: 0,
          imgUrl: "/static/images/company_logo/8.png",
          address: "青岛市高新区火炬路91号蓝湾智2号楼101室"
        },
        {
          id: 10,
          companyName: "青岛禧泰房地产数据有限公司",
          entryTime: "2020-11",
          industryOrientation: "房地产业",
          riskLevel: "0",
          user: "李玉慧",
          phone: "1561368244",
          active: 0,
          newAdd: 0,
          imgUrl: "/static/images/company_logo/9.png",
          address: "青岛市高新区火炬路91号蓝湾智谷5号楼301室"
        },
        {
          id: 11,
          companyName: "青岛职务帮科技有限公司",
          entryTime: "2020-06",
          industryOrientation: "商务服务业",
          riskLevel: "0",
          user: "李克诺",
          phone: "13667631942",
          active: 0,
          newAdd: 0,
          imgUrl: "/static/images/company_logo/10.png",
          address: "青岛市高新区火炬路91号蓝湾智1号楼301-B",
        },
        {
          id: 12,
          companyName: "青岛裕树环保科技有限公司",
          entryTime: "2018-03",
          industryOrientation: "专业技术服务业",
          riskLevel: "0",
          user: "陈文景",
          phone: "17853227383",
          active: 0,
          newAdd: 0,
          imgUrl: "/static/images/company_logo/11.png",
          address: "青岛市高新区新业路31号远创国际蓝湾创意园A4号楼311室",
          // message: "风险等级较高",
          // high: 1,
        },
        {
          id: 13,
          companyName: "青岛艾优维仪器科技有限公司",
          entryTime: "2017-12",
          industryOrientation: "仪器仪表制造业",
          riskLevel: "0",
          user: "徐诗意",
          phone: "19274726421",
          active: 0,
          newAdd: 0,
          imgUrl: "/static/images/company_logo/12.png",
          address: "山东省青岛市高新区智力岛路1号创业大厦B座20楼2001室",
        },
        {
          id: 14,
          companyName: "青岛企盈盈企业管理有限公司",
          entryTime: "2015-11",
          industryOrientation: "商务服务业",
          riskLevel: "0",
          user: "李丽丽",
          phone: "17263657829",
          active: 0,
          newAdd: 0,
          imgUrl: "/static/images/company_logo/13.png",
          address: "青岛市高新区新业路31号远创国际蓝湾创意园A4号楼327室",
        },
        {
          id: 15,
          companyName: "青岛普思教育科技有限公司",
          entryTime: "2019-03",
          industryOrientation: "商务服务业",
          riskLevel: "0",
          user: "吴开拓",
          phone: "15673829207",
          active: 0,
          newAdd: 0,
          imgUrl: "/static/images/company_logo/14.png",
          address: "青岛市高新区新业路31号远创国际蓝湾创意园A4号楼352室",
        },
        {
          id: 16,
          companyName: "锦茂安全科技集团有限公司",
          entryTime: "2016-07",
          industryOrientation: "科技推广和应用服务业",
          riskLevel: "0",
          user: "尤莎丽",
          phone: "18364738290",
          active: 0,
          newAdd: 0,
          imgUrl: "/static/images/company_logo/15.png",
          address: "山东省青岛市高新区新业路31号远创国际蓝湾创意园A区1号楼101室",
        },
      ],
      tableList: [],
      tableList2: [],
      filters: {
        pageIndex: 1,
        pageSize: 10,
        pageTotal: 74,
        type: 1,
        startTime: new Date().add("d", -1).format("yyyy-MM-dd"),
      },
      isShowDialog: false,
      changeIndex: 0,
      throughDialog: false,
      energyManagePopupShow: false,
      rowIndex: 0,
    };
  },
  mounted() {
    this.handleRowClick(this.tableData[0]);
    this.handleRowClick2(this.tableData2[0]);
    this.tableList = this.tableData;
    this.tableList2 = this.tableData2;
  },
  filters: {
    pagination(array, pageNo, pageSize) {
      let offset = (pageNo - 1) * pageSize; //当前页第一条的索引
      let data =
        offset + pageSize >= array.length
          ? array.slice(offset, array.length)
          : array.slice(offset, offset + pageSize);
      return data;
    },
    riskLevel(val) {
      switch (val) {
        case "0":
          return "低风险";
        case "1":
          return "中风险";
        case "2":
          return "高风险";
        default:
          return "无";
      }
    },
  },
  components: {
    "personnel-trajectory": trajectory,
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
    tableRowClassName2({ row, rowIndex }) {
      //   if (row.active && row.newAdd) {
      //     return "active-row add-row";
      //   } else if (row.newAdd) {
      //     return "add-row";
      //   }
      // this.rowIndex = rowIndex;
      if (row.active == 1) {
        return "active-row";
      }
    },
    optionOutside() {
      this.isShow2 = false;
      this.isShow3 = false;
      this.isShow4 = false;
      this.isShow5 = false;
    },
    handleSizeChange(val) {
      this.filters.pageSize = val;
      // this.search();
    },
    handleCurrentChange(val) {
      this.filters.pageIndex = val;
    },
    handleRowClick(val) {
      this.rowIndex = val.id;
      let infoTemp = {
        jg: "山东省淄博市",
        tall: 172,
        xx: "B型",
        phone: "15166668888",
        fw: "无",
        history: "7/65",
        fx: "暂无安全隐患",
        labelList: [
        //   {
        //     name: "银行办事人员",
        //   },
          {
            name: "企业员工",
          },
        ],
      };
      this.info = Object.assign(infoTemp, val);

      //设置选中高亮
      this.tableData.forEach((item) => {
        item.active = false;
        if (item.name == this.info.name) {
          item.active = true;
        }
      });
      this.tableData = JSON.parse(JSON.stringify(this.tableData));
    },
    handleRowClick2(val) {
      this.rowIndex = val.id;
      let infoTemp = {
        companyName: "青岛中科国版发展有限公司",
        industryOrientation: "商业服务业",
        entryTime: "2016-09",
        establishTime: "2017-12",
        address: "高新区新业路31号远创国际蓝湾智谷A区5号楼",
        message: "风险等级较低",
        riskLevel: 0,
      };
      this.info2 = Object.assign(infoTemp, val);

      //设置选中高亮
      this.tableData2.forEach((item) => {
        item.active = false;

        if (item.companyName == this.info2.companyName) {
          item.active = true;
        }
      });
      this.tableData2 = JSON.parse(JSON.stringify(this.tableData2));
    },
    showDialog() {
      this.isShowDialog = true;
    },
    search(value, key) {
      this.tableData = this.tableList;
      this.tableData = this.tableData.filter((item, index) => {
        return item[key].indexOf(value) != -1;
      });
    },
    search2(value, key) {
      // console.log(value,key,1111);
      this.tableData2 = this.tableList2;
      this.tableData2 = this.tableData2.filter((item, index) => {
        return item[key].indexOf(value) != -1;
      });
    },
    searchTable() {
      if(this.form.name){
        this.search(this.form.name, "name");
      }

      if(this.form.address){
        this.search(this.form.address, "address");
      }

      if(this.form.unit){
        this.search(this.form.unit, "unit");
      }

      if(!this.form.name&&!this.form.address&&!this.form.unit){
        this.tableData = this.tableList;
      }
    },
    searchTable2() {
      if(this.form2.companyName){
        this.search2(this.form2.companyName, "companyName");
      }

      if(this.form2.industryOrientation){
        this.search2(this.form2.industryOrientation, "industryOrientation");
      }

      if(this.form2.riskLevel){
        this.search2(this.form2.riskLevel, "riskLevel");
      }

      if(!this.form2.companyName&&!this.form2.industryOrientation&&!this.form2.riskLevel){
        this.tableData2 = this.tableList2;
      }
    },
    changeTab(index) {
      this.changeIndex = index;
      if(index==0){
          console.log(this.tableData.length);
        this.filters.pageTotal = this.tableData.length;
      }else{
        this.filters.pageTotal = 14;
      }
      this.form = {
        name: "",
        address: "",
        unit: "",
        sex: "",
        user: "",
        age: "",
      };
      this.form2 = {
        companyName: "",
        industryOrientation: "",
        riskLevel: "",
      };
      //   console.log(this.tableData);
      //   this.tableData = JSON.parse(JSON.stringify(this.tableData));
    },
  },
};
</script>



<style lang="scss">
@import "../assets/css/mixin";
.tab {
  margin: 0.1rem 0.34rem 0.35rem 0.1rem;
  font-size: 0.24rem;
  cursor: pointer;
  font-family: RTWS ShangGothic G0v1;
}
.tab-color {
  color: rgba(255, 255, 255, 0.6);
}
.active-tab {
  color: #fff;
  position: relative;
  &::before {
    content: "";
    width: 0.42rem;
    height: 0.04rem;
    background: linear-gradient(90deg, #2b84b2 0%, #32cced 100%);
    position: absolute;
    left: 0.3rem;
    bottom: -0.1rem;
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
        background-color: rgba(255, 255, 255, 0.3);
      }
      &.add-row {
        animation: flicker 0.9s 3;
      }
    }
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
</style>

<style scoped lang="scss">
@import "../assets/css/mixin";
.mt,
.mt2 {
  margin-bottom: 0.15rem;
}
.contain-box {
  padding: 0.88rem 0.26rem 0 0.26rem;
  h3 {
    color: #ffffff;
    font-size: 0.2rem;
    font-family: AliHYAiHei;
    font-weight: bold;
    margin: 0 0 0.05rem 0.1rem;
  }
  .g-top-bg {
    @include bis("../../static/images/img/box1.png");
    @include wh(100%, 1.46rem);
    position: relative;
    padding: 0.23rem 0.38rem;
    .search-btn {
      position: absolute;
      right: 0;
      top: 0;
      @include bis("../../static/images/img/btn1.png");
      @include wh(1.86rem, 0.86rem);
      text-align: center;
      line-height: 0.84rem;
      font-size: 0.18rem;
      font-family: PingFang SC;
      font-weight: bold;
      color: #ffffff;
      z-index: 99;
    }
    .input-bg {
      @include bis("../../static/images/img/input-bg.png");
      @include wh(2.4rem, 0.4rem);
      position: relative;
      margin-left: 0.1rem;
      img {
        position: absolute;
        @include wh(0.13rem, 0.1rem);
        right: 0.2rem;
        top: 0.15rem;
      }
      .select-content {
        position: absolute;
        width: 100%;
        max-height: 3.5rem;
        background: rgba(17, 72, 134, 0.75);
        border: 0.02rem solid #2b9ced;
        border-radius: 0.1rem;
        left: 0;
        top: 0.54rem;
        padding: 0.14rem;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        z-index: 1000;
      }
    }
  }
  .flex-items {
    line-height: 1.06rem;
  }

  .flex-box {
    margin-top: 0.23rem;
  }
  .left-bg {
    @include bis("../../static/images/img/left-bg.png");
    @include wh(4.49rem, 7.07rem);
    padding: 0.27rem 0.2rem 0 0.39rem;
    position: absolute;
    h3 {
      margin: 0 0 0.2rem 0;
    }
    .user-pic {
      @include wh(1.08rem, 1.06rem);
      margin-right: 0.2rem;
      object-fit: contain;
    }
    .info-name,
    .info-name2 {
      height: 0.22rem;
      font-family: PingFang SC;
      font-weight: bold;
      color: #ffffff;
      margin-right: 0.19rem;
    }
    .info-name {
      font-size: 0.24rem;
    }
    .info-name2 {
      font-size: 0.18rem;
    }
    .info-text {
      font-size: 0.16rem;
      font-family: PingFang SC;
      font-weight: bold;
    }

    .user-label {
      padding: 0.02rem 0.1rem;
      margin-right: 0.1rem;
      background: rgba(13, 85, 137, 0.4);
      color: rgba(138, 207, 253, 1);
    }
    .w-color {
      color: #fff;
    }
    .line {
      margin: 0.14rem 0;
      width: 3.55rem;
      height: 0.01rem;
      background-image: linear-gradient(
        to right,
        rgba(255, 0, 0, 0),
        #317698,
        #2c94c7,
        #317698,
        rgba(255, 0, 0, 0)
      );
      opacity: 0.8;
    }
    .user-btn {
      @include bis("../../static/images/img/user-btn.png");
      @include wh(1.94rem, 0.86rem);
      text-align: center;
      margin-top: 0.23rem;
      line-height: 0.84rem;
      font-size: 0.18rem;
      font-family: PingFang SC;
      font-weight: bold;
      color: #ffffff;
      margin-left: 0.8rem;
      cursor: pointer;
    }
    .flex-btn {
      display: flex;
      flex-wrap: wrap;
      margin-top: -0.15rem;
      .company-btn {
        @include bis("../../static/images/img/s-btn.png");
        @include wh(1.6rem, 0.5rem);
        text-align: center;
        margin-top: 0.23rem;
        line-height: 0.5rem;
        font-size: 0.18rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
        cursor: pointer;
        margin-right: 0.2rem;
      }
      .company-low {
        @include bis("../../static/images/img/low-level.png");
      }
      .company-ping {
        @include bis("../../static/images/img/danger-btn.png");
      }

      .company-danger {
        @include bis("../../static/images/img/tall-level.png");
      }
    }

    .company-message {
      color: #ffffff;
      width: 3.4rem;
      line-height: 0.3rem;
    }
    .adress-img {
      @include wh(0.16rem, 0.2rem);
      margin-right: 0.1rem;
    }
    .address {
      font-size: 0.14rem;
      color: rgba(255, 255, 255, 0.8);
    }
  }

  .right-bg {
    @include bis("../../static/images/img/right-bg.png");
    @include wh(14.08rem, 6.96rem);
    padding: 0.47rem 0.37rem 0.44rem 0.52rem;
    position: absolute;
    right: 0.26rem;
    .right-item-title {
      @include bis("../../static/images/img/right-item.png");
      @include wh(1.37rem, 0.24rem);
      padding-left: 0.1rem;
      // font-size: 0.18rem;
      font-family: PingFang SC;
      font-weight: bold;
      color: #7af4fd;
    }
    .right-item-content {
      font-size: 0.3rem;
      font-family: shangGothic;
      font-weight: bold;
      color: #ffffff;
      margin-left: 0.24rem;
      .unit {
        font-size: 0.18rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
        opacity: 0.4;
      }
    }

    .f-table {
      flex: 1;
      width: 100%;
      overflow: hidden;
      overflow-x: hidden;
      margin-top: 0.29rem;
      height: 2.65rem;
      /deep/ .el-table th,
      /deep/ .el-table td {
        padding: 0.08rem 0;
      }

      /deep/ .el-table thead {
        height: 0.4rem;
        background: rgba(13, 85, 137, 0.4);
      }

      /deep/ .cell {
        opacity: 0.9;
      }

      /deep/ .el-table--striped .el-table__body tr.el-table__row--striped td {
        background: rgba(9, 48, 83, 0.6);
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
        flex: 1;
        text-align: right;
        // margin-right: .1rem;
        .el-pagination__total {
          font-size: 0.16rem;
          font-family: Lantinghei SC;
          font-weight: bold;
          color: #ffffff;
          opacity: 0.6;
        }
        .btn-prev,
        .btn-next {
          background-color: transparent;
        }
        .el-pager li {
          font-size: 0.16rem;
          background-color: transparent;
        }
      }

      .total-page {
        font-size: 0.16rem;
        font-family: Lantinghei SC;
        font-weight: bold;
        color: #ffffff;
        opacity: 0.6;
        margin-left: 0.27rem;
      }
    }
  }
}

.maske {
  background: rgba(7, 16, 29, 0.8);
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.search-enter-active,
.search-enter-active,
.people-table-enter-active,
.people-table-enter-active {
  transition: all 1s;
}

.people-detail-enter,
.people-detail-leave-to {
  opacity: 0;
  transform: translateX(-200px);
}

.people-detail-enter-active {
  animation: slide-in-left 1s;
}

.people-detail-leave-active {
  animation: slide-leave-left 1s;
}
@keyframes slide-in-left {
  0% {
    z-index: 190;
    opacity: 0;
    transform: scale(0.6) translateX(-200%);
  }

  50% {
    z-index: 190;
    opacity: 1;
    transform: scale(0.6) translateX(0);
  }

  100% {
    z-index: 200;
    opacity: 1;
    transform: scale(1) translateX(0);
  }
}

@keyframes slide-leave-left {
  0% {
    z-index: 190;
    opacity: 0;
  }

  50% {
    z-index: 190;
    transform: scale(0.6);
    opacity: 0;
  }

  100% {
    z-index: 190;
    opacity: 0;
    transform: scale(0.6) translateX(-200%);
  }
}

.people-table-enter {
  opacity: 0;
  transform: translateX(200px);
}

.search-enter {
  opacity: 0;
  transform: scale(0.6);
}

.el-input {
  font-size: 0.14rem;
}
</style>