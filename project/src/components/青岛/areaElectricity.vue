<template>
  <div class="bottom-m-content">
    <transition-group name="list">
    
      <div
        class="manage-progrees"
        v-for="(item, index) in statisticsList"
        :key="item.key"
      >
        <div class="progress-img">
          <p class="progress-index">{{ item.title }}</p>
        </div>

        <div class="progrees">
          <div class="progreesContent">
            <div class="progressContainer">
              <div
                class="progress yellow"
                :style="{ width: ((item.warnAppear / item.total) * 100).toFixed(2) + '%' }"
              ></div>
            </div>
            <div class="progreesTxt">
              <span>{{item.warnAppear }}</span>
            </div>
          </div>
          <div class="progreesContent">
            <div class="progressContainer">
              <div
                class="progress blue"
                :style="{ width: ((item.disappear / item.total) * 100).toFixed(2) + '%' }"
              ></div>
            </div>
            <div class="progreesTxt">
              <span>{{item.disappear}}</span>
            </div>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      yellowWidth: 0,
      blueWidth: 0,
      statisticsList: [],
    };
  },
  mounted() {
    this.yellowWidth = (2.35 / 6) * 100
    this.blueWidth = (1.35 / 6) * 100
    let i = 0
    let timeId = setInterval(() => {
      let statisticsList = [
        {
          key: 1,
          warnAppear: "19",
          disappear:'18',
          title:'A区',
          total:20,
        },
        {
          key: 2,
          warnAppear: "10",
          disappear:'10',
          title:'B区',
          total:20,
        },
        {
          key: 3,
          warnAppear: " 6",
          disappear:'6',
          title:'C区',
          total:20,
        },
        {
          key: 4,
          warnAppear: "4",
          disappear:'2',
          title:'D区',
          total:20,
        },
      ]
      this.statisticsList.push(statisticsList[i])
      i++
    
      if(i >= statisticsList.length) {
        clearInterval(timeId)
      }
    }, 0.5 * 1000);
  },
  methods: {},
};
</script>
<style scoped lang="scss">
@import "~@/assets/css/mixin";

.bottom-m-content {
  .manage-progrees {
    display: flex;
    align-items: center;
    margin-bottom: 0.12rem;
    .progress-img,
    img {
      width: 0.45rem;
      height: 0.27rem;
        @include bis('/static/bounced-img/analy-bg.png')
      position: relative;
      top: 0.05rem;
      .progress-index {
              width: 0.31rem;
        
        @include fjqd();
        @include center();
        color: white;
      }
    }
    .progrees-time {
      width: 0.56rem;
      float: left;
      .progrees-rank {
        width: 0.56rem;
        height: 0.25rem;
        line-height: 0.25rem;
        display: inline-block;
        @include bis("http://lfkc-screen.zhihuipk.com/static/rank.png");
        font-size: 0.14rem;
        font-weight: bold;
        text-align: center;
        color: rgba(255, 255, 255, 1);
      }
    }
    .progrees {
      float: left;
      width:100%;
      margin-left: 0.1rem;
      .progress-title {
        font-size: 0.16rem;
        font-weight: 400;
        color: #fefefe;
      }
      .progrees-num {
        display: inline-block;
        float: left;
        font-size: 0.16rem;
        font-weight: 400;
        width: 0.6rem;
        text-align: right;
        color: #fefefe;
      }
      .progreesContent {
        .progressContainer {
          height: 0.05rem;
          width: 80%;
          background: rgba(255, 255, 255, 0.2);
          margin-top: 0.1rem;
          margin-right: auto;
          display: inline-block;
        }
        .progress {
            transition: all 2s;
          &.yellow {
            background: linear-gradient(90deg, #fff77c 0%, #ff952d 100%);
          }
          &.blue {
            background: linear-gradient(
              90deg,
              rgba(84, 254, 254, 1) 0%,
              rgba(62, 166, 255, 1) 100%
            );
          }
          height: 0.05rem;
        }
        .progreesTxt {
          display: inline-block;
          font-size: 0.16rem;
          font-weight: bold;
          color: #fff;
          span{
              margin-left: 0.18rem;
          }
        }
      }
    }
  }
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(100px);
}
</style>