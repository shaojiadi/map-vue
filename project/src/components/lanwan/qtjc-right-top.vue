<template>
  <!-- 五维防控-地下管廊-入侵告警 -->
  <div> 
    <div class="gas-bg">
      <p class="base-title" style="margin-bottom:.26rem">异常气体浓度实时监测均值 </p>
      <ul class="flex-box">
        <li v-for="(item,index) in gasList" :key="index">
          <div class="gas-item">
            <p class="p1">{{item.label}}</p>
            <p class="p2">{{item.concentration}}ppm</p>
          </div>
          <p v-if="item.state==1" style="color:#00FA87">正常</p>
          <p v-else style="color:#f00">异常</p>
        </li>
      </ul>
    </div>
  </div>
    
</template>


<script>
  export default {
    name: '',
    data() {
      return {
        gasList: [
          {
            label: '氧气',
            concentration: 20,
            state:1
          },
          {
            label: '甲烷',
            concentration: 20,
            state:1
          },
          {
            label: '硫化氢',
            concentration: 20,
            state:1
          },
          {
            label: '一氧化碳',
            concentration: 20,
            state:1
          }
        ]
      }
    }
  }
</script>

<style scoped lang="scss">
@import "../../assets/css/mixin";
  .gas-bg {
    width: 4.59rem;
    height: 2.38rem;
    @include bis('../../../static/lanwan/gas-bg.png');
    padding: .31rem .2rem;
    margin-top: .05rem;
    ul {
     li {
       text-align: center;
       .gas-item {
          @include wh(1rem,1rem);
          @include bis('../../../static/lanwan/gas-item-bg.png');
          margin-bottom: .1rem;
          .p1 {
            padding-top: .2rem;
          }
       }
     }
    }
  }
  

</style>