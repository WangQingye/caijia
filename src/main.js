import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import store from './store'
import './assets/css/reset.css'
import fetch from "@/assets/js/fetch";
import {signData, checkSign} from "@/assets/js/sign";

// import preview from 'vue-photo-preview'
// import 'vue-photo-preview/dist/skin.css'
// import '../node_modules/vue-photo-preview/dist/vue-photo-preview.js'
// Vue.use(preview)

// import VuePreview from 'vue2-preview'
// Vue.use(VuePreview)

Vue.config.productionTip = false
Vue.prototype.$fetch = fetch;
Vue.prototype.$signData = signData;
Vue.prototype.$checkSign = checkSign;
let a = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

export default a
