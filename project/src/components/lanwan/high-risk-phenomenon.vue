<template>
<!-- 区域安防高频现象 -->
  <ul class="phenomenon-box">
    <li class="phenomenon-item" v-for="(item,index) in phenomenonList" :key="index">
      <h5 class="phenomenon-title">区域安防高频现象</h5>
      <div class="phenomenon-content">
        <img class="phenomenon-img" src="../../../static/lanwan/phenomenon-img.png" alt="">
        <div class="phenomenon-info">
          <h4 class="info-title">{{item.title}}</h4>
          <p class="incidence-rate">发生率：{{item.rate}}%</p>
          <p class="info-suggest">建议：{{item.suggest}}</p>
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      yellowWidth: 0,
      blueWidth: 0,
      statisticsList: [],
      phenomenonList: [
        {
          title: "非公航线飞机出入",
          rate: 93,
          suggest: "加强江北大街沿线警力配置",
        },
        {
          title: "新增违章建筑点",
          rate: 93,
          suggest: "加强乡镇接到整改制度管控",
        },
      ]
    };
  },
  mounted() {
    
  },
  methods: {},
};
</script>
<style scoped lang="scss">
  @import '../../assets/css/mixin';
  .phenomenon-box{
    margin-right: -0.18rem;
    width: 4.85rem;
    .phenomenon-item {
      position: relative;
      width: 100%;
      height: 1.71rem;
      background: url("../../../static/lanwan/phenomenon-bg.png") no-repeat;
      background-size: 100% 100%;
      margin-top: -.16rem;

      .phenomenon-title {
        position: absolute;
        top: .18rem;
        left: .28rem;
        font-size: .12rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: #E82C37;
      }

      .phenomenon-content {
        width: 4.5rem;
        height: 1.08rem;
        position: absolute;
        left: .18rem;
        top: .38rem;
        display: flex;
        align-items: center;
        padding: .1rem .13rem;

        .phenomenon-img {
          width: .78rem;
          height: .77rem;
          flex-shrink: 0;
        }

        .phenomenon-info {
          margin-left: .17rem;
          .info-title {
            font-size: .18rem;
            font-family: PingFang SC;
            font-weight: bold;
            color: #E82C37;
          }

          .incidence-rate {
            font-size: .24rem;
            font-family: PingFang SC;
            font-weight: bold;
            color: #FFFFFF;
          }

          .info-suggest {
            font-size: .16rem;
            font-family: PingFang SC;
            font-weight: bold;
            color: #E82C37;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
        }

        
      }

      
    }
  }
</style>