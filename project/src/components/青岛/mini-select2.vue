<template>
  <div class="f-select" @click.stop="selectOption"  v-clickoutside="optionOutside">
    <p class="ellipsis">{{getLabel}}</p><i class="select-open" :class="{'active':optionShow}"></i><i
    class="select-clear el-icon-circle-close" @click.stop="clearLabel"></i>
    <v-collapse-transition>
      <div class="option-popup" v-if="optionShow">
        <ul class="option" ref="selectScroll">
          <li class="option-item" v-for="(item,index) in optionList" :key="index"
              :class="{'active':labelId === item[useTemplate.value]}" @click.stop="changeOption(item,index, $event)"
              ref="option-item">
            <div class="option-content">
              <i class="circle" v-if="isNeedCircle"></i>
              <p class="ellipsis" :title="item[useTemplate.label]" style="pointer-events: none;">{{item[useTemplate.label]}}</p>
            </div>
          </li>
        </ul>
      </div>
    </v-collapse-transition>
  </div>
</template>

<script>
  import * as mobile from '../../config/mUtils'
  import {mapState, mapMutations, mapActions} from 'vuex'

  export default {
    name: 'App',
    data() {
      return {
        label: '',
        labelId: '',
        optionShow: false,
      }
    },
    props: {
      value: {},
      placeholder: {
        type: String,
        default: ''
      },
      optionList: {
        type: Array,
        default() {
          return []
        }
      },
      template: {
        type: Object,
        default() {
          return {
            label: 'label',
            value: 'value'
          }
        }
      },
      isNeedCircle: {
        type: Boolean,
        default: false,
      }
    },
    mounted() {
      this.init();
    },
    components: {},
    computed: {
      getLabel() {
        return this.label ? this.label : this.placeholder;
      },
      useTemplate() {
        return Object.assign({label: 'label', value: 'value'}, this.template)
      }
    },
    methods: {
      init() {
        this.labelId = this.value;
        this.optionList.forEach((item, index) => {
          if (this.labelId === item[this.useTemplate.value]) {
            this.label = item[this.useTemplate.label];
          }
        })
      },
      changeOption(row, index, e) {
        console.log(row,index,222, e);
        this.labelId = row[this.useTemplate.value];
        this.label = row[this.useTemplate.label];
        this.$emit('input', row[this.useTemplate.value]);
        this.$emit('select', row, row[this.useTemplate.label], row[this.useTemplate.value]);
        this.optionShow = false;
      },
      clearLabel() {
        this.labelId = '';
        this.label = '';
        this.$emit('input', '');
        this.$emit('select', {}, this.label, this.labelId);
        this.$emit('clear', {});
      },
      selectOption() {
        this.optionShow = !this.optionShow;
        if (this.optionShow) {
          this.setSelectAScroll();
        }
      },
      optionOutside() {
        this.optionShow = false;
      },
      setSelectAScroll() {
        setTimeout(() => {
          const selectScroll = this.$refs['selectScroll'];
          let option = this.$refs['option-item'];
          let scrollIndex = 0;
          if (selectScroll && option && selectScroll.offsetHeight && this.optionList.length) {
            let firstOption = option[0] ? option[0] : '';
            this.optionList.forEach((item, index) => {
              if (item[this.useTemplate.value] === this.labelId) {
                scrollIndex = index;
              }
            });
            let height = selectScroll.offsetHeight;
            let number = parseInt(height / (firstOption.offsetHeight));
            if (scrollIndex + 1 > number) {
              selectScroll.scrollTop = 34 * (scrollIndex + 1 - number + 1);
            } else {
              selectScroll.scrollTop = 0;
            }
          }
        }, 200)
      },
    },
    watch: {
      optionList: {
        handler: function (val, oldval) {
          this.init();
        },
        immediate: true
      },
      value() {
        this.init();
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../../assets/css/mixin';

  .f-select {
    width: 100%;
    height: 100%;
    background: transparent;
    border-radius: .06rem;
    padding: 0 .15rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    cursor: pointer;

    > p {
      font-size: .14rem;
      line-height: .44rem;
      font-family: FZLTZHK--GBK1-0;
      // font-weight: bold;
      color: #8ACFFD;
    }

    > i {
      font-size: .2rem;
      line-height: .44rem;
      font-family: FZLTZHK--GBK1-0;
      font-weight: bold;
      text-align: center;
      color: #8ACFFD;
      transition: all .3s ease-in-out;

    }

    i.active {
      transform: rotate(180deg);
    }

    i.select-open {
      display: block;
      width: .21rem;
      height: .21rem;
      background: url("http://py-intellect-screen.zhihuipk.com//static/property-img/mini-down.png") no-repeat;
      background-size: 100% 100%;
    }

    i.select-clear {
      display: none;
    }

    .option-popup {
      position: absolute;
      width: 100%;
      max-height: 3.5rem;
      background: rgba(17, 72, 134, 0.75);
      border: .02rem solid rgba(43, 156, 237, 1);
      border-radius: .10rem;
      left: 0;
      top: .54rem;
      padding: .14rem;
      box-sizing: border-box;
      z-index: 1000;
    }

    .option {
      width: 100%;
      height: 100%;
      overflow: auto;
      max-height: 3.22rem;

      &-item {
        width: 100%;
        height: .40rem;
        padding: .03rem 0;
        padding-right: .1rem;
        box-sizing: border-box;

        .option-content {
          width: 100%;
          height: 100%;
          padding: 0 .14rem;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          transition: all .3s ease-in-out;

          > p {
            font-size: .18rem;
            font-family: FZLTZHK--GBK1-0;
            // font-weight: bold;
            color: rgba(194, 231, 255, 1);
          }
        }

      }

      &-item.active {
        .option-content {
          background: #05235E;
        }
      }

      .circle {
        width: .12rem;
        height: .12rem;
        background: rgba(9, 240, 10, 1);
        border-radius: 50%;
        margin-right: .08rem;
      }
    }

    /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
    .option::-webkit-scrollbar {
      width: .06rem;
      height: .06rem;
      background: #00AFD4;
      border-radius: 3px;
      border-color: #00AFD4;
    }

    /*定义滚动条轨道 内阴影+圆角*/
    .option::-webkit-scrollbar-track {
      width: .06rem;
      opacity: 0.7;
      background: #205D8D;
      border-radius: 3px;
      border-color: #205D8D;
    }

    .option::-webkit-scrollbar-track-piece {

    }

    /*定义滑块 内阴影+圆角*/
    .option::-webkit-scrollbar-thumb {
      border-radius: 3px;
      background: #00AFD4;
      border-color: #00AFD4;
    }
  }

  .f-select:hover {
    >i.select-open {
      display: none;
    }

    >i.select-clear {
      display: block;
    }
  }
</style>
