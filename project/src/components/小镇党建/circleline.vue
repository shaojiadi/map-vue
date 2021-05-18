<template>
  <div>
    <svg style="width: .88rem;height: .88rem;">
      <defs>
        <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#00f6f9"/>
          <stop offset="100%" stop-color="#00b3f2"/>
        </linearGradient>
<!--        <filter id="f1" x="0" y="0" width="200%" height="200%">-->
<!--          <feOffset result="offOut" in="SourceGraphic" dx="20" dy="20" />-->
<!--          <feGaussianBlur result="blurOut" in="offOut" stdDeviation="10" />-->
<!--          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />-->
<!--        </filter>-->
<!--        <filter id="f1" x="0" y="0">-->
<!--          <feGaussianBlur in="SourceGraphic" stdDeviation="1" />-->
<!--        </filter>-->
      </defs>
      <circle cx=".44rem" cy=".44rem" r=".42rem" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width=".02rem" stroke-linecap="round"/>
      <circle :style="`transform: rotate(-${rotate}deg)`" ref="demo2" class="demo2" cx=".44rem" cy=".44rem" r=".39rem" fill="none" stroke="url(#linear)" stroke-width=".06rem" stroke-linecap="round" :stroke-dasharray="storkedash" filter="url(#f1)" />
    </svg>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        storkedash: '0,10000',
        stroke: '#0c2f69'
      }
    },
    props: {
      percentage:{
        type: Number,
        default: 1
      },
      color: {
        type: String,
        default: '#5a98ff'
      },
      rotate: {
        type: String,
        default: '90',
      }
    },
    methods: {
      init(){
        this.percentage = Math.max(0,this.percentage);
        this.percentage = Math.min(1,this.percentage);
        this.storkedash = this.percentage * Math.floor(2 * Math.PI * 0.39*document.documentElement.style.fontSize.slice(0, -2)) + ',10000'
        if (this.percentage === 0) {
          this.stroke = 'rgba(255,255,255,0)'
        } else {
          this.stroke = this.color
        }
      }
    },
    watch: {
      percentage(val){
        this.init();
      },
    },
    mounted() {
      this.init();
      window.addEventListener('resize', () => {
        this.init();
      });
    }
  }
</script>
<style scoped lang="scss">
  @import "../../assets/css/mixin";
  .demo2{
    transform-origin: .44rem .44rem;
    transition: stroke-dasharray .1s ease-in;
  }
</style>
