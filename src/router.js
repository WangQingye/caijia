import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import MainPage from './views/front/MainPage.vue'

Vue.use(Router)

export default new Router({
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
          component: () => import( /* webpackChunkName: "page1" */ './views/pages/Page1.vue')
        },
        {
          path: "/page2",
          component: () => import( /* webpackChunkName: "page2" */ './views/pages/Page2.vue')
        }
      ]
    },
    {
      path: '/login',
      component: () => import( /* webpackChunkName: "phone" */ './views/Login.vue')
    },
    {
      path: '/qrcode',
      component: () => import( /* webpackChunkName: "phone" */ './views/Phone.vue')
    }
  ]
})