<template>
<!-- 安防监控 地面 -->
  <div class="box-offside">
    <v-regional-security></v-regional-security>
    <div class="safety-index">
      <h4 class="box-headline">重点区域安全指数分布</h4>
    </div>
    <div class="monitor-picture">
      <h4 class="box-headline">移动监测画面</h4>
      <div class="picture-content">
        <v-monitor-picture></v-monitor-picture>
      </div>
    </div>
  </div>
</template>


<script>
import regionalSecurity from '../lanwan/regional-security.vue';//区域安防指数
import monitorPicture from '../lanwan/monitor-picture.vue';//移动监测画面
export default {
  data() {
    return {
      number1:9.3,
      number2:9.3,
      number3:9.3,
    };
  },
  mounted() {
    
  },
  methods: {},
  components: {
    'v-regional-security': regionalSecurity,
    'v-monitor-picture': monitorPicture,
  }
};
</script>
<style scoped lang="scss">
  @import '../../assets/css/mixin';
    .box-offside {//外框
      width:100%;
      display:flex;
      flex-direction: column;
      align-items: flex-end;
    }
    .box-headline {//标题
      padding:.18rem 0 0 .26rem;
      font-size: .18rem;
      font-family: RTWS ShangGothic G0v1;
      font-weight: 400;
      color: #FEFEFE;
    }
    .box-bg {
      width: 4.59rem;
      height: 2.20rem;
      background: url("../../../static/lanwan/box-bg.png") no-repeat;
      background-size: 100% 100%;
    }

    .safety-index {
      margin-top: .14rem; 
      width: 4.59rem;
      height: 2.58rem;
      background: url("../../../static/lanwan/safety-index.png") no-repeat;
      background-size: 100% 100%;
    }

    .monitor-picture {
      margin-top: .14rem; 
      width: 4.59rem;
      height: 3.08rem;
      background: url("../../../static/lanwan/monitor-picture.png") no-repeat;
      background-size: 100% 100%;

      .picture-content {
        width: 100%;
      }
    }
</style>