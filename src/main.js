import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import store from './store'
import './assets/css/reset.css'
import fetch from "@/assets/js/fetch";
Vue.config.productionTip = false
Vue.prototype.$fetch = fetch;
let a = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default a
