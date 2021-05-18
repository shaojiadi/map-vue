<template>
  <iframe
    class="video-js"
    :src="'http://player.zhihuipk.com/index.html?url=' + src"
    allowfullscreen="true"
    frameborder="0"
  ></iframe>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    src: {
      type: String,
      //http://video.zhihuipk.com/unv/unv0.m3u8
      default: "",
    },
    id: {
      type: String,
      default: "video",
    },
  },
  mounted() {
  },
  components: {},
  computed: {},
  methods: {},
  watch: {
    src() {
      let video = document.getElementsByClassName("video-js");
      console.log(video);
    },
  },
};
</script>

<style lang="scss">
.video-js {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
