/*
 * @Author: Elaine
 * @Date: 2023-06-10 11:27:54
 * @LastEditors: Elaine
 * @LastEditTime: 2023-06-10 12:17:52
 * @Description: 请填写简介
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import 'lib-flexible';
import echarts from 'echarts'

Vue.prototype.$echarts = echarts
Vue.use(Vant);
Vue.config.productionTip = false

new Vue({
    router,
  render: h => h(App),
}).$mount('#app')