<template>
  <div id="app">
    <!-- <div class="action"><span @click="action">action</span><span @click="pause">pause</span><span @click="stop">stop</span> <span @click="reset">reset</span></div> -->
    <v-header></v-header>
    <router-view ref="router"></router-view>
    <transition name="slide-sace">
      <v-toast v-if="$store.state.toastShow"/>
    </transition>
     <div class="g-maskbgs">
      <v-map-yan></v-map-yan>
      <!-- <img src="/static/bounced-img/mask.png" alt /> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
let monitoList = () => axios.get(`/mortar/screen/monitoList`);
export default {
  name: "app",
  data() {
    return {
      activeTimeout:null,
      activeIndex:1
    };
  },
  mounted() {
    monitoList()
      .then((res) => {
          this.$store.state.videoList = JSON.parse(res.data.data);
      })
      .catch((_) => {
        console.log(_);
      });
  },
  methods:{
    pause(){
      window.clearTimeout(this.activeTimeout)
      this.activeTimeout = null
    },
    stop(){
      this.pause()
      this.activeIndex = 1
    },
    reset(){
      this.pause()
      this.$router.push('/indexMain')
      this.activeIndex = 1
      this.action1()
    },
    action(){
      if(this.activeTimeout){
        this.pause()
      }
      this['action'+this.activeIndex]()
    },
    action1(){
      this.activeIndex = 2
      this.$refs.router.toggle()
      this.activeTimeout = setTimeout(() => {
        this.action2()
      }, 3000);
      
    },
    action2(){
      this.activeIndex = 3
      window.showContent(document.querySelector('#showContent'))
      this.activeTimeout = setTimeout(() => {
        this.action3()
      }, 2000);
    },
    action3(){
      this.activeIndex = 4
      window.openDialog()
      this.activeTimeout = setTimeout(() => {
        this.action4()
      }, 5000);
    },
    action4(){
      this.activeIndex = 5
      this.$refs.mapTown.dialogShow = false
      this.activeTimeout = setTimeout(() => {
        this.action5()
      }, 2000);
    },
    action5(){//进入应急管理
    this.activeIndex = 6
      this.$router.push('/contingencyManagement')
      this.activeTimeout = setTimeout(() => {
        this.action6()
      }, 2000);
    },
    action6(){
      this.activeIndex = 7
      this.$refs.mapTown.moveWarnMan()
      this.activeTimeout = setTimeout(() => {
        this.action7()
      }, 5000);
    },
    action7(){
      this.activeIndex = 75
      this.$refs.router.isShowDialog = true
      this.activeTimeout = setTimeout(() => {
        this.action75()
      }, 2000);
    },
    action75(){
      this.activeIndex = 8
      this.$refs.router.isShowDialog = false
      this.activeTimeout = setTimeout(() => {
        this.action8()
      }, 1000);
    },
    action8(){
      this.activeIndex = 9
      this.$store.state.addPlicePoint++
      this.activeTimeout = setTimeout(() => {
        this.action9()
      }, 5000);
    },
    action9(){
      this.activeIndex = 10
      this.$store.state.policeGo++
      this.activeTimeout = setTimeout(() => {
        this.action10()
      }, 5000);
    },
    action10(){
      this.activeIndex = 11
      this.Toast('安保人员相应按照推荐路线抵达现场!',2000);this.$refs.mapTown.movePliceMain();
      this.activeTimeout = setTimeout(() => {
        this.action11()
      }, 8000);
    },
    action11(){//档案中心
    this.activeIndex = 12
      this.$router.push('/archivesCenter')
      this.activeTimeout = setTimeout(() => {
        this.action12()
      }, 3000);
    },
    action12(){
      this.activeIndex = 13
      this.$router.push('/contingencyManagement')
      this.activeTimeout = setTimeout(() => {
        this.action13()
      }, 3000);
    },
    action13(){
      this.$router.push('/indexMain')
      this.pause()
      this.activeIndex = 1
    },
  },
  watch: {
    'activeIndex': function (newVal, oldVal) {
      //alert(newVal)
    }
  }
};
</script>

<style lang="scss">
@import "assets/css/base";
@import "assets/font/font_3.0/iconfont.css";
@import "assets/font/font-industry/iconfont.css";
@import "assets/css/swiper-3.4.2.min.css";
 @import 'assets/font/font-fa/font-awesome.min.css';

.g-maskbgs {
  // pointer-events: none;
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
  }
}
.second-page {
        width: 100%;
    height: 100%;
  @include bis("/static/bounced-img/second-bg.jpg");
}

html,
body {
  width: 100%;
  height: 100%;
}
.action{
  position: absolute;
  z-index: 100;
  cursor: pointer;
  span{
    display: inline-block;
    margin: 20px;
    color: red;
  }
}
#app {
  position: absolute;
  width: 100%;
  height: 10.8rem;
  left: 0;
  top: 0;
  background-size: 100% 100%;
  overflow: hidden;
}

@font-face {
  font-family: "alterbatebold";
  src: url("assets/font/alterbatebold/alterbatebold.eot");
  src: url("assets/font/alterbatebold/alterbatebold.eot?#iefix")
      format("embedded-opentype"),
    url("assets/font/alterbatebold/alterbatebold.woff") format("woff"),
    url("assets/font/alterbatebold/alterbatebold.svg") format("svg"),
    url("assets/font/alterbatebold/alterbatebold.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "zhonghei";
  src: url("assets/font/zhonghei/zhonghei.eot");
  src: url("assets/font/zhonghei/zhonghei.eot?#iefix")
      format("embedded-opentype"),
    url("assets/font/zhonghei/zhonghei.woff") format("woff"),
    url("assets/font/zhonghei/zhonghei.svg") format("svg"),
    url("assets/font/zhonghei/zhonghei.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "RTWS ShangGothic G0v1";
  src: url("assets/font/qd-font/sf-go-normal.otf");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "RTWS ShangGothic G0v1-bold";
  src: url("assets/font/qd-font/sf-go-bold.otf");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "AliHYAiHei";
  src: url("assets/font/qd-font/AliHYAiHei.ttf");
  font-weight: normal;
  font-style: normal;
}
.slide-sace-enter-active {
  animation: slide-in-sace 1s;
}

.slide-sace-leave-active {
  animation: slide-leave-sace 1s;
}
@keyframes slide-in-sace {
  0% {
    z-index: 190;
    opacity: 0;
    transform: scale(0.6);
  }

  50% {
    z-index: 190;
    opacity: 1;
    transform: scale(0.6);
  }

  100% {
    z-index: 200;
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes slide-leave-sace {
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
    transform: scale(0.6);
  }
}


</style>
