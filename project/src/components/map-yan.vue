<template>
  <div class="map-yan" id="container2"></div>
</template> 

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { lazyAMapApiLoaderInstance } from "vue-amap";
import baseMixin from "../config/baseMixin";
import {heatmapData}  from "../config/heatmapData";
import Vue from 'vue'
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


export default {
  props: {
    flowIndex: {
      type: Number
    },
    leftIndex: {
      type: Number
    },
    indexArr: {
       type: Array
    },
    guanLangValue: {
      //管廊类型
      type: Number
    }
  },
  mixins:[baseMixin],
  data() {
    return {
      map: null,
      activeIndex: -1,
      isShowValue: 0,
      zoom: 12,
      lanwanPoint: [],
      markers: [],
      infoWindow: '',
      config:{
        viewMode: "3D",
        pitch: 0,
        rotation: this.$store.state.defRotation,
        zoom: this.$store.state.defZoom-3,
        center: this.$store.state.defCenter,
        // mapStyle: "amap://styles/6eadab4864661fdc146c317d435f93f8",
        jogEnable: true,
        features: ["bg", "road","point"],
        showBuildingBlock: false,
        animateEnable: false,
        layers: [],
        dragEnable: true,
        zoomEnable: true,  //定义鼠标滚轮是否可以控制放大缩小
      }
    }
  },
  mounted() {
    lazyAMapApiLoaderInstance.load().then(() => {
      this.map = new AMap.Map("container2", this.config);
  });



  },
  beforeDestroy() {},
  computed: {
    datas() {}
  },
  methods: {
    init(){
      if(this.guanLangValue!=0){
        return
      }


      this.map = new AMap.Map("container2", this.config);
      this.map.on("complete", () => {
        this.map.on("mousemove", e => {//鼠标移动事件
          // console.log(this.map.getRotation(),"鼠标移动")
        });
        this.map.on("click", e => {//点击事件
          console.log(
            this.map.getRotation(),
            this.map.getPitch(),    //获取地图俯仰角度
            this.map.getCenter(),       //获取中心点
            this.map.getZoom(),"点击"    //获取层级
          );
        });
        this.map.on("mapmove", e => {//移动事件
          console.log(this.map.getCenter(),"移动") 
        });

        this.map.on("zoomchange", e => {//缩放大小
          console.log(this.map.getZoom(),"缩放")
          this.zoom = this.map.getZoom()
          if(this.activeIndex==3&&(this.leftIndex==0||this.leftIndex==2)){
            if(this.zoom>16){
              this.markers[0].setMap(null);
              var positions = [
                [120.267482, 36.259762],
                [120.268528, 36.259533],
                [120.267831, 36.259057],
              ];
              this.map.remove(this.lanwanPoint);
              if(this.leftIndex==2){
                this.getPoints(this.imgUrl5,this.controlserveItemList,42,50,2)  //与pointType关联
              }else{
                this.getPoints(this.imgUrl5,positions,42,50,2)  //与pointType关联
              }
              
            }else{
              this.map.remove(this.lanwanPoint);
              this.map.remove(this.markers);

             this.getPoints(this.imgUrl5,this.lanwanPointList,42,52,1)//与pointType关联
            }
          }
 
        });
      });


      if(this.activeIndex==0&&this.isShowValue==1){
        //五维防控面-天空
        if(this.leftIndex==0){
        //无人机
          var point = [
            [120.297109, 36.236753],
          ]

          this.getPoints(this.imgUrl3,this.skyDroneList,42,50,'','',realTimeCruise,-180,-280);//无人机巡检点
          /* this.getPoints(this.imgUrl,point,42,55) */
          this.getPolyLine(this.pointLine,'rgba(57, 190, 226, 1)','dashed',4);
        }else if(this.leftIndex==1){
          //视频
          this.getPoints(this.imgUrl4,this.skyVideoList,42,52,'','',patrolPoint,100,-100);//视频巡检        //第一个参数图片，2：点位，3、4宽高，5：label标签，6：是否放大到合适位置 7：组件  8、9弹窗定位
        }else if(this.leftIndex==2){
          // 安全生产
          this.getPoints(this.place1,this.skySafeList,42,52,'','',patrolSafe,100,-100) 
        }else {
          // 异常告警
          this.getPoints(this.imgUrl,this.skyAlarmList,40,52,'','',warnPoint,-350,10) 
        }
       

      }else if(this.activeIndex==0&&this.isShowValue==2){
        //中空
        if(this.leftIndex==0){
          //安防监控
          this.getPoints(this.imgUrl4,this.midheavenAlarmList,42,50,'','',abnormalPoint,-140,-280)
          this.getPoints(this.imgUrl,this.midheavenAlarmErrorList,40,52,'','',abnormalErrorPoint,-140,-280)
        }else if(this.leftIndex==1){
          // 移动监测
          this.getPoints(this.imgUrl4,this.midheavenMobileList,42,50,'','',abnormalPoint,-140,-280)
          this.getPoints(this.imgUrl,this.midheavenMobileErrorList,42,55,'','',mobileErrorPoint,-140,-290)
        }else {
          // 入侵检测
          this.getPoints(this.imgUrl4,this.midheavenInvadeList,42,50,'','',invadePoint,100,-100)
          this.getPoints(this.imgUrl,this.midheavenInvadeErrorList,42,55,'','',mobileErrorPoint,-140,-290)
        }
        
      }else if(this.activeIndex==0&&this.isShowValue==5){
        //五维-海域
        if(this.leftIndex==0){
          //水系划分

          this.getPolygon(this.waterDividePathList)//水系区域

          // this.getPoints(this.imgUrl3,this.waterDivideList,42,52);
        }else if(this.leftIndex==1){
          //无人机巡航
          this.getPoints(this.imgUrl3,this.waterCruiseList,42,52,'','',currentWater,-220,-350);
          this.getPolyLine(this.pointLine2,'rgba(57, 190, 226, 1)','dashed',4,true);
        }else{
          //违规捕获
          var positions = [
            [120.276046, 36.266417]
          ];
          // this.getPoints(this.imgUrl,positions,42,55,'',true)
          this.getPoints(this.imgUrl,this.waterCaptureList,40,52,'',true,illegalCapture,0,0)
        }

        this.map.setZoom(15)
        this.map.setCenter([120.276879, 36.268035])
        
      }else if(this.activeIndex==0&&this.isShowValue==4){
        //五维-地下管廊
        this.getPolygon(this.landPipePathList)//地下管廊
        if(this.leftIndex==1){
          // 入侵告警
          this.getPoints(this.imgUrl,this.pipeAlarmList,42,55,'','',riskAlarm,0,0,1)
        }else if(this.leftIndex==2){
          // 防拆告警
          let img = '../../static/icon/icon13.png'
          this.getPoints(img,this.pipeTamperList,42,55,'','',riskAlarm,0,0,2)
        }else if(this.leftIndex==3){
          let point = [
            [120.271968, 36.259371]
          ]
          // 气体监测
          this.getPoints(this.imgUrl10,this.pipeGasList,42,55,'','',riskAlarm,0,0,3)
        }else if(this.leftIndex==4){
          // 环境监测
          this.getPoints(this.imgUrl9,this.pipeEnvironmentList,45,55,'','',riskAlarm,0,0,4) //4:管廊类型
        }
      }else if(this.activeIndex==1){
        //三道防控圈
        if(this.leftIndex==0){
          //防控圈划分
           if(this.indexArr.includes(0)&&this.indexArr.includes(1)&&this.indexArr.includes(2)){
            this.getCircle();
          }

          if(this.indexArr.includes(0)){//环高新区
            this.getPolygon(this.preventHighPathList)
          }

          if(this.indexArr.includes(1)){//环核心区
            this.getPolygon(this.preventCorePathList)
          }

         if(this.indexArr.includes(2)){//环中新区
            this.getEllipse()
          }
        }else if(this.leftIndex==1) {
          //无人机巡航
          this.getPoints(this.imgUrl3,this.preventCruiseList,42,50,'','',realTimeCruise,-180,-280)
          this.getPolyLine(this.pointLine,'rgba(57, 190, 226, 1)','dashed',4);
        }else if(this.leftIndex==2){
          //视频巡检
          this.getPoints(this.imgUrl4,this.preventVideoList,42,52,'','',patrolPoint,100,-100) 
        }else if(this.leftIndex==3){
          //异常告警
          this.getPoints(this.imgUrl,this.preventAbnormalList,40,52,'','',warnPoint,-350,10) 
        }
  
      
      }else if(this.activeIndex==2){
        //三条主控线
        if(this.leftIndex==0){
            if(this.indexArr.includes(0)&&this.indexArr.includes(1)&&this.indexArr.includes(2)){
              this.getThreeLine();
            }

            if(this.indexArr.includes(0)){
              this.getPolyLine(this.path1,'rgba(0, 0, 255, 1)','solid',8);
              this.getPolyLine(this.path2,'#7AF4FD','solid',8);
              this.getPolyLine(this.path3,'rgba(228, 0, 127, 1)','solid',8);
              this.getPolyLine(this.path4,'rgba(0, 153, 68, 1)','solid',8);
            }

            if(this.indexArr.includes(1)){
              //交通管控
              this.getPoints(this.imgUrl8,this.masterTrainList,42,50)
              this.getPoints(this.imgUrl7,this.masterFreewayList,42,55)
              this.getPoints(this.imgUrl6,this.masterWharfList,42,55)
            }

            if(this.indexArr.includes(2)){
                this.getPolyLine(this.path18,'#f00','solid',8);
            }
    
        }else if(this.leftIndex==1) {
          //无人机巡航
          this.getPoints(this.imgUrl3,this.masterCruiseList,42,50,'','',realTimeCruise,-180,-280)
          this.getPolyLine(this.pointLine,'rgba(57, 190, 226, 1)','dashed',4);
        }else if(this.leftIndex==2){
          //视频巡检
          this.getPoints(this.imgUrl4,this.masterVideoList,42,52,'','',patrolSafe,100,-100) 
        }else if(this.leftIndex==3){
          //异常告警      
          // this.getPoints(this.imgUrl,this.masterAbnormalList,42,52,'','',warnPoint,-350,10) 
          this.getPoints(this.imgUrl,this.masterAbnormalList,40,52,'','',warnPoint,0,0) 
        }
        


        /* if(this.isShowValue==1){
          this.getPolyLine(this.path1,'rgba(0, 0, 255, 1)','solid',8);
          this.getPolyLine(this.path2,'#7AF4FD','solid',8);
          this.getPolyLine(this.path3,'rgba(228, 0, 127, 1)','solid',8);
          this.getPolyLine(this.path4,'rgba(0, 153, 68, 1)','solid',8);
        }else if(this.isShowValue==2){
          //标记点
          var positions = [
            [120.199627,36.277234],
            [120.27284,36.252347],
            [120.245718,36.237395],
          ];
          var positions2 = [
            [120.28081, 36.255993]
          ];
          this.getPoints(this.imgUrl4,positions,42,50)
          this.getPoints(this.imgUrl,positions2,42,55)
        }else if(this.isShowValue==3){

        } */
       
       
      }else if(this.activeIndex==3){
        //三类控制点
        if(this.leftIndex==0){
          //一标五实
          if(this.indexArr.includes(0)&&this.indexArr.includes(1)&&this.indexArr.includes(2)){
            this.getFive()
            return;
          }

          //重点单位
          if(this.indexArr.includes(0)){

            let controlSignPathList=this.controlSignPathList.filter(item=>{
              return item.type==0;
            });
            this.getPolygon(controlSignPathList)//一标五实

            
            this.getPoints(this.imgUrl5,this.keyPointList,0,0);
          }
          
          //重点部位
          if(this.indexArr.includes(1)){

            let controlSignPathList=this.controlSignPathList.filter(item=>{
              return item.type==1;
            });
            this.getPolygon(controlSignPathList)//一标五实

            
            this.getPoints(this.imgUrl5,this.lanwanPointList,42,52,1)
          }

          //重点场所
          if(this.indexArr.includes(2)){

            let controlSignPathList=this.controlSignPathList.filter(item=>{
              return item.type==2;
            });

            this.getPolygon(controlSignPathList)//一标五实
          }

           
        }else if(this.leftIndex==1){
          //九小场所
          this.getPoints("",this.controlSiteList,44,55,'','',companyDetail,0,0)
          
        }else if(this.leftIndex==2){
          //智慧服务

          this.getPolygon(this.controlServePathList)//智慧服务

          this.getPoints(this.imgUrl5,this.controlserveList,59,71,1)
          this.map.setPitch(65)      //设置俯视角
        }else{
          //地下管廊  
          this.getPolygon(this.controlPipePathList)//地下管廊
        }
      }else if(this.activeIndex==4||(this.activeIndex==0&&this.isShowValue==3)){
        //五维-地面
        if(this.leftIndex==3){
          //疫情管控
          this.getPoints("",this.landEpidemicList,30,37,'','',gServe,-200,-180);
        }else{

          this.getPolygon(this.landMonitorPathList)//安防监控区域

          this.getPoints(this.imgUrl4,this.landSecurityList,42,52,'','',jiankong,0,0);//监控点位
        }
        
      }else if(this.flowIndex==0){
        let gradient = {
          0.5: 'blue',
          0.65: 'rgb(117,211,248)',
          0.7: 'rgb(0, 255, 0)',
          0.9: '#ffea00',
          1.0: 'red'
        }
        this.getHotMap(gradient)
      }else if(this.flowIndex==1){
        let gradient = {
          0.5: 'red',
          0.7: 'yellow',
          1.0: '#0f0'
        }
        this.getHotMap(gradient)
      }else if(this.flowIndex==2){
        let gradient = {
          0.5: '#f00',
          0.7: 'orange',
          1.0: 'yellow'
        }
        this.getHotMap(gradient)
      }
    },
    getHotMap(gradient){
       if (!isSupportCanvas()) {
            alert('热力图仅对支持canvas的浏览器适用,您所使用的浏览器不能使用热力图功能,请换个浏览器试试~')
        }

        //详细的参数,可以查看heatmap.js的文档 http://www.patrick-wied.at/static/heatmapjs/docs.html
        //参数说明如下:
        /* visible 热力图是否显示,默认为true
        * opacity 热力图的透明度,分别对应heatmap.js的minOpacity和maxOpacity
        * radius 势力图的每个点的半径大小
        * gradient  {JSON} 热力图的渐变区间 . gradient如下所示
        *	{
        .2:'rgb(0, 255, 255)',
        .5:'rgb(0, 110, 255)',
        .8:'rgb(100, 0, 255)'
        }
        其中 key 表示插值的位置, 0-1
        value 为颜色值
        */
        var heatmap;
        this.map.plugin(["AMap.HeatMap"],  ()=> {
            //初始化heatmap对象
            heatmap = new AMap.HeatMap(this.map, {     //详细https://lbs.amap.com/api/javascript-api/reference/layer/
                radius: 25, //给定半径
                opacity: [0, 0.8],
                gradient: gradient
            });
            //设置热力点
            heatmap.setDataSet({
                data: heatmapData,
                max: 100
            }); 
        });

        //判断浏览区是否支持canvas
        function isSupportCanvas() {
            var elem = document.createElement('canvas');
            return !!(elem.getContext && elem.getContext('2d'));
        }
    },
    getPoints(imgUrl,positions,w,h,pointType,adaption,component,pos1,pos2,galleryType){//创建Marcker点
      var icon = [];
      var marker = [];
      var marker2 = [];
      var marker3 = [];

      positions.forEach((item, index) => {
        if(item.isShowName&&(this.activeIndex==4||this.activeIndex==3)){//区域名称显示
          var labelContent =  "<div class='labelContent'>"+item.areaName+"</div>"
        }
        var labelOffset = new AMap.Pixel(-24,-28);
         // 创建一个 Icon
        var imageUrl = item.icon?item.icon:imgUrl;
        icon[index] = new AMap.Icon({
          // 图标尺寸
          size: new AMap.Size(w, h),
          // 图标的取图地址
          image: imageUrl,
          // 图标所用图片大小
          imageSize: new AMap.Size(w, h),
        });

        let obj = new AMap.Marker({
              position: item.local?item.local:positions[index],
              icon: icon[index],
              anchor: 'center', //设置锚点
              offset: new AMap.Pixel(0,0), //设置偏移量
              label: {
                content: labelContent,
                // offset: labelOffset,
                direction: item.pos?item.pos:'right'
              }
          });

          if(pointType==1&&this.activeIndex==3){
             // 将 Icon 传入 marker
            marker2[index] = obj;
            this.markers = marker2;
            this.map.add(marker2[index]);
          }else if(pointType==2&&this.activeIndex==3){
            this.lanwanPoint = [];
            marker3[index] = obj
            this.lanwanPoint = marker3;
            this.map.add(marker3[index]);
          }else{
            marker[index] = obj
            this.map.add(marker[index]);

            if(adaption){
              this.map.setFitView(marker)
            }
          }
        
        obj.on("click", e => {
          if(component){
            this.initInfoWindow(obj,component,item,pos1,pos2,galleryType)
          }else if(pointType==2&&this.activeIndex==3){
            this.$emit("selectMarker", item);
          }
          

          // if (this.map.getZoom() < 16) {
          //   this.map.setZoom(18);
          //   this.map.setCenter(item.local);
          //   setTimeout(() => {
          //    document.querySelector(`.marker-point-${index}`).style.animationDelay='0s'
          //   },500);
          // } else {
          //   this.$emit("selectCompany", item.buildId);
          // }
        });
      });

    },
    createInfoWindowComponent(component) {
      const InfoWindow = Vue.extend(component)
      return new InfoWindow()
    },
    initInfoWindowContent(component,item,type){
      const infoWinCom = this.createInfoWindowComponent(component)
      // infoWinCom.deviceAttrInfo = Object.assign({}, infoWinCom.deviceAttrInfo)
      infoWinCom.map = this.map
      infoWinCom.info = item
      infoWinCom.$store = this.$store
      infoWinCom.galleryType = type
      return infoWinCom.$mount().$el
    },
    initInfoWindow(marker,component,item,pos1,pos2,type){
      //添加自定义窗口
      this.infoWindow = new AMap.InfoWindow({
        isCustom: true,//自定义窗体
        // offset: new AMap.Pixel(pos1,pos2),
        content: this.initInfoWindowContent(component,item,type)
      })

      if(type==10){
         this.infoWindow.open(this.map, [120.276839,36.260514]);
      }else {
        this.infoWindow.open(this.map, marker.getPosition());
      }
    },
    getPolygon(pathList,color,color2,zIndex,fillOpacity){
      pathList.forEach((item,index)=>{
        var polygon = new AMap.Polygon({
            path: item.path?item.path:pathList,  
            fillColor: item.fillColor?item.fillColor:color, // 多边形填充颜色
            borderWeight: 8, // 线条宽度，默认为 1
            strokeColor: item.strokeColor?item.strokeColor:color2, // 线条颜色
            zIndex: item.zIndex?item.zIndex:20,
            fillOpacity: item.fillOpacity?item.fillOpacity:0.9
        });

        this.map.add(polygon);

        if((this.activeIndex==0&&this.isShowValue==4&&this.leftIndex==0)||(this.activeIndex==3&&this.leftIndex==3)){
        /*   polygon.on("click", e => {
            // this.$emit("getPipeGallery");
            this.initInfoWindow(polygon,pipeRack,'',0,0,10)
          }); */

          this.initInfoWindow(polygon,pipeRack,'',0,0,10)
        }
        

        // 缩放地图到合适的视野级别
        if(this.activeIndex==4||(this.activeIndex==0&&this.isShowValue==3)||(this.activeIndex==3&&this.leftIndex==0)){
          this.map.setZoom(14.46)
          this.map.setCenter([120.282349, 36.265235])
        }else if((this.activeIndex==0&&this.isShowValue==4)||(this.activeIndex==3&&this.leftIndex==3)){
          this.map.setZoom(14.94)
          this.map.setCenter([120.280548, 36.264837])
        }else{
          this.map.setFitView([ polygon ])
        }
      });
       
    },
    getPolyLine(path,color,strokeStyle,strokeWeight,isAdaption){
      // 创建折线实例
        var polyline = new AMap.Polyline({
          path: path,  
          borderWeight: 3, // 线条宽度，默认为 1
          strokeWeight: strokeWeight, //重点线宽
          strokeColor: color, // 线条颜色
          lineJoin: 'round', // 折线拐点连接处样式
          strokeStyle: strokeStyle
        });

        // 将折线添加至地图实例
        this.map.add(polyline);

        if(isAdaption){
          this.map.setFitView([ polyline ])
        }
    },
    getEllipse(){
        var ellipse = new AMap.Ellipse({
        center: [120.27041, 36.263305],
        radius: [ 1200, 600 ], //半径
        borderWeight: 3,
        strokeColor: "#FFFF00",   //线条颜色
        strokeOpacity: 1,
        strokeWeight: 2,
        fillOpacity: 0.2,
        // 线样式还支持 'dashed'
        strokeStyle: 'solid',
        strokeDasharray: [10, 10], 
        fillColor: '#FFFF7E',
        zIndex: 50,
    })

      ellipse.setMap(this.map)

      // 缩放地图到合适的视野级别
      // this.map.setFitView([ ellipse ])

    },
    getCircle(){
      this.getPolygon(this.preventHighPathList)
      this.getPolygon(this.preventCorePathList)

      this.getEllipse()
    },
    getThreeLine(){
      this.getPolyLine(this.path1,'rgba(0, 0, 255, 1)','solid',8);
      this.getPolyLine(this.path2,'#7AF4FD','solid',8);
      this.getPolyLine(this.path3,'rgba(228, 0, 127, 1)','solid',8);
      this.getPolyLine(this.path4,'rgba(0, 153, 68, 1)','solid',8);
      this.getPolyLine(this.path18,'#f00','solid',8);
    },
    getFive(){

      this.getPolygon(this.controlSignPathList)//三类控制点

      
      this.getPoints(this.imgUrl5,this.lanwanPointList,42,52,1)
      this.getPoints(this.imgUrl4,this.keyPointList,0,0);
    }
  },
  watch: {
    "$store.state.mapCenter": {
      handler(newName, oldName) {
        this.map.setCenter(newName)
      }
    },
    "$store.state.mapRotation": {
      handler(newName, oldName) {
        this.map.setRotation(newName)
      }
    },
    "$store.state.mapZoom": {
      handler(newName, oldName) {
        this.map.setZoom(newName-3)
      }
    },
    "$store.state.activeIndex": {
      handler() {
        this.activeIndex = this.$store.state.activeIndex;       //中间按钮索引
        this.init();
      }
    },
    "$store.state.isShowValue": {
      handler() {
        this.isShowValue = this.$store.state.isShowValue;    //中间按钮下拉checkbox值
        this.init();
      }
    },
    "flowIndex": {
      handler(){
        this.init()
      }
    },
    "leftIndex": {
      handler(){
        this.init()
      }
    },
    "indexArr": {
      handler(){
        this.init()
      }
    },
    "guanLangValue": {
      handler(){
        this.init()
      }
    }
  }
};
</script>
<style lang="scss">
.amap-markers {
  &>.amap-marker{
    &:nth-child(1)>.amap-marker-label,&:nth-child(2)>.amap-marker-label,&:nth-child(3)>.amap-marker-label,&:nth-child(4)>.amap-marker-label{
      background: #0072FF;
    }
    &:nth-child(5)>.amap-marker-label,&:nth-child(6)>.amap-marker-label{
      background: rgba(0, 156, 63, 1);
    }
    &:nth-child(7)>.amap-marker-label{
      background: rgba(242, 60, 150, 1);
    }
  }
}
.amap-marker-label {
  color: #fff;
  border-radius:  .03rem;
  border: none;
  padding: .07rem .15rem .08rem .15rem;
  .labelContent {
    color: #fff;
  }
}
</style>


<style scoped lang="scss">
@import "../assets/css/mixin";

.map-yan {
  @include wh(100%, 100%);
  z-index: 999;
}

.label-style0 {
  background: #0072FF;
  color: #fff;
}



</style>

