<template>
<!-- 气体监测-监测设备 -->
  <div class="pop-box">
    <div class="box-tit">
      <p v-for="(item,index) in monitorList" :key="index" :class="{'active':item.id==active}" @click="active=item.id">{{item.title}}</p>
      <img @click.stop="close" src="../../../static/lanwan/red-close.png" alt="">
    </div>
    <!-- 监测设备 -->
    <div class="box-con" v-if="active==1">
      <div class="box-img">
        <img src="../../../static/lanwan/buhuo.png" alt="">
      </div>
      <div class="monitor-box">
        <h4>震动传感器点位名称</h4>
        <ul class="box-ul">
          <li>
            <h4>设备名称：</h4>
            <p>设备名称</p>
          </li>
          <li>
            <h4>设备型号：</h4>
            <p>设备型号</p>
          </li>
          <li>
            <h4>设备识别编码：</h4>
            <p>05232526562</p>
          </li>
          <li>
            <h4>设备详细地址：</h4>
            <p>二期室外</p>
          </li>
        </ul>
      </div>
    </div>
    <!-- 告警记录 -->
    <div class="f-camera-popup-content-warn" v-if="active==2">
      <ul class="warn-ul">
        <li v-for="(item, index) in patrolRecordList" :key="index" :class="item.isError ? 'error' : 'normal'">
          <span class="s-white">
            {{ item.time }} &nbsp;&nbsp;&nbsp;&nbsp; 14:26:13
          </span>
          <span>
            {{ item.isError ? `异常:${item.errorMessage}` : "正常" }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      monitorList:[
        {
          title:"监测设备",
          id:1
        },
        {
          title:"告警记录",
          id:2
        },
      ],
      active:1,
      patrolRecordList: [
        {
          time: "2021-03-27",
          isError: 0,
        },
        {
          time: "2021-03-27",
          isError: 0,
        },
        {
          time: "2021-03-27",
          isError: 0,
        },
        {
          time: "2021-03-27",
          isError: 0,
        },
        {
          time: "2021-03-27",
          isError: 0,
        },
        {
          time: "2021-03-27",
          isError: 1,
          errorMessage: "人员聚集",
        },
        {
          time: "2021-03-27",
          isError: 0,
        },
        {
          time: "2021-03-27",
          isError: 0,
        },
        {
          time: "2021-03-27",
          isError: 0,
        },
        {
          time: "2021-03-27",
          isError: 1,
          errorMessage: "周界入侵",
        },
        {
          time: "2021-03-27",
          isError: 1,
          errorMessage: "黑名单人员",
        },
      ],
    };
  },
  mounted() {
    
  },
  destroyed() {
    
  },
  methods: {
    close(){
      this.map.clearInfoWindow();
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/mixin";
.pop-box {
  width: 5.17rem;
  height: 3rem;
  background: url("../../../static/lanwan/red-alarm.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  left: 48%;
  top: 50%;
  padding: .25rem .5rem 0 .57rem;
  z-index: 20;
  pointer-events: auto;//不可操作地图，可操作按钮
}

.box-tit {
  display: flex;
  padding: .23rem 0 0rem 0;
  border-bottom: 1px solid #BA2340;
  
  p {
    width: 1rem;
    height: .3rem;
    line-height: .3rem;
    text-align: center;
    font-size: .18rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba($color: #fff, $alpha: 0.7);
    background: url("../../../static/lanwan/red-monitor.png") no-repeat;
    background-size: 100% 100%;
    margin-right: .16rem;
    cursor: pointer;
  }

  .active {
    background: url("../../../static/lanwan/red-monitor-active.png") no-repeat;
    background-size: 100% 100%;
    color: #fff;
  }

  img {
    width: .2rem;
    height: .2rem;
    position: absolute;
    right: .33rem;
    top: .43rem;
    cursor: pointer;
  }
}

.box-con {
  display: flex;
  margin-top: .25rem;

  .box-img {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: .2rem;
    flex-shrink: 0;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.monitor-box {
  h4 {
    font-size: .2rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: #FFFFFF;
  }
}

.box-ul {
  li {
    display: flex;
    margin-top: .1rem;
    h4 {
      flex-shrink: 0;
      font-size: .18rem;
      font-family: PingFang SC;
      font-weight: bold;
      color: #E82C37;
    }
    p {
      color: #FFFFFF;
    }
  }
}

.f-camera-popup-content-warn {
  position: relative;
  .warn-ul {
    height: 2rem;
    overflow: auto;
    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 0.2rem;
      height: 0.34rem;
      span {
        font-size: 0.16rem;
        font-family: PingFang SC;
        font-weight: bold;
      }
    }
    .normal:nth-child(2n + 1) {
      background: rgba(122, 244, 253, 0.15);
    }
    .normal:nth-child(2n) {
      background: rgba(20, 33, 43, 0.4);
    }
    .error {
      background: rgba(232, 44, 55, 0.15);
      span:nth-child(2) {
        color: rgba(232, 44, 55, 1);
      }
    }
  }
}

</style>
