<template>
<div class="map-wrap">
  <div class="map-town" id="container"></div>
  <div class="warn-box">

    <div class="warn-info" v-if="activeWarnPoint.length">
      <img src="../assets/image/point/warn-icon.png">
      <div class="info">
           今日监测隐患：<span>{{activeWarnPoint.length}}</span>处
      </div>
    </div>
    <transition-group name="list-complete" class="warn-list" tag="ul">
      <li v-for="(item) in activeWarnPoint" :key="item.warnInfo" :class="[item.state]">

        {{item.warnInfo}}
      </li>
    </transition-group>
  </div>
  <transition name="slide-sace">
  <v-safeDialog
      v-if="dialogShow"
      @close="dialogShow = false"
    
    ></v-safeDialog>
  </transition>
  <transition name="slide-sace">
  <v-serviceDialog v-if="dialogShow2" :activeService="activeInfo" @close="dialogShow2 = false"></v-serviceDialog>
  </transition>
</div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { lazyAMapApiLoaderInstance } from "vue-amap";
import { areaSearch } from "../service/getData";
import mappaths from "../plugins/paths";
import builds from "../plugins/builds";
export default {
  props: {},
  data() {
    return {
      dialogShow:false,
      dialogShow2:false,
      activeInfo:  {
        id: 12,
        info: "在湖州市吴兴区工业路1号高新区科创园内，湖州深湖园区管理有限公司成立，公司总经理黄庆贤与高新技术产业园区管理委员会领导举行了签约仪式。",
        year: "2017年4月27日",
        imgUrl: "../../static/images/img1.png",
      },
      map: null,
      path: [
        [120.204615,36.286494],
        [120.202641,36.242134],
        [120.351987,36.242411],
        [120.346751,36.287463],
      ],
      config: {
        viewMode: "3D",
        pitch: this.$store.state.defPitch,
        rotation: this.$store.state.defRotation,
        zoom: this.$store.state.defZoom,
        center: this.$store.state.defCenter,
        mapStyle: "amap://styles/57d42e46262f7bc7095a16d94b6170d8",
        jogEnable: true,
        features: ["bg", "road","build"],
        showBuildingBlock: true,
        animateEnable: true,
        layers: [],
        // showIndoorMap: false, // 是否在有矢量底图的时候自动展示室内地图，PC默认true,移动端默认false
        // resizeEnable: true, //是否监控地图容器尺寸变化，默认值为false
        // dragEnable: false, // 地图是否可通过鼠标拖拽平移，默认为true
        // keyboardEnable: false, //地图是否可通过键盘控制，默认为true
        // doubleClickZoom: false, // 地图是否可通过双击鼠标放大地图，默认为true
        // zoomEnable: false, //地图是否可缩放，默认值为true
        // rotateEnable: false, // 地图是否可旋转，3D视图默认为true，2D视图默认false
      },
      panXY: [0.00001, 0.00001],
      frame: [null, null, null, null],
      object3Dlayer: null,
      prisms:[],
      buildGeojson: builds,
      markers:[],
      d3PointMarkes:[],
      points:[
        {pos:[120.276123,36.267082],icon:require("../assets/image/point/man1.png"),height:0.55,color:[232/255,44/255,55/255],btRound:true,bgRound:true,showContent:true},
        {pos:[120.261703,36.284588],icon:require("../assets/image/point/man2.png"),height:0.55,color:[245/255,182/255,43/255],btRound:true},
        {pos:[120.323158,36.293167],icon:require("../assets/image/point/warn-area-1.png"),height:0.55,color:[232/255,44/255,55/255],btRound:true,bgRound:true},
        {pos:[120.244537,36.241265],icon:require("../assets/image/point/warn-area-2.png"),height:0.5,color:[245/255,182/255,43/255],btRound:true},
        {pos:[120.298267,36.246941],icon:require("../assets/image/point/police.png"),height:0.55,color:[31/255,176/255,217/255],btRound:true},
        {pos:[120.268183,36.269504],icon:require("../assets/image/point/police-room.png"),height:0.5,color:[31/255,176/255,217/255],btRound:true}
      ],
      warnPoint:[
        {pos:[120.277485,36.277707],icon:require("../assets/image/point/warn-area-1.png"),height:0.55,color:[232/255,44/255,55/255],btRound:true,state:'red',
        warnInfo:'周界入侵',
        },
        {pos:[120.323158,36.293167],icon:require("../assets/image/point/warn-area-2.png"),height:0.5,color:[232/255,182/255,55/255],btRound:true,state:'orage',
        warnInfo:'烟感告警'
        },
        {pos:[120.275022,36.272531],icon:require("../assets/image/point/man1.png"),height:0.55,color:[232/255,44/255,55/255],state:'red',
          warnInfo:'异常人员告警',showContent:true
        },
        {pos:[120.261703,36.284588],icon:require("../assets/image/point/man2.png"),height:0.55,color:[245/255,182/255,43/255],state:'red',
        warnInfo:'电梯关人',
        },
        
        {pos:[120.244537,36.241265],icon:require("../assets/image/point/warn-area-2.png"),height:0.5,color:[245/255,182/255,43/255],btRound:true,state:'orage',
         warnInfo:'电压告警',
        },
      ],
      activeWarnPoint:[],
      parkPoint:[
        { buildName: "青岛保密技术产业园", pos: [120.269237,36.257071],area:[[120.267821,36.256678],[120.267812,36.256083],[120.269758,36.25609],[120.269808,36.25675],[120.269237,36.257071]],info:{
        id: 12,
        info: "青岛保密技术产业园位于青岛高新区核心区，规划总建筑面积约15万平方米，规划建有科技企业加速器、孵化器及与之配套的人才公寓，建成后可入驻企业150-200家，吸纳高端人才逾万名。 据高新区相关负责人介绍，产业园将汇聚保密技术产业发展的高端资源，推动保密技术产业在青岛高新区集聚发展，打造全国保密技术产业协同创新示范区。青岛高新区保密技术及相关信息安全产业规模有望突破100亿元，成为全国首个百亿元级的保密技术产业园区，形成以具有自主创新能力骨干企业为龙头，创新活力强、特色明显、产业链协同的产业发展格局。",
        year: "2017年4月27日",
        imgUrl: "../../static/images/baomi.jpg",
      } },
      //   { buildName: "冠捷科技公司", pos: [120.258974,36.258174],area:[[120.256101,36.259178],[120.257024,36.257049],[120.262431,36.258139],[120.261272,36.260389]],info:{
      //   id: 12,
      //   info: "冠捷科技厂区位于青岛高新区火炬路主干道北侧，目前已开发土地共计200亩，建筑面积近10万平方米，包含办公室、TV生产车间、WH仓库、倒班宿舍楼、综合楼、动力站等6个主体建筑。厂区4个出入口，园区监控共计254路，日常活动人员约1000人。",
      //   year: "2017年4月27日",
      //   imgUrl: "../../static/images/guanjie.jpg",
      // } },
        { buildName: "蓝湾智谷", pos: [120.268066,36.2596],area:[[120.264247,36.260699],[120.267819,36.258199],[120.269536,36.258605],[120.269158,36.260889]],info:{
        id: 12,
        info: "在湖州市吴兴区工业路1号高新区科创园内，湖州深湖园区管理有限公司成立，公司总经理黄庆贤与高新技术产业园区管理委员会领导举行了签约仪式。",
        year: "2017年4月24日",
        imgUrl: "../../static/images/img2.png",
      } },
        { buildName: "盘谷新媒体产业园", pos: [120.273701,36.259683] ,area:[[120.270032,36.259167],[120.270246,36.257869],[120.275289,36.258371],[120.274688,36.260378]],info:{
        id: 12,
        info: `<p>盘谷创客空间位于火炬路以南，新业路以北，西临海信模具用地，占地75.5亩，总建筑面积5.6万平方米，是青岛市首批6个众创空间之一，也是首批“全国青年创业示范园区”。
</p><p>  园区内共A、B、C、D、E五座楼，日常活动人数约300人。A、C、D三栋楼主要为研发办公用，并配有200余套专家公寓、人才公寓，2000余平方米大中小型餐饮以及小型超市、自助银行等服务设施。B楼为企业加速器，满足快速成长企业对于空间、服务等方面个性化需求。E楼为企业家会所，为企业高管提供休闲健身、商务交流的平台。</p>`,
        year: "2017年4月22日",
        imgUrl: "../../static/images/pangu.jpg",
      }},
        { buildName: "山东奥科自控设备有限公司", pos: [120.271054,36.31444],area:[[120.271226,36.315685],[120.271398,36.309391],[120.276977,36.309806],[120.27629,36.314647]],info:{
        id: 12,
        info: "山东奥科自控设备有限公司是集科研、生产、销售、服务为一体的专业化机械自动化仪表企业。注册资金8000万元，厂房建筑面积30000平方米，位于闻名全国的青岛，中国第一批国家级高新技术产业开发区—山东省青岛市高新技术产业开发区，主园区规划面积168平方公里。山东奥科自控设备有限公司的研发、生产、销售严格按照国际质量管理体系的要求进行，并获得了ISO9001：2008质量管理体系认证、TS压力管道特种设备制造许可证（A1级）、ISO14001环境管理体系认证、OHSAS18001职业健康安全管理体系认证,并且成为中国通用机械工业协会阀门分会成员等。",
        year: "2017年4月17日",
        imgUrl: "../../static/images/aozi.png",
      } },
      ],
      warnManCase:{
        warnPoint:{pos:[120.275022,36.272531],icon:require("../assets/image/point/warn-area-1.png"),height:0.55,bgRound:true,clickMove:true},
        warnMan:{pos:[120.280056,36.269803],icon:require("../assets/image/point/man1.png"),height:0.55,bgRound:true},
        warnManMoveLine:[[120.275022,36.272531],[120.280966,36.272068],[120.280056,36.269803]],

        pliceRoom:{pos:[120.262497,36.259745],icon:require("../assets/image/point/police-room.png"),height:0.5,color:[31/255,176/255,217/255],btRound:true},
        plicePoints:[
          {
            point:{pos:[120.270329,36.257496],icon:require("../assets/image/point/police.png"),height:0.55},
            moveLines:[
              [[120.270329,36.257496],[120.270093,36.259157],[120.279363,36.261372],[120.278504,36.265074],[120.278891,36.268327],[120.280056,36.269803]],
              [[120.270329,36.257496],[120.270222,36.265835],[120.278461,36.266251],[120.279062,36.268361],[120.280056,36.269803]]
            ]
          },
          {
            point:{pos:[120.269964,36.274658],icon:require("../assets/image/point/police.png"),height:0.55},
            moveLines:[
              [[120.269964,36.274658],[120.281122,36.275247],[120.280908,36.272237],[120.280056,36.269803]],
              [[120.269964,36.274658],[120.270179,36.269607],[120.274985,36.270403],[120.280056,36.269803]]
            ]
          }
        ]
      },
      policeMarkes:[],
      policeManMarkes:[],
      policeLinesMarkes:[],
      warnManMarkes:[],
      randomManNum:-1,
      activeMan:-1,
      activeLine:[],
      

    };
  },
  mounted() {
    this.config = Object.assign(this.config, {
      layers: [
        new AMap.TileLayer({ opacity: 1 }),
        // this.mapActive(),
        new AMap.LabelsLayer({ opacity: 1, zIndex: 9999 }),
      ],
    });
    lazyAMapApiLoaderInstance.load().then(() => {
      this.map = new AMap.Map("container", this.config);
      this.map.on("complete", () => {
        this.object3Dlayer = new AMap.Object3DLayer({zIndex:90});
        this.map.add(this.object3Dlayer);
        //this.changeLight();

        
        this.addRunBall();
        this.addShock();
        this.addBuild();
        this.addMewballoon()
        // this.add3DPoint()
        //this.addLine()
        
        this.addParkPoint()
        
        if(this.$route.path=='/contingencyManagement'){
          this.addWarnMan() 
        }
        
        
        this.map.on('click', (ev)=> {
          this.selectBuild(ev)
          console.log(ev.lnglat.lng+','+ev.lnglat.lat);
          // console.log(this.map.getRotation(),this.map.getCenter(),this.map.getZoom(),this.map.getPitch());
        });

        this.map.on("mousemove", (e) => {
          this.$store.state.mapRotation = this.map.getRotation();
        });
        this.map.on("mapmove", (e) => {
          this.$store.state.mapCenter = this.map.getCenter();
        });
        this.map.on("zoomchange", (e) => {
          this.$store.state.mapZoom = this.map.getZoom();
          console.log(this.$store.state.mapZoom );
          
        });
        let ani = ()=>{
          this.$store.state.mapZoom = this.map.getZoom();
           document.querySelectorAll('.custom-content-marker').forEach(item=>{
            item.style = `transform: scale(${Math.pow(0.5,15-this.$store.state.mapZoom)});margin-top:${(15-this.$store.state.mapZoom)*22-Math.pow(0.5,15-this.$store.state.mapZoom)*30}px`
          })
           document.querySelectorAll('.marker-point').forEach(item=>{
            item.style = `transform: scale(${Math.pow(0.5,15-this.$store.state.mapZoom)});margin-top:${(15-this.$store.state.mapZoom)*22-Math.pow(0.5,15-this.$store.state.mapZoom)*30}px`
          })
          requestAnimationFrame(ani);
        }
        ani()
      });
    });

    document.onkeydown = (params) => {
      if (params.key.toLowerCase() == "c") {
        window.cancelAnimationFrame(this.frame[2]);
        this.map.setZoom(this.$store.state.defZoom);
        this.map.setCenter(this.$store.state.defCenter);
        this.map.setPitch(this.$store.state.defPitch);
        this.map.setRotation(this.$store.state.defRotation);
      }
    };
    window.showContent = (ev)=>{
      var dom = ev.nextElementSibling.style.display;(dom=='none'||dom=='')?ev.nextElementSibling.style.display = 'block':ev.nextElementSibling.style.display = 'none';
    }
    window.goPage = (path)=>{
      this.$router.push(path) 
    }
    window.goLevelPage = (park)=>{
        if(park == '蓝湾智谷'){
            this.$router.push('/index')
            return
        }
      this.parkPoint.forEach(item=>{
        if(item.buildName == park){
          this.activeInfo = item.info
          this.dialogShow2 = true
        }
      })
    }
    window.removeWarn = (markersIndex,WarnListIndex,d3pointIndex)=>{
      this.map.remove(this.markers[markersIndex])
      this.markers.splice(markersIndex,1)
      this.activeWarnPoint.splice(WarnListIndex,1)
      this.d3PointMarkes[d3pointIndex].prisms.forEach(i=>{
        this.object3Dlayer.remove(i)
      })
      this.d3PointMarkes[d3pointIndex].builds.forEach(b=>{
        this.defaultAreaColor(b)
      })
      this.Toast('该条告警已成功解除')
    }
    window.openDialog = ()=>{
      this.dialogShow = !this.dialogShow
    }
    window.moveWarnMan = ()=>{
      this.moveWarnMan()
    }
  },
  beforeDestroy() {},
  computed: {
    datas() {},
  },
  methods: {
    clearMap(){
      this.map.remove(this.markers)
      this.map.remove(this.policeLinesMarkes)
      this.d3PointMarkes.forEach(item=>{
        item.prisms.forEach(i=>{
          this.object3Dlayer.remove(i)
        })
        item.builds.forEach(b=>{
          this.defaultAreaColor(b)
        })
      })

      this.d3PointMarkes = []
      this.markers = []
      this.activeWarnPoint = []
      this.warnManMarkes = []
      this.policeLinesMarkes = []
      this.$store.state.addPlicePoint = 0
      this.$store.state.policeGo = 0
    },
    add2DPoint(item){
        let contentHtml = ''
        if(item.showContent){
          contentHtml = ` onclick="window.showContent(this)" id="showContent"/>
          <div class="custom-content">  
           <div class="custom-content-title">异常人员出入</div>
              <div class="g-left-bg">
                <div class="mt">
                  <span class="q-title">告警原因：</span>
                  <span class="q-text">行为异常人员</span>
                </div>
                <div class="mt">
                  <span class="q-title">告警时间：</span>
                  <span class="q-text">2020-11-22  11:12</span>
                </div>
                <div class="mt">
                  <span class="q-title">告警位置：</span>
                  <span class="q-text">蓝湾智谷-园区正大门监控</span>
                </div>
                <div class="flex-box2">
                  <div class="warn-btn" onclick="window.goPage('/index')">进入区域</div>
                  <div class="warn-btn" onclick="window.openDialog()">调取监控</div>
                </div>
                <div class="line"></div>
                <p class="q-title">疑似人员</p>
                <div class="user-info">
                  <img src="static/images/img/user-icon.png" alt="">
                  <div class="flex-aligns ">
                    <p class="info-name">黄华山</p>
                    <div>
                      <span class="info-else">男</span>
                      <span class="info-else">42岁</span>
                      <span class="info-else">山东淄博</span>
                    </div>
                    <div class="q-title" onclick="window.goPage('/archivesCenter')">调取档案>></div>
                  </div>
                </div>
                <div class="line"></div>
                <p class="q-title">现场监控片段</p>
                <video src="https://www.w3school.com.cn/i/movie.ogg" controls="controls" class="f-video">
                您的浏览器不支持 video 标签。
                </video>
                <div class="flex-box2 btn-box">
                  <div class="active-btn" onclick="window.goPage('/contingencyManagement')">应急管理</div>
                  <div class="warn-btn2" onclick="window.removeWarn(${this.markers.length},${this.activeWarnPoint.length},${this.d3PointMarkes.length})">告警解除</div>
                </div> 
              </div>
          </div>`
        }else if(item.clickMove){
          contentHtml = ` onclick="window.moveWarnMan()"/>`
        }else{
          contentHtml =`/>`
        }
        var markerContent = `<div class="custom-content-marker ${item.bgRound?'bg-round':''}" style="transform: scale(${Math.pow(0.5,15-this.$store.state.mapZoom)});margin-top:${(15-this.$store.state.mapZoom)*22-Math.pow(0.5,15-this.$store.state.mapZoom)*30}px">
        <img class="custom-img" src="${item.icon}" style="height:${item.height*100}px;"${contentHtml}</div>`;
        var marker = new AMap.Marker({
          map: this.map,
          position: item.pos,
          content: markerContent,
          anchor:'bottom-center', // 设置锚点方位
        });
        this.markers.push(marker);

        if(item.btRound){
          var geo = this.map.lngLatToGeodeticCoord(item.pos);
          let pointPrism = this.creatRegularPrism(geo, 32, 2050, 1400, [...item.color, .3])
          let pointPrismSide = this.creatRegularPrism(geo, 32, 2052, 1000, [...item.color, .5])
          let obj = {prisms:[],builds:[]}
          obj.prisms.push(pointPrism,pointPrismSide)
          this.prisms.forEach(buildPrism=>{
            if(this.isBuildIntersectPointItem(item.pos,buildPrism)){
              this.updatePrismColor(buildPrism,[...item.color, 1],[item.color[0]*0.3,item.color[1]*0.3,item.color[2]*0.3, 1])
              obj.builds.push(buildPrism)
            }
          })
          this.d3PointMarkes.push(obj)
        }
        return marker
    },
    addWarnMan(){
      this.map.setRotation(-11.030071446864426);this.map.setCenter([120.270742,36.267381]);this.map.setZoom(15.12);this.map.setPitch(33.3844011142061);
      this.add2DPoint(this.warnManCase.warnPoint)
      
    },
    moveWarnMan(){
      this.map.remove(this.warnManMarkes)
      this.warnManMarkes = []
      this.warnManMarkes.push(...this.addMoveLine(this.warnManCase.warnManMoveLine,'#E82C37',()=>{
      },0.005,this.warnManCase.warnMan))
    },
    addPoliceMan(){
      if(this.warnManMarkes.length==0){
        this.Toast('未检测到告警人员！')
        this.$store.state.addPlicePoint = 0
        return
      }
      this.map.remove(this.policeLinesMarkes)
      this.map.remove(this.policeMarkes)
      this.policeMarkes = []
      this.policeManMarkes = []
      this.policeLinesMarkes=[]
      this.policeMarkes.push(this.add2DPoint(this.warnManCase.pliceRoom))
      this.warnManCase.plicePoints.forEach(item=>{
        let mark = this.add2DPoint(item.point)
        this.policeMarkes.push(mark)
        this.policeManMarkes.push(mark)

      })
      let lines = this.addPoliceManLine()
      this.policeMarkes.push(...lines)
      this.policeLinesMarkes.push(...lines)
    },
    
    movePliceMain(){
      this.map.remove(this.policeManMarkes[this.activeMan])
      this.policeLinesMarkes.push(...this.addMoveLine(this.activeLine,'#fff603',()=>{
        this.Toast('安保人员已抵达现场!',3000)
      },0.005,this.warnManCase.plicePoints[this.activeMan].point))
    },
    addPoliceManLine(){
      this.map.remove(this.policeLinesMarkes)
      this.policeLinesMarkes = []
      let mans = this.warnManCase.plicePoints
      let total = 0
      mans.forEach((item,index)=>{
        item.moveLines.forEach(line=>{
          total++
        })
      })
      if(this.randomManNum==-1){
        this.randomManNum = Math.round(Math.random()*(total-1))
      }
      if(this.randomManNum>=total){
        this.randomManNum = 0
      }
      let cunt = -1
      let line
      mans.forEach((item,index)=>{
        item.moveLines.forEach(l=>{
          cunt++
          if(this.randomManNum == cunt){
            line = l
            this.activeMan = index
            this.activeLine = l
          }
        })
      })
      this.randomManNum++
      return this.addMoveLine(line,'#fff603',null,0.005)
     
    },
    addMoveLine(lnglats,color,callback,step=0.001,warnMan){ //lnglats：线路坐标，color:线路颜色，callback:完成回调，step:线移动速度，warnMan：人的marker
      let masker
      if(warnMan){
        masker = this.add2DPoint(warnMan)
      }else{
        masker = new AMap.Marker({
          map: this.map,
          position: [120.280966,36.272068],
          content: "<div></div>",
          anchor:'bottom-center', // 设置锚点方位
        });
        this.markers.push(masker);
      }
       
      let passedPolyline = new AMap.Polyline({
          map: this.map,
          // path: lineArr,
          borderWeight: 2,
          strokeStyle: "solid",
          isOutline: true,
          outlineColor: '#fff',
          strokeColor: color,  //线颜色
          // strokeOpacity: 1,     //线透明度
          strokeWeight: 6,      //线宽
          zIndex:5000,
          lineJoin: 'round',
          lineCap: 'round',
          // strokeStyle: "solid"  //线样式
      });
      this.markers.push(passedPolyline);
      masker.on('moving', (e) => {
        passedPolyline.setPath(e.passedPath); 
        if(e.passedPath[e.passedPath.length-1].lng == lnglats[lnglats.length-1].lng){
          //this.clearMap()
          if(callback){
            callback()
          }
          return false
        }
      });
      masker.moveAlong(lnglats, 1000);
      return [masker,passedPolyline]
    },
    addWarnPoint(wait){
      let count = 0
      if(wait){
        let ani = (params)=> {
          if(count == this.warnPoint.length){
            return
          }
          this.add2DPoint(this.warnPoint[count])
          this.activeWarnPoint.push(this.warnPoint[count])
          count++
          setTimeout(() => {
            ani()
          }, 200);
        }
        ani()
      }else{
        this.warnPoint.forEach(item=>{
          this.add2DPoint(item)
          this.activeWarnPoint.push(item)
        })
      }
        

      
    },
    addParkPoint(){
      this.parkPoint.forEach((item,index)=>{
        var markerContent = `<div class="marker-point marker-point-${index}" style="transform: scale(${Math.pow(0.5,15-this.$store.state.mapZoom)});margin-top:${(15-this.$store.state.mapZoom)*22-Math.pow(0.5,15-this.$store.state.mapZoom)*30}px" onclick="window.goLevelPage('${item.buildName}')">${
                    item.buildName
                  }</div>
        `;
        var marker = new AMap.Marker({
          map: this.map,
          position: item.pos,
          content: markerContent,
          anchor:'bottom-center', // 设置锚点方位
        });
      })
      this.addBuildRail()
    },
    
    selectBuild(ev) {
      var pixel = ev.pixel;
      var px = new AMap.Pixel(pixel.x, pixel.y);
      var obj = this.map.getObject3DByContainerPos(px, [this.object3Dlayer], false) || {};
      console.log(obj,111);
    },
    layoutCount(lonLat) {
      let def = [120.251718,36.310549];
      let rate = 0.19;
      let first = [-0.1587910652160644,51.50133455637256];
      let cha = [def[0] - first[0] * rate, def[1] - first[1] * rate];
      let lon = cha[0] + lonLat[0] * rate * .96;
      let lat = cha[1] + lonLat[1] * rate;
      return [lon, lat];
    },
    defaultColor(){
      this.prisms.forEach(item=>{
        this.defaultAreaColor(item)
      })
    },
    defaultAreaColor(prism){
      let colors1 = [[224 / 255, 224 / 255, 226 / 255,.8],[200 / 255, 200 / 255, 200 / 255,.8],[250 / 255, 250 / 255, 250 / 255,.8],[255 / 255, 255 / 255, 255 / 255,.8]]
      let colors2 = [[89 / 255, 89 / 255, 89 / 255,.8],[70 / 255, 70 / 255, 70 / 255,.8],[100 / 255, 100 / 255, 100 / 255,.8],[120 / 255, 120 / 255, 120 / 255,.8]]
      let rand = Math.floor(Math.random()*4);
      this.updatePrismColor(prism,colors1[rand],colors2[rand]) 
    },
    updatePrismColor(prism, color, color2) {
      setTimeout(() => {
      color2 = color2 || [58 / 255, 97 / 255, 147 / 255, 1];
      var vertexColors = prism.geometry.vertexColors;
      var len = vertexColors.length;
      for (var i = 0; i < len / 4; i++) {
        var r = color[0];
        var g = color[1];
        var b = color[2];
        var a = color[3];
        // 不能重新赋值，只允许修改内容i
        if (!(i % 2) && i < len / 5) {
          vertexColors.splice(
            i * 4,
            4,
            color2[0],
            color2[1],
            color2[2],
            color2[3]
          );
        } else {
          vertexColors.splice(i * 4, 4, r, g, b, a);
        }
      }

      prism.needUpdate = true;
      prism.reDraw();
      })
    },
    addBuildRail(){
      let rails = []
      this.parkPoint.forEach((item) => {
        if(!item.area){
          return
        }
          let bounds = item.area.map((path) => {
            return new AMap.LngLat(path[0], path[1]);
          });
          let prism = new AMap.Object3D.Prism({
            path: bounds,
            height: 1500,
            color: [224 / 255, 224 / 255, 226 / 255, 0],
            zIndex: 20,
          });
          
          prism.transparent = true;
          this.object3Dlayer.add(prism);
          rails.push(prism)
          this.updatePrismColor(prism,[0 / 255, 255 / 255, 255 / 255,0],[0/ 255, 250 / 255, 255 / 255,1])
        });
    },
    isBuildIntersectPointArea(pointPrism,geo,area){
      let states = []
      geo.forEach(item=>{
        states.push(Math.sqrt(Math.pow(pointPrism[0]-item.lng,2)+Math.pow(pointPrism[1]-item.lat,2))<area)
      })
      return states.some(item=>item)
    },
    addBuild() {
      
      this.map.AmbientLight = new AMap.Lights.AmbientLight([1, 1, 1], 0.5);
      this.map.DirectionLight = new AMap.Lights.DirectionLight(
        [1, -1, 2],
        [1, 1, 1],
        0.5
      );
      

        this.buildGeojson.features.forEach((item) => {
          let  coordType = Object.prototype.toString.call(item.geometry.coordinates[0][0])
          let coordinates= coordType=='[object Number]'?item.geometry.coordinates:item.geometry.coordinates[0]
          let boundsXY = []
          let bounds = coordinates.map((path) => {
            let lonLat = this.layoutCount(path);
            boundsXY.push(lonLat)
            return new AMap.LngLat(lonLat[0], lonLat[1]);
          });
          let ai = this.isBuildIntersectPointArea([120.270086,36.260043],bounds,0.005)
          let ai2 = this.isBuildIntersectPointArea([120.267897,36.265337],bounds,0.001)
          let buildHeight = Math.random() * 2000 + 50
          if(ai){
            buildHeight = 100
          }
          if(ai2){
            buildHeight = 500
          }
          let prism = new AMap.Object3D.Prism({
            path: bounds,
            height: buildHeight,
            color: [224 / 255, 224 / 255, 226 / 255, 0],
            zIndex: 10,
          });

          // 建筑贴图
          /* prism.textures.push(require('../assets/image/light/icon_20191105123314128_515937.png'));
          
          let geometry = prism.geometry
          for (let i = 0; i < item.geometry.coordinates[0].length-1; i++) {
              geometry.vertexUVs.push(0, 1);
              geometry.vertexUVs.push(0, 0);
              geometry.vertexUVs.push(1, 1);
              geometry.vertexUVs.push(1, 0);

          } */
          
          prism.transparent = true;
          this.object3Dlayer.add(prism);
          prism.boundsXY = boundsXY
          this.prisms.push(prism)
        });
        
          this.defaultColor();



    },
    lnglatToG20(lnglat){
        lnglat = this.map.lngLatToGeodeticCoord(lnglat);
        lnglat.x = AMap.Util.format(lnglat.x, 3);
        lnglat.y = AMap.Util.format(lnglat.y, 3);
        return lnglat;
    },
    getRandomPointInPolygon(n,polygon){
      let pointX = []
      let pointY = []
      polygon.forEach(item=>{
        pointX.push(item[0])
        pointY.push(item[1])
      })
      const minX = Math.min(...pointX)
      const maxX = Math.max(...pointX)
      const minY = Math.min(...pointY)
      const maxY = Math.max(...pointY)
      let points = []
      const pointRandom = (params) => {
        const pointX = (maxX - minX)*Math.random()+minX
        const pointY = (maxY - minY)*Math.random()+minY
        if(this.isPointInRing([pointX,pointY])){
          points.push([pointX,pointY])
        }
        if(points.length<n){
          pointRandom()
        }
      }
      pointRandom()
      return points
    },
    addMewballoon(){
      let points = this.getRandomPointInPolygon(200,this.path)
      
      points.forEach(item=>{
        let points3D = new AMap.Object3D.RoundPoints();
        points3D.transparent = true;
        let geometry = points3D.geometry;
        var center = this.lnglatToG20(item)
        geometry.vertices.push(center.x, center.y, -Math.random()*40000);
        geometry.pointSizes.push(Math.random()*2+3);
        geometry.vertexColors.push(Math.random()*255 / 255, Math.random()*255 / 255, Math.random()*255 / 255, .7);
        this.object3Dlayer.add(points3D);

        // points3D.borderColor = [0.5, 0.5, 0.5, 1];
        // points3D.borderWeight = 3;


        let ani = (params)=> {
          if(geometry.vertices[2]<-40000){
            geometry.vertices[2] = 0
          }
          geometry.vertices[2]-=Math.random()*10+15
          requestAnimationFrame(ani);
          points3D.needUpdate = true;
        }
        ani()
      })
      
      
    },
    mapActive() {
      var buildingLayer = new AMap.Buildings({
        zooms: [14, 18],
        zIndex: 99,
        merge: false,
        sort: false,
        heightFactor: 4,
      });
      var _this = this;
      var options = {
        hideWithoutStyle: false, //是否隐藏设定区域外的楼块
        areas: [
          {
            //围栏1
            //visible:false,//是否可见
            rejectTexture: false, //是否屏蔽自定义地图的纹理
            color1: "ffbcc1dd", //楼顶颜色
            color2: "ff25548e", //楼面颜色
            path: _this.path,
          },
        ],
      };
      buildingLayer.setStyle(options);
      return buildingLayer;
    },

    addRunBall() {
      // 创建跑动的光球
      var canvas = document.createElement("canvas");
      canvas.width = 5800;
      canvas.height = 3600;

      let startpoint = [120.202641, 36.242134]
      let endpoint = [120.346751]
      endpoint[1] = (endpoint[0]-startpoint[0])/(canvas.width/canvas.height)+startpoint[1]
      let leftTopPoint = [startpoint[0],endpoint[1]]
      let scale = canvas.width/(endpoint[0]-startpoint[0])
      console.log('leftTopPoing:',leftTopPoint,'比例：',scale);

      var ctx = canvas.getContext("2d");
      ctx.fillStyle = "#ff5256"; //设置填充颜色

      var _this = this;
      let pathsArr =mappaths.map(item=>{
        return {
          roadColor: "rgba(0,0,0,0)",
          lightColor: "#53D9FF",
          velocity: 800,
          start: 0,
          num: 1,
          positive: Math.random()>0.5,
          totalLength: 0,
          path: item,
        }
      })
      
      
      pathsArr = pathsArr.map((item) => {
        let x = [];
        let y = [];
        item.path[item.path.length-1] = [Math.ceil((item.path[item.path.length-1][0]-leftTopPoint[0])*scale) ,Math.ceil((leftTopPoint[1]-item.path[item.path.length-1][1])*scale)]
        for (let i = 0; i < item.path.length - 1; i++) {
          item.path[i] = [Math.ceil((item.path[i][0]-leftTopPoint[0])*scale) ,Math.ceil((leftTopPoint[1]-item.path[i][1])*scale)]
          item.totalLength += Math.sqrt(
            Math.pow(item.path[i][0] - item.path[i + 1][0], 2) +
            Math.pow(item.path[i][1] - item.path[i + 1][1], 2)
          );
          x.push(item.path[i][0]);
          y.push(item.path[i][1]);
        }
        x.push(item.path[item.path.length - 1][0]);
        y.push(item.path[item.path.length - 1][1]);
        item.area = {
          minX: Math.min.apply(null, x),
          minY: Math.min.apply(null, y),
          maxX: Math.max.apply(null, x),
          maxY: Math.max.apply(null, y),
        };
        item.xLength = item.area.maxX - item.area.minX
        item.yLength = item.area.maxY - item.area.minY
        item.maxXY = Math.max(item.xLength,item.yLength)
        return item;
      });
      function animate() {
        _this.frame[3] = requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        function getSpeedArr(a, b, start, end) {
          (start = start || 0), (end = 1 - end || 1);
          let length = (end - start) / (a + 1);
          let arr = [];
          for (let i = 0; i <= a; i++) {
            if (i === 0) {
            } else {
              let num = i * length + b;
              if (num <= start) {
                if (Math.abs(num) <= start) {
                  arr.push(end - Math.abs(num % start));
                } else {
                  let num2 = end - Math.abs(num % end);
                  arr.push(num2 <= start ? end - Math.abs(num % start) : num2);
                }
              } else if (num >= end) {
                if (num % end === 0) {
                  arr.push(start + 0.0000001);
                } else {
                  arr.push(num % end <= start ? start + 0.00000001 : num % end);
                }
              } else {
                arr.push(num);
              }
            }
          }
          arr.sort(function (a, b) {
            return a - b;
          });
          return arr;
        }
        pathsArr.forEach((item) => {
          let paths = item.path;
          let pathsLength = paths.length;
          let grd;
          if(item.maxXY<700){
            return
          }

          ctx.beginPath();
          for (let i = 0; i < pathsLength - 1; i++) {
            ctx.moveTo(paths[i][0], paths[i][1]);
            ctx.lineTo(paths[i + 1][0], paths[i + 1][1]);
          }

          if (item.positive) {
            item.start = item.start + item.velocity;
            if (item.start > item.totalLength) {
              item.start = 0;
            }
            let rate = item.start / item.totalLength;
            let rateL = (200/item.maxXY);
            let rateR = 0.0002 / item.totalLength;
            

            grd = ctx.createLinearGradient(
              item.area.minX,
              item.area.minY,
              item.area.maxX,
              item.area.maxY,
            );
            grd.addColorStop(0, item.roadColor);
            getSpeedArr(item.num, rate, rateL, rateR).forEach((sub) => {
              grd.addColorStop(sub - rateL, item.roadColor);
              grd.addColorStop(sub, item.lightColor);
              grd.addColorStop(sub + rateR, item.roadColor);
            });
            grd.addColorStop(1, item.roadColor);
          } else {
            item.start = item.start - item.velocity;
            if (item.start < -item.totalLength) {
              item.start = 0;
            }
            let rate = item.start / item.totalLength;
            let rateL = (200/item.maxXY);
            let rateR = 0.001 / item.totalLength;

            grd = ctx.createLinearGradient(
              item.area.minX,
              item.area.minY,
              item.area.maxX,
              item.area.maxY
            );
            grd.addColorStop(0, item.roadColor);
            getSpeedArr(item.num, rate, rateR, rateL).forEach((sub) => {
              grd.addColorStop(sub - rateR, item.roadColor);
              grd.addColorStop(sub, item.lightColor);
              grd.addColorStop(sub + rateL, item.roadColor);
            });
            grd.addColorStop(1, item.roadColor);
          }

          ctx.lineWidth = 5;
          ctx.strokeStyle = grd;
          ctx.stroke();
          ctx.closePath();
        });

        CanvasLayer.reFresh();
      }

      
      var CanvasLayer = new AMap.CanvasLayer({
        canvas: canvas,
        bounds: new AMap.Bounds(
          startpoint,
          endpoint
        ),
        zooms: [3, 18],
        zIndex: 80,
      });

      CanvasLayer.setMap(this.map);
      animate();
    },
    addShock() {
      // 创建震波
      var canvas = document.createElement("canvas");
      canvas.width = 5800;
      canvas.height = 3600;
      let startpoint = [120.202641, 36.242134]
      let endpoint = [120.346751]
      endpoint[1] = (endpoint[0]-startpoint[0])/(canvas.width/canvas.height)+startpoint[1]
      
      let leftTopPoint = [startpoint[0],endpoint[1]]
      let scale = canvas.width/(endpoint[0]-startpoint[0])
      var context = canvas.getContext("2d");

      context.globalAlpha = 1;
      context.lineWidth = 3;

      var radious = 0;
      let _this = this;
      var draw = function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
        //context.globalAlpha = (context.globalAlpha - 0.01 + 1) % 2;
        let count = 150
        radious++;
        if (radious > count) {
          radious = 0;
        }
        let rounds = [
          {
            center: [120.269883,36.256991],
            num: 5,
          },
          // {
          //   center: [120.258974,36.258174],
          //   num: 4,
          // },
          {
            center: [120.268066,36.2596],
            num: 4,
          },
          {
            center: [120.273701,36.259683],
            num: 4,
          },
          {
            center: [120.273286,36.313973],
            num: 6,
          },
        ];
        for (let i = 0; i < rounds.length; i++) {
          let num = rounds[i].num;
          let center = rounds[i].center;
          center = [Math.ceil((center[0]-leftTopPoint[0])*scale) ,Math.ceil((leftTopPoint[1]-center[1])*scale)]
          for (let j = 0; j < num; j++) {
            let width = (radious + j * (count / num)) % count;
            context.strokeStyle = `rgba(58,234,237,${1 - width / count})`;
            context.beginPath();
            context.arc(center[0], center[1], width, 0, 2 * Math.PI);
            context.stroke();
          }
        }

        //2D视图时可以省略
        CanvasLayer.reFresh();

        _this.frame[0] = requestAnimationFrame(draw);
      };

      var CanvasLayer = new AMap.CanvasLayer({
        canvas: canvas,
        bounds: new AMap.Bounds(
          startpoint,
          endpoint
        ),
        zooms: [3, 18],
        zIndex: 5,
      });

      CanvasLayer.setMap(this.map);
      draw();
    },
    creatRegularPrism(center, segment, height, radius, color) {

        var cylinder = new AMap.Object3D.MeshAcceptLights();
        var geometry = cylinder.geometry;
        var verticesLength = segment * 2;
        var path = [];
        for (var i = 0; i < segment; i += 1) {
            var angle = 2 * Math.PI * i / segment;
            var x = center.x + Math.cos(angle) * radius;
            var y = center.y + Math.sin(angle) * radius;
            path.push([x, y]);
            geometry.vertices.push(x, y, -height); // 底部顶点
            geometry.vertices.push(x, y, -height); // 顶部顶点

            geometry.vertexColors.push.apply(geometry.vertexColors, color); // 底部颜色
            geometry.vertexColors.push.apply(geometry.vertexColors, color); // 顶部颜色

            var nX = Math.cos(angle);
            var nY = Math.sin(angle);
            // 为了支持光照，计算侧面顶点法向量
            geometry.vertexNormals.push(nX, nY, 0);
            geometry.vertexNormals.push(nX, nY, 0);

            var bottomIndex = i * 2;
            var topIndex = bottomIndex + 1;
            var nextBottomIndex = (bottomIndex + 2) % verticesLength;
            var nextTopIndex = (bottomIndex + 3) % verticesLength;

            geometry.faces.push(bottomIndex, topIndex, nextTopIndex); // 侧面三角形1
            geometry.faces.push(bottomIndex, nextTopIndex, nextBottomIndex); // 侧面三角形2
        }

        // 构建顶面三角形,一样的颜色,但是法向量不一样，所以需要独立的顶点
        for (var i = 0; i < segment; i += 1) {
            geometry.vertices.push.apply(geometry.vertices, geometry.vertices.slice(i * 6 + 3, i * 6 + 6)); // 底部顶点
            geometry.vertexColors.push.apply(geometry.vertexColors, color);
            // 为了支持光照，计算顶面顶点法向量
            geometry.vertexNormals.push(0, 0, -1);
        }
        
        var triangles = AMap.GeometryUtil.triangulateShape(path);
        var offset = segment * 2;
        for (var v = 0; v < triangles.length; v += 3) {
            geometry.faces.push(triangles[v] + offset, triangles[v + 2] + offset, triangles[v + 1] + offset)
        }

        cylinder.transparent = true;//如果使用了透明颜色，请设置true
        this.object3Dlayer.add(cylinder);
        return cylinder
    },
    isBuildIntersectPointItem(pointPrism,buildPrism){
      let states = []
      buildPrism.boundsXY.forEach(item=>{
        states.push(Math.sqrt(Math.pow(pointPrism[0]-item[0],2)+Math.pow(pointPrism[1]-item[1],2))<0.001)
      })
      return states.some(item=>item)
    },
    add3DPoint(){
      let point=[{center:[120.279041,36.265871],color:[1, 1, 0],heigth:4001,gltf:'https://park-static.oss-cn-hangzhou.aliyuncs.com/joubn.gltf'},{center:[120.266338,36.265248],color:[1, 0, 0],heigth:2000,gltf:'https://park-static.oss-cn-hangzhou.aliyuncs.com/joubn2.gltf'}]

      point.forEach(item=>{
        var geo = this.map.lngLatToGeodeticCoord(item.center);
        let pointPrism = this.creatRegularPrism(geo, 32, 100, 1400, [...item.color, .2])
        let pointPrismSide = this.creatRegularPrism(geo, 32, 102, 1000, [...item.color, .3])
        this.prisms.forEach(buildPrism=>{
          if(this.isBuildIntersectPointItem(item.center,buildPrism)){
            this.updatePrismColor(buildPrism,[...item.color, 1],[item.color[0]*0.3,item.color[1]*0.3,item.color[2]*0.3, 1])
          }
        })

        var option = {
          position: new AMap.LngLat(...item.center),
          scale:300,
          height:4001,
          scene: 0
        }

        // 加载AMap.GltfLoader插件
        this.map.plugin(["AMap.GltfLoader"],(gltfCity)=>{
          var gltf = new AMap.GltfLoader();
          var url = item.gltf;
          gltf.load(url, ( gltfObj )=>{
            gltfObj.rotateX(90);
            gltfObj.setOption(option);
            this.object3Dlayer.add(gltfObj);

            let stateUp = true
            let step = 30
            let aniHandel = null
            let ani = (params)=> {
              if(stateUp){
                if(option.height>4000){
                  stateUp = false
                }
                option.height += step
                option.scale += step/15
                
              }else{
                if(option.height<3000){
                  stateUp = true
                }
                option.height -= step
                option.scale -= step/15
              }

              // 倒影动画
              this.object3Dlayer.remove(pointPrismSide);
              pointPrismSide = this.creatRegularPrism(geo, 32, 108, option.height/5, [...item.color, .5])

              
              this.object3Dlayer.remove(gltfObj);
              
              gltfObj.setOption(option);
              gltfObj.rotateZ(option.height/3);
              this.object3Dlayer.add(gltfObj);
              aniHandel = requestAnimationFrame(ani);
            }
            ani()
            
          })
        })
      })
    },
    twoPointSegment(lnglats,step){
      let arr = []
      for (let i = 0; i < lnglats.length-1; i++) {
        let p1 = lnglats[i]
        let p2 = lnglats[i+1]
        let twoPointlen = Math.sqrt(Math.pow(p1[0]-p2[0],2)+Math.pow(p1[1]-p2[1],2))
        let twoPointStep = Math.floor(twoPointlen/step);
        let xSegment = (p2[0]-p1[0])/twoPointStep
        let ySegment = (p2[1]-p1[1])/twoPointStep
        for (let index = 0; index < twoPointStep; index++) {
          let x = p1[0]+(xSegment*index)
          let y = p1[1]+(ySegment*index)
          arr.push([x,y])
        }
      }
      arr.push(lnglats[lnglats.length-1])
      return arr
    },
    
    addLine(lnglats){
      let step = 0.001
      let activeColorLen = 10
      let activeIndex = [10,40,70]
      lnglats?lnglats:lnglats = [[120.279041,36.265871],[120.278505,36.265962],[120.278668,36.263697],[120.279397,36.261378],[120.270084,36.258956],[120.270084,36.265842],[120.266338,36.265248]]

      var meshLinebtm = new AMap.Object3D.MeshLine({
          path: lnglats,
          height: 7,
          width: 4,
          color: 'rgba(255,0,0, 0.9)'
      })
      this.object3Dlayer.add(meshLinebtm);

    

      let points = this.twoPointSegment(lnglats,step);
      
      let meshLineArr = []
      

      for (let index = 0; index < points.length-2; index+=2) {
        let meshLine = new AMap.Object3D.MeshLine({
            path: [points[index],points[index+1],points[index+2]],
            height: 20,
            width: 4,
            color: `rgba(255,255,0, 0)`
        })
        meshLine.transparent = true;
        meshLineArr.push(meshLine)
        this.object3Dlayer.add(meshLine);
      }

      let ani=()=> {
        activeIndex.forEach((item,j)=>{
          if(activeIndex[j]>meshLineArr.length-3+activeColorLen){
            activeIndex[j] = 0
          }
          for (let i = 0; i < activeColorLen; i++) {
            let active = activeIndex[j]-i
            if(active>=0&&meshLineArr[active]){
              meshLineArr[active].setColor(`rgba(255,255,0, ${(activeColorLen-i-1)/activeColorLen})`)
            }
          }
          activeIndex[j]++
        })
        
        requestAnimationFrame(ani);
      }
      ani() 
    },
    isPointInRing(point) {
      return AMap.GeometryUtil.isPointInRing(point, this.path);
    },
    randomPan() {
      let random1 = Math.random();
      if (random1 <= 0.33) {
        this.panXY[0] = -0.00001;
      } else if (random1 > 0.33 && random1 < 0.66) {
        this.panXY[0] = 0;
      } else {
        this.panXY[0] = 0.00001;
      }
      let random2 = Math.random();
      if (this.panXY[0] == 0) {
        if (random2 > 0.5) {
          this.panXY[1] = -0.00001;
        } else {
          this.panXY[1] = 0.00001;
        }
      } else {
        if (random2 <= 0.33) {
          this.panXY[1] = -0.00001;
        } else if (random2 > 0.33 && random2 < 0.66) {
          this.panXY[1] = 0;
        } else {
          this.panXY[1] = 0.00001;
        }
      }
    },
    getSuccessPos() {
      this.randomPan();
      let panArr = this.config.center.map((item, index) => {
        return Number(item) + this.panXY[index];
      });
      if (this.isPointInRing(panArr)) {
        return panArr;
      } else {
        this.getSuccessPos();
      }
    },
  },
  watch: {
    /* '$route.path': function (newVal, oldVal) {
      if(!this.object3Dlayer){
        return
      }
      this.clearMap()
      this.map.setRotation(-4.66);this.map.setCenter([120.275982, 36.26887]);this.map.setZoom(14.51);this.map.setPitch(54.16021355617455);
      if(newVal=='/contingencyManagement'){
        this.addWarnMan() 
      }
    },
    '$store.state.addPlicePoint': function (newVal, oldVal) {
      if(newVal){
        
        this.addPoliceMan() 
      }
    },
    '$store.state.policeGo': function (newVal, oldVal) {
      if(newVal){
        let lines = this.addPoliceManLine()
        this.policeMarkes.push(...lines)
        this.policeLinesMarkes.push(...lines)
      }
    } */
  }
};
</script>

<style scoped lang="scss">
@import "../assets/css/mixin";

.map-town {
  @include wh(100%, 100%);
  position: absolute;
  top: 0;
  left: 0;

}
.warn-box{
  position: absolute;
  z-index: 90;
  margin-left: .31rem;
  margin-top: .88rem;
  .warn-info{
    display: flex;
    align-items: center;
    margin-bottom: .3rem;
    img{
      width: 0.35rem;
      height: 0.35rem;
      margin-right: .2rem;
    }
    .info{
      font-size: 0.24rem;
      color: rgba(255, 255, 255, .6);
      span{
        font-size: 0.30rem;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        margin-right: .2rem;
      }
    }
  }
}

.slide-enter, .slide-leave-to
 {
  opacity: 0;
  transform: translateY(30px);
}
.slide-leave-active {
  position: absolute;
}

.warn-list{
//    position: relative;
  li{
    width: 2.03rem;
    height: .64rem;
    margin-bottom: .17rem;
    background-size: 100% 100%;
    padding-top:.3rem;
    padding-left: .5rem;
    font-size: 0.18rem;
    font-weight: bold;
    transition: all 1s;

    &.red{
    @keyframes redAni
      {
        from { box-shadow: 0px 0px 10px rgba(232, 44, 55, .2);}
        to { box-shadow: 0px 0px 10px rgba(232, 44, 55, 1);}
      }
      animation: redAni 2s infinite 1s alternate ;
      background-image: url('../assets/image/point/warn-pop1.png');
      color: rgba(232, 44, 55, 1);
      box-shadow: 0px 0px 10px rgba(232, 44, 55, 1);
    }
    &.orage{
      @keyframes yellowAni
        {
        from {   box-shadow: 0px 0px 10px rgba(245, 182, 43, .2);}
        to {   box-shadow: 0px 0px 10px rgba(245, 182, 43, 1);}
        }
      animation: yellowAni 2s infinite 1s alternate ;
      background-image: url('../assets/image/point/warn-pop2.png');
      color:rgba(245, 182, 43, 1);
      box-shadow: 0px 0px 10px rgba(245, 182, 43, 1);
    }
  }
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(.3rem);
}
.list-complete-leave-active {
  position: relative;
}


</style>
<style lang="scss">
@import "../assets/css/mixin";
.amap-logo,
.amap-copyright {
  display: none !important;
}
.mt {
  margin-bottom: 12px;
}

.amap-marker {
  .amap-marker-content {
    .custom-content-marker {
      position: relative;
      width: 41.30px;
      height: 55.30px;
      margin-left: 9.10px;
      margin-top: -56.00px;
      &.bg-round{
        &::after,
        &::before {
          content: "";
          position: absolute;
          left: 50%;
          top:50%;
          transform: translate(-50%,-50%);
        }
        &::after {
          width: 49px;
          height: 49px;
          background: #370B0E;
          border: 0.70px solid #E82C37;
          opacity: 0.6;
          border-radius: 50%;
        }
        &::before {
          width: 70px;
          height: 70px;
          background: #CB2A32;
          opacity: 0.32;
          border-radius: 50%;
        }
      }
      
      .custom-img {
        position: relative;
        z-index: 2;
        width: 100%;
        height: 100%;
      }
      .custom-content{
        display: none;
        width: 467px;
        height: 666px;
        background-image: url('../assets/image/point/warn-bg.png');
        background-size: 100% 100%;
        position: absolute;
        left: 200px;
        top: -110px;
        .custom-content-title{
              position: absolute;
              right: 10%;
              font-size: 0.28rem;
              font-family: AliHYAiHei;
              font-weight: bold;
              color: #ffffff;
              margin-bottom: 0.01rem;
        }
        &::before {
          content: "";
          position: absolute;
          width: 130px;
          height: 2px;
          background-image: linear-gradient(to right,  rgba(232, 44, 55, 0) 0%, rgba(232, 44, 55, 1) 20%, rgba(232, 44, 55, 1) 100%);
          left: -130px;
          transform: rotate(-31deg);
          top: 80px;
        }
        .g-left-bg {
          @include wh(100%,100%);
          position: relative;
          padding:42px 50px 15px 57px;
          margin-top: 14px;
          .q-title {
            color: #E82C37;
          }
          .q-text {
            color: #fff;
          }
          .q-text,.q-title {
            // font-size: 18px;
            font-family: PingFang SC;
            // font-weight: bold;
          }

          .warn-btn {
            @include bis("../../static/images/img/warn-btn.png");
            @include wh(117px, 43px);
            margin-right: 15px;
            text-align: center;
            line-height: 41px;
            font-size: 14px;
            color: #fff;
            cursor: pointer;
          }

          .line {
            margin: 8px 0;
            width: 355px;
            height: 1px;
            background-image: linear-gradient(to right, rgba(255,0,0,0), rgba(232, 44, 55,1),rgba(255,0,0,0),);
            opacity: 0.6;
          }

          .user-info {
            display: flex;
            img {
              @include wh(86px,86px);
              margin-right: 11px;
            }
          }
          .warn-btn2 {
            @include bis("../../static/images/img/warn-btn2.png");
            @include wh(117px, 43px);
            margin-right: 15px;
            text-align: center;
            line-height: 41px;
            font-size: 14px;
            color: #fff;
            cursor: pointer;
          }
          .active-btn {
            @include bis("../../static/images/img/active-btn.png");
            @include wh(157px, 79px);
            margin-right: 15px;
            text-align: center;
            line-height: 85px;
            font-size: 14px;
            color: #fff;
            cursor: pointer;
            margin: 0 0 10px -26px;
            padding-left: 17px;
          }
          .f-video{
            margin-top: 10px;
            object-fit: contain;
            width: 360px;
            height: 202px;
            background: rgba(6, 21, 38, .6);
            outline: none;
          }
          .btn-box{
            margin-top: -10px;
          }
        }
      }
 
    }
  }
}

.marker-point {
  background-color: #011C35;
  word-break: keep-all;
  color: #fff;
  text-align: left;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  text-shadow: 1px 1px 1px #000;
  margin-top: -50px;
  padding: 5px 10px;
  padding-left: 25px;
  box-shadow: 0 0 5px rgb(38, 94, 184);
  margin-left: 10px;
  border: 1px solid;
  border-image: linear-gradient(0deg, #3186C0, #3EDAF3) 10 10;
  &::before {
    content: "";
    position: absolute;
    left: -25px;
    height: 150%;
    top: -24%;
    width: 45px;
    background-image: url('../assets/image/point/point-icon.png');
    background-size: 100% 100%;
    

  }
  &::after {
    content: "";
    position: absolute;
    bottom: -26px;
    height: 25px;
    left: 50%;
    width: 27px;
    transform: translateX(-50%);
    background-image: url('../assets/image/point/point-arrow.png');
    background-size: 100% 100%;
  }
}

</style>

