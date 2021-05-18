<template>
  <div class="f-input">
    <input v-model="search" class="input" type="text" :placeholder="placeholder"
           @change="change(1)" @blur="change(2)" @focus="change(3)" @input="change(4)" @keyup.enter="change(5)">
    <i class="icon" @click.stop="change(99)"></i>
  </div>
</template>

<script>
  import * as mobile from '../../config/mUtils'
  import {mapState, mapMutations, mapActions} from 'vuex'

  export default {
    name: 'App',
    data() {
      return {
        search: '',
      }
    },
    props: {
      value: {},
      placeholder: {type: String, default: ''},
    },
    mounted() {
      this.init();
    },
    components: {},
    computed: {},
    methods: {
      init() {
        this.search = this.value;
      },
      change(type) {
        if (type === 1 || type === 99) {
          this.$emit('change', this.search);
        }
        if (type === 2 || type === 99) {
          this.$emit('blur', this.search);
        }
        if (type === 3 || type === 99) {
          this.$emit('focus', this.search);
        }
        if (type === 4 || type === 99) {
          this.$emit('input', this.search);
        }
        if (type === 5 || type === 99) {
          this.$emit('enter', this.search);
        }
        if (type === 6 || type === 99) {
          this.$emit('search', this.search);
        }
        // this.$emit('input', this.search);
      }
    },
    watch: {
      value() {
        this.init();
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../../assets/css/mixin';

  .f-input {
    width: 2.62rem;
    height: .44rem;
    background: rgba(13, 85, 137, 1);
    border: 1px solid rgba(144, 219, 255, 1);
    border-radius: .06rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    cursor: pointer;

    .input {
      width: 100%;
      height: 100%;
      padding: 0 .15rem;
      padding-right: .41rem;
      box-sizing: border-box;
      background: none;
      border: none;
      font-size: .16rem;
      font-family: FZLTZHK--GBK1-0;
      font-weight: bold;
      color: rgba(138, 207, 253, 1);
    }

    .input::placeholder {
      font-size: .16rem;
      font-family: FZLTZHK--GBK1-0;
      font-weight: bold;
      color: rgba(138, 207, 253, 1);
    }

    .icon {
      position: absolute;
      top: .11rem;
      right: .09rem;
      width: .21rem;
      height: .21rem;
      background: url("http://py-intellect-screen.zhihuipk.com//static/property-img/search.png") no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
    }
  }
</style>
