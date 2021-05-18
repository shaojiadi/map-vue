<template>
  <div class="contain">
    <p>
      自主可控智慧安防园区指挥中心
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
  },
};
</script>

<style scoped lang="scss">
@import "../assets/css/mixin";



.contain {
  position: absolute;
  top: 0;
  z-index: 99;
  p {
    @include wh(6.64rem, 0.82rem);
    @include bis('../../static/lanwan/title.png');
    background-position: -0.83rem -0.05rem;
    letter-spacing: 0.04rem;
    font-size: 0.32rem;
    font-family: AliHYAiHei;
    font-weight: bold;
    color: #FFFFFF;
    line-height: .63rem;
    text-shadow: 0rem 0rem 0rem rgba(5, 17, 54, 0.34);
    padding-left: .2rem;
    transform:skew(-10deg);
  }
}
</style>