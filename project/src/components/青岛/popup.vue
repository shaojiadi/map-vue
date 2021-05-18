<template>
  <div class="f-popup" ref="popup">
    <div class="f-close" @click.stop="close"></div>
    <!-- <div class="f-popup-header">
      <h3 class="title">{{title}}</h3>
    </div> -->
    <div class="f-popup-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import * as mobile from "../../config/mUtils";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "App",
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
    },
  },
  mounted() {},
  components: {},
  computed: {},
  methods: {
    init() {},
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/css/mixin";

.f-popup {
  z-index: 200;
  position: absolute;
  // right: 0;
  // bottom: -0.19rem;
  top: .3rem;
  width: 17rem;
  height: 10rem;
  background: url("/static/bounced-img/弹窗.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  transform: scale(0.95);
  .f-close {
    position: absolute;
    width: 0.68rem;
    height: 0.68rem;
    right: 0.11rem;
    top: 0.18rem;
    background: url("http://py-intellect-screen.zhihuipk.com/static/property-img/video-close.png")
      no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
    padding: 0.07rem;
    box-sizing: border-box;
    z-index: 200;
  }

  &-header {
    position: relative;
    z-index: 100;

    .title {
      text-align: center;
      font-size: 0.32rem;
      font-family: FZLTZHK--GBK1-0;
      font-weight: bold;
      color: rgba(194, 231, 255, 1);
      text-shadow: 0 0.03rem 0.06rem rgba(8, 1, 2, 0.48);
      padding: 0.15rem 0.2rem;
      padding-left: 0;
      box-sizing: border-box;
    }
  }

  &-content {
    flex: 1;
    width: 100%;
    padding: 0.3rem 0.4rem;
    box-sizing: border-box;
    // overflow: auto;
    transform: scale(.95)
  }
}
</style>
