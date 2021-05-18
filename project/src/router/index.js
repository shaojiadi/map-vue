import Vue from 'vue'
import Router from 'vue-router'

const index = r => require.ensure([], () => r(require('../pages/index')), 'index');
const indexMain = r => require.ensure([], () => r(require('../pages/main')), 'indexMain');
const archivesCenter = r => require.ensure([], () => r(require('../pages/archivesCenter')), 'archivesCenter');  //设备中心
const contingencyManagement = r => require.ensure([], () => r(require('../pages/contingencyManagement')), 'contingencyManagement');  //应急管理
const dataAnalysis = r => require.ensure([], () => r(require('../pages/dataAnalysis')), 'dataAnalysis');  //数据分析
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/indexMain',
      name: 'indexMain',
      component: indexMain
    },
    {
      path: '/archivesCenter',
      name: 'archivesCenter',
      component: archivesCenter
    },
    {
      path: '/contingencyManagement',
      name: 'contingencyManagement',
      component: contingencyManagement
    },
    {
      path: '/dataAnalysis',
      name: 'dataAnalysis',
      component: dataAnalysis,
    }
  ]
})

