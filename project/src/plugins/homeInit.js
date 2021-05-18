import * as getData from '../service/getData'
import * as global from '../config/mUtils'
import {mapState} from "vuex";

export default {
  data() {
    return {
      iframeUrl: `${this.checkUndefined(this.getChannelUrl())}#/navbar?parentUrl=${encodeURIComponent(window.location.hostname)}&adminAccount=${this.checkUndefined(sessionStorage.getItem('adminAccount'))}&channelId=${this.checkUndefined(sessionStorage.getItem('channelId'))}&allSessionId=${this.checkUndefined(sessionStorage.getItem('allSessionId'))}`,
      iframeH: '100%',
      toggleSystem: false,
      isSwitch: true,
      myPermission: {},
      logoUrl: '',
    }
  },
  computed: {},
  methods: {
    checkUndefined(val) {
      switch (val) {
        case undefined:
        case 'undefined':
        case null:
        case 'null':
        case '':
          return '';
        default:
          return val;
      }
    },
    getChannelUrl() {
      const fromUrl = this.checkUndefined(localStorage.getItem('fromUrl'));
      const channelChannelUrl = this.checkUndefined(localStorage.getItem('channelChannelUrl'));
      if (fromUrl) {
        return fromUrl
      } else if (channelChannelUrl) {
        return channelChannelUrl
      } else if (this.checkUndefined(sessionStorage.getItem('channelChannelUrl'))) {
        return sessionStorage.getItem('channelChannelUrl')
      } else if (this.checkUndefined(sessionStorage.getItem('fromUrl'))) {
        return sessionStorage.getItem('fromUrl')
      } else if (this.checkUndefined(this.$route.query.fromUrl)) {
        return this.$route.query.fromUrl
      } else if (this.checkUndefined(this.$route.query.channelChannelUrl)) {
        return this.$route.query.channelChannelUrl
      }
    },
    childFun(val) {
      let route = val || this.$route.matched;
      route.forEach((item, index, arr) => {
        let fun = item.instances.default;
        if (fun) {
          if (fun.init) {
            fun.init(1, 1)
          }
        }
      })
    },
    closeDialog(e) {
      const className = e.target.className;
      if (className && className.indexOf('dialog__checkSystem') >= 0) {
        this.toggleSystem = false;
      }
      return false;
    },
    selectDropdown(val) {
      console.log(val)
    },
    gotoIndex() {
      const indexUrl = this.checkUndefined(localStorage.getItem('indexUrl'));
      if (indexUrl) {
        location.href = indexUrl + '#/index'
      } else if (this.checkUndefined(this.getChannelUrl())) {
        location.href = this.checkUndefined(this.getChannelUrl()) + '#/index'
      } else {
        global.message('没有获取到跳转地址，请刷新后重试！', 'warning');
      }
    },
    loginOut() {
      sessionStorage.removeItem('buttonPermission');
      const indexUrl = this.checkUndefined(localStorage.getItem('indexUrl'));
      if (indexUrl) {
        sessionStorage.clear();
        location.href = indexUrl;
        this.selectBtn = false;
      } else if (this.checkUndefined(this.getChannelUrl())) {
        location.href = this.checkUndefined(this.getChannelUrl())
      } else {
        global.message('没有获取到跳转地址，请刷新后重试！', 'warning');
      }
    },
    setHeight(type) {
      this.toggleSystem = false;
    },
  },
  created() {
  },
  mounted() {
  }
};
