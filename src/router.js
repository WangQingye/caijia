import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import MainPage from './views/front/MainPage.vue'
import Bus from '@/assets/js/bus'
Vue.use(Router)
let router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/main',
      name: 'home',
      component: Home,
      children:
       [
          {
          path: '/main',
          name: 'mainPage',
          component: MainPage
        },{
          path: '/apply',
          name: 'apply',
          component: () => import( /* webpackChunkName: "apply" */ './views/front/Apply.vue')
        },{
          path: '/news/:id?',
          name: 'news',
          component: () => import( /* webpackChunkName: "apply" */ './views/front/News.vue')
        }
      ]
    },
    {
      path: '/backend',
      // route level code-splitting
      // this generates a separate chunk (subpage.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "backend" */ './views/backend/Backend.vue'),
      children: [{
          path: "/",
          component: () => import( /* webpackChunkName: "backmain" */ './views/backend/pages/BackMain.vue')
        }, {
          path: "/codemana",
          component: () => import( /* webpackChunkName: "codemana" */ './views/backend/pages/CodeMana.vue')
        },
        {
          path: "/stockoutfill",
          component: () => import( /* webpackChunkName: "sourcefill" */ './views/backend/pages/StockOutFill.vue')
        },
        {
          path: "/transfill",
          component: () => import( /* webpackChunkName: "sourcefill" */ './views/backend/pages/TransFill.vue')
        },
        {
          path: "/verifyfill",
          component: () => import( /* webpackChunkName: "sourcefill" */ './views/backend/pages/VerifyFill.vue')
        },
        {
          path: "/storemana",
          component: () => import( /* webpackChunkName: "storemana" */ './views/backend/pages/StoreMana.vue')
        },
        {
          path: "/tagmana",
          component: () => import( /* webpackChunkName: "tagmana" */ './views/backend/pages/TagMana.vue')
        },
        {
          path: "/tagverify",
          component: () => import( /* webpackChunkName: "tagverify" */ './views/backend/pages/TagVerify.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import( /* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/qrcode',
      component: () => import( /* webpackChunkName: "phone" */ './views/Phone.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  setTimeout(() => {
    Bus.$emit('router-change', {
      mainPage:0,
      news:1,
      apply:2,
      login:3
    }[to.name]);
    if (to.name == 'news') {
      window.scrollTo(0,0);
    }
  }, 100);
  next();
});
export default router;