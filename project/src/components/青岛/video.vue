<template>
  <video
    class="video-js"
    :controls="hasControl"
    muted
    ref="video"
    preload="auto"
    :id="id"
    poster="/static/bounced-img/play.png"
    data-setup='{}'>
    <source :src="src">
    <p class="vjs-no-js">
      To view this video please enable JavaScript, and consider upgrading to a
      web browser that
      <a href="http://videojs.com/html5-video-support/" target="_blank">
        supports HTML5 video
      </a>
    </p>
  </video>
</template>

<script>
import videojs from "video.js";
import "video.js/dist/video-js.css";

require("videojs-flash");

export default {
  data() {
    return {
      url: "",
    };
  },
  props: {
    src: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "video",
    },
    hasControl: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.initVideo();
    console.log(this.player,98979)
  },
  components: {},
  computed: {},
  methods: {
    initVideo() {
      if (this.player) {
        console.log(this.player,98979)
        // this.player.dispose();
      }
      this.player = videojs(this.id, {
        language: "zh-CN",
        techOrder: ["html5"],
        flash: { swf: "/static/js/video-js.swf" },
        autoplay: true,
        controlBar: {
          currentTimeDisplay: true, // 当前时间
          timeDivider: true, // 时间分割线
          durationDisplay: true, // 总时间
          progressControl: true, // 进度条
          remainingTimeDisplay: false, //
          customControlSpacer: true, //
          fullscreenToggle: true, // 全屏按钮
          volumePanel: false,
        },
        loop:true,
      });
      this.player.autoplay();
    },
  },
  beforeDestroy() {
    // this.player.dispose();
    this.player = "";
  },
  watch: {
    src: {
      handler: function (val, oldval) {
        if (this.player) {
          this.player.src(val);
          this.player.play();
        }
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" >
.video-js {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.min-width-400 {
  /*min-width: 400px;*/
}

.min-height-300 {
  /*min-height: 300px;*/
}

.vjs-poster {
  background-size: 15%;
}
.vjs-big-play-button,
.vjs-modal-dialog-content {
  display: none;
}
.vjs-error-display {
  &::before {
    display: none;
  }
}
.vjs-big-play-button {
  display: none !important;
}
</style>
