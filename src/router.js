import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Profile from './views/Profile.vue'
import Users from './views/Users.vue'

Vue.use (Router)

export default new Router ({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        enablePaging: false,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        enablePaging: false,
      },
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
      meta: {
        enablePaging: true,
      },
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        enablePaging: false,
      },
    },
  ]
})
