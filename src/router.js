import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/query',
      name: 'query',
      // route level code-splitting
      // this generates a separate chunk (query.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "query" */ './views/Query.vue'),
      children: [{
          path: "/",
          component: () => import( /* webpackChunkName: "form" */ './views/pages/Form.vue')
        },
        {
          path: "/fund",
          component: () => import( /* webpackChunkName: "fund" */ './views/pages/Fund.vue')
        },
        {
          path: "/target",
          component: () => import( /* webpackChunkName: "target" */ './views/pages/Target.vue')
        },
        {
          path: "/payment",
          component: () => import( /* webpackChunkName: "payment" */ './views/pages/Payment.vue')
        },
        {
          path: "/warning",
          component: () => import( /* webpackChunkName: "warning" */ './views/pages/Warning.vue')
        }
      ]
    }
  ]
})