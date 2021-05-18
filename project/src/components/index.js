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
import jiankong from './青岛/jiankong.vue'
import video from './青岛/video.vue'
import areaElectricity from './青岛/areaElectricity.vue'
import barPiecewise from './青岛/bar-piecewise.vue'
import pedestrian from './青岛/pedestrian.vue'
import linePedestrianChart from './青岛/linePedestrianChart.vue'
import pLineAreaChart6 from './青岛/line-area-chart6.vue'
import pLineAreaChart7 from './青岛/line-area-chart7.vue'
import collapseTransition from "./青岛/collapse-transition.vue";
import safeDialog from "./青岛/safe-dialog.vue";
import mask from "./青岛/mask.vue";
import toast from "./青岛/toast.vue";
import trajectory from "./青岛/personnel-trajectory.vue";
import miniSelect2 from './青岛/mini-select2.vue'
import warnPoint from './青岛/warnPoint.vue'
import ckvideo from './青岛/ckvideo.vue'
import hikVideo from './青岛/hikVideo.vue'
import chelanPoint from './青岛/chelanPoint.vue'
import ckvideoOur from './青岛/ckvideoOur.vue'
import elevatorManage from './青岛/elevator-manage.vue'
import serviceDialog from './青岛/service-dialog.vue'
import pPieChart from './青岛/pie-chart.vue'
import patrolPoint from './青岛/patrolPoint.vue'
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
    intelligentFireControl, pLineAreaChart2, BarBarChart, jiankong, video, barPiecewise, areaElectricity, pedestrian, linePedestrianChart, pLineAreaChart6, collapseTransition, safeDialog,
    mask, trajectory, miniSelect2, warnPoint, ckvideo, chelanPoint, pLineAreaChart7, ckvideoOur, elevatorManage,troughControlTwo,popup2,barBarChartOption,energyManage2,
    pPieChart, patrolPoint,serviceDialog,hikVideo,
  //头部组件
  header,
  toast,


  //蓝湾二期
   patrolRadarChart, trafficradarchart, mobileAlarm, statisticsPieChart, vehicleManage, throughControl,

  // 五维防控图
  droneCruise, abnormalAlarm, pipe, securityMonitoring, securityMonitoringMiddle, drainageDivide,


  // 三道防控圈
  preventDivide, 
}
