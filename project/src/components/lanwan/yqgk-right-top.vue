<template>
  <!-- 五维防控-地面-疫情管控-->
  <div> 
    <div class="epidemic-bg">
      <div class="yq-bg">
        <span class="y-title">公共卫生指数</span>
        <span class="data">{{info.number1}}</span>
        <span class="unit">分</span>
        <span class="y-title">环比变化</span>
        <span class="data">{{info.number2}}</span>
        <span class="unit">分</span>
      </div>
      <div class="yq-bg">
        <span class="y-title">甲乙类传染病</span>
        <span class="data">{{info.number3}}</span>
        <span class="unit">例</span>
      </div>
      <div class="yq-bg">
        <span class="y-title">新冠肺炎治愈率</span>
        <span class="data">{{info.number4}}</span>
        <span class="unit">%</span>
      </div>
      <div class="yq-bg">
        <span class="y-title">新冠疫苗接种率</span>
        <span class="data">{{info.number5}}</span>
        <span class="unit">%</span>
      </div>
    </div>
    <div class="r-overview">
      <p>资源概况</p>
      <ul class="r-overview-box">
        <li v-for="(item,index) in overviewList" :key="index">
          <img :src="item.imgUrl" alt="">
          <p style="margin-bottom:.05rem">
            <span class="rate">{{item.rate}}</span>
            <span class="unit">%</span>
          </p>
          <p class="label">{{item.label}}</p>
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
        info: {
          number1: 9.2,
          number2: 19,
          number3: 27632,
          number4: 85,
          number5: 85
        },
        overviewList: [
          {
            imgUrl: '../../../static/lanwan/resources-1.png',
            rate: 90,
            label: '消毒杀物资'
          },
          {
            imgUrl: '../../../static/lanwan/resources-2.png',
            rate: 100,
            label: '新冠试剂'
          },
          {
            imgUrl: '../../../static/lanwan/resources-3.png',
            rate: 80,
            label: '样品运输'
          },
          {
            imgUrl: '../../../static/lanwan/resources-4.png',
            rate: 79,
            label: '防疫物资'
          }
        ]
      }
    }
  }
</script>

<style scoped lang="scss">
@import "../../assets/css/mixin";
  .epidemic-bg {
    width: 4.59rem;
    height: 3.05rem;
    padding: .19rem .16rem;
    @include bis('../../../static/lanwan/yq-bg.png');
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .yq-bg {
      width: 4.26rem;
      height: 0.6rem;
      @include bis('../../../static/lanwan/yq-item-bg.png');
      display: flex;
      align-items: center;
      .y-title {
        font-size: 0.2rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: #7AF4FD;
        margin: 0 .1rem 0 .24rem;
      }
      .data {
        font-size: 0.24rem;
        font-family: AliHYAiHei;
        font-weight: bold;
        color: #FFFFFF;
        background: linear-gradient(6deg, #00C3D5 0%, #00FD83 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }

  .unit {
    height: 0.15rem;
    font-size: 0.16rem;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(122, 244, 253, .5);
    margin-left: .05rem;
  }

  .r-overview {
    @include bis('../../../static/lanwan/resource-overview.png');
    width: 4.59rem;
    height: 1.85rem;
    margin-top: .14rem;
    padding: .2rem;
    &>p {
      font-size: 0.18rem;
      font-family: RTWS ShangGothic G0v1;
      font-weight: 400;
      color: #FEFEFE;
    }
    .r-overview-box {
      display: flex;
      margin-top: .15rem;
      justify-content: space-between;
      li {
        text-align: center;
        img {
          @include wh(.54rem,.54rem);
        }
        .rate {
          font-size: 0.18rem;
          font-family: AliHYAiHei;
          font-weight: bold;
          color: #FFFFFF;
        }
        .label {
          font-size: 0.14rem;
          font-family: PingFang SC;
          font-weight: 500;
          color: #7AF4FD;
        }
      }
    }
  } 
  

</style>