import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import store from './store'
import './assets/css/reset.css'
import fetch from "@/assets/js/fetch";
import {signData, checkSign} from "@/assets/js/sign";
import {renderTime} from "@/assets/js/switchTime"


Vue.config.productionTip = false
Vue.prototype.$fetch = fetch;
Vue.prototype.$signData = signData;
Vue.prototype.$checkSign = checkSign;
Vue.prototype.renderTime = renderTime;
let a = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

export default a
