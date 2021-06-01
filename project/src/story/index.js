import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)
window.Promise = Promise
const state = {
	mapCenter:null,
	mapRotation:-4.66,
	mapZoom: 15.51,
	defCenter: [120.280089, 36.272601],
	defZoom: 15.51,
	defRotation: -4.66,
	defPitch: 54.16021355617455,
	companyInfoShow: false,
	companyInfo: null,
	channelId:0,
	addPlicePoint:0,
	policeGo:0,
	toastShow:false,
    toastMessage:'',
    daoru:false,
	fenxidaoru:false,
	activeCameraIndexCode:'317937102b4540658aef042e18b78bd4',
	videoList:[],

    videoUrl:'rtmp://47.97.107.52:1940/live/qdgx31',
    warnList:[],
	activeIndex: -1,
	isShowValue: 0,
	isShowjk: false,
	guanLangValue: 0,

	saceShow:false,//调取监控弹窗
}
export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})
