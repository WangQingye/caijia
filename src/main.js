import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import store from './store'
import './assets/css/reset.css'
import fetch from "@/assets/js/fetch";
import {signData} from "@/assets/js/sign";
Vue.config.productionTip = false
Vue.prototype.$fetch = fetch;
Vue.prototype.$signData = signData;
let a = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default a
