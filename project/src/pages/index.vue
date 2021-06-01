<template>
  <div style="width:100%;height:100%;overflow:auto">
    <!-- 地图 -->
    <div class="g-maskbgs"  :class="guanLangValue?'mask-bg':''">
      <v-map-yan  :flowIndex="activeIndex" :leftIndex="activeIndex2" :indexArr="indexArr" @selectMarker="selectMarker" :guanLangValue="guanLangValue"  @getPipeGallery="getPipeGallery" v-show="guanLangValue==0"></v-map-yan>
      <template v-if="guanLangValue==1">
        <!-- 入侵告警 -->
        <div v-for="item in alarmList" :key="item.id" class="gas-point"> 
          <img src="../../static/icon/icon5.png" alt="" :style="{'top':item.lt+'rem','left':item.lg+'rem'}" style="width:.59rem;height:.8rem" @click="activePoint(item,2)">
        </div>
        <div v-for="(item,index) in jiankongList" :key="index" class="gas-point"> 
          <img src="../../static/icon/jiankong.png" alt="" :style="{'top':item.lt+'rem','left':item.lg+'rem'}" style="width:.51rem;height:.51rem" @click="activePoint(item,1)">
        </div>
        <div v-if="pipType==1" :style="{'top':pointTop+'rem','left':pointLeft+'rem'}" style="position:absolute"> 
          <v-invade-monitor @closeDialog="pipType=0"></v-invade-monitor>
        </div> 
        <div v-if="pipType==2" :style="{'top':pointTop+'rem','left':pointLeft+'rem'}" style="position:absolute"> 
          <v-pipe-dange  @closeDailog="pipType=0" title="异常人员入侵告警"></v-pipe-dange>
        </div> 
      </template>
      
      <template v-if="guanLangValue==2">
        <!-- 防拆告警 -->
        <div v-for="item in dismantleList" :key="item.id" class="gas-point"> 
          <img src="../../static/icon/icon13.png" alt="" :style="{'top':item.lt+'rem','left':item.lg+'rem'}" style="width:.59rem;height:.8rem" @click="activePoint(item,3)">
        </div>
        <div v-for="(item,index) in jiankongList" :key="index" class="gas-point"> 
          <img src="../../static/icon/jiankong.png" alt="" :style="{'top':item.lt+'rem','left':item.lg+'rem'}" style="width:.51rem;height:.51rem" @click="activePoint(item,1)">
        </div>
        <div v-if="pipType==1" :style="{'top':pointTop+'rem','left':pointLeft+'rem'}" style="position:absolute"> 
          <v-invade-monitor @closeDialog="pipType=0"></v-invade-monitor>
        </div> 
        <div v-if="pipType==3" :style="{'top':pointTop+'rem','left':pointLeft+'rem'}" style="position:absolute"> 
          <v-pipe-dange  @closeDailog="pipType=0" title="异常拆除告警"></v-pipe-dange>
        </div> 
      </template>

      <template v-if="guanLangValue==3">
        <!-- 气体监测 -->
        <div v-for="item in gasList" :key="item.id" class="gas-point"> 
          <img src="../../static/icon/icon12.png" alt="" :style="{'top':item.lt+'rem','left':item.lg+'rem'}" style="width:.59rem;height:.8rem" @click="activePoint(item,4)">
        </div>
        <div v-for="(item,index) in jiankongList" :key="index" class="gas-point"> 
          <img src="../../static/icon/jiankong.png" alt="" :style="{'top':item.lt+'rem','left':item.lg+'rem'}" style="width:.51rem;height:.51rem" @click="activePoint(item,1)">
        </div>
        <div v-if="pipType==1" :style="{'top':pointTop+'rem','left':pointLeft+'rem'}" style="position:absolute"> 
          <v-invade-monitor @closeDialog="pipType=0"></v-invade-monitor>
        </div> 
        <div v-if="pipType==4" :style="{'top':pointTop+'rem','left':pointLeft+'rem'}" style="position:absolute"> 
          <v-gas-alarm @closeDailog="pipType=0" ></v-gas-alarm>
        </div> 
      </template>

      <template  v-if="guanLangValue==4">
        <!-- 环境监测 -->
        <div v-for="item in environmentList" :key="item.id" class="environment-point"> 
          <img src="../../static/icon/icon11.png" alt="" :style="{'top':item.lt+'rem','left':item.lg+'rem'}" @click="activeEnviroment(item)">
        </div>
        <div v-if="environmentIndex>0" :class='`pos-${environmentIndex}`'> 
          <v-real-time-box class="realBox"></v-real-time-box>
        </div>
      </template>
    </div>
    <!-- position: relative; -->
    <div style="z-index: 10; width: 100%; height: 100%;pointer-events: none;">
      <v-mask />

      <div class="g-title g-zindexs">
        <div class="g-datacenter-item">
          <div>
            <p class="g-names">{{statisticsData.lwTitle}}</p>
            <p class="g-nums">
              <v-countup
                class="g-nums-value"
                tag="span"
                :end-value="statisticsData.num"
                :duration="1"
              ></v-countup>
              <span class="unit">{{statisticsData.unit}}</span>
            </p>
          </div>
        </div>
        <div class="g-datacenter-item">
          <div>
            <p class="g-names">{{statisticsData2.lwTitle}}</p>
            <p class="g-nums">
              <v-countup
                tag="span"
                class="g-nums-value"
                :end-value="statisticsData2.num"
                :duration="1"
              ></v-countup>
              <span class="unit">{{statisticsData2.unit}}</span>
            </p>
          </div>
        </div>
        <div class="g-datacenter-item">
          <div>
            <p class="g-names">{{statisticsData3.lwTitle}}</p>
            <p class="g-nums">
              <v-countup
                tag="span"
                class="g-nums-value"
                :end-value="statisticsData3.num"
                :duration="1"
              ></v-countup>
              <span class="unit">{{statisticsData3.unit}}</span>
            </p>
          </div>
        </div>
        <div class="g-datacenter-item">
          <div>
            <p class="g-names">{{statisticsData4.lwTitle}}</p>
            <p class="g-nums">
              <v-countup
                tag="span"
                class="g-nums-value"
                :end-value="statisticsData4.num"
                :duration="1"
              ></v-countup>
              <span class="unit">{{statisticsData4.unit}}</span>
            </p>
          </div>
        </div>
      </div>

      <div class="flex-box">
        <!-- 左侧-主界面 -->
        <div class="g-town-situation-left" v-if="tabIndex<0">
          <ul>
            <li
              v-for="(item, index) in conditionList"
              :key="index"
              class="company-item"
            >
              <div class="p-l">
                <p class="p-l-t">
                  {{ item.title }}
                </p>
                <v-countup
                  tag="div"
                  class="p-l-v"
                  :end-value="item.value"
                  :duration="1"
                ></v-countup>
                <span class="unit">{{item.unit}}</span>
              </div>
            </li>
          </ul>

          <div class="g-center">
            <h4 class="g-situations-tit week" style="padding: 0.28rem 0.25rem 0.27rem 0.26rem">
              设备运行状况监测
              <div class="week-rt">
                今日统计
                <img src="/static/bounced-img/data/down.png" alt="" />
              </div>
            </h4>
            <div style="height: 2.3rem; width: 4rem;padding-left:.26rem">
              <v-barPiecewise></v-barPiecewise>
              <!-- <v-barFinancingChart></v-barFinancingChart> -->
            </div>
          </div>
        
          <div class="g-center" style="margin-top:.12rem">  
            <h4 class="g-situations-tit" style="padding: 0.28rem 0 0 0.26rem">
              设备告警时间类型统计
            </h4>
            <div class="pieChart">
              <v-pieChart></v-pieChart>
              <!-- <v-trafficradarchart></v-trafficradarchart> -->
            </div>
          </div>
        </div>
        <!-- 左侧导航栏 -->
        <ul class="tab-list"  v-if="tabIndex>=0&&tabIndex!=4">
          <transition-group tag="ul" name="list">
            <li v-for="(item,index) in leftData" :key="item.id" @click="leftNavBtn(index)" :class="activeIndex2==index?'active-btn':'btn'"> 
              {{item.label}}
            </li>
          </transition-group>
          
          <!-- 附近警力配置图例 -->
          <div class="police-box" v-if="tabIndex==2&&(activeIndex2==1)">
            <h4 class="police-title">附近警力配置</h4>
            <ul class="police-list" >
              <li class="police-item" v-for="(item,index) in policeList" :key="index"></li>
              <li class="police-num"><span>7</span>人</li>
            </ul>
          </div>
          <!-- 交通管控图例 -->
          <ul class="traffic-list" v-if="tabIndex==2&&(activeIndex2==0)">
            <li class="traffic-item" v-for="(item,index) in trafficList" :key="index">
              <img :src="item.img" alt="">
              <p>{{item.name}}({{item.num}})</p>
            </li>
          </ul>
          <!-- 疫情管控图例 -->
          <ul class="traffic-list" v-if="isShowValue==3&&tabIndex==0&&(activeIndex2==3)">
            <li class="traffic-item" v-for="(item,index) in controlList" :key="index">
              <img :src="item.img" alt="">
              <p>{{item.name}}({{item.num}})</p>
            </li>
          </ul>
          <!-- 线路筛选图例 -->
          <div v-if="isShowValue==1&&tabIndex==0&&(activeIndex2==0)">
            <ul class="path-list" >
              <li class="path-item" v-for="(item,index) in pathList" :key="index">
                <input type="checkbox" class="path-check" :value="item.id" style="margin-right:.1rem" ref="checkPathItem">
                <p>{{item.name}}</p>
              </li>
              <li class="path-tit">
                线路筛选
              </li>
            </ul>
          </div>
          
        </ul>

        <!-- 六大片区左侧 -->
        <ul class="district-list"  v-if="isShowValue&&tabIndex==4">
          <li v-for="(item,index) in districtsList" :key="index"> 
            <img :src="item.imgUrl" alt="">
            <div>
              <p class="title">{{item.school}}</p>
              <p class="p1">今日异常告警 &nbsp;&nbsp;<span>{{item.num}}项</span></p>
              <p class="p1">当前安防指数 &nbsp;&nbsp;{{item.grade}}</p>
            </div>
            <p>查看详情>></p>
          </li>
        </ul>

        <!--  中间center  -->
        <div class="g-datacenterbox g-zindexs">
          <div v-for="(items,index) in tabs" :key="index" class="tab-bg" :class="tabIndex==index?'active-tab-bg':'tab-bg2'">
            <p  @click="changeTabs(index,items)">{{items.name}}</p>
            <template v-for="(item,index2) in items.checkList">
              <div class="check-box" v-if="isShow&&tabIndex==index"  :key="index2" >
                <input type="checkbox"  :value="item.value" @click="changeTab(item.value,index2,items.checkList)" style="margin-right:.1rem" ref="checkItem">{{item.label}}
              </div>
            </template>
        
          </div>
        </div>

        <!-- 右侧 -->
        <div class="g-town-situation-right">
          <!-- 主界面左上组件 -->
          <v-index-right v-if="tabIndex<0"></v-index-right>
          <!-- 主界面右下组件 -->
          <div class="g-center" style="margin-top:.09rem"  v-if="tabIndex<0">
            <h4 class="g-situations-tit week"  style="padding: 0.28rem 0.27rem 0.1rem 0.26rem">
              人员流量频次分析
              <div style="color:rgba(122, 244, 253, 1);text-decoration:underline;cursor: pointer" @click="isCheck">
                取消选中
              </div>
            </h4>
            <div class="diagram-item" v-for="(item,index) in diagramList" :key="index" @click="activeIndex=index" :class="activeIndex==index?'active-bg':'bg'">
              {{item.name}}
            </div>
          </div>
          

          <!------------- 天空 -------------->
            <!-- 无人机巡航左上组件 -->
            <transition name="slide-left">
              <v-drone-cruise v-if="(isShowValue==1&&tabIndex==0)&&(activeIndex2==0||activeIndex2==1||activeIndex2==2)"></v-drone-cruise>
            </transition>
            <!-- 异常告警 -->
            <transition name="list">
              <v-abnormal-alarm v-if="(isShowValue==1&&tabIndex==0)&&(activeIndex2==3)"></v-abnormal-alarm>
            </transition>


            <!------------- 中空 ------------>
            <!-- 安防监控 -->
            <transition name="slide-left">
              <v-security-monitoring-middle v-if="(isShowValue==2&&tabIndex==0)"></v-security-monitoring-middle>
            </transition>


          <!------------- 地面 ----------->
            <!-- 安防监控 -->
            <transition name="slide-left">
              <v-security-monitoring v-if="(isShowValue==3&&tabIndex==0)&&(activeIndex2==0||activeIndex2==3)"></v-security-monitoring>
            </transition>

            <!-- 智慧人行 -->
            <transition name="slide-left">
              <div class="box-offside" v-if="(isShowValue==3&&tabIndex==0)&&(activeIndex2==1)">
                <v-through-control v-if="throughControlShow" @close="throughControlShow = false"></v-through-control>
              </div>
            </transition>
            
            <!-- 智慧车行 -->
            <transition name="slide-left">
              <div class="box-offside" v-if="(isShowValue==3&&tabIndex==0)&&(activeIndex2==2)">
                <v-vehicle-manage
                  ref="cheliang"
                  :toID="toID"
                  v-if="vehiclePopupShow"
                  @close="vehiclePopupShow = false"
                ></v-vehicle-manage>
              </div>
            </transition>


          <!----------- 地下管廊 ------------>
          <!-- 管廊分布 -->
          <transition name="slide-left">
            <div v-if="isShowValue==4&&tabIndex==0">
              <v-pipe></v-pipe>
              <div v-if="guanLangValue" class="out-gl" @click="guanLangValue=0;$store.state.guanLangValue=0"> 
                退出管廊
              </div>
            </div>  
          </transition>


          <!------------- 水系 ------------->
            <!-- 水系划分 -->
            <transition name="slide-left">
              <v-drainage-divide v-if="(isShowValue==5&&tabIndex==0)"></v-drainage-divide>
            </transition>


          <!------------- 三道防控圈 ------------>
            <!-- 防控圈划分 -->
            <transition name="slide-left">
              <v-prevent-divide v-if="tabIndex==1"></v-prevent-divide>
            </transition>


          <!------------- 三条主控线 ------------>
            <!--交通管控-->
            <transition name="slide-left">
              <v-control-lines v-if="tabIndex==2"></v-control-lines>
            </transition>



          <!------------- 三类控制点 ----------->
            <!-- 一标五识 -->
            <transition name="slide-left">
              <div class="san-lei" v-if="tabIndex==3">
                <v-five-understandings></v-five-understandings>
                <div v-if="guanLangValue" class="out-gl" @click="guanLangValue=0;$store.state.guanLangValue=0"> 退出管廊</div>
              </div>
            </transition>


          <!------------- 六大主要片区 -------------->
            <transition name="slide-left">
              <v-left-side v-if="tabIndex==4"></v-left-side>
            </transition>
        </div>
        
      </div>
    </div>

    <div class="g-absolute">
      <!----------------- 五维防控面 ---------------->

        <!-- 天空-无人机巡航 -->
        <v-real-time-cruise v-if="skyDroneDialog" :hasProblem="true" @closeDailog="closeDailog" :info="info"></v-real-time-cruise>
        <!-- 天空-视频巡检 -->
        <v-patrol-point v-if="skyVideoDialog" @closeDailog="closeDailog" :info="info"></v-patrol-point>
        <!-- 天空-安全生产 -->
        <v-patrol-safe v-if="skySafeDialog" @closeDailog="closeDailog" :info="info"></v-patrol-safe>
        <!-- 天空-异常告警 -->
        <v-warn-point @jiankong="showDialogVideo" v-if="skyAlarmDialog" @closeDailog="closeDailog" :info="info"></v-warn-point>

        <!-- 中空-安防监控-正常 -->
        <v-abnormal-point v-if="midheavenMonitorDialog" @closeDailog="closeDailog" :info="info"></v-abnormal-point>
        <!-- 中空-安防监控-异常 -->
        <v-abnormal-error-point v-if="midheavenMonitorErrorDialog" @closeDailog="closeDailog" :info="info"></v-abnormal-error-point>
        <!-- 中空-移动监测-正常 -->
        <v-abnormal-point v-if="midheavenMobileDialog" @closeDailog="closeDailog" :info="info"></v-abnormal-point>
        <!-- 中空-移动监测-异常 -->
        <v-mobile-error-point v-if="midheavenMobileErrorDialog" @closeDailog="closeDailog" :info="info"></v-mobile-error-point>
        <!-- 中空-入侵检测-正常 -->
        <v-invade-point v-if="midheavenInvadeDialog" @closeDailog="closeDailog" :info="info"></v-invade-point>
        <!-- 中空-入侵检测-异常 -->
        <v-mobile-error-point v-if="midheavenInvadeErrorDialog" @closeDailog="closeDailog" :info="info"></v-mobile-error-point>

        <!-- 地面-安防监测 -->
        <v-jiankong v-if="landSecurityDialog" @closeDailog="closeDailog" :info="info"></v-jiankong>
        <!-- 地面-疫情管控 -->
        <v-g-serve v-if="landEpidemicDialog" @closeDailog="closeDailog" :info="info"></v-g-serve>

        <!-- 地下管廊-管廊分布 -->
        <!-- <v-pipe-rack @closeDailog="closeDailog" :info="info"></v-pipe-rack> -->
        <!-- 地下管廊-入侵告警 -->
        <v-risk-alarm v-if="pipeAlarmDialog" @closeDailog="closeDailog" :info="info" :type="1" @intoPage="intoPage"></v-risk-alarm>
        <!-- 地下管廊-防拆告警 -->
        <v-risk-alarm v-if="pipeTamperDialog" @closeDailog="closeDailog" :info="info"  :type="2" @intoPage="intoPage"></v-risk-alarm>
        <!-- 地下管廊-气体监测 -->
        <v-risk-alarm v-if="pipeGasDialog" @closeDailog="closeDailog" :info="info"  :type="3" @intoPage="intoPage"></v-risk-alarm>
        <!-- 地下管廊-环境监测 -->
        <v-risk-alarm v-if="pipeEnvironmentDialog" @closeDailog="closeDailog" :info="info"  :type="4" @intoPage="intoPage"></v-risk-alarm>

        <!-- 水系-水系划分 -->
        <v-current-water v-if="waterDivideDialog" @closeDailog="closeDailog" :info="info"></v-current-water>
        <!-- 水系-无人机巡航 -->
        <v-real-time-cruise v-if="waterCruiseDialog" :hasProblem="true" @closeDailog="closeDailog" :info="info"></v-real-time-cruise>
        <!-- 水系-违规捕获 -->
        <v-illegal-capture v-if="waterCaptureDialog" @closeDailog="closeDailog" :info="info"></v-illegal-capture>


      <!----------------- 三道防控圈 ---------------->

      <!-- 无人机巡航 -->
      <v-real-time-cruise v-if="preventCruiseDialog" :hasProblem="true" @closeDailog="closeDailog" :info="info"></v-real-time-cruise>
      <!-- 视频巡检 -->
      <v-patrol-point v-if="preventVideoDialog" @closeDailog="closeDailog" :info="info"></v-patrol-point>
      <!-- 异常告警 -->
      <v-warn-point @jiankong="showDialogVideo" v-if="preventAbnormalDialog" @closeDailog="closeDailog" :info="info"></v-warn-point>

      <!----------------- 三条主控线 ---------------->

      <!-- 无人机巡航 -->
      <v-real-time-cruise v-if="masterCruiseDialog" :hasProblem="true" @closeDailog="closeDailog" :info="info"></v-real-time-cruise>
      <!-- 视频巡检 -->
      <v-patrol-point v-if="masterVideoDialog" @closeDailog="closeDailog" :info="info"></v-patrol-point>
      <!-- 异常告警 -->
      <v-warn-point @jiankong="showDialogVideo" v-if="masterAbnormalDialog" @closeDailog="closeDailog" :info="info"></v-warn-point>

      <!----------------- 三类控制点 ---------------->

      <!-- 九小场所 -->
      <v-company-detail v-if="controlSiteDialog" @closeDailog="closeDailog" :info="info"></v-company-detail>
      <!-- 智慧服务 -->
      <v-police-dialog v-if="controlserveDialog" :activeService="activeService" @closeDailog="closeDailog" :info="info"></v-police-dialog>
      <!-- <v-patrol-point v-if="masterVideoDialog" @closeDailog="closeDailog" :info="info"></v-patrol-point> -->
      <!-- 异常告警 -->
      <!-- <v-warn-point @jiankong="showDialogVideo" v-if="masterAbnormalDialog" @closeDailog="closeDailog" :info="info"></v-warn-point> -->

      
      <!-- <v-jiankong v-if="$store.state.isShowjk"></v-jiankong> -->
      <!-- 安防监控--弹窗 -->
      <!-- <v-jiankong></v-jiankong> -->

      <!-- 智慧警务--弹窗 -->
      <!-- <v-police-dialog v-if="activeServiceDialog" :activeService="activeService" :closedialog="closedialog"></v-police-dialog> -->

      <!-- 水系划分 当前水系--弹窗 -->
      <!-- <v-current-water></v-current-water> -->

      <!-- 九小场所 企业详情--弹窗 -->
      <!-- <v-company-detail></v-company-detail> -->

      <!-- 视频巡检 无人机实时巡航--弹窗 -->
      <!-- <v-real-time-cruise></v-real-time-cruise> -->

      <!-- 无人机巡航 巡检画面--弹窗 -->
      <!-- <v-patrol-point></v-patrol-point> -->

      <!-- 违规捕获--弹窗 -->
      <!-- <v-illegal-capture></v-illegal-capture> -->

      <!-- 环境监测--弹窗 -->
      <!-- <v-real-time-box class="realBox"></v-real-time-box> -->

      <!-- 气体监测 易燃气体告警--弹窗 -->
      <!-- <v-gas-alarm></v-gas-alarm> -->

      <!-- 气体监测 监测设备--弹窗 -->
      <!-- <v-gas-monitor></v-gas-monitor> -->

      <!-- 防拆告警 入侵告警--弹窗 -->
      <!-- <v-risk-alarm></v-risk-alarm> -->

      <!-- 入侵告警 监测设备--弹窗 -->
      <!-- <v-invade-monitor></v-invade-monitor> -->

      <!-- 入侵告警 地下管廊段--弹窗 -->
      <v-pipe-rack v-if="pipeGalleryDialog"  :type=1 @intoPage="intoPage"></v-pipe-rack>

      <!-- 疫情管控 服务机构--弹窗 -->
      <!-- <v-g-serve></v-g-serve> -->

      <!-- 移动监测 监控点位名称 异常点位 正常点位--弹窗 -->
      <!-- <v-abnormal-point></v-abnormal-point> -->

      <!-- 异常告警 异常告警--弹窗 -->
      <!-- <v-warn-point @jiankong="showDialogVideo"></v-warn-point> -->


      <!-- 调取监控 -->
      <v-safeDialog v-if="$store.state.saceShow" @close="$store.state.saceShow = false"></v-safeDialog>
      
    </div>
  </div>
</template>

<script>
import indexRight from '../components/lanwan/index-right'

import rqgjRightTop from '../components/lanwan/rqgj-right-top.vue'
import yqgkRightTop from '../components/lanwan/yqgk-right-top.vue'
import qtjcRightTop from '../components/lanwan/qtjc-right-top.vue'
import MonitoringEquipment from '../components/lanwan/monitoring-equipment.vue'
import latestInvasion from '../components/lanwan/latest-invasion.vue'

import fiveUnderstandings from '../components/lanwan/five-understandings.vue'
import leftSide from '../components/lanwan/left-side.vue'
import controlLines from '../components/三条主控线/control-lines.vue'
export default {
  data() {
    return {
      map: '',
      inDate:[472, 425, 491, 416, 457, 462, 486],
      outDate:    [124, 192, 153, 142, 105, 172, 135] ,
      isInPut: 1,
      conditionList: [
        {
          title: "总发现隐患",
          value: "2641",
          unit: "处"
        },
        {
          title: "整改率",
          value: "100",
          unit: "%"
        },
        {
          title: "总接入设备",
          value: "327",
          unit: "个"
        },
        {
          title: "设备在线率",
          value: "87",
          unit: "%"
        },
      ],
      tabs: [
        {
          name: '五维防控面',
          checkList: [
            {
              label: '天空',
              value: 1
            },
            {
              label: '中空',
              value: 2
            },
            {
              label: '地面',
              value: 3
            },
            {
              label: '地下管廊',
              value: 4
            },
            {
              label: '海域',
              value: 5
            }
          ]
        },
         {
          name: '三道防控圈',
          checkList: [
            {
              label: '环高新区',
              value: 1
            },
            {
              label: '环核心区',
              value: 2
            },
            {
              label: '环中心区',
              value: 3
            }
          ]
        },
         {
          name: '三条主控线',
          checkList: [
            {
              label: '要人警卫',
              value: 1
            },
            {
              label: '出入通道',
              value: 2
            },
            {
              label: '交通站点',
              value: 3
            }
          ]
        },
         {
          name: '三类控制点',
          checkList: [
            {
              label: '重点单位',
              value: 1
            },
            {
              label: '重点部位',
              value: 2
            },
            {
              label: '重点场所',
              value: 3
            }
          ]
        },
         {
          name: '六大主要片区'
        }

      ],
      activeIndex: -1,
      diagramList: [
        {
          name: '区域人流热力图'
        },
        {
          name: '区域能耗热力图'
        },
        {
          name: '区域车流热力图'
        }
      ],
      isShow: false,
      tabIndex: -1,  //中间按钮索引(五维防控面、三道防控圈...)
      checkName: '',
      imgList: [
        {
          imgUrl: "../../static/lanwan/guanjian-1.jpg",
        },
        {
          imgUrl: "../../static/lanwan/video-img22.jpg",
        },
        {
          imgUrl: "../../static/lanwan/video-img33.jpg",
        },
        {
          imgUrl: "../../static/lanwan/video-img22.jpg",
        },
      ],
      isShowValue: "",  //中间按钮每个checkbox的值
      leftData: [],
      skyList: [
        {
          label: '无人机巡航',
          id: 1
        },
        {
          label: '视频巡检',
          id: 2
        },
        {
          label: '安全生产',
          id: 3
        },
        {
          label: '异常告警',
          id: 4
        }
      ],
      groundList: [
        {
          label: '安防监控',
          id: 1
        },
        {
          label: '智慧人行',
          id: 2
        },
        {
          label: '智慧车型',
          id: 3
        },
        {
          label: '疫情管控',
          id: 4
        }
      ],
      HollowList: [
        {
          label: '安防监控',
          id: 1
        },
        {
          label: '移动检测',
          id: 2
        },
        {
          label: '入侵检测',
          id: 3
        }
      ],
      groundList: [
        {
          label: '安防监控',
          id: 1
        },
        {
          label: '智慧人行',
          id: 2
        },
        {
          label: '智慧车行',
          id: 3
        },
        {
          label: '疫情管控',
          id: 4
        }
      ],
      undergroundList: [
        {
          label: '管廊分布',
          id: 1
        },
        {
          label: '入侵告警',
          id: 2
        },
        {
          label: '防拆告警',
          id: 3
        },
        {
          label: '气体监测',
          id: 4
        },
        {
          label: '环境监测',
          id: 5
        }
      ],
      riverSystemList: [
        {
          label: '水系划分',
          id: 1
        },
        {
          label: '无人机巡航',
          id: 2
        },
        {
          label: '违规捕获',
          id: 3
        }
      ],
      controlCircleslist: [
        {
          label: '防控圈划分',
          id: 1
        },
         {
          label: '无人机巡航',
          id: 2
        },
        {
          label: '视频巡检',
          id: 3
        },
        {
          label: '异常告警',
          id: 4
        }
      ],
      mainControlLine: [
        {
          label: '交通管控',
          id: 1
        },
        {
          label: '无人机巡航',
          id: 2
        },
        {
          label: '视频巡检',
          id: 3
        },
        {
          label: '异常告警',
          id: 4
        }
      ],
      controlpoints: [
        {
          label: '一标五实',
          id: 1
        },
        {
          label: '九小场所',
          id: 2
        },
        {
          label: '智慧服务',
          id: 3
        },
        {
          label: '地下管廊',
          id: 4
        }
      ],
      activeIndex2: 0,
      toID: 0,
      vehiclePopupShow: false,
      throughControlShow: false,
      districtsList: [
        {
          imgUrl: '../../static/lanwan/phenomenon-img.png',
          school: '青岛第二中学',
          num: 1,
          grade: 9.3
        },
        {
          imgUrl: '../../static/lanwan/phenomenon-img.png',
          school: '青岛第二中学',
          num: 1,
          grade: 9.3
        },
        {
          imgUrl: '../../static/lanwan/phenomenon-img.png',
          school: '青岛第二中学',
          num: 1,
          grade: 9.3
        },
        {
          imgUrl: '../../static/lanwan/phenomenon-img.png',
          school: '青岛第二中学',
          num: 1,
          grade: 9.3
        },
        {
          imgUrl: '../../static/lanwan/phenomenon-img.png',
          school: '青岛第二中学',
          num: 1,
          grade: 9.3
        },
        {
          imgUrl: '../../static/lanwan/phenomenon-img.png',
          school: '青岛第二中学',
          num: 1,
          grade: 9.3
        }
      ],
      pointShow: false,
      activeService: {
        imgUrl: "static/lanwan/seviceIcon7.png",
        imgShowArr: [
          "static/lanwan/video-img.jpg",
          "static/lanwan/video-img2.jpg",
          "static/lanwan/video-img3.jpg",
        ],
        name: "警务站",
        // subTitle: "合作律所共<i style=color:white>8</i>家",
        labelArr: [
          {
            message: "当前警力配置： 12人",
          },
          {
            message: "联系人：马新国",
          },
          {
            message: "案件电子集采：55件",
          },
          {
            message: "本周新增案件：21件",
          },
          {
            message: "已出警：3人",
          },
          {
            message: "联系方式：16267849212",
          },
          {
            message: "案件入柜管理：67件",
          },
          {
            message: "本周笔录总数：25份",
          }
        ],
        info: "高新区智慧警务站选址蓝湾智谷3号楼1楼北侧，已完成内部基础装修，配置显示大屏、警务办公桌、便民服务终端、空调等设备，具备基层警务工作条件。大屏端的自主可控智慧安防园区指挥中心用于多个产业园区安防集中管理和预警处理。警务便民服务终端可满足园区从业人员身份证、驾驶证等自助式办理。",
      },
      activeServiceDialog:false,
      saceShow: false,
      trafficList:[
        {
          img:"static/lanwan/train.png",
          name:"火车站",
          num:4
        },
        {
          img:"static/lanwan/high-speed.png",
          name:"高速出入口",
          num:3
        },
        {
          img:"static/lanwan/wharf.png",
          name:"码头",
          num:1
        },
      ],
      controlList:[
        {
          img:"static/lanwan/hotel.png",
          name:"定点酒店",
          num:2
        },
        {
          img:"static/lanwan/transportation.png",
          name:"交通枢纽",
          num:4
        },
        {
          img:"static/lanwan/clinc.png",
          name:"发热门诊",
          num:3
        },
        {
          img:"static/lanwan/medical.png",
          name:"医疗机构",
          num:1
        },
      ],
      pathList:[
        {
          name:"线路1",
          id:1,
        },
        {
          name:"线路2",
          id:2,
        },
        {
          name:"线路3",
          id:3,
        },
        {
          name:"线路4",
          id:4,
        },
      ],
      indexArr: [0,1,2],
      policeList:[1,2,3,4,5,6,7,8,9,10,11],

      skyDroneDialog: false,
      skyVideoDialog: false,
      skySafeDialog: false,
      skyAlarmDialog: false,
      midheavenMonitorDialog: false,
      midheavenMonitorErrorDialog: false,
      midheavenMobileDialog: false,
      midheavenMobileErrorDialog: false,
      midheavenInvadeDialog: false,
      midheavenInvadeErrorDialog: false,
      landSecurityDialog: false,
      landEpidemicDialog: false,
      pipeAlarmDialog: false,
      pipeTamperDialog: false,
      pipeGasDialog: false,
      pipeEnvironmentDialog: false,
      waterDivideDialog: false,
      waterCruiseDialog: false,
      waterCaptureDialog: false,
      preventCruiseDialog: false,
      preventVideoDialog: false,
      preventAbnormalDialog: false,
      masterCruiseDialog: false,
      masterVideoDialog: false,
      masterAbnormalDialog: false,
      controlSiteDialog: false,
      controlserveDialog: false,
      info:{},
      gasList: [
       {
          lt: '6.86',
          lg: '3.07',
          id: 1
        }
      ],
      dismantleList: [
        {
          lt: '3.1',
          lg: '3.27',
          id: 1
        }
      ],
      alarmList: [
        {
          lt: '4.47',
          lg: '8.31',
          id: 1
        }
      ],
      jiankongList: [
        {
          lt: '4.28',
          lg: '2.51',
          id: 1
        }
      ],
      environmentList: [
        {
          lt: '4.96',
          lg: '3.58',
          id: 1
        },
        {
          lt: '3.65',
          lg: '8.36',
          id: 2
        },
        {
          lt: '8.21',
          lg: '10.5',
          id: 3
        }
      ],
      guanLangValue: 0,
      pipeGalleryDialog: false,
      environmentIndex: 0,
      pipType: 0,
      pointTop: 0,
      pointLeft: 0,
      statisticsData: {
        lwTitle: '今日巡航',
        num: 21,
        unit: '次'
      },
      statisticsData2: {
        lwTitle: '今日巡检',
        num: 21,
        unit: '次'
      },
      statisticsData3: {
        lwTitle: '生产督察',
        num: 21,
        unit: '次'
      },
      statisticsData4: {
        lwTitle: '今日告警',
        num: 21,
        unit: '次'
      }
    };
  },
  mounted() {
  },
  methods: {
    changeTab(val,index,list){
      this[this.info.dialog]?this[this.info.dialog]=false:"";//关闭打开的弹窗

      this.guanLangValue = 0;

      if(this.tabIndex==0){
        this.activeIndex2 = 0;
      }

      if(this.tabIndex==0){
        this.$refs.checkItem.forEach((item,index2)=>{
          if(index2!=index){
            item.checked = false;
          }
        })
      /*   let isShow = this.$refs.checkItem.every(item=>{
          return item.checked == false;
        }) */
        
     /*    if(isShow){
          this.isShowValue = '';
        }else { */
          this.isShowValue = val;
        // }

      }else {

        this.indexArr = []
        this.$refs.checkItem && this.$refs.checkItem.forEach((item,index)=>{
          if(item.checked==true){
            this.indexArr.push(index)
          }
        })


        let isShow = this.$refs.checkItem.every(item=>{
          return item.checked == false;
        })

        if(isShow){
          this.isShowValue = '';
        } 
      }
      this.$store.state.isShowValue = this.isShowValue;

     
      //五维防控面
      if(this.tabIndex==0){
        if(val==1){
          this.leftData = this.skyList  //天空
          this.statisticsData =  {
            lwTitle: '今日巡航',
            num: 21,
            unit: '次'
          },
          this.statisticsData2 =  {
            lwTitle: '今日巡检',
            num: 21,
            unit: '次'
          },
          this.statisticsData3 =  {
            lwTitle: '生产督察',
            num: 21,
            unit: '次'
          },
          this.statisticsData4 =  {
            lwTitle: '今日告警',
            num: 21,
            unit: '次'
          }
        }else if(val==2){
          this.leftData = this.HollowList  //中空
          this.statisticsData =  {
            lwTitle: '定点鹰眼',
            num: 21,
            unit: '台'
          },
          this.statisticsData2 =  {
            lwTitle: '入侵检测',
            num: 21,
            unit: '次'
          },
          this.statisticsData3 =  {
            lwTitle: '今日处理',
            num: 21,
            unit: '次'
          },
          this.statisticsData4 =  {
            lwTitle: '今日告警',
            num: 21,
            unit: '次'
          }
        }else if(val==3){
          this.leftData = this.groundList  //地面
          this.statisticsData =  {
            lwTitle: '今日人流',
            num: 3800,
            unit: '人'
          },
          this.statisticsData2 =  {
            lwTitle: '今日车流',
            num: 1917,
            unit: '辆'
          },
          this.statisticsData3 =  {
            lwTitle: '异常人员',
            num: 1917,
            unit: '人'
          },
          this.statisticsData4 =  {
            lwTitle: '今日告警',
            num: 3,
            unit: '次'
          }
        }else if(val==4){
          this.leftData = this.undergroundList  //地下管廊
          this.statisticsData =  {
            lwTitle: '人员入侵',
            num: 3800,
            unit: '次'
          },
          this.statisticsData2 =  {
            lwTitle: '今日巡检',
            num: 1917,
            unit: '次'
          },
          this.statisticsData3 =  {
            lwTitle: '处理预警',
            num: 1917,
            unit: '次'
          },
          this.statisticsData4 =  {
            lwTitle: '今日告警',
            num: 3,
            unit: '次'
          }
        }else if(val==5){
          this.leftData = this.riverSystemList  //水系
           this.statisticsData =  {
            lwTitle: '捕获船只',
            num: 3800,
            unit: '艘'
          },
          this.statisticsData2 =  {
            lwTitle: '巡检时长',
            num: 1917,
            unit: '小时'
          },
          this.statisticsData3 =  {
            lwTitle: '巡河里程',
            num: 1917,
            unit: '千米'
          },
          this.statisticsData4 =  {
            lwTitle: '今日整改',
            num: 3,
            unit: '次'
          }
        }
      }

      this.$store.state.isShowjk = false
     
    },
    changeTabs(index,item){
      this[this.info.dialog]?this[this.info.dialog]=false:"";//关闭打开的弹窗
      this.activeIndex = -1  //人员流量频次分析

      this.isShow=true;
      this.activeIndex2 = 0;
      this.guanLangValue = 0;
      if(index!=this.tabIndex){
        this.tabIndex=index;
        this.$store.state.activeIndex = this.tabIndex;
        this.isShowValue = 1;
      }else {
        this.tabIndex=-1;
        this.isShowValue= '';
        this.$store.state.activeIndex = -1
        return
      }

      this.indexArr = [0,1,2];

      if(index==0){
        this.leftData = this.skyList  //天空
        this.$store.state.isShowValue = 1
        this.statisticsData =  {
          lwTitle: '今日巡航',
          num: 21,
          unit: '次'
        },
        this.statisticsData2 =  {
          lwTitle: '今日巡检',
          num: 21,
          unit: '次'
        },
        this.statisticsData3 =  {
          lwTitle: '生产督察',
          num: 21,
          unit: '次'
        },
        this.statisticsData4 =  {
          lwTitle: '今日告警',
          num: 21,
          unit: '次'
        }
      }else if(index==1){
        //三道防控圈
        this.leftData = this.controlCircleslist  
        this.statisticsData =  {
          lwTitle: '今日巡航',
          num: 21,
          unit: '次'
        },
        this.statisticsData2 =  {
          lwTitle: '今日巡检',
          num: 21,
          unit: '次'
        },
        this.statisticsData3 =  {
          lwTitle: '待处理隐患',
          num: 21,
          unit: '次'
        },
        this.statisticsData4 =  {
          lwTitle: '今日告警',
          num: 21,
          unit: '次'
        }
      }else if(index==2){
        //三条主控线
        this.leftData = this.mainControlLine
      }else if(index==3){
        //三类控制点
        this.leftData = this.controlpoints
        this.statisticsData =  {
          lwTitle: '新增人口',
          num: 3800,
          unit: '次'
        },
        this.statisticsData2 =  {
          lwTitle: '整改隐患',
          num: 1917,
          unit: '次'
        },
        this.statisticsData3 =  {
          lwTitle: '今日出警',
          num: 1917,
          unit: '次'
        },
        this.statisticsData4 =  {
          lwTitle: '今日告警',
          num: 3,
          unit: '次'
        }
      }else {
        this.statisticsData =  {
            lwTitle: '今日人流',
            num: 21,
            unit: '次'
          },
          this.statisticsData2 =  {
            lwTitle: '今日车流',
            num: 21,
            unit: '次'
          },
          this.statisticsData3 =  {
            lwTitle: '今日能耗',
            num: 21,
            unit: '次'
          },
          this.statisticsData4 =  {
            lwTitle: '今日告警',
            num: 21,
            unit: '次'
          }
      }
      
      if(index==0){
        this.$nextTick(()=>{
          this.$refs.checkItem[0].checked = true;
        })
      }else {
        this.$nextTick(()=>{
          this.$refs.checkItem && this.$refs.checkItem.forEach((item,index)=>{
            item.checked = true;
          })
        })
      }
    },
    leftNavBtn(index){
      this[this.info.dialog]?this[this.info.dialog]=false:"";//关闭打开的弹窗
      
      this.activeIndex2=index;
      this.guanLangValue = 0;

      switch (this.activeIndex2){
        case 1:
          if(this.isShowValue==3&&this.tabIndex==0){
            this.throughControlShow = true;//智慧人行
          }
          break;
        case 2:
          if(this.isShowValue==3&&this.tabIndex==0){
            this.vehiclePopupShow = true;//智慧车行
          }
          break;
        default:
          break;
      }
    },
    closedialog(){
      this.activeServiceDialog = false;
    },
    isCheck(){
      this.activeIndex = -1
    },
    getOrOpenUrl(local, isOpen) {
      let cameraIndexCode = "";
      console.log(this.$store.state.videoList,999)
      this.$store.state.videoList.forEach((item) => {
        if (local == item.cameraName) {
          cameraIndexCode = item.cameraIndexCode;
        }
      });
      if (isOpen) {
        this.$store.state.activeCameraIndexCode = cameraIndexCode;
        this.saceShow = true;
      }else{
          return cameraIndexCode;
      }
    },
    showDialogVideo(localName) {
      this.getOrOpenUrl(localName,1)
    },
    selectMarker(msg) {
      if((this.info.id==msg.id)&&(this.info.dialog==msg.dialog)){
        this[msg.dialog] = !this[msg.dialog];//打开关闭对应弹窗
      }else{
        this[msg.dialog] = true;//打开对应弹窗
      }
      
      this.info = msg;
    },
    closeDailog(msg) {
      this[msg.dialog] = false;//关闭对应弹窗
    },
    intoPage(val){
      console.log(val,888)
      this.guanLangValue = val
    },
    getPipeGallery(){
      this.pipeGalleryDialog = !this.pipeGalleryDialog;
    },
    activeEnviroment(item){
      if(this.environmentIndex==item.id){
        this.environmentIndex = 0
      }else {
        this.environmentIndex=item.id
      }
    },
    activePoint(val,type){
      if( this.pipType == type){
        this.pipType = 0
      }else {
        this.pipType = type;
        this.pointLeft = Number(val.lg)+0.3;
        this.pointTop = Number(val.lt)+0.3;
      }
    }
  },
  watch: {
    '$store.state.guanLangValue': {
      handler(){
         this.guanLangValue = this.$store.state.guanLangValue;
      }
    }
  },
  components:{
    'v-index-right': indexRight,
    'v-rqgj-right-top': rqgjRightTop,
    'v-yqgk-right-top': yqgkRightTop,
    'v-qtjc-right-top': qtjcRightTop,
    'v-monitoring-equipment': MonitoringEquipment,
    'v-latest-invasion': latestInvasion,
    'v-five-understandings': fiveUnderstandings,
    'v-left-side': leftSide,
    'v-control-lines': controlLines
  }
};
</script>

<style lang="scss">
@import "../assets/css/mixin";
.g-maskbgs {
  // pointer-events: none;
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .gas-point {
    img {
      position: absolute;
    }
  }
  .environment-point {
    img {
      width:.59rem;
      height:.71rem;
      position: absolute;
      cursor: pointer;
      // position: relative;
    }
    .realBox {
      width: 4rem;
      height: 3.6rem;
    }
  }
}

.pos-1 {
  position: absolute;
  left: 9.7%;
  top: 51.5%;
  .realBox {
    background: url("../../static/lanwan/pointing-img.png");
    transform: rotate(180deg);
    padding: 0 .2rem;
    .pop-contain {
      transform: rotate(180deg);
    }
  }
}

.pos-2 {
  position: absolute;
  left: 35%;
  top: 40%;
  .realBox {
    background: url("../../static/lanwan/pointing-img.png");
    transform: rotate(180deg);
    padding: 0 .2rem;
    .pop-contain {
      transform: rotate(180deg);
    }
  }
}

.pos-3 {
  position: absolute;
  left: 46%;
  top: 40%;
  .realBox {
    background: url("../../static/lanwan/pointing-img.png");
    padding: .2rem;
  }
}

.mask-bg {
  @include bis('../../static/lanwan/guanlang-bg.png')
}

.g-absolute {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;//可操作地图
}

.f-table1 {
  flex: 1;
  width: 100%;
  overflow: hidden;
  margin-top: 0rem;

  .has-gutter {
    th {
     display: none;
    }
  }

  tbody {
    &>tr:nth-child(odd){
      background: rgba(122, 244, 253, .15);
    }
    &>tr>td:nth-child(2){
      .cell {
        color: rgba(122, 244, 253, 1)
      }
    }
  }
}

.f-table2 {
  flex: 1;
  width: 100%;
  overflow: hidden;

  .has-gutter {
    th {
      background: rgba(122, 244, 253, .15);
     .cell {
        color: rgba(122, 244, 253, 1)
      }
    }
  }
  

tbody {
    &>tr:nth-child(even){
      background: rgba(122, 244, 253, .15);
    }
    td  {
      .cell {
        color: rgba(255, 255, 255, .8);
        p {
          font-size: .12rem;
          color: #fff;
        }
      }
    }
  } 
}


  .check-box {
    text-align: left;
    padding: 0 .1rem;
    @include bis('../../static/lanwan/check-box.png');
    width: 100%;
    height: .53rem;
    z-index: 99;
   /*  input {
      background: #08182B;
      border: 1px solid #7AF4FD;
    } */
    input[type=checkbox]{//选择框样式
     cursor: pointer;
     position: relative;
     width: 15px;
     height: 15px;
     font-size: 14px;
    }

    input[type=checkbox]::after{
        position: absolute;
        top: 0;
        background-color: #08182B;
        color: #7AF4FD;
        width: 15px;
        height: 15px;
        display: inline-block;
        visibility: visible;
        text-align: center;
        border: 1px solid #7AF4FD;
        border-radius: .05rem;
        content: ' ';
    }
            
    input[type=checkbox]:checked::after{
        content: "✓";
        font-size: 12px;
        font-weight: bold;
    }

    color: #7AF4FD;
  }
</style>


<style scoped lang="scss">
@import "../assets/css/mixin";


.g-title {
  display: flex;
  align-items: center;
  padding: .89rem 3.1rem .32rem 3.7rem;
  // background: linear-gradient(180deg, #04111F 0%, rgba(4, 17, 31, 0) 100%);
  .g-datacenter-item {
    position: relative;
    display: flex;
    align-items: center;
    margin-right: 2rem;
    &:last-child {
      margin-right: 0;
    }
    img {
      display: block;
      width: 0.45rem;
      height: 0.45rem;
      margin-right: 0.18rem;
    }
    .g-nums {
      font-size: 0.36rem;
      font-family: RTWS ShangGothic G0v1;
      font-weight: bold;
      color: #ffffff;
      .g-nums-value {
        color: white;
        font-size: 0.36rem;
        font-family: RTWS ShangGothic G0v1;
        font-weight: bold;
      }
      .unit {
        width: 0.18rem;
        height: 0.18rem;
        font-size: 0.18rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
        opacity: 0.4;
        margin-left: 0.05rem;
      }
    }
    .g-names {
      width: 1.67rem;
      height: 0.24rem;
      @include bis("/static/bounced-img/top-center-bg.png");
      font-size: 0.16rem;
      font-family: PingFang SC;
      font-weight: bold;
      color: rgba(122, 244, 253, 1);
      margin-bottom: 0.13rem;
      padding: 0 0.2rem;
    }
  }
}

.pieChart {
  width: 4.5rem;
  height: 2.64rem;
}

.g-datacenterbox {
  flex: 1;
  display: flex;
  justify-content: space-between;
  padding: 0 .92rem;
  z-index: 99;
  .tab-bg {
    width: 1.3rem;
    height: .5rem;
    text-align: center;
    line-height: .5rem;
    cursor: pointer;
    pointer-events: auto;
    p {
      color: rgba(255,255,255,.8);
      font-family: RTWS ShangGothic G0v1;
      font-weight: bold;
    }
  }
  .active-tab-bg {
    @include bis('../../static/lanwan/tab-active-bg.png');
  }
  .tab-bg2 {
    @include bis('../../static/lanwan/tab-bg.png');
  }
  
}


.g-town-situation-left {
  top: 0.6rem;
  height: 9.26rem;
  width: 4.59rem;
  margin-left: .17rem;
  z-index: 99;
  pointer-events: auto;
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .company-item {
      display: flex;
      align-items: center;
      width: 2.2rem;
      height: .8rem;
      @include bis('../../static/lanwan/company-item-bg.png');
      padding: .14rem .21rem;
      margin-bottom: .3rem;
      .p-l {
        .p-l-t {
          font-size: 0.18rem;
          font-family: PingFang SC;
          font-weight: bold;
          color: #7af4fd;
        }
        .p-l-v {
          font-size: 0.24rem;
          font-family: AliHYAiHei;
          font-weight: bold;
          color: #ffffff;
          display: inline-block;
        }
        .unit {
          font-size: 0.16rem;
          font-family: PingFang SC;
          font-weight: bold;
          color: rgba(255,255,255,.4);
        }
      }
    }
  }
}

.g-center {
  @include bis('../../static/lanwan/operation-bg.png');
  width: 4.59rem;
  height: 3.08rem;
}

.g-town-situation-right {
  height: 9.26rem;
  width: 5rem;
  margin-right: .17rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  z-index: 99;
  pointer-events: auto;

  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }

  .company-item:nth-child(1),
  .company-item:nth-child(2),
  .company-item:nth-child(3) {
    margin: 0 0 0.32rem 0;
  }
  .company-item:nth-child(1),
  .company-item:nth-child(4) {
    width: 0.76rem;
    margin-right: 0.39rem;
  }
  .company-item:nth-child(2),
  .company-item:nth-child(5) {
    width: 1.16rem;
    margin-right: 0.33rem;
  }
  .company-item:nth-child(3n) {
    margin-right: 0;
  }

  .g-nums {
    width: 0.52rem;
    height: 0.22rem;
    font-size: 0.24rem;
    font-family: AliHYAiHei;
    font-weight: bold;
    color: #ffffff;
    display: flex;
    align-items: center;
    .g-unms-svalue {
      font-size: 0.24rem;
      font-family: AliHYAiHei;
      font-weight: bold;
      color: #ffffff;
      font-style: italic;
    }
    .unit {
      width: 0.18rem;
      height: 0.18rem;
      font-size: 0.18rem;
      font-family: PingFang SC;
      font-weight: bold;
      color: #ffffff;
      opacity: 0.4;
      margin-left: 0.05rem;
    }
  }
  .g-names {
    font-size: 0.18rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: #7af4fd;
    margin-bottom: 0.11rem;
  }

  .diagram-item {
    width: 4.34rem;
    height: .84rem;
    font-size: 0.2rem;
    font-family: RTWS ShangGothic G0v1;
    font-weight: bold;
    color: #FFFFFF;
    text-align: center;
    line-height: .84rem;
    margin-left: .15rem;
    cursor: pointer;
  }

  .active-bg {
    @include bis('../../static/lanwan/diagram-active.png');
  }
  .bg {
    @include bis('../../static/lanwan/diagram.png');
  }
}

.tab-list {
  width: 4.59rem;
  height: 100%;
  z-index: 99;
  .active-btn {
    @include bis('../../static/lanwan/active-btn.png');
    width: 2.2rem;
    height: .56rem;
    line-height: .56rem;
    padding-left: .42rem;
    font-size: 0.24rem;
    font-family: PingFang SC;
    color: #FFFFFF;
    margin-bottom: .3rem;
    cursor: pointer;
  pointer-events: auto;

  }
  .btn {
    @include bis('../../static/lanwan/btn.png');
    width: 1.8rem;
    height: .48rem;
    line-height: .48rem;
    padding-left: .32rem;
    font-size: 0.2rem;
    font-family: PingFang SC;
    color: rgba(73, 215, 255, .8);
    margin-bottom: .71rem;
    cursor: pointer;
  pointer-events: auto;

  }
}

.list-enter-active,
.list-leave-active {
  transition: all .5s;
}

.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(30px);
}
.list-move {
  transition: transform .5s;
}

.list-leave-active {
  position: absolute;
}

.slide-left-enter-active {
  animation: slide-in-left 1s;
}

.slide-left-leave-active {
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
    opacity: 1;
  }

  50% {
    z-index: 190;
    transform: scale(0.6);
  }

  100% {
    z-index: 190;
    opacity: 0;
    transform: scale(0.6) translateX(-200%);
  }
}

.box-offside {
  width:100%;
  display:flex;
  flex-direction: column;
  align-items: flex-end;
}

.box-headline {
  padding:.18rem 0 0 .26rem;
  font-size: .18rem;
  font-family: RTWS ShangGothic G0v1;
  font-weight: 400;
  color: #FEFEFE;
}

.test-statistics {
  position: relative;
  margin-top: .14rem; 
  width: 4.59rem;
  height: 2.83rem;
  background: url("../../static/lanwan/monitor-statistics.png") no-repeat;
  background-size: 100% 100%;

  .month-box {
    position: absolute;
    right: .16rem;
    top: .1rem;
    width: .78rem;
    height: .35rem;
    background: url("../../static/lanwan/month-img.png") no-repeat;
    background-size: 100% 100%;

    .month-sel {
      height:100%;
      font-size: .18REM;
      font-family: RTWS ShangGothic G0v1;
      font-weight: 400;
      color: #FEFEFE;
      line-height: .35rem;
      text-align: center;
    }
  }

  .statistics-chart {
    width: 100%;
    height: 2.47rem;
  }
}

.water-quality {
  margin-top: .14rem; 
  width: 4.59rem;
  height: 2.88rem;
  background: url("../../static/lanwan/monitor-picture.png") no-repeat;
  background-size: 100% 100%;

  .water-box {
    padding: 0 .25rem;
    margin-bottom: .18rem;
    justify-content: flex-start;
    align-items: center;
    P {
      font-size: .16rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: #FEFEFE;
    }
    .water-line-chart {
      width: 3.48rem;
      height: .6rem;
    }

    &:nth-of-type(1) {
      margin-top: .18rem;
    }
  }
  
}

.district-list {
  width: 4.59rem;
  height: 100%;
  z-index: 99;
  pointer-events: auto;
  margin-left: .3rem;
  li {
    @include wh(4.13rem,1.18rem);
    padding: .21rem .16rem;
    @include bis("/static/bounced-img/six-area-item.png");
    display: flex;
    img {
      @include wh(.78rem,.77rem);
      margin-right: .2rem;
    } 
    &>div {
      flex: 1;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      .title {
        font-size: 0.18rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: #FFFFFF;
        margin-bottom: .05rem;
      }
      .p1 {
        font-size: 0.16rem;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        margin-top: .05rem;
        span {
          font-size: 0.16rem;
          font-family: PingFang SC;
          font-weight: 500;
          color: #E82C37;
        }
      }
    }
    &>p {
      color:#7AF4FD;
      cursor: pointer;
    }
  }
}



.traffic-list {
  position: absolute;
  bottom: .25rem;
  left: .25rem;
  .traffic-item {
    width: 2.03rem;
    height: .6rem;
    display: flex;
    align-items: center;
    padding: 0 .1rem;
    background-color: rgba($color: #103657, $alpha: 0.8);
    margin-bottom: .02rem;

    img {
      width: .42rem;
      height: .42rem;
      margin-right: .1rem;
      object-fit: contain;
    }

    p {
      font-size: .16rem;
      font-family: PingFang SC;
      font-weight: bold;
      color: #7AF4FD;
    }
  }
}

.path-list {
  position: absolute;
  bottom: .25rem;
  left: .25rem;
  .path-item {
    width: 2.2rem;
    height: .4rem;
    display: flex;
    align-items: center;
    padding: 0 .1rem;
    background-color: rgba($color: #103657, $alpha: 0.8);
    margin-bottom: .02rem;

    .path-check {
      flex-shrink: 0;
      cursor: pointer;
    }

    p {
      font-size: .16rem;
      font-family: PingFang SC;
      font-weight: bold;
      color: #7AF4FD;
    }

    input[type=checkbox]{
     cursor: pointer;
     position: relative;
     width: 14px;
     height: 14px;
     font-size: 14px;
    }

    input[type=checkbox]::after{
        position: absolute;
        top: 0;
        background-color: #08182B;
        color: #7AF4FD;
        width: 14px;
        height: 14px;
        display: inline-block;
        visibility: visible;
        text-align: center;
        border: 1px solid #7AF4FD;
        border-radius: .05rem;
        content: ' ';
    }
            
    input[type=checkbox]:checked::after{
        content: "✓";
        font-size: 12px;
        font-weight: bold;
    }
  }

  .path-tit {
    width: 1.28rem;
    height: .48rem;
    line-height: .48rem;
    text-align: center;
    font-size: .18rem;
    font-family: RTWS ShangGothic G0v1;
    font-weight: bold;
    color: #7AF4FD;
    background: url('/static/lanwan/path-tit.png') no-repeat;
    background-size: 100% 100%;
  }
}

.police-box {
  position: absolute;
  bottom: .25rem;
  left: .25rem;

  .police-title {
    margin-bottom: .16rem;
    font-size: .18rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: #7AF4FD;
  }
}

.police-list {
  display: flex;

  .police-item {
    width: .15rem;
    height: .42rem;
    display: flex;
    align-items: center;
    background: url("/static/lanwan/police.png") no-repeat;
    background-size: 100% 100%;
    margin-right: .19rem;

    &:nth-of-type(n+8) {//n从0开始，8及8之后样式
      opacity: 0.5;
    }
  }

  .police-num {
    font-size: .18rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba($color: #fff, $alpha: 0.8);

    span {
      font-size: .36rem;
      font-family: RTWS ShangGothic G0v1;
      font-weight: bold;
      color: #FFFFFF;
      padding: 0 .26rem;
    }
  }
  
}

.out-gl {
  width: 1.7rem;
  height: .6rem;
  @include bis('../../static/lanwan/gl-btn.png');
  text-align: center;
  line-height: .6rem;
  margin: .2rem auto ;
  cursor: pointer;
}

</style>