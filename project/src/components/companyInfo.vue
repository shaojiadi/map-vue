<template>
  <transition name="slide-left">
    <div class="pop-wrap">
      <div class="box3">
        <img
          class="close-icon"
          src="../assets/image/company/close_icon.png"
          @click.stop="$store.state.companyInfoShow=false"
        />
        <div class="box-wrap">
          <div class="company-info">
            <div class="company-left">
              <div class="company-logo">
                <img v-if="companyInfo.companyLogo" :src="companyInfo.companyLogo" />
                <img v-else src="../assets/image/company/logo_empty.jpg" />
              </div>
            </div>
            <div class="company-right">
              <div class="company-name">
                <h3>{{companyInfo.companyName}}</h3>
              </div>
              <ul class="pops-list">
                <li>产业导向：{{companyInfo.companyIcName}}</li>
                <li>企业类型：{{companyInfo.companySouceType}}</li>
                <li></li>
                <li>场地位置：{{companyInfo.companyAddress ? companyInfo.companyAddress : '-'}}</li>
                <li>成立时间：{{companyInfo.companyEstablishmentDate|date}}</li>
                <li>入驻时间：{{companyInfo.firstContractSignDate|date}}</li>
              </ul>
            </div>
          </div>
          <ul class="attr-list">
            <li>
              <img src="../assets/image/company/p3-icon1.png" alt class="icon" />
              <div class="con">
                <p class="p1">企业工商信息</p>
                <p class="p2">一键获取工商信息</p>
              </div>
            </li>
            <li>
              <img src="../assets/image/company/p3-icon2.png" alt class="icon" />
              <div class="con">
                <p class="p1">企业产值信息</p>
                <p class="p2">瞬息掌握发展情况</p>
              </div>
            </li>
            <li>
              <img src="../assets/image/company/p3-icon3.png" alt class="icon" />
              <div class="con">
                <p class="p1">企业产品信息</p>
                <p class="p2">深层挖掘产品品质</p>
              </div>
            </li>
          </ul>
          <div class="tab-box">
            <ul class="tab">
              <li
                v-for="(item,index) in tabs"
                :class="{active:tabActive === index}"
                @click="tabActive = index"
              >{{item.tab}}</li>
            </ul>
            <div class="content" v-if="tabActive==0">
              <div class="main-tit">当前工商信息</div>
              <table class="ntable">
                <tbody>
                  <tr>
                    <td width="15%" class="tb">统一社会信用代码</td>
                    <td width="35%" class>{{companyInfo.companyUscc|empty}}</td>
                    <td width="15%" class="tb">组织机构代码</td>
                    <td width="35%" class>{{companyInfo.companyOrganizationCode|empty}}</td>
                  </tr>
                  <tr>
                    <td class="tb">工商注册号</td>
                    <td class>{{companyInfo.companyRegistNum|empty}}</td>
                    <td class="tb" width="18%">公司类型</td>
                    <td class>{{companyInfo.companyTypeName|empty}}</td>
                  </tr>
                  <tr>
                    <td class="tb">经营状态</td>
                    <td class>{{companyInfo.companyOperatingState|empty}}</td>
                    <td class="tb">注册资本</td>
                    <td class>{{companyInfo.companyRegisteredCapital|empty}}</td>
                  </tr>
                  <tr>
                    <td class="tb">法人</td>
                    <td class>{{companyInfo.companyLegalPerson|empty}}</td>
                    <td class="tb" width="15%">联系电话</td>
                    <td class>{{companyInfo.companyTel|empty}}</td>
                  </tr>
                  <tr>
                    <td class="tb">公司邮箱</td>
                    <td class>{{companyInfo.companyEmail|empty}}</td>
                    <td class="tb">登记机关</td>
                    <td class>{{companyInfo.companyRegistrationAuthority|empty}}</td>
                  </tr>
                  <tr>
                    <td class="tb">经营范围</td>
                    <td class colspan="3">{{companyInfo.companyOperationScop|empty}}</td>
                  </tr>
                </tbody>
              </table>
              <div class="main-tit" v-if="changeList.length > 0">工商变更记录</div>
              <table class="ntable ntable-odd" v-if="changeList.length > 0">
                <tbody>
                  <tr>
                    <th width="10%">序号</th>
                    <th width="15%">变更日期</th>
                    <th width="15%">变更项目</th>
                    <th width="30%">变更前</th>
                    <th width="30%">变更后</th>
                  </tr>
                  <tr v-for="(item,index) in changeList" :key="index">
                    <td class="tx">{{index+1}}</td>
                    <td class="text-center">{{item.changeTime|date}}</td>
                    <td>{{item.changeItem}}</td>
                    <td v-html="item.contentBefore"></td>
                    <td v-html="item.contentAfter"></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- 产值纳税信息 -->
            <div class="content" v-else-if="tabActive==1">
              <div class="tax-info" v-if="annualValue">
                <div class="tax-left" style>
                  <h3 class="t-l-title">
                    {{annualValue.annualValueTime|datetimeType("yyyy")}}年
                    截止到当前
                  </h3>
                  <ul class="t-l-statistics flex-box">
                    <li class="t-l-statistics-item">
                      <h3
                        class="t-l-s-title"
                        style="border-right: 1px solid rgba(42, 66, 92, 0.8);"
                      >{{annualValue.annualValueAllValue|empty}}</h3>
                      <p
                        class="t-l-s-content"
                        style="border-right: 1px solid rgba(42, 66, 92, 0.8);"
                      >年度总产值(万元）</p>
                    </li>
                    <li class="t-l-statistics-item">
                      <h3 class="t-l-s-title">{{annualValue.annualValueTaxValue|empty}}</h3>
                      <p class="t-l-s-content">年度纳税(万元）</p>
                    </li>
                  </ul>
                  <ul class="quarter-box">
                    <li class="quarter-item">
                      <h3 class="quarter-title">
                        第一季度
                        <span v-if="taxQuarterValue.oneQuater===0">（未完全统计）</span>
                        <!---->
                      </h3>
                      <div
                        class="flex-box"
                        style="justify-content: space-between;"
                        v-if="taxQuarterValue.oneQuaterProfit||taxQuarterValue.oneQuaterProfit===0"
                      >
                        <div>
                          产值/
                          <span class="quarter-num">{{taxQuarterValue.oneQuaterProfit}}</span>
                        </div>
                        <div>
                          纳税/
                          <span class="quarter-num">{{taxQuarterValue.oneQuaterTax}}</span>
                        </div>
                      </div>
                      <div v-else class="flex-box j-center">
                        <p class="empty-data">暂无数据</p>
                      </div>
                    </li>
                    <li class="quarter-item">
                      <h3 class="quarter-title">
                        第二季度
                        <span v-if="taxQuarterValue.twoQuater===0">（未完全统计）</span>
                        <!---->
                      </h3>
                      <div
                        class="flex-box"
                        style="justify-content: space-between;"
                        v-if="taxQuarterValue.twoQuaterProfit||taxQuarterValue.twoQuaterProfit===0"
                      >
                        <div>
                          产值/
                          <span class="quarter-num">{{taxQuarterValue.twoQuaterProfit}}</span>
                        </div>
                        <div>
                          纳税/
                          <span class="quarter-num">{{taxQuarterValue.twoQuaterTax}}</span>
                        </div>
                      </div>
                      <div v-else class="flex-box j-center">
                        <p class="empty-data">暂无数据</p>
                      </div>
                    </li>
                    <li class="quarter-item">
                      <h3 class="quarter-title">
                        第三季度
                        <span v-if="taxQuarterValue.threeQuater===0">（未完全统计）</span>
                      </h3>
                      <div
                        v-if="taxQuarterValue.threeQuaterProfit||taxQuarterValue.threeQuaterProfit===0"
                        class="flex-box"
                        style="justify-content: space-between;"
                      >
                        <div>
                          产值/
                          <span class="quarter-num">{{taxQuarterValue.threeQuaterProfit}}</span>
                        </div>
                        <div>
                          纳税/
                          <span class="quarter-num">{{taxQuarterValue.threeQuaterTax}}</span>
                        </div>
                      </div>
                      <div v-else class="flex-box j-center">
                        <p class="empty-data">暂无数据</p>
                      </div>
                    </li>
                    <li class="quarter-item">
                      <h3 class="quarter-title">
                        第四季度
                        <span v-if="taxQuarterValue.fourQuater===0">（未完全统计）</span>
                      </h3>
                      <div
                        v-if="taxQuarterValue.fourQuaterProfit||taxQuarterValue.fourQuaterProfit===0"
                        class="flex-box"
                        style="justify-content: space-between;"
                      >
                        <div>
                          产值/
                          <span class="quarter-num">{{taxQuarterValue.fourQuaterProfit}}</span>
                        </div>
                        <div>
                          纳税/
                          <span class="quarter-num">{{taxQuarterValue.fourQuaterTax}}</span>
                        </div>
                      </div>
                      <div v-else class="flex-box j-center">
                        <p class="empty-data">暂无数据</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="tax-right">
                  <ul class="tax-value">
                    <li class="tax-value-item" v-for="(item,index) in taxValueList" :key="index">
                      <div
                        class="flex-box"
                        style="width: 100%;height: 100%;"
                        v-if="item.id||item.id===0"
                      >
                        <div style="flex: 4;">{{item.monthInfo}}</div>
                        <div class="flex-box" style="flex: 7;">
                          当月产值：{{item.profit}}万
                          <img
                            v-if="item.rateType===1"
                            class="g-score"
                            src="../assets/image/company/rise.png"
                            alt
                          />
                          <img
                            v-else-if="item.rateType===-1"
                            class="g-score"
                            src="../assets/image/company/decline.png"
                            alt
                          />
                          <img v-else class="g-score" src style="opacity: 0;" alt />
                          <span
                            :class="{
                      'font-green':item.rateType===1,
                      'font-red':item.rateType===-1,
                      }"
                            style="margin-left: -4px;font-size: 12px;"
                          >{{item.rate ? item.rate + "%":"-"}}</span>
                        </div>
                        <div
                          class="flex-box"
                          style="flex: 4;white-space: nowrap;"
                        >当月纳税：{{item.tax}}万</div>
                      </div>
                      <div class="flex-box wh100" style="justify-content: center;" v-else>
                        <p class="empty-data">暂无数据</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div v-else>
                <img class="none" src="../assets/image/company/p3-none.png" alt />
                <div class="none-text">暂无产值纳税信息</div>
              </div>
            </div>
            <div class="content" v-else-if="tabActive==2">
              <div class="as-info">
                <div class="title flex-box" style="margin-top: .10rem; display:flex">
                  <div style="flex: 1 1 0%;">
                    <div class="main-tit">企业绩效考核</div>
                  </div>
                  <p>
                    加权绩效分：
                    <span>{{scoreInfo}}分</span>
                  </p>
                </div>
                <div class="assess-info">
                  <div class="assess-left">
                    <div class="assess-i-title">{{yearTargeted?yearTargeted.year:""}}年度考核信息</div>
                    <div class="assess-warp">
                      <ul class="content-info" v-if="yearTargeted">
                        <li>
                          年度总目标：
                          <span>{{yearTargeted.targeted|empty}}万元</span>
                        </li>
                        <li>
                          年度总完成：
                          <span>{{yearTargeted.produce|empty}}万元</span>
                        </li>
                        <li>
                          年度情况：
                          <span style="color: #009999;" v-if="yearTargeted.successState===1">达标</span>
                          <span style="color: red;" v-if="yearTargeted.successState===0">不达标</span>
                        </li>
                        <li>
                          年度绩效分：
                          <span style="color: #0066ff;">{{yearTargeted.score|empty}}</span>
                        </li>
                      </ul>
                      <div class="empty-assess" v-else>
                        <p class="empty-info">暂未进行年度考核</p>
                      </div>
                    </div>
                  </div>
                  <div class="assess-right">
                    <ul class="assess-value-th">
                      <li class="assess-value-item">考核季度</li>
                      <li class="assess-value-item">当期指标</li>
                      <li class="assess-value-item">当期完成</li>
                      <li class="assess-value-item">是否达标</li>
                      <li class="assess-value-item">本期绩效分</li>
                    </ul>

                    <ul class="assess-value-tr" v-for="(item,index) in quarterList" :key="index">
                      <li class="assess-value-item">第{{index+1|numberType}}季度</li>
                      <li class="assess-value-item" style="flex: 4 1 0%;">
                        <div class="flex-box" style="width: 100%;" v-if="item">
                          <div class="assess-value-item">{{item.finalTargeted|empty}}万元</div>
                          <div class="assess-value-item">{{item.actual|empty}}万元</div>
                          <div class="assess-value-item">
                            <span v-if="item.successState===1" style="color: rgb(0, 153, 102);">达标</span>
                            <span v-if="item.successState===0" style="color: red;">不达标</span>
                          </div>
                          <div class="assess-value-item">{{item.score|empty}}分</div>
                        </div>
                        <span class="empty-info" v-else>未进行考核</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div v-for="(item,index) in companyAssessList" :key="index">
                <div
                  class="main-tit"
                  style="width: 1.5rem;white-space: nowrap;margin-top: .2rem"
                >{{item.projectName}}</div>
                <table class="ntable ntable-odd">
                  <tbody>
                    <tr>
                      <th width="220">考核名称</th>
                      <th>考核时间</th>
                      <th>考核人员</th>
                      <th>考核评级</th>
                    </tr>
                    <tr v-for="(items, indexs) in item.gradeScoreVOList" :key="indexs">
                      <td style="display: flex;align-items: center">
                        {{items.assessName|empty}}
                        <img
                          src="../assets/image/company/u420.png"
                          v-if="indexs===0"
                          style="width: 55px;height: 23px;margin-left: 10px;"
                          alt
                        />
                      </td>
                      <td class>{{items.scoreCreateTime|datetimeType("yyyy年MM月dd日")}}</td>
                      <td>{{items.staffName|empty}}</td>
                      <td class>
                        <span class="font-A" v-if="items.score===1">A</span>
                        <span class="font-B" v-else-if="items.score===2">B</span>
                        <span class="font-C" v-else-if="items.score===3">C</span>
                        <span class="font-D" v-else-if="items.score===4">D</span>
                        <span v-else>无考核信息</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!--企业风险信息-->
            <div class="content" v-else-if="tabActive==3">
              <div v-if="!caseListNoData || !businessRiskListNoData || !systemListNoData">
                <div>
                  <div
                    class="main-tit"
                    style="width: 1.5rem;white-space: nowrap;margin-top: .2rem"
                  >法律诉讼风险</div>
                  <table class="ntable ntable-odd" v-if="!caseListNoData">
                    <tbody>
                      <tr>
                        <th width="8%">序号</th>
                        <th width="12%">日期</th>
                        <th width="20%">案件名称</th>
                        <th width="20%">案由</th>
                        <th width="20%">案件身份</th>
                        <th width="20%">案号</th>
                      </tr>
                      <tr v-for="(item, index) in caseList" :key="index">
                        <td>{{index+1}}</td>
                        <td>{{item.submittime?Number(item.submittime):""|date}}</td>
                        <td>{{item.title}}</td>
                        <td class>{{item.casereason}}</td>
                        <td class>
                          <div v-html="item.plaintiffs"></div>
                          <div v-html="item.defendants"></div>
                        </td>
                        <td class>{{item.caseno}}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="b-content-empty" v-if="caseListNoData">
                    <div class="noData">
                      <el-button v-if="caseListLoading" type="text" :loading="true">加载中</el-button>
                      <div v-if="!caseListLoading&&caseList.length===0">
                        <p style="font-size: 12px;color: #909399;">暂无法律诉讼风险</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div
                    class="main-tit"
                    style="width: 1.5rem;white-space: nowrap;margin-top: .2rem"
                  >异常经营风险</div>
                  <table class="ntable ntable-odd" v-if="!businessRiskListNoData">
                    <tbody>
                      <tr>
                        <th>序号</th>
                        <th>列入日期</th>
                        <th>列入异常名录原因</th>
                        <th>列入决定机关</th>
                        <th>移出日期</th>
                        <th>移除异常名录原因</th>
                        <th>移出部门</th>
                      </tr>
                      <tr v-for="(item, index) in businessRiskList" :key="index">
                        <td>{{index+1}}</td>
                        <td class>{{item.putDate}}</td>
                        <td>{{item.putReason}}</td>
                        <td class>{{item.putDepartment}}</td>
                        <td class>{{item.removeDate}}</td>
                        <td class>{{item.removeReason}}</td>
                        <td class>{{item.removeDepartment}}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="b-content-empty" v-if="businessRiskListNoData">
                    <div class="noData">
                      <el-button v-if="businessRiskListLoading" type="text" :loading="true">加载中</el-button>
                      <div v-if="!businessRiskListLoading&&businessRiskList.length===0">
                        <p style="font-size: 12px;color: #909399;">暂无异常经营风险</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div
                    class="main-tit"
                    style="width: 1.5rem;white-space: nowrap;margin-top: .2rem"
                  >系统录入风险项</div>
                  <table class="ntable ntable-odd" v-if="!systemListNoData">
                    <tbody>
                      <tr>
                        <th>风险项名称</th>
                        <th>录入时间</th>
                        <th>录入人</th>
                        <th>对应风险分</th>
                      </tr>
                      <tr v-for="(item, index) in systemList" :key="index">
                        <td>{{item.riskItemName|empty}}</td>
                        <td class>{{item.createTime|empty}}</td>
                        <td>{{item.createName|empty}}</td>
                        <td class>{{item.riskScore|empty}}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="b-content-empty" v-if="systemListNoData">
                    <div class="noData">
                      <el-button v-if="systemListLoading" type="text" :loading="true">加载中</el-button>
                      <div v-if="!systemListLoading&&systemList.length===0">
                        <p style="font-size: 12px;color: #909399;">暂无系统录入风险项</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else>
                <img class="none" src="../assets/image/company/p3-none.png" alt />
                <div class="none-text">暂无风险</div>
              </div>
            </div>
            <!--园企协同信息-->
            <div class="content" v-else-if="tabActive==4">
              <div
                v-if="!contractListNoData || !matterListNoData || !companyApplyListNoData || !listNoData"
              >
                <div>
                  <div
                    class="main-tit"
                    style="width: 1.5rem;white-space: nowrap;margin-top: .2rem"
                  >合同信息</div>
                  <table class="ntable ntable-odd" v-if="!contractListNoData">
                    <tbody>
                      <tr>
                        <th>片区</th>
                        <th>楼宇/场地</th>
                        <th>面积</th>
                        <th>租赁时间</th>
                        <th>到期时间</th>
                        <th>类型</th>
                        <th>状态</th>
                      </tr>
                      <tr v-for="(item, index) in contractList" :key="index">
                        <td>
                          <p
                            v-if="item.houseInfoList"
                            v-for="(items,indexs) in item.houseInfoList"
                            :key="indexs"
                          >{{items.buildName|empty}}</p>
                        </td>
                        <td class>
                          <p
                            v-if="item.houseInfoList"
                            v-for="(items,indexs) in item.houseInfoList"
                            :key="indexs"
                          >{{items.houseResRoomCode|empty}}</p>
                        </td>
                        <td>
                          <p
                            v-if="item.houseInfoList"
                            v-for="(items,indexs) in item.houseInfoList"
                            :key="indexs"
                          >{{items.houseResRoomSize|empty}} m²</p>
                        </td>
                        <td class>{{item.contractStartTime|date}}</td>
                        <td class>{{item.contractEndTime|date}}</td>
                        <td class>
                          <span v-if="item.contractType===1">租赁</span>
                          <span v-else-if="item.contractType===2">物业</span>
                          <span v-else-if="item.contractType===3">车位</span>
                          <span v-else>-</span>
                        </td>
                        <td class>
                          <span v-if="item.contractState===0">未使用</span>
                          <span v-else-if="item.contractState===1">使用中</span>
                          <span v-else-if="item.contractState===2">已到期</span>
                          <span v-else-if="item.contractState===3">已退租</span>
                          <span v-else-if="item.contractState===4">已作废</span>
                          <span v-else-if="item.contractState===5">待审批</span>
                          <span v-else-if="item.contractState===6">审批未通过</span>
                          <span v-else-if="item.contractState===6">完善中</span>
                          <span v-else>-</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="b-content-empty" v-if="contractListNoData">
                    <div class="noData">
                      <el-button v-if="contractListLoading" type="text" :loading="true">加载中</el-button>
                      <div v-if="!contractListLoading&&contractList.length===0">
                        <p style="font-size: 12px;color: #909399;">暂无合同信息</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div
                    class="main-tit"
                    style="width: 1.5rem;white-space: nowrap;margin-top: .2rem"
                  >事项逾期记录</div>
                  <div v-if="!matterListNoData">
                    <table class="ntable ntable-odd">
                      <tbody>
                        <tr>
                          <th>逾期类型</th>
                          <th>逾期情况</th>
                        </tr>
                        <tr v-for="(item, index) in matterList" :key="index">
                          <td>园企事项逾期</td>
                          <td
                            class
                          >{{item.matterName|empty}}于{{item.matterRemindRecordCreateTime|empty}}被逾期提醒警告第{{item.matterRemindRecordNum|empty}}次</td>
                        </tr>
                      </tbody>
                    </table>
                    <div class="g-pagination-table">
                      <el-pagination
                        background
                        layout="prev, pager, next, jumper"
                        @current-change="(val)=>{handleCurrentChange(val,3)}"
                        :current-page="filters.pageIndex3"
                        :page-size="filters.pageSize3"
                        :total="filters.pageTotal3"
                      ></el-pagination>
                    </div>
                  </div>
                  <div class="b-content-empty" v-if="matterListNoData">
                    <div class="noData">
                      <el-button v-if="matterListLoading" type="text" :loading="true">加载中</el-button>
                      <div v-if="!matterListLoading&&matterList.length===0">
                        <p style="font-size: 12px;color: #909399;">暂无事项逾期记录</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div
                    class="main-tit"
                    style="width: 1.5rem;white-space: nowrap;margin-top: .2rem"
                  >企业申请（信息来源于园企协同系统）</div>
                  <div v-if="!companyApplyListNoData">
                    <table class="ntable ntable-odd">
                      <tbody>
                        <tr>
                          <th>申请项目</th>
                          <th>申请表名称</th>
                          <th>申请情况</th>
                        </tr>
                        <tr v-for="(item, index) in companyApplyList" :key="index">
                          <td>{{item.workflowName|empty}}</td>
                          <td class>{{item.workflowApplicationTitle|empty}}</td>
                          <td>{{item.statusDes|empty}}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div class="g-pagination-table">
                      <el-pagination
                        background
                        layout="prev, pager, next, jumper"
                        @current-change="(val)=>{handleCurrentChange(val,4)}"
                        :current-page="filters.pageIndex4"
                        :page-size="filters.pageSize4"
                        :total="filters.pageTotal4"
                      ></el-pagination>
                    </div>
                  </div>
                  <div class="b-content-empty" v-if="companyApplyListNoData">
                    <div class="noData">
                      <el-button v-if="companyApplyListLoading" type="text" :loading="true">加载中</el-button>
                      <div v-if="!companyApplyListLoading&&companyApplyList.length===0">
                        <p style="font-size: 12px;color: #909399;">暂无企业申请信息</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div
                    class="main-tit"
                    style="width: 1.5rem;white-space: nowrap;margin-top: .2rem"
                  >拓展信息（信息来源于园企协同系统）</div>
                  <div
                    class="b-content-list position-relative"
                    :class="{'b-content-empty':listNoData}"
                  >
                    <div
                      class="b-content-item"
                      :class="{'border-bottom':list&&list.length===1}"
                      v-for="(item,index) in list"
                      :key="index"
                    >
                      <div class="b-label" style="width: 116px;">
                        <div class="ellipsis">
                          <el-popover
                            placement="top"
                            title
                            trigger="hover"
                            :disabled="!item.matterTypeName||(item.matterTypeName+'').length<=6"
                          >
                            <span style="white-space: nowrap;">{{item.matterTypeName|empty}}</span>
                            <div slot="reference" class="ellipsis">{{item.matterTypeName|empty}}</div>
                          </el-popover>
                        </div>
                      </div>
                      <div class="b-content-header" style="width: calc(100% - 116px);">
                        <div
                          class="b-content-tr width-4"
                          v-for="(child,childIndex) in item.valueList"
                          :key="childIndex"
                          v-if="childIndex<4"
                        >
                          <div class="b-label b-item-content">
                            <el-popover
                              placement="top"
                              title
                              trigger="hover"
                              :disabled="!child.filedName||(child.filedName+'').length<=7"
                            >
                              <span style="white-space: nowrap;">{{child.filedName|empty}}</span>
                              <div slot="reference" class="ellipsis">{{child.filedName|empty}}</div>
                            </el-popover>
                          </div>
                          <div class="b-content ellipsis b-item-content">
                            <el-popover
                              placement="top"
                              title
                              width="200"
                              trigger="hover"
                              :disabled="!child.filedValue||(child.filedValue+'').length<=7"
                            >
                              <div class="word-break">{{child.filedValue|empty}}</div>
                              <div slot="reference" class="ellipsis">{{child.filedValue|empty}}</div>
                            </el-popover>
                          </div>
                        </div>
                        <div
                          class="b-content-tr"
                          style="width: 90px;border-right: 1px solid #d5e5ff;"
                        >
                          <div class="b-label">更多</div>
                          <div class="b-content">
                            <span
                              style="color: #0099ff;font-size: 12px;cursor: pointer;"
                              @click="detail(item,index,5)"
                            >查看更多</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="noData" v-if="listNoData">
                      <el-button v-if="listLoading" type="text" :loading="true">加载中</el-button>
                      <div v-if="!listLoading&&list.length===0">
                        <p style="font-size: 12px;color: #909399;">暂无拓展信息</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else>
                <img class="none" src="../assets/image/company/p3-none.png" alt />
                <div class="none-text">暂无园企协同信息</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import * as getData from "./../service/getData";
import * as mobile from "./../config/mUtils";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "App",
  data() {
    return {
      changeList: [],
      tabs: [
        { tab: "企业基础信息" },
        { tab: "产值纳税信息" },
        { tab: "企业考核信息" },
        { tab: "企业风险信息" },
        { tab: "园企协同信息" }
      ],
      tabActive: 0,
      companysActive: {},
      companyInfo: {},
      changeList: [],
      taxValueList: [],
      annualValue: {},
      taxQuarterValue: {},
      yearTargeted: {},
      scoreInfo: "",
      quarterList: [],
      companyAssessList: [],
      caseList: [],
      caseListLoading: false,
      businessRiskList: [],
      businessRiskListLoading: false,
      systemList: [],
      systemListLoading: false,
      contractList: [],
      contractListLoading: false,
      matterList: [],
      matterListLoading: false,
      companyApplyList: [],
      companyApplyListLoading: false,

      filters: {
        pageIndex3: 1,
        pageSize3: 10,
        pageTotal3: 1,
        pageIndex4: 1,
        pageSize4: 10,
        pageTotal4: 1
      },
      list: [],
      listLoading: false,
      childrenListNoData: {
        filedName: "",
        filedValue: ""
      }
    };
  },
  props: {},
  mounted() {
      this.lookCompany()
  },
  components: {},
  filters: {
    numberType(val) {
      switch (val) {
        case 1:
          return "一";
        case 2:
          return "二";
        case 3:
          return "三";
        case 4:
          return "四";
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
    date(val) {
      switch (val) {
        case null:
        case undefined:
        case "":
          return "-";
        default:
          return new Date(val).format("yyyy-MM-dd");
      }
    }
  },
  computed: {
    listNoData() {
      return this.listLoading || (!this.listLoading && this.list.length === 0);
    },
    companyApplyListNoData() {
      return (
        this.companyApplyListLoading ||
        (!this.companyApplyListLoading && this.companyApplyList.length === 0)
      );
    },
    matterListNoData() {
      return (
        this.matterListLoading ||
        (!this.matterListLoading && this.matterList.length === 0)
      );
    },
    contractListNoData() {
      return (
        this.contractListLoading ||
        (!this.contractListLoading && this.contractList.length === 0)
      );
    },
    systemListNoData() {
      return (
        this.systemListLoading ||
        (!this.systemListLoading && this.systemList.length === 0)
      );
    },
    businessRiskListNoData() {
      return (
        this.businessRiskListLoading ||
        (!this.businessRiskListLoading && this.businessRiskList.length === 0)
      );
    },
    caseListNoData() {
      return (
        this.caseListLoading ||
        (!this.caseListLoading && this.caseList.length === 0)
      );
    }
  },
  methods: {
    lookCompany() {
      let companyId = this.$store.state.companyInfo.companyId
      this.contractListLoading = true
      getData.companyBaseInfoXW({companyId:companyId}).then(res => { // //合同基础信息+合同信息
        this.contractListLoading = false
        if (res.data.code != 1) {
          this.$message.error(res.data.message || res.data.msg);
          return;
        }
        this.companyInfo = res.data.data.company ? res.data.data.company : {};
        this.contractList = res.data.data.contractList ? res.data.data.contractList : [];
        this.houseInfoList = res.data.data.houseInfoList ? res.data.data.houseInfoList : [];
        this.houseInfoAllList = res.data.data.houseInfoAllList ? res.data.data.houseInfoAllList : [];
        this.tagList = this.companyInfo.companyTagsName ? this.companyInfo.companyTagsName.split(",") : [];
      }).catch(err => {
        this.contractListLoading = false
      })
      getData.getBusinessChangeRecord(companyId).then(res => { // 工商变更记录
        if (res.data.code != 1) {
          this.$message.error(res.data.message);
          return;
        }
        this.changeList = res.data.data.changeList;
      })
      let year = new Date().getFullYear(); // 产值纳税
      getData.formInfo(year, companyId).then(res => {
        if (res.data.code != 1) {
          this.$message.error(res.data.message);
          return;
        }
        this.taxValueList = res.data.data.taxFormVos;
        this.annualValue = res.data.data.annualValue;
        this.taxQuarterValue = res.data.data;
      })
      getData.companyTargetedCompanyInfo(companyId).then((res) => { // 企业考核信息
        if (res.data.code != 1) {
          this.$message.error(res.data.message || res.data.msg);
          return;
        }
        let data = res.data.data;
        this.yearTargeted = data.yearTargeted;
        this.scoreInfo = data.scoreInfo;
        this.quarterList = data.quarterList ? data.quarterList : ["", "", "", ""];
      }).catch(_ => {
        this.quarterList = ["", "", "", ""];
      });
      const data = {
        companyId: companyId
      };
      getData.gradeScoreByCompany(data).then(res => { //企业考核信息
        if (res.data.code != 1) {
          this.$message.error(res.data.message);
          return;
        }
        this.companyAssessList = res.data.data.list;
      })
      this.systemListLoading = true
      this.businessRiskListLoading = true
      this.caseListLoading = true
      getData.getCompanyRiskRecord(companyId).then(res => { //企业风险信息记录
        this.systemListLoading = false
        this.businessRiskListLoading = false
        this.caseListLoading = false
        if (res.data.code != 1) {
          this.$message.error(res.data.message);
          return;
        }
        this.caseList = res.data.data.litigationList;
        this.businessRiskList = res.data.data.abnormalList;
        this.systemList = res.data.data.systemList;
      }).catch(_ => {
        console.log("getCompanyRiskRecord", _);
        this.systemListLoading = false
        this.businessRiskListLoading = false
        this.caseListLoading = false
      });
      //this.getCompanyMatterRemind(companyId)
      // this.getCompanyWorkflowApplication(companyId)
      // this.getCompanyExtension(companyId)
      this.companyInfoDialog = true;
    },

    getCompanyMatterRemind(companyId) {
      //企业事项
      let data = {
        pageIndex: this.filters.pageIndex3,
        pageSize: this.filters.pageSize3,
        companyId: companyId
      };
      this.matterList = [];
      this.matterListLoading = true;
      getData
        .companyMatterRemind(data)
        .then(res => {
          this.matterListLoading = false;
          if (res.data.code != 1) {
            this.$message.error(res.data.message || res.data.msg);
            error(res.data.message);
            return;
          }
          let data = res.data.data;
          if (data) {
            this.matterList = data.matterRemindRecordList
              ? data.matterRemindRecordList
              : [];
            this.filters.pageIndex3 = data.pageIndex ? data.pageIndex : 1;
            this.filters.pageTotal3 = data.totalCount ? data.totalCount : 0;
          }
        })
        .catch(_ => {
          this.matterListLoading = false;
          console.log("companyMatterRemind", _);
        });
    },
    getCompanyWorkflowApplication(companyId, type) {
      //企业申请
      return new Promise((success, error) => {
        let data = {
          pageIndex: this.filters.pageIndex4,
          pageSize: this.filters.pageSize4,
          companyId: companyId
        };
        if (type === 1) {
          data.pageSize = 0;
        }
        this.companyApplyList = [];
        this.companyApplyListLoading = true;
        getData
          .companyWorkflowApplication(data)
          .then(res => {
            this.companyApplyListLoading = false;
            if (res.data.code != 1) {
              this.$message.error(res.data.message || res.data.msg);
              error(res.data.message);
              return;
            }
            let data = res.data.data;
            if (data) {
              this.companyApplyList = data.workflowApplicationList
                ? data.workflowApplicationList
                : [];
              this.filters.pageIndex4 = data.pageIndex ? data.pageIndex : 1;
              this.filters.pageTotal4 = data.totalCount ? data.totalCount : 0;
            }
            success(1);
          })
          .catch(_ => {
            error(_);
            console.log("companyWorkflowApplication", _);
            this.companyApplyListLoading = false;
          });
      });
    },
    handleCurrentChange(val, type) {
      if (type === 3) {
        this.filters.pageIndex3 = val;
        this.getCompanyMatterRemind(this.info.companyId);
      } else if (type === 4) {
        this.filters.pageIndex4 = val;
        this.getCompanyWorkflowApplication(this.info.companyId);
      }
    },
    getCompanyExtension(companyId) {
      //拓展信息
      this.list = [];
      this.listLoading = true;
      getData
        .companyExtension(companyId)
        .then(res => {
          this.listLoading = false;
          if (res.data.code != 1) {
            this.$message.error(res.data.message || res.data.msg);
            return;
          }
          let data = res.data.data;
          let matterCompanyList = data.matterCompanyList
            ? data.matterCompanyList
            : [];
          matterCompanyList.forEach(item => {
            !item.valueList ? (item.valueList = []) : "";
            let number = 4 - item.valueList.length;
            if (number > 0) {
              for (let i = 0; i < number; i++) {
                item.valueList.push(this.childrenListNoData);
              }
            }
          });
          this.list = matterCompanyList;
        })
        .catch(_ => {
          console.log("companyExtension", _);
          this.listLoading = false;
        });
    }
  }
};
</script>

<style scoped lang="scss">
@import "../assets/css/mixin";

.pop-wrap {
  position: absolute;
  left: 0;
  top: 0;
  @include wh(100%, 100%);
  background-color: rgba(8, 14, 38, 0.8);
  z-index: 9999;

  .box3 {
    position: absolute;
    @include wh(12.28rem, 8.71rem);
    background-image: url("../assets/image/company/p3-bg3.png");
    background-size: 100% 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0.68rem 0.23rem;

    .close-icon {
      position: absolute;
      top: 0.44rem;
      right: 0.42rem;
      width: 0.44rem;
      height: 0.45rem;
      cursor: pointer;
      z-index: 100;
    }

    .box-wrap {
      overflow-y: auto;
      height: 100%;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .company-info {
      display: flex;

      .company-left {
        .company-chart {
          text-align: center;
          margin-left: 0.1rem;
          margin-top: 0.1rem;
          padding: 0.08rem;
          @include wh(1.21rem, 0.65rem);
          background-color: rgba(57, 89, 133, 0.4);
          @include sc(0.13rem, #afe0f4);

          .img-box {
            @include wh(1rem, 0.27rem);

            overflow: hidden;
            margin-left: 0.03rem;
            text-align: left;

            &.animate {
              animation: mymove 3s 1;
            }

            img {
              display: block;
              @include wh(1rem, 0.27rem);
              margin-bottom: 0.05rem;
            }
          }
        }
      }

      .company-right {
        margin-left: 0.1rem;
        flex: 1;

        .company-name {
          display: flex;
          align-items: center;

          h3 {
            @include sc(0.24rem, #fff);
            font-weight: 500;
          }

          .tag {
            @include sc(0.14rem, #fff);
            padding: 0.02rem 0.08rem;
            background: -webkit-gradient(
              linear,
              left top,
              right top,
              from(#f7c441),
              to(#ecaa00)
            );
            border-radius: 0.04rem;
            margin-left: 0.17rem;
          }
        }

        .pops-list {
          display: flex;
          flex-wrap: wrap;
          margin-top: 0.5rem;

          li {
            width: 3rem;
            margin-right: 0.1rem;
            margin-bottom: 0.05rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            @include sc(0.16rem, #afe0f4);

            a {
              color: #51cffe;
              cursor: pointer;
            }
          }
        }
      }
    }

    .attr-list {
      display: flex;
      margin-top: 0.15rem;
      padding-left: 0.3rem;
      box-sizing: border-box;

      li {
        display: flex;
        width: 3rem;
        margin-right: 0.1rem;

        .icon {
          @include wh(0.67rem, 0.67rem);
          margin-right: 0.1rem;
        }

        .con {
          .p1 {
            @include sc(0.18rem, #fff);
            margin-bottom: 0.2rem;
          }

          .p2 {
            @include sc(0.16rem, #afe0f4);

            span {
              color: #51cffe;
              margin-right: 0.2rem;
            }
          }
        }
      }
    }

    .tab-box {
      margin-top: 0.31rem;
      padding: 0 0.1rem;

      .tab {
        display: flex;
        border-bottom: 1px solid #345873;

        li {
          height: 0.4rem;
          line-height: 0.4rem;
          @include sc(0.16rem, #afe0f4);
          margin-right: 0.4rem;
          position: relative;
          cursor: pointer;

          &.active {
            @include sc(0.18rem, #fff);

            &:after {
              position: absolute;
              @include wh(100%, 0.02rem);
              background-color: #5ec9f4;
              left: 0;
              bottom: -0.01rem;
              content: "";
            }
          }
        }
      }

      .content {
        padding-top: 0.1rem;
        position: relative;

        .none {
          margin-top: 0.1rem;
          @include wh(3.85rem, 4.01rem);
          @include cl();
        }

        .none-text {
          margin-top: 2.7rem;
          @include cl();
          @include sc(0.28rem, #205b92);
        }

        .main-tit {
          @include wh(1.32rem, 0.3rem);
          line-height: 0.3rem;
          @include sc(0.16rem, #fff);
          background-image: url("../assets/image/company/p3-title.png");
          background-size: 100% 100%;
          margin-left: -0.04rem;
          padding-left: 0.15rem;
          margin-top: -0.03rem;
        }

        .con-list {
          margin-top: 0.07rem;
          display: flex;

          .item {
            @include wh(3.74rem, 2.15rem);
            margin-right: 0.1rem;
            background-image: url("../assets/image/company/p3-content-item.png");
            background-size: 100% 100%;

            &:nth-child(3n) {
              margin-right: 0rem;
            }

            .tit {
              text-align: center;
              line-height: 0.3rem;
              height: 0.3rem;
              @include sc(0.16rem, #afe0f4);
            }

            .info {
              padding: 0.1rem 0.15rem;
              overflow: hidden;

              .person {
                display: flex;

                .xing {
                  @include wh(0.49rem, 0.49rem);
                  background-color: #578ad0;
                  text-align: center;
                  line-height: 0.49rem;
                  @include sc(0.28rem, #fff);
                  border-radius: 0.05rem;
                  margin-right: 0.1rem;
                }

                .person-info {
                  .p1 {
                    @include sc(0.19rem, #fff);
                    margin-bottom: 0.05rem;
                  }

                  .p2 {
                    font-size: 0.14rem;

                    span {
                      color: #51cffe;
                      padding: 0 0.03rem;
                    }
                  }
                }
              }

              .introduce {
                font-size: 0.14rem;
                margin-top: 0.2rem;
              }
            }
          }

          .item2,
          .item3 {
            position: relative;

            .info {
              @include wh(3.74rem, 1.85rem);

              background-size: 100% auto;
              background-position: left bottom;
              background-repeat: no-repeat;
            }

            .mask {
              position: absolute;
              @include wh(3.74rem, 0.6rem);
              background-image: url("../assets/image/company/p3-content-mask.png");
              background-size: 100% 100%;
              z-index: 10;
              bottom: 0;
              left: 0;
              cursor: pointer;
            }
          }

          .item2 {
            .info {
              background-image: url("../assets/image/company/p3-content-item2.png");
              position: relative;

              .name {
                @include wh(1.94rem, 0.42rem);
                margin-top: 0.05rem;
                line-height: 0.42rem;
                @include center();
                text-align: center;
                @include sc(0.16rem, #fff);
              }
            }
          }

          .item3 {
            .info {
              background-image: url("../assets/image/company/p3-content-item3.png");

              .name {
                @include wh(3.65rem, 0.37rem);
                margin-left: 0.05rem;
                padding-left: 0.37rem;
                line-height: 0.37rem;
                margin-top: 0.08rem;
                @include sc(0.16rem, #fff);
                margin-bottom: 0.1rem;
              }

              ul {
                margin-left: 0.26rem;

                li {
                  @include wh(3.2rem, 0.59rem);
                  margin-bottom: 0.1rem;
                  margin-left: 0.1rem;

                  .p1 {
                    @include sc(0.17rem, #fff);
                    padding-top: 0.05rem;
                  }

                  .p2 {
                    @include sc(0.16rem, #afe0f4);
                    margin-top: 0.03rem;

                    span {
                      color: #51cffe;
                      margin-right: 0.1rem;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  .company-item {
    cursor: pointer;
    @include wh(3.62rem, 1.6rem);
    background-image: url("../assets/image/company/p3-company.png");
    background-size: 100% 100%;
    padding: 0.1rem;
    display: flex;
    align-items: center;

    &.active {
      background-image: url("../assets/image/company/p3-company-active.png");
    }

    .company-logo {
      transform: scale(0.73);
      margin-left: -0.15rem;
    }

    .company-con {
      margin-left: -0.08rem;

      .name {
        width: 2.4rem;
        @include sc(0.18rem, #fff);
        margin-bottom: 0.2rem;
      }

      .p1,
      .p2 {
        @include sc(0.14rem, #afe0f4);
        margin-top: 0.04rem;
      }
    }
  }

  .company-logo {
    @include wh(1.36rem, 1.37rem);
    background-image: url("../assets/image/company/p3-iconbg.png");
    background-size: 100% 100%;
    position: relative;

    img {
      @include center();
      @include wh(0.99rem, 0.99rem);
      background-color: #fff;
      object-fit: cover;
      margin-left: 0.02rem;
      margin-top: -0.02rem;
    }
  }

  .ntable {
    border-spacing: 0;
    border-collapse: collapse;
    margin: 0.2rem 0;
    width: 100%;
  }

  .ntable th {
    text-align: left;
    background: rgba(39, 92, 157, 0.4);
    border: rgba(42, 66, 92, 0.8) 1px solid;
    border-collapse: collapse;
    padding: 0.08rem 0.28rem;
    box-sizing: border-box;
    font-weight: normal;
    color: #afe0f4;
    font-size: 0.14rem;
    line-height: 2.4;
  }

  .ntable .tb {
    background: rgba(39, 92, 157, 0.4);
  }

  .ntable td:not(.tb) {
    background: rgba(18, 34, 60, 0.8);
  }

  .ntable td {
    padding: 0.08rem 0.1rem;
    padding-left: 0.28rem;
    box-sizing: border-box;
    border: rgba(42, 66, 92, 0.8) 1px solid;
    word-break: break-all;
    font-size: 0.14rem;
    line-height: 2.4;
    color: #afe0f4;
  }
}
.company-content {
  padding: 0.05rem 0;
  display: flex;
  margin-bottom: 0.2rem;
  img {
    @include wh(1.32rem, 0.86rem);
    object-fit: cover;
    margin-right: 0.3rem;
  }
  .compmany-content-info {
    flex: 1;
    .info-title {
      font-size: 0.16rem;
      color: #fff;
      margin-bottom: 0.1rem;
    }
    .info-content {
      font-size: 0.14rem;
      line-height: 0.2rem;
      color: rgba(175, 224, 244, 1);
    }
  }
}

.tax-info {
  min-height: 4.57rem;
  margin-top: 0.1rem;
  border: 0.01rem solid rgba(42, 66, 92, 0.8);
  display: flex;

  .tax-left {
    width: 30%;
    min-width: 2.66rem;
    border-right: 0.01rem solid rgba(42, 66, 92, 0.8);
    box-sizing: border-box;
    background: rgba(39, 92, 157, 0.4);

    .t-l-title {
      width: 1.83rem;
      height: 0.3rem;
      box-sizing: border-box;
      background: rgba(39, 92, 157, 0.8);
      border: 0.01rem solid rgba(42, 66, 92, 0.8);
      border-top: none;
      font-size: 0.14rem;
      color: #afe0f4;
      line-height: 0.3rem;
      text-align: center;
    }

    .t-l-statistics {
      width: calc(100% - 0.2rem);
      margin: 0 auto;
      padding: 0.2rem 0;
      border-bottom: 0.01rem solid rgba(42, 66, 92, 0.8);

      .t-l-statistics-item {
        flex: 1;
        padding: 0.1rem 0;

        .t-l-s-title {
          font-size: 0.18rem;
          font-weight: bold;
          line-height: 0.36rem;
          text-align: center;
        }

        .t-l-s-content {
          font-size: 0.12rem;
          text-align: center;
        }
      }
    }

    .quarter-box {
      width: calc(100% - 0.4rem);
      padding-right: 0.2rem;
      box-sizing: border-box;
      margin: 0.2rem auto 0;

      .quarter-item {
        margin-top: 0.2rem;

        .quarter-title,
        div {
          font-size: 0.12rem;
          color: #afe0f4;
        }

        .quarter-title {
          margin-bottom: 0.05rem;
        }

        .quarter-num {
          font-size: 0.18rem;
          font-weight: 700;
        }
      }
    }
  }

  .tax-right {
    width: 70%;
    min-width: calc(100% - 2.66rem);

    .tax-value {
      .tax-value-item {
        height: 0.4rem;
        border-top: 0.01rem solid rgba(42, 66, 92, 0.8);
        padding: 0 0.1rem;
        box-sizing: border-box;

        div {
          font-weight: 500;
          font-size: 0.12rem;
        }

        .g-score {
          width: 0.12rem;
          height: 0.12rem;
          margin-right: 0.05rem;
          vertical-align: middle;
          margin-left: 0.1rem;
        }

        .font-green {
          color: #009966;
        }

        .font-red {
          color: red;
        }
      }

      .tax-value-item:first-child {
        border-top: none;
      }
    }
  }

  .empty-data {
    padding: 0.05rem 0.1rem;
    background: rgba(39, 92, 157, 0.4);
    color: #afe0f4;
    border-radius: 0.04rem;
    font-size: 0.12rem;
  }
}

.assess-info {
  min-height: 1.85rem;
  margin-top: 0.1rem;
  border: 0.01rem solid rgba(42, 66, 92, 0.8);
  display: flex;

  .assess-left {
    position: relative;
    width: 30%;
    min-width: 2.63rem;
    border-right: 0.01rem solid rgba(42, 66, 92, 0.8);
    box-sizing: border-box;
    background: rgba(39, 92, 157, 0.4);

    .assess-i-title {
      width: 100%;
      height: 0.3rem;
      border-bottom: 0.01rem solid rgba(42, 66, 92, 0.8);
      font-size: 0.13rem;
      color: #afe0f4;
      line-height: 0.3rem;
      text-align: center;
    }

    .assess-warp {
      width: 100%;
      height: calc(100% - 0.31rem);
      /*background: rgba(39, 92, 157, 0.4);*/
    }

    .content-info {
      width: 100%;
      padding-top: 0.1rem;

      li {
        padding: 0 0.1rem;
        display: flex;
        align-items: center;

        span {
          font-size: 0.18rem;
          line-height: 0.32rem;
        }
      }
    }

    .empty-assess {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .assess-right {
    width: 70%;
    min-width: calc(100% - 2.63rem);

    .assess-value-th,
    .assess-value-tr {
      display: flex;
      border-bottom: 0.01rem solid rgba(42, 66, 92, 0.8);

      .assess-value-item {
        flex: 1;
        height: 0.3rem;
        /*padding: 0 0.100rem;*/
        box-sizing: border-box;
        font-size: 0.13rem;
        color: #afe0f4;
        line-height: 0.3rem;
        text-align: center;

        div {
          font-weight: 500;
          font-size: 0.12rem;
        }

        .g-score {
          width: 0.12rem;
          height: 0.12rem;
          margin-right: 0.05rem;
          vertical-align: middle;
          margin-left: 0.1rem;
        }

        .font-green {
          color: #009966;
        }

        .font-red {
          color: red;
        }

        .empty-info {
          line-height: 0.4rem;
          padding: 0.05rem 0.1rem;
          background: rgba(39, 92, 157, 0.4);
          color: #afe0f4;
          border-radius: 0.04rem;
          font-size: 0.12rem;
        }
      }
    }

    .assess-value-tr {
      .assess-value-item {
        height: 0.4rem;
        line-height: 0.4rem;
      }
    }

    .assess-value-tr:last-child {
      border-bottom: none;
    }
  }
}

.b-content-list {
  position: relative;
  .b-content-item {
    > .b-label {
      position: relative;

      > div {
        width: calc(100% - 20px);
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}

.b-content-empty {
  position: relative;
  margin-top: 0.2rem;
  border: 1px solid #d5e5ff;
  min-height: 1rem;
}
.b-info {
  margin-top: 10px;
  /*border: 1px solid #d5e5ff;*/

  .title {
    padding: 5px 0 10px;
    box-sizing: border-box;
    line-height: 30px;
    /*background: #f6faff;*/
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 600;
    color: rgba(67, 67, 67, 1);

    .refresh-time {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }

    .handle-refresh {
      width: 95px;
      height: 32px;
      padding: 0;
      text-align: center;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(37, 147, 252, 1);
      line-height: 30px;
      border: 1px solid rgba(217, 223, 227, 1);
      border-radius: 4px;
      background: #fff;

      .el-icon-refresh {
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 600;
        line-height: 30px;
        margin-right: 5px;
        vertical-align: middle;
      }
    }

    .title-box {
      width: calc(100% - 95px);
      padding-right: 20px;
      box-sizing: border-box;
      justify-content: space-between;
    }

    .title-btn {
      width: 120px;
      height: 30px;
      font-size: 13px;
      color: #333;
      line-height: 30px;
      cursor: pointer;
      text-align: center;
      background: rgba(237, 241, 246, 1);
    }
  }

  .b-label,
  .b-content {
    /*display: flex;*/
    /*align-items: center;*/
    text-align: center;
    /*justify-content: center;*/
    min-height: 43px;
    padding: 10px 10px 0;
    box-sizing: border-box;
    border: 1px solid #d5e5ff;
    border-right: none;
    border-bottom: none;
  }

  .b-label {
    background: #f6faff;
  }

  .b-content {
  }

  .b-info-item-box {
    .b-label {
      width: 20.8333333%;
      padding: 0 10px;
      display: flex;
      align-content: center;
      justify-content: center;
      align-items: center;
      border-right: 1px solid #d5e5ff;
    }

    .b-content {
      width: 79.16667%;
      padding: 5px 10px;
      justify-content: flex-start;
      word-break: break-all;
      border-left: 0;
      text-align: left;
    }
  }

  .b-ellipsis-box {
    /*flex: 1;*/
    width: 100%;
    height: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .b-item-content {
    span:first-child {
      flex: 1;
      width: 100%;
      overflow: hidden;
    }
  }

  .g-blue {
    height: 50px;
    background: #f6faff;
  }

  .b-content-item {
    display: flex;
  }

  .b-content-item.border-bottom,
  .b-label.border-bottom,
  .b-content.border-bottom {
    border-bottom: 1px solid #d5e5ff;
  }

  .b-content-item.border-right,
  .b-label.border-right,
  .b-content.border-right {
    border-right: 1px solid #d5e5ff;
  }

  .b-content-header {
    display: flex;
  }

  .b-content-tr {
    .b-label {
      font-size: 12px;
      min-height: 35px;

      > span {
        display: block;
        width: 100%;
      }

      p {
        width: 100%;
        font-size: 12px;
      }
    }

    .b-content {
      font-size: 12px;
      min-height: 35px;

      p {
        width: 100%;
        font-size: 12px;
      }
    }
  }

  .width-4 {
    width: calc((100% - 90px) / 4);
  }

  .table-warp {
    border: 1px solid #d5e5ff;
    border-top: none;
  }
}
.noData {
  position: absolute;
  width: 100%;
  /*left: 50%;*/
  top: 50%;
  text-align: center;
  transform: translate(0, -50%);

  .g-empty-icon {
    width: 78px;
    height: 70px;
    vertical-align: middle;
  }

  .g-empty-content {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);

    > img {
    }
  }
}
</style>
