<template>
  <div id="video" style="width: 100%; height: 100%"></div>
</template>




<script>
// import ckplayer from "../../config/ckplayer.min.js";

export default {
  props: {
    srcc: {
      type: String,
    },
  },
  data() {
    return {};
  },
  mounted() {
     console.log(1);
        let videoObject = {
          playerID: "ckplayer01", //播放器ID，第一个字符不能是数字，用来在使用多个播放器时监听到的函数将在所有参数最后添加一个参数用来获取播放器的内容
          container: "#video", //容器的ID或className
          variable: "player", //播放函数名称
          volume: 0,
          loop: false, //播放结束是否循环播放
          html5m3u8: true,
          autoplay: true, //是否自动播放
          // mobileCkControls: true, //是否在移动端（包括ios）环境中显示控制栏
          mobileAutoFull: false, //在移动端播放后是否按系统设置的全屏播放
          live: true,
          video: "", //播放地址
        };
        // const getQueryString = (name) => {
        //   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        //   var r = window.location.search.substr(1).match(reg);
        //   if (r != null) return decodeURI(r[2]);
        //   return null;
        // };
        let url = this.srcc;
        console.log(url);
        Object.assign(videoObject, {
          html5m3u8: /\.m3u8/.test(url),
          flashPlayer: /^rtmp/.test(url),
          video: url,
        });

        let player = new ckplayer(videoObject);
        player.videoPlay();
  },
  methods: {},
  watch: {
    'srcc': {
      handler(newName, oldName) {
        
      },
    },
  },
};
</script>
<style scoped lang="scss">
@import "~@/assets/css/mixin";
</style>