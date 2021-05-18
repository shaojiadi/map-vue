<template>
  <div class="tarjectory">
    <img src="static/images/img/close.png" alt="" class="close-img" @click="close">
    <h3 class="title">人员轨迹</h3>
    <div class="flex-box2 g-select">
      <div class="change-date">选择日期：</div>
      <div class="f-select">
        <el-date-picker
          v-model="time"
          value-format="yyyy-MM-dd"
          size="mini"
          type="date"
          @change="accessPersonnelTimeSelect"
        ></el-date-picker>
    </div>
    </div>
    <div>
      <div v-for="(item,index) in timeStemp" :key="index" class="flex-box2 g-contain">
        <div class="g-text">{{item.year}}</div>
        <div class="g-text ml">{{item.month}}</div>
        <div class="g-text ml " style="width:.6rem">{{item.time}}</div>
        <div class="circle">
          <img :src="getTrueImg(item.state)" alt="">
          <div class="line" v-if="index!=timeStemp.length-1"></div>
        </div>
        <div class="g-address" style="width:1.5rem">{{item.address}}</div>
        <div class="g-address">
          <span  class="g-text2">状态：</span>
          <span v-if="item.state==1" class="normal-state">正常</span>
          <span v-if="item.state==2" class="abnormal-state">{{item.stateContent}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      timeStemp: [
        {
          year: '2020年',
          month: '12月17日',
          time: '7:26:28',
          state: 1,
          address: '蓝湾智谷快递柜',
          stateContent: '正常'
        },
        {
          year: '2020年',
          month: '12月16日',
          time: '17:29:18',
          state: 1,
          address: '蓝湾智谷内街入口',
          stateContent: '正常'
        },
        {
          year: '2020年',
          month: '12月16日',
          time: '13:11:15',
          state: 2,
          address: '动力机房',
          stateContent: '告警-行为轨迹异常'
        },
        {
          year: '2020年',
          month: '12月13日',
          time: '16:21:18',
          state: 1,
          address: '城阳区世纪花园1区',
          stateContent: '正常'
        },
        {
          year: '2020年',
          month: '12月10日',
          time: '11:06:09',
          state: 1,
          address: '蓝湾智谷正门',
          stateContent: '正常'
        }
      ],
      time: ""
    }
  },
  mounted(){},
  methods: {
    close(){
      console.log(111);
      this.$emit("closeDialog")
    },
    getTrueImg(state){
      if(state==1){
        return ('static/images/img/circle-wh.png')
      }else if(state==2){
        return ('static/images/img/circle-red.png')
      }
    },
    accessPersonnelTimeSelect(val) {
    //   if (val) {
    //     this.filter.beginTime = new Date(mobile.replaceTime(val)).format(
    //       "yyyy-MM-dd 00:00:00"
    //     );
    //     this.filter.endTime = new Date(mobile.replaceTime(val)).format(
    //       "yyyy-MM-dd 23:59:59"
    //     );
    //   } else {
    //     this.filter.beginTime = "";
    //     this.filter.endTime = "";
    //   }
    //   this.search();
    },
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/mixin";
  .tarjectory{
    pointer-events: auto;
    @include bis("../../../static/images/img/dialog.png");
    @include wh(9.59rem, 7.22rem);
    position: fixed;
    top: 1.5rem;
    left: 4.95rem;
    z-index: 999;
    padding: .37rem .4rem;
    .close-img {
      position: absolute;
      right: .5rem;
      top: .15rem;
      cursor: pointer;
    }
    .title {
      font-size: 0.24rem;
      font-family: shangGothic;
      font-weight: bold;
      color: #FFFFFF;
    }

    .g-select {
      margin: .3rem 0 .2rem 0;
      .change-date {
        color: #8ACFFC;
        font-size: .14rem;
      }
    }

    .g-contain {
      margin-top: .2rem;
      .g-text {
        font-size: 0.16rem;
        font-family: shangGothic;
        color: #FFFFFF;
      }
      .circle {
        @include wh(.21rem,.21rem);
        margin-left: .21rem;
        position: relative;
        img {
          width: 100%;
          height: 100%;
        }
        .line {
          position: absolute;
          height: .26rem;
          width: 0.02rem;
          background: #FFFFFF;
          opacity: 0.2;
          right: .09rem;
          bottom: -.22rem;
        };
      }

      .g-address {
        font-size: 0.16rem;
        font-family: Lantinghei SC;
        color: #8ACFFD;
        margin: 0  1rem 0 .3rem ;
      }

      .g-text2 {
        font-size: 0.16rem;
        font-family: PingFang SC;
        color: #FFFFFF;
      }

      .abnormal-state {
        font-family: PingFang SC;
        color: #E82C37;
      }

      .normal-state {
        font-family: PingFang SC;
        color: #7AF4FD;
      }
    }
  }

  .ml {
    margin-left: .2rem;
  }
</style>

<style lang="scss">
@import "../../assets/css/mixin";

.el-picker-panel {
  background: rgba(17, 72, 134, 0.75);
  border: 0.02rem solid #2b9ced;

  .el-date-table {
    th {
      color: #c2e7ff;
      border-bottom: solid 1px #2b9ced;
    }
  }

  .el-picker-panel__icon-btn,
  .el-date-picker__header-label,
  .el-year-table td .cell,
  .el-month-table td .cell {
    color: #c2e7ff;
  }

  .el-date-table td span {
    color: #c2e7ff;
  }

  .el-year-table td .cell:hover,
  .el-month-table td .cell:hover {
    color: #0091ea;
  }

  .el-date-table td.available:hover {
    span {
      color: #0091ea;
    }
  }

  .el-date-picker__header--bordered {
    border-bottom: solid 1px #2b9ced;
  }
}

.el-popper[x-placement^="bottom"] .popper__arrow {
  border-bottom-color: #2b9ced;
}

.el-popper[x-placement^="bottom"] .popper__arrow::after {
  border-bottom-color: rgba(17, 72, 134, 0.75);
}


.f-select {
  @include bis("../../../static/images/img/input-bg.png");
  @include wh(2.51rem, .5rem);

  /deep/ .el-input__inner {
    background: transparent;
    border: none;
    color: #8acffd;
    font-weight: bold;
  }

  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
    height: 100%;
    line-height: 0.5rem;
    background: none;
    border: none;
    border-radius: 0.06rem;
  }

  // .el-input--mini .el-input__inner {
  //   height: 0.44rem;
  //   line-height: 0.44rem;
  //   background: rgba(13, 85, 137, 1);
  //   border: 1px solid rgba(144, 219, 255, 1);
  //   font-size: 0.16rem;
  //   font-family: FZLTZHK--GBK1-0;
  //   font-weight: bold;
  //   color: #8acffd;
  // }

  .el-input--mini .el-input__inner::placeholder {
    font-size: 0.16rem;
    font-family: FZLTZHK--GBK1-0;
    font-weight: bold;
    color: #8acffd;
  }

  .el-input__prefix,
  .el-input__suffix {
    color: #8acffd;

    .el-input__icon {
      color: #8acffd;
    }
  }
}
</style>