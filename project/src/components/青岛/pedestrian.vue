<template>
  <div>
    <!--  中间center  -->
    <div class="g-datacenterbox g-zindexs">
      <div
        class="g-datacenter-item"
        v-for="(item, index) in parkingLotList"
        :key="index"
      >
        <div>
          <p class="g-names">{{ item.title }}</p>
          <p class="g-nums">
            {{ item.number }}
          </p>
        </div>
      </div>
    </div>

    <div class="pedestrian-center">
      <div class="record-video">
         <v-video src="/static/bounced-img/录制视频1.mp4" hasControl="1">
        </v-video>
        <div class="record-trend">
          <v-linePedestrianChart />
        </div>
      </div>

      <div class="record">
        <ul class="record-r">
          <p class="record-title">人行通行记录</p>
          <li
            v-for="(item, index) in recordList"
            :key="index"
            class="item-warn resolve"
          >
            <div class="f-camera-popup-warn">
              <img class="warn-img" src="/static/images/img/user-icon.png" alt="" />
              <div>
                <p class="warn-situation">
                {{  item.isWarn ? "陈金" : "王昕帅"}}
                </p>
                <p class="warn-area-p">
                  <img
                    src="/static/bounced-img/warn-icon.png"
                    class="warn-area"
                    alt=""
                  />
                  园区正大门
                </p>
                <p class="warn-situation">
                  <span>
                                  2020:09:15   
                            </span>  {{ item.isWarn ? "进入" : "离开" }}
                </p>
              </div>
            </div>
          </li>
          <div class="mask"></div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      parkingLotList: [
        { title: "今日入园", number: 256 },
        { title: "今日出园", number: 178 },
        { title: "今日访客", number: 63 },
        { title: "异常通行", number: 3 },
      ],
      recordList: [
        { isWarn: 1 },
        { isWarn: 0 },
        { isWarn: 1 },
        { isWarn: 0 },
        { isWarn: 1 },
        { isWarn: 0 },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/mixin";

::-webkit-scrollbar {
    width: 0;
   
}


.record {
  @mixin warnP() {
    font-size: 0.18rem;
    font-family: PingFang SC;
    font-weight: bold;
  }

  .record-r {
    position: absolute;
    right: 0.4rem;
    top: 0.1rem;
    height: 7.8rem;
    overflow: auto;
    .record-title {
      height: 0.23rem;
      font-size: 0.24rem;
      font-family: AliHYAiHei;
      font-weight: bold;
      color: #ffffff;
      margin-bottom: 0.2rem;
      padding-left: 0.1rem;
    }
    .mask{
      background: linear-gradient(to bottom , rgba(0, 0, 0,0) , rgba(0, 0, 0, .6) )  ;
      
    width: 100%;
    height: 0.4rem;
    position: absolute;
    bottom: -1.9rem;
    }
  }

  .resolve {
    @include bis("/static/bounced-img/rx-record-bg.png");
    .warn-situation {
        span{
            color:white,
        }
      color: #1fb0d9;
    }
  }

  .item-warn {
    width: 2.79rem;
    height: 1.4rem;
    margin-bottom: 0.16rem;
    padding-top: 0.35rem;
    padding-left: 0.2rem;

    

    .f-camera-popup-warn {
      display: flex;

      .warn-img {
        width: 0.86rem;
        height: 0.86rem;
        margin-right: 0.13rem;
      }
      .warn-situation {
        @include warnP();
      }

      .warn-area-p {
        display: flex;
        align-items: center;
        height: 0.14rem;
        font-size: 0.14rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
        opacity: 0.6;

        .warn-area {
          width: 0.15rem;
          height: 0.18rem;
          margin-right: 0.1rem;
        }
      }

      p {
        margin-bottom: 0.1rem;
      }
    }
  }
}

.pedestrian-center {
  width: 16.85rem;
  height: 8.11rem;
  position: absolute;
  top: 2.4rem;
  left: 2.2rem;
  @include bis("/static/bounced-img/pedestrian.png");

  .record-video {
    width: 12.95rem;
    height: 7.29rem;
    position: absolute;
    left: 0.43rem;
    top: 0.43rem;
  }
  .record-trend {
    position: absolute;
    left: 0.13rem;
    bottom: 0.13rem;
    width: 4.06rem;
    height: 2.38rem;
    padding-top: 0.2rem;
    @include bis("/static/bounced-img/trend.png");
  }
}

.g-datacenterbox {
  position: absolute;
  top: 0.96rem;
  display: flex;
  align-items: center;
  left: 5.35rem;
  .g-datacenter-item {
    position: relative;
    display: flex;
    align-items: center;
    margin-right: 2rem;
    &:last-child {
      margin-right: 0;
    }
    img {
      display: block;
      width: 0.45rem;
      height: 0.45rem;
      margin-right: 0.18rem;
    }
    .g-nums {
      font-size: 0.36rem;
      font-family: RTWS ShangGothic G0v1;
      font-weight: bold;
      color: #ffffff;
      .unit {
        width: 0.18rem;
        height: 0.18rem;
        font-size: 0.18rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
        opacity: 0.4;
        margin-left: 0.05rem;
      }
    }
    .g-names {
      width: 1.67rem;
      height: 0.24rem;
      @include bis("/static/bounced-img/top-center-bg.png");
      font-size: 0.16rem;
      font-family: PingFang SC;
      font-weight: bold;
      color: rgba(122, 244, 253, 1);
      margin-bottom: 0.13rem;
      padding: 0 0.2rem;
    }
  }
}
</style>