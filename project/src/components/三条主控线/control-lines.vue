<template>
<!-- 区域安防指数 -->
<div>
  <ul class="regional-box">
    <li class="regional-item regional-bg">
      <div class="item-left ">
        <h4 class="">主控线安防指数</h4>
        <p><v-countup
          tag="span"
          class="font-count"
          :end-value="9.2"
          :duration="1"
          :decimals='1'
        ></v-countup>分</p>
      </div>
      <div class="item-right">
        <h4 class="">环比变化</h4>
        <p><v-countup
          tag="span"
          class="font-count"
          :end-value="19"
          :duration="1"
          :decimals='0'
        ></v-countup>%</p>
      </div>
    </li>
    <li class="regional-item">
      <div class="item-left item-bg">
        <h4 class="">重点巡检点</h4>
        <p><v-countup
          tag="span"
          class="font-count"
          :end-value="78"
          :duration="1"
          :decimals='0'
        ></v-countup>个</p>
      </div>
      <div class="item-right item-bg">
        <h4 class="">主控线覆盖率</h4>
        <p><v-countup
          tag="span"
          class="font-count"
          :end-value="72"
          :duration="1"
          :decimals='0'
        ></v-countup>%</p>
      </div>
    </li>
  </ul>
  <div class="site-bg">
    <h4 class="g-situations-tit" style="margin-bottom:.18rem">
      重点关注站点
    </h4>
    <div class="f-table f-table2">
      <el-table :data="tableData"
        style="
          height: 100%;
          overflow: hidden;
          width: 100%;
          overflow-x: hidden;
        "
      >
        <el-table-column
          prop="line"
          label="区域名称"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{scope.row.line}}
          </template>
        </el-table-column>
        <el-table-column
          label="通行流量"
          prop="danger"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <p v-if="!scope.row.danger" style="color:rgba(255,255,255,0.8)">正常</p>
            <p v-else  style="color:#f00">{{scope.row.nums}}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="风险指数"
          prop="rate"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{scope.row.rate}} 
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <div class="swiper-bg">
    <h4 class="g-situations-tit" style="margin-bottom:.18rem">
      重点区域监控画面
    </h4>
    <v-monitoring-swiper  :imgList="imgList"></v-monitoring-swiper>
  </div>
</div>
</template>
<script>
import monitoringSwiper from '../lanwan/monitoring-swiper.vue'
export default {
  data() {
    return {
      tableData: [
        {
          line: '红岛候车站',
          danger: true,
          nums: '高强度',
          rate: 9.1
        },
        {
          line: '红岛候车站',
          danger: true,
          nums: '高强度',
          rate: 9.1
        },
        {
          line: '红岛候车站',
          danger: true,
          nums: '高强度',
          rate: 9.1
        },
        {
          line: '红岛候车站',
          danger: true,
          nums: '高强度',
          rate: 9.1
        },
        {
          line: '红岛候车站',
          danger: true,
          nums: '高强度',
          rate: 9.1
        },
      ],
      imgList: [
        {
          imgUrl: "../../../static/lanwan/guanjian-1.jpg",
        },
        {
          imgUrl: "../../../static/lanwan/video-img22.jpg",
        },
        {
          imgUrl: "../../../static/lanwan/video-img33.jpg",
        },
        {
          imgUrl: "../../../static/lanwan/video-img22.jpg",
        },
      ],
    };
  },
  mounted() {
    
  },
  methods: {},
  components: {
    'v-monitoring-swiper': monitoringSwiper
  }
};
</script>
<style scoped lang="scss">
  @import '../../assets/css/mixin';
  .regional-box {
    width: 4.6rem;
    .regional-item {
      width: 100%;
      height: .8rem;
      display: flex;
      justify-content: space-between;
      .item-left,.item-right {
        width: 2.22rem;
        height: .8rem;
        padding: .1rem .2rem;

        h4 {
          font-size: .18rem;
          font-family: PingFang SC;
          font-weight: bold;
          color: #7AF4FD;
        }

        p {
          font-size: .16rem;
          font-family: PingFang SC;
          font-weight: bold;
          color: rgba($color: #fff, $alpha: 0.4);
          line-height: .4rem;

          .font-count {
            font-size: .24rem;
            font-family: AliHYAiHei;
            font-weight: bold;
            color: #FFFFFF;
            margin-right: .08rem;
          }
        }
      }
    }

    .regional-bg {
      background: url("../../../static/lanwan/box-long.png") no-repeat;
      background-size: 100% 100%;
    }

    .item-bg {
      background: url("../../../static/lanwan/box-wide.png") no-repeat;
      background-size: 100% 100%;
    }
  }

  .site-bg {
    width: 4.59rem;
    height: 2.89rem;
    @include bis("../../../static/lanwan/site-bg.png");
    margin-top: .1rem;
    padding: .25rem .27rem;
    overflow: hidden;
  }

  .swiper-bg {
    width: 4.59rem;
    height: 3.65rem;
    @include bis("../../../static/lanwan/swiper-bg.png");
    margin-top: .1rem;
    padding: .18rem .25rem;
  }
</style>