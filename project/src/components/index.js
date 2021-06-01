/**
 * Created by Administrator on 2017/12/7.
 */
// 小镇党建
import circlePercentage from './小镇党建/circle-percentage'
import twolinechart from './小镇党建/twolinechart'
import circleline from './小镇党建/circleline'

// 小镇人流量概况
import sixcircleChart from './小镇产业/sixcircleChart'
import lineOutputChart from './小镇产业/lineOutputChart'
import lineAdvantagedChart from './小镇产业/lineAdvantagedChart'

// 小镇投资者
import lineInvestmentChart from './投资者情况/lineInvestmentChart'
import lineProportionChart from './投资者情况/lineProportionChart'
import barFinancingChart from './投资者情况/barFinancingChart'
import lineBarChart from './投资者情况/lineBarChart'

// 人才概况
import radarLeadingTalentsChart from './人才概况/radarLeadingTalentsChart'
import talentDemand from './人才概况/talentDemand'

// 小镇概况
import pieChart from './小镇概况/pieChart'
import lineAndBarNumChart from './小镇概况/lineAndBarNumChart'
import barPatentChart from './小镇概况/barPatentChart'
import townProfile from './小镇概况/townProfile'

// 孵化成果
import incubation from './孵化成果/incubation'
import incuDistribution from './孵化成果/incuDistribution'

// 公共组件 模拟滚动条
import commonScroll from './commonScroll'

import mapTown from './map-town'
import mapYan from './map-yan'

import companyInfo from './companyInfo'




//青岛


import wrap from './青岛/wrap.vue'
import popup from './青岛/popup.vue'
import miniSelect from './青岛/mini-select.vue'
import minInput from './青岛/min-input.vue'
import energyManage from './青岛/energy-manage.vue'
import intelligentFireControl from "./青岛/intelligent-fire-control.vue"; // 智慧消防
import pLineAreaChart2 from './青岛/line-area-chart2.vue'
import BarBarChart from './青岛/bar-bar-chart.vue'

import video from './青岛/video.vue'
import areaElectricity from './青岛/areaElectricity.vue'
import barPiecewise from './青岛/bar-piecewise.vue'
import pedestrian from './青岛/pedestrian.vue'
import linePedestrianChart from './青岛/linePedestrianChart.vue'
import pLineAreaChart6 from './青岛/line-area-chart6.vue'
import pLineAreaChart7 from './青岛/line-area-chart7.vue'
import collapseTransition from "./青岛/collapse-transition.vue";

import mask from "./青岛/mask.vue";
import toast from "./青岛/toast.vue";
import trajectory from "./青岛/personnel-trajectory.vue";
import miniSelect2 from './青岛/mini-select2.vue'

import ckvideo from './青岛/ckvideo.vue'
import hikVideo from './青岛/hikVideo.vue'
import chelanPoint from './青岛/chelanPoint.vue'
import ckvideoOur from './青岛/ckvideoOur.vue'
import elevatorManage from './青岛/elevator-manage.vue'
import serviceDialog from './青岛/service-dialog.vue'
import pPieChart from './青岛/pie-chart.vue'

import troughControlTwo from './青岛/through-control-two.vue'
import popup2 from './青岛/popup2.vue'
import barBarChartOption from './青岛/bar-bar-chart-option.vue'
import energyManage2 from './青岛/energy-manage2.vue'



//头部公共组件
import header from './header'
import batchImport1 from './batch-import1'
import batchImport from './batch-import'

// 蓝湾二期

import patrolRadarChart from './lanwan/patrol-radar-chart.vue';//月度安防巡查指数分布
import trafficradarchart from './lanwan/traffic-radar-chart.vue';//交通安全指数统计
// import highRiskPhenomenon from './lanwan/high-risk-phenomenon.vue';//区域安防高频现象

import mobileAlarm from './lanwan/mobile-alarm.vue';//移动告警
import statisticsPieChart from './lanwan/statistics-pie-chart.vue';//移动监测物体统计


import vehicleManage from './lanwan/vehicle-manage.vue';//五维防控面-地面-智慧车行
import throughControl from './lanwan/through-control.vue';//五维防控面-地面-智慧人行

// ------------五维防控图-----------
// 天空
import droneCruise from './五维防控面/drone-cruise.vue';//五维防控图-无人机巡航
import abnormalAlarm from './五维防控面/abnormal-alarm.vue';//五维防控图-异常告警
// 中空
import securityMonitoringMiddle from './五维防控面/security-monitoring-middle.vue';//五维防控图-中空-安防监控
// 地下管廊
import pipe from './五维防控面/pipe.vue';//五维防控图-地下管廊-管廊分布
// 地面
import securityMonitoring from './五维防控面/security-monitoring.vue';//五维防控图-地面-安防监控
// 水系
import drainageDivide from './五维防控面/drainage-divide.vue';//五维防控图-水系-水系划分

// ------------三道防控圈-----------
import preventDivide from './三道防控圈/prevent-divide.vue';//三道防控圈-防控圈划分


// -------------- 地图中间弹窗 ------------
import jiankong from './lanwan-center/jiankong.vue';//天空-监控
import policeDialog from './lanwan-center/police-dialog.vue';//智慧警务-警务站
import currentWater from './lanwan-center/current-water.vue';//水系划分-当前水系
import companyDetail from './lanwan-center/company-detail.vue';//九小场所-企业详情
import realTimeCruise from './lanwan-center/real-time-cruise.vue';//视频巡检-无人机实时巡航
import patrolPoint from './lanwan-center/patrolPoint.vue';//无人机巡航-巡检画面
import illegalCapture from './lanwan-center/illegal-capture.vue';//违规捕获-违规捕获
import realTimeBox from './lanwan-center/real-time-box.vue';//环境监测-监测数据
import lineAreaChart from './lanwan-center/line-area-chart.vue';
import gasAlarm from './lanwan-center/gas-alarm.vue';//气体监测-易燃气体告警
import gasMonitor from './lanwan-center/gas-monitor.vue';//气体监测-监测设备
import riskAlarm from './lanwan-center/risk-alarm.vue';//防拆告警-防拆入侵告警
import invadeMonitor from './lanwan-center/invade-monitor.vue';//入侵告警-监测设备
import pipeRack from './lanwan-center/pipe-rack.vue';//入侵告警-地下管廊段
import gServe from './lanwan-center/g-serve.vue';//疫情管控-服务机构
import abnormalPoint from './lanwan-center/abnormal-point.vue';//安防监控-监控点位名称 正常点位
import abnormalErrorPoint from './lanwan-center/abnormal-error-point.vue';//安防监控-监控点位名称 异常点位
import mobileErrorPoint from './lanwan-center/mobile-error-point.vue';//移动监测-监控点位名称 异常点位
import warnPoint from './lanwan-center/warnPoint.vue';//异常告警-异常告警
import safeDialog from "./lanwan-center/safe-dialog.vue";//异常告警-调取监控
import patrolSafe from "./lanwan-center/patrol-safe.vue";//安全生产-巡检画面
import invadePoint from './lanwan-center/invade-point.vue';//中空-入侵检测
import pipeDange from './lanwan-center/pipe-dange.vue';//入侵告警



export default {

  // 小镇党建
  circlePercentage, twolinechart, circleline, batchImport, batchImport1,

  // 小镇人流量概况
  sixcircleChart,lineOutputChart,lineAdvantagedChart,

  // 小镇投资者
    lineInvestmentChart, lineProportionChart, barFinancingChart, lineBarChart,

  // 人才概况
  radarLeadingTalentsChart,talentDemand,

  // 小镇概况
  pieChart, lineAndBarNumChart, barPatentChart, townProfile,

  // 孵化成果
  incubation, incuDistribution,

  commonScroll, mapTown, mapYan, companyInfo ,


  //青岛

    wrap,
    popup, miniSelect,
    minInput, energyManage,
    intelligentFireControl, pLineAreaChart2, BarBarChart, video, barPiecewise, areaElectricity, pedestrian, linePedestrianChart, pLineAreaChart6, collapseTransition,
    mask, trajectory, miniSelect2, ckvideo, chelanPoint, pLineAreaChart7, ckvideoOur, elevatorManage,troughControlTwo,popup2,barBarChartOption,energyManage2,
    pPieChart, serviceDialog,hikVideo,
  //头部组件
  header,
  toast,


  //蓝湾二期
  patrolRadarChart, trafficradarchart, mobileAlarm, statisticsPieChart, vehicleManage, throughControl,

  // 五维防控图
  droneCruise, abnormalAlarm, pipe, securityMonitoring, securityMonitoringMiddle, drainageDivide,

  // 三道防控圈
  preventDivide, 

  // 中间弹窗
  jiankong, policeDialog, currentWater, companyDetail, realTimeCruise, patrolPoint, illegalCapture, realTimeBox, lineAreaChart, gasAlarm, gasMonitor, riskAlarm, invadeMonitor, pipeRack, gServe, abnormalErrorPoint, mobileErrorPoint, abnormalPoint, warnPoint, safeDialog, patrolSafe, invadePoint,pipeDange
}
