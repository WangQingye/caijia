import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import MainPage from './views/front/MainPage.vue'
import Bus from '@/assets/js/bus'
import vm from './main'
Vue.use(Router)
let router = new Router({
  routes: [{
      path: '/',
      redirect: '/main'
    },{
      path: '/main',
      name: 'main',
      component: () => import( /* webpackChunkName: "main" */ './views/Home.vue')
    },{
      path: '/login',
      name: 'login',
      component: () => import( /* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/backend',
      // route level code-splitting
      // this generates a separate chunk (subpage.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "backend" */ './views/backend/Backend.vue'),
      children: [{
          path: "/",
          component: () => import( /* webpackChunkName: "datadetail" */ './views/backend/sub/DataDetail.vue')
        }, {
          path: "/datadetail",
          component: () => import( /* webpackChunkName: "datadetail" */ './views/backend/sub/DataDetail.vue')
        },
        {
          path: "/datachart",
          component: () => import( /* webpackChunkName: "datachart" */ './views/backend/sub/DataChart.vue')
        },
        {
          path: "/membermana",
          component: () => import( /* webpackChunkName: "membermana" */ './views/backend/sub/MemberMana.vue')
        },
        {
          path: "/placemana",
          component: () => import( /* webpackChunkName: "placemana" */ './views/backend/sub/PlaceMana.vue')
        },
        {
          path: "/varitymana",
          component: () => import( /* webpackChunkName: "varitymana" */ './views/backend/sub/VarityMana.vue')
        }
      ]
    }
  ]
})
export default router;