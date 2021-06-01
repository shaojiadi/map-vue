<template>
  <!-- :src="'http://hik-player.zhihuipk.com/?ip=10.19.236.223&cameraIndexCode=' + src" -->
  <iframe
    class="video-js"
    :id="id"
    :src="`http://hik-player.zhihuipk.com/?cameraIndexCode=${activeCameraIndexCode}&showToolbar=${showToolbar}`"
    allowfullscreen="true"
    frameborder="0"
  ></iframe>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    activeCameraIndexCode: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "ifram1",
    },
    showToolbar: {
      type: Number,
      default: 0,
    },
  },
  mounted() {
    this.$nextTick(()=>{
      this.init();
    })
  },
  components: {},
  computed: {},
  methods: {
    init() {
      // 步骤2：嵌入子页面的页面中在iframe的onload事件中向子页面抛以下消息
      var iframeWin = document.getElementById(this.id);
      
      {
        iframeWin.onload = function () {
          console.log(
            iframeWin.offsetLeft,
            iframeWin.getBoundingClientRect(),
            0
          );
            // setInterval(() => {
            //     console.log(iframeWin.getBoundingClientRect(),22)
            // }, 200);
          iframeWin.contentWindow.postMessage(
            {
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
            },
            "*"
          ); // '\*'表示跨域参数，请结合自身业务合理设置

      
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
        // console.log(iframeWin.getBoundingClientRect(), 11);
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
  watch: {
    // activeCameraIndexCode:{
    // 　　handler(newVal,oldVal) {
    //     console.log(newVal,7777777777);
    //   　　this.init()
    // 　　},
    // }
  },
};
</script>

<style lang="scss">
.video-js {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
