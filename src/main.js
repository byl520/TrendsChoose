/*
 * @Author: Elaine
 * @Date: 2023-06-10 11:27:54
 * @LastEditors: Elaine
 * @LastEditTime: 2023-06-13 19:47:09
 * @Description: 请填写简介
 */
/*
 * @Author: Elaine
 * @Date: 2023-06-10 11:27:54
 * @LastEditors: Elaine
 * @LastEditTime: 2023-06-13 14:33:25
 * @Description: 请填写简介
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import 'lib-flexible';
import * as echarts from 'echarts'
import ECharts from 'vue-echarts';
import Bridge from '@/assets/bridge'
Vue.prototype.$bridge = Bridge
Vue.prototype.$echarts = echarts
Vue.use(Vant);
Vue.use(ECharts)
Vue.config.productionTip = false

new Vue({
    router,
  render: h => h(App),
}).$mount('#app')