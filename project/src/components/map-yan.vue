<template>
  <div class="map-yan" id="container2"></div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { lazyAMapApiLoaderInstance } from "vue-amap";
export default {
  props: {},
  data() {
    return {
      map: null,
      activeIndex: -1,
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

      console.log(this.activeIndex,7777);
      this.map.on("complete", () => {
        this.map.on("mousemove", e => {//鼠标移动事件
          // console.log(this.map.getRotation(),"鼠标移动")
        });
        this.map.on("click", e => {//点击事件
          console.log(
            this.map.getRotation(),
            this.map.getPitch(),
            this.map.getCenter(),       //获取中心点
            this.map.getZoom(),"点击"    //获取层级
          );
        });
        this.map.on("mapmove", e => {//移动事件
          // console.log(this.map.getCenter(),"移动")
        });
        this.map.on("zoomchange", e => {//缩放大小
          // console.log(this.map.getZoom(),"缩放")
        });
      });
  });



  },
  beforeDestroy() {},
  computed: {
    datas() {}
  },
  methods: {
    init(){
      this.map = new AMap.Map("container2", this.config);
      if(this.activeIndex==3){
        let imgUrl = '../../static/icon/icon1.png'
        //标记点
        var positions = [
          [120.199627,36.277234],
          [120.295328,36.347391],
          [120.27284,36.252347],
          [120.245718,36.237395],
          [120.368971,36.264113],
        ];
        this.getPoints(imgUrl,positions,42,50)

        let imgUrl2 = '../../static/icon/icon2.png'
        var positions2 = [
          [120.226425, 36.336741],
          [120.22943, 36.335476],
          [120.227108, 36.334376],
          [120.230932, 36.333826],
          [120.226971, 36.332561],
          [120.229842, 36.332176],
          [120.231754, 36.331406],
          [120.227247, 36.330361],
          [120.230184, 36.33003],
          [120.231959, 36.328985],
          [120.226974, 36.32816],
          [120.23073, 36.327225],
          [120.228545, 36.326345],
          [120.22793, 36.323649],
          [120.232642, 36.325465],
          [120.2351, 36.32849],
          [120.235031, 36.326895],
          [120.237421, 36.32585],
          [120.234963, 36.324254],
        ];
        this.getPoints(imgUrl2,positions2,17,17);

        let imgUrl3 = '../../static/icon/icon3.png'
        var positions3 = [
          [120.228296, 36.319984],
          [120.23077, 36.318583],
          [120.229099, 36.317074],
          [120.230704, 36.31465],
          [120.235987, 36.316805],
          [120.234181, 36.319823],
          [120.238729, 36.320469],
          [120.237057, 36.314003],
          [120.232509, 36.311632],
          [120.231105, 36.309853],
          [120.237458, 36.311039],
        ];
        this.getPoints(imgUrl3,positions3,17,17);


        var path = [
          new AMap.LngLat(116.368904,39.913423),
          new AMap.LngLat(116.382122,39.901176),
          new AMap.LngLat(116.387271,39.912501),
          new AMap.LngLat(116.398258,39.904600)
        ];

        var path = [new AMap.LngLat(120.208613,36.305754), new AMap.LngLat(120.256684,36.309942)]

        // 创建折线实例
        var polyline = new AMap.Polyline({
          path: path,  
          borderWeight: 3, // 线条宽度，默认为 1
          strokeWeight: 8, //重点线宽
          strokeColor: 'rgba(0, 0, 255, 1)', // 线条颜色
          lineJoin: 'round' // 折线拐点连接处样式
        });

        // 将折线添加至地图实例
        this.map.add(polyline);

      }else if(this,this.activeIndex==0){
        var path = [
            new AMap.LngLat(120.260474,36.27221),
            new AMap.LngLat(120.262963,36.273231),
            new AMap.LngLat(120.263307,36.272124),
            new AMap.LngLat(120.263478,36.271311),
            new AMap.LngLat(120.26365,36.270671),
        ];

        var polygon = new AMap.Polygon({
            path: path,  
            fillColor: 'rgba(0, 0, 255, .2)', // 多边形填充颜色
            borderWeight: 8, // 线条宽度，默认为 1
            strokeColor: '#0000FF', // 线条颜色
        });

        this.map.add(polygon);

        // 缩放地图到合适的视野级别
        this.map.setFitView([ polygon ])
      }
    },
    getPoints(imgUrl,positions,w,h){
      var icon = [];
      var marker = [];
      for (var i = 0; i < positions.length; i++) {
          // 创建一个 Icon
          var imageUrl = imgUrl
          icon[i] = new AMap.Icon({
              // 图标尺寸
              size: new AMap.Size(w, h),
              // 图标的取图地址
              image: imageUrl,
              // 图标所用图片大小
              imageSize: new AMap.Size(w, h),
          });
          // 将 Icon 传入 marker
          marker[i] = new AMap.Marker({
              position: positions[i],
              icon: icon[i],
              anchor: 'bottom-right', //设置锚点
              offset: new AMap.Pixel(0,0), //设置偏移量
          });
          this.map.add(marker[i]);
        }

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
        this.activeIndex = this.$store.state.activeIndex;
        this.init();
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "../assets/css/mixin";

.map-yan {
  @include wh(100%, 100%);
  z-index: 999;
}
</style>
<style lang="scss">

</style>

