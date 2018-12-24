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
      path: '/subpage',
      // route level code-splitting
      // this generates a separate chunk (subpage.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "subpage" */ './views/Subpage.vue'),
      children: [{
          path: "/",
          component: () => import( /* webpackChunkName: "page1" */ './views/pages/Page1.vue')
        },
        {
          path: "/page2",
          component: () => import( /* webpackChunkName: "page2" */ './views/pages/Page2.vue')
        }
      ]
    }
  ]
})