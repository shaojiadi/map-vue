<template>
  <div class="pedestrian-center">
    <img
      src="/static/bounced-img/jk-close.png"
      class="close-icon"
      @click.stop="$emit('close')"
      alt=""
    />
    <div class="record-video">
      <!-- <v-hikVideo :src="$store.state.activeCameraIndexCode" >
      </v-hikVideo> -->
      <iframe
        class="video-js1"
        id="ifram7"
        :src="`http://hik-player.zhihuipk.com/?cameraIndexCode=${$store.state.activeCameraIndexCode}&showToolbar=1`"
        allowfullscreen="true"
        frameborder="0"
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      parkingLotList: [
        { title: "今日入园", number: 3800 },
        { title: "今日出园", number: 1917 },
        { title: "今日访客", number: 1917 },
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
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 步骤2：嵌入子页面的页面中在iframe的onload事件中向子页面抛以下消息
      var iframeWin = document.getElementById("ifram7");
      {
        iframeWin.onload = function () {
          console.log(
            iframeWin.offsetLeft,
            iframeWin.getBoundingClientRect(),
            0
          );

          var getTruePos = {
            action: "updateInitParam", // 告诉子页面一些初始值，包括浏览器视窗高度与宽度、iframe偏离文档的位置、iframe相对视窗的位置
            msg: "更新子页面一些初始值",
            showSize: {
              // 浏览器视窗高度与宽度
              width: $(window).width(),
              height: $(window).height(),
            },
            iframeOffset: {
              // iframe偏离文档的位置
              left: iframeWin.getBoundingClientRect().left,
              top: iframeWin.getBoundingClientRect().top,
            },
            iframeClientPos: {
              // iframe相对视窗的位置
              left: iframeWin.getBoundingClientRect().left,
              right: iframeWin.getBoundingClientRect().right,
              top: iframeWin.getBoundingClientRect().top,
              bottom: iframeWin.getBoundingClientRect().bottom,
            },
          };
     
               iframeWin.contentWindow.postMessage(getTruePos, "*")
        //    window.requestAnimationFrame(iframeWin.contentWindow.postMessage(getTruePos, "*"));
          // '\*'表示跨域参数，请结合自身业务合理设置
        };
      }


      // 步骤3：监听嵌入子页面的事件
      window.addEventListener("message", function (e) {
        if (e && e.data) {
          switch (e.data.action) {
            case "updatePos":
              var scrollLeftValue = document.documentElement.scrollLeft;
              var scrollTopValue = document.documentElement.scrollTop;
              iframeWin.contentWindow.postMessage(
                {
                  action: "updatePos",
                  msg: "更新Pos",
                  scrollValue: {
                    // 滚动条滚动的偏移量
                    left: -1 * scrollLeftValue,
                    top: -1 * scrollTopValue,
                  },
                },
                "*"
              ); // '\*'表示跨域参数，请结合自身业务合理设置
              break;
            default:
              break;
          }
        }
      });

      // 步骤4：兼听本页面的resize事件，并将一些状态值发送给嵌入的子页面
      var resizeTimer = null;
      var resizeDate;
      $(window).resize(function () {
        resizeDate = new Date();
        if (resizeTimer === null) {
          resizeTimer = setTimeout(checkResizeEndTimer, 100);
        }
      });

      function checkResizeEndTimer() {
        if (new Date() - resizeDate > 100) {
          // resize结束后再发消息，避免残影问题
          clearTimeout(resizeTimer);
          resizeTimer = null;
          postResizeEvent();
        } else {
          setTimeout(checkResizeEndTimer, 100);
        }
      }

      function postResizeEvent() {
        iframeWin.contentWindow.postMessage(
          {
            action: "resize",
            msg: "resize事件",
            showSize: {
              // 告诉嵌入的子页面视窗高度与宽度
              width: $(window).width(),
              height: $(window).height(),
            },
            iframeClientPos: {
              // iframe相对视窗的位置
              left: iframeWin.getBoundingClientRect().left,
              right: iframeWin.getBoundingClientRect().right,
              top: iframeWin.getBoundingClientRect().top,
              bottom: iframeWin.getBoundingClientRect().bottom,
            },
            iframeOffset: {
              // iframe偏离文档的位置
              left: iframeWin.getBoundingClientRect().left,
              top: iframeWin.getBoundingClientRect().right,
            },
          },
          "*"
        ); // '\*'表示跨域参数，请结合自身业务合理设置
      }

      // 步骤5：兼听本页面的scroll事件，并将一些状态值发送给嵌入的子页面
      // 为性能考虑，可以在定时器中处理
      var scrollTimer = null;
      var scrollDate;
      window.onscroll = function (event) {
        postScrollEvent();
        scrollDate = new Date();
        if (scrollTimer === null) {
          scrollTimer = setTimeout(checkScrollEndTimer, 100);
        }
      };

      function checkScrollEndTimer() {
        if (new Date() - scrollDate > 100) {
          // resize结束后再发消息，避免残影问题
          clearTimeout(scrollTimer);
          scrollTimer = null;
        } else {
          postScrollEvent();
          setTimeout(checkScrollEndTimer, 100);
        }
      }

      function postScrollEvent() {
        // 计算滚动条偏移量
        var scrollLeftValue = document.documentElement.scrollLeft;
        var scrollTopValue = document.documentElement.scrollTop;
        console.log(iframeWin.getBoundingClientRect(), 11);
        iframeWin.contentWindow.postMessage(
          {
            action: "scroll",
            msg: "scroll事件",
            scrollValue: {
              // 滚动条滚动的偏移量
              left: -1 * scrollLeftValue,
              top: -1 * scrollTopValue,
            },
            iframeClientPos: {
              // iframe相对视窗的位置
              left: iframeWin.getBoundingClientRect().left,
              right: iframeWin.getBoundingClientRect().right,
              top: iframeWin.getBoundingClientRect().top,
              bottom: iframeWin.getBoundingClientRect().bottom,
            },
            showSize: {
              // 告诉嵌入的子页面视窗高度与宽度
              width: $(window).width(), // 视窗宽度
              height: $(window).height(), // 视窗高度
            },
            iframeOffset: {
              // iframe偏离文档的位置
              left: iframeWin.offsetLeft,
              top: iframeWin.offsetTop,
            },
          },
          "*"
        ); // '\*'表示跨域参数，请结合自身业务合理设置
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/mixin";

.video-js1 {
  width: 100%;
  height: 100%;
}

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
    .mask {
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.6)
      );

      width: 100%;
      height: 0.4rem;
      position: absolute;
      bottom: -1.9rem;
    }
  }

  .resolve {
    @include bis("/static/bounced-img/rx-record-bg.png");
    .warn-situation {
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
  pointer-events: auto;
  width: 13.74rem;
  height: 8.11rem;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 9999;
  margin-left: -6.87rem;
  margin-top: -3.5rem;
  @include bis("/static/bounced-img/bk-dialog-bg.png");

  .close-icon {
    cursor: pointer;
    position: absolute;
    right: 0.6rem;
    top: -0.78rem;
  }
  .record-video {
    width: 12.95rem;
    height: 7.29rem;
    position: absolute;
    left: 0.43rem;
    top: 0.43rem;
    // z-index:9999;
    // background-color: rgba(0, 0, 0, 0.6);
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
      font-family: PingFangSC-Regular;
      font-weight: bold;
      color: rgba(122, 244, 253, 1);
      margin-bottom: 0.13rem;
      padding: 0 0.2rem;
    }
  }
}
</style>