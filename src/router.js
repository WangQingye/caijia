import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Main from './views/front/Main.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: Home,
      children: [{
        path: '/',
        name: 'main',
        component: Main
      }]
    },
    {
      path: '/backend',
      // route level code-splitting
      // this generates a separate chunk (subpage.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "subpage" */ './views/Backend.vue'),
      children: [{
          path: "/",
          component: () => import( /* webpackChunkName: "page1" */ './views/pages/Page1.vue')
        },
        {
          path: "/page2",
          component: () => import( /* webpackChunkName: "page2" */ './views/pages/Page2.vue')
        }
      ]
    },
    {
      path: '/qrcode',
      component: () => import( /* webpackChunkName: "subpage" */ './views/Phone.vue')
    }
  ]
})