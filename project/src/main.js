import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './config/rem'
import * as getData from './service/getData'
import store from './story/'
import VueCountUp from 'vue-countupjs'
import echarts from 'echarts'
import 'echarts-gl'
import AMap from 'vue-amap'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import './assets/font/font-message/iconfont.css';
import clickoutside from './plugins/clickoutside'
import components from './components/'
import ElementUI from 'element-ui'
import _ from 'lodash'
import './config/options'

Vue.use(ElementUI);
Vue.use(VueAwesomeSwiper);




Vue.prototype.$setPoint = (event) => {
    let e = event || window.event;
    console.log(
        `pos:[${((e.pageX / 100) - 0.2).toFixed(2)},${((
            e.pageY / 100
        ) - 0.3).toFixed(2)}],`
    )
}

Vue.prototype.$echarts = window.echarts = echarts;
Vue.prototype.Toast = (mess, time = 2000) => {
    store.state.toastShow = true
    store.state.toastMessage = mess
    const timer = setTimeout(() => {
        store.state.toastShow = false
        store.state.toastMessage = ''
        clearTimeout(timer)
    }, time)
}
Vue.prototype._ = _
Vue.use(VueCountUp);
window.Promise = Promise
const checkUndefined = (val) => {
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
};




Object.keys(components).forEach((key) => {
    var name = key.replace(/(\w)/, (v) => v.toUpperCase()) // 首字母大写
    Vue.component(`v${name}`, components[key])
});


const getQueryString = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = (window.location.href.split('?')[1] || '').match(reg);
    if (r != null) return decodeURIComponent(r[2]);
    return null;
}
let backUrl = getQueryString('channelUrl') || '//qs-back.zhihuipk.com/#/newLogin'
// router.beforeEach((to, from, next) => {
//   getData.adminDetail().then((res) => {
//     if (res.data.code != 1) {
//       window.location.href = backUrl
//     } else {
//       next()
//     }
//   }).catch((err) => {
//     window.location.href = backUrl
//   })
// });

AMap.initAMapApiLoader({
    key: '14f0692065a2cd59c9c2ac9b72272b71',
    plugin: ['Geolocation', 'Weather', 'DistrictSearch', 'Map3D'],
    // 默认高德 sdk 版本为 1.4.4
    // v: '1.4.14'
    v: '2.0'
});
Vue.directive('clickoutside',//自定义点击元素范围外触发的指令
    clickoutside
);
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
