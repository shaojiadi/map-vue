<template>
<!-- 无人机巡航 -->
    <div class="box-offside">
      <h4 class="box-headline warn-list">告警列表</h4>
      <li v-for="(item, index) in $store.state.warnList" :key="item.key" class="item-warn" :class="[item.isWarn == 1 ? 'warn' : 'resolve']" >
        <div class="f-camera-popup-warn">
          <img class="warn-img" src="/static/bounced-img/jk.png" alt="" />
          <div>
            <p class="warn-situation">{{ item.name }}</p>
            <p class="warn-area-p"><img src="/static/bounced-img/warn-icon.png" class="warn-area" alt="" />园区正大门</p>
            <p class="warn-situation" @click="showWarnPoint(item, index)">
              {{ item.isWarn ? "查看详情>>" : "已解决" }}
            </p>
          </div>
        </div>
      </li>
    </div>
</template>


<script>

export default {
  data() {
    return {
      
    };
  },
  mounted() {
    this.initWarnList();
  },
  methods: {
    initWarnList() {
      let inList = [
        {
          name: "人员聚集告警！",
          isWarn: 1,
          key: 1,
          id: 1,
          pos: [12.94, 6.24],
          reason: "人员聚集告警点",
          video: "rtmp://47.97.107.52:1940/live/qdgx31",
          active: 0,
          rotate: 1,
          title: "人员聚集告警",
          record: "2020-11-22 11:12",
          locals: "蓝湾智谷-园区大门监控",
          area: "银行区域",
          localName:'西马路中间',
        },
        {
          name: "消防运行告警！",
          isWarn: 1,
          key: 2,
          id: 2,
          pos: [9.61, 2.35],
          reason: "消防运行告警点",
          video: "rtmp://47.97.107.52:1940/live/qdgx38",
          active: 0,
          rotate: 1,
          title: "消防运行告警",
          record: "2020-11-22 11:12",
          locals: "蓝湾智谷-楼内监控",
          area: "-",
          localName:'4楼电梯厅',
        },
        {
          name: "异常人员出入！",
          isWarn: 1,
          key: 3,
        },
        // {
        //   name: "人员轨迹异常！",
        //   isWarn: 0,
        //   key: 4,
        // },
        // {
        //   name: "人员轨迹异常！",
        //   isWarn: 0,
        //   key: 5,
        // },
      ];
      let tempI = 0;
      let interval = setInterval(() => {
        if (this.$store.state.warnList.length < 3) {
          this.$store.state.warnList.push(inList[tempI]);
        } else {
          window.clearInterval(interval);
        }
        tempI++;
      }, 1000);
    },
    showWarnPoint(item, index) {
      if (item.name == "人员聚集告警！" || item.name == "消防运行告警！") {
        this.$store.state.warnList[index].active = 1;
      }
    },
  },
  components: {
    
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

    .warn-list {
      font-size: .18rem;
      font-family: RTWS ShangGothic G0v1;
      font-weight: bold;
      color: #FEFEFE;
      width: 4rem;
      padding: 0; 
    }

    .item-warn {
      @mixin warnP() {
        font-size: 0.18rem;
        font-family: PingFang SC;
        font-weight: bold;
      }

      width: 4rem;
      height: 1.4rem;
      margin-top: 0.16rem;
      padding-top: 0.35rem;
      padding-left: 0.2rem;
      &:last-of-type {
        //   box-shadow: inset 0rem -0.5rem 1rem #2f4f4f;
      }
      .f-camera-popup-warn {
        display: flex;
        .warn-img {
          width: 0.86rem;
          height: 0.86rem;
          margin-right: 0.15rem;
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

    .warn {
      @include bis("/static/bounced-img/warn.png");
      .warn-situation {
        cursor: pointer;
        color: #e82c37;
      }
    }

    .resolve {
      @include bis("/static/bounced-img/resolve.png");
      .warn-situation {
        color: #1fb0d9;
      }
    }
</style>