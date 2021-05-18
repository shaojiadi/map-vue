<template>
  <div class="security-center">
    <div class="center-box">
      <i class="el-icon-warning-outline"></i>
      <p>{{ $store.state.toastMessage }}</p>
    </div>
  </div>
</template>

<script>
import * as mobile from "../../config/mUtils";

export default {
  name: "App",
  data() {
    return {};
  },
  props: {},
  created() {},
  mounted() {},
  components: {},
  computed: {},
  methods: {},
};
</script>

<style scoped lang="scss">
@import "../../assets/css/mixin";
.security-center {
  width: 4.78rem;
  height: 2.16rem;
  @include bis("/static/bounced-img/SecurityCenter.png");
  position: absolute;
  left: 50%;
  top: .5rem;
  margin-left: -2.39rem;
  z-index: 9999;
  padding: 0.7rem 0.7rem 0.91rem 0.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  .center-box {
    display: flex;
    justify-content: center;
    align-items: top;
  }
  i {
    font-size: 0.3rem;
    margin-right: 0.2rem;
    margin-top: 0.03rem;
    color: #7af4fd;
  }
  p {
    font-size: 0.24rem;
    color: #7af4fd;
  }
}
</style>
