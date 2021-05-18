<template>
  <div class="f-wrap">
    <slot></slot>
  </div>
</template>

<script>
  import * as mobile from '../../config/mUtils'
  import {mapState, mapMutations, mapActions} from 'vuex'

  export default {
    name: 'App',
    data() {
      return {}
    },
    props: {},
    mounted() {

    },
    components: {},
    computed: {},
    methods: {
      init() {

      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../../assets/css/mixin';

  .f-wrap {
    background: url("http://py-intellect-screen.zhihuipk.com/static/property-img/wrap.png") no-repeat;
    background-size: 100% 100%;
    padding: .13rem .45rem .23rem .4rem;
    box-sizing: border-box;
  }
</style>
