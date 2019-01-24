import Vue from 'vue';
import Vuex from 'vuex'; //引入 vuex

Vue.use(Vuex); //使用 vuex

export default new Vuex.Store({
  state: {
    // 初始化状态
    userInfo: {
      // "id": 1,
      // "companyCode": "01",
      // "companyName": "test",
      // "companyTypeName": "超级管理员",
      // "typeCode": "1",
      // "account": "admin",
      // "pk": "1",
      // "esk": "411a36a901e4bd76550d421580f27a697b288bafc20337071a68fe239bf73b105a7026569c4060068643d6cd8b73126c6ba512b0ccbb74225590bc1385814c0e",
      // "name": "1",
      // "createTime": "2019-01-17 10:38:01",
      // "usable": true
    },
    showPkDialog: false,
    privateKey: ''
  },
  mutations: {
    saveUserInfo(state, info) {
      state.userInfo = info
    },
    setPkDialogShow(state, flag) {
      state.showPkDialog = flag
    },
    savePrivateKey(state, key) {
      state.privateKey = key
    }
  },
  actions: {
    // 提交改变后的状态
    // increment(context, param) {
    //   context.state.count += param.step;
    //   context.commit('increment', context.state.count)//提交改变后的state.count值
    // },
    // incrementStep({state, commit, rootState}) {
    //   if (rootState.count < 100) {
    //     store.dispatch('increment', {//调用increment()方法
    //       step: 10
    //     })
    //   }
    // }
  }
})