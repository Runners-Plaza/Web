import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Profile from './views/Profile.vue'
import Users from './views/Users.vue'

import MarathonSurveyIndex from './views/marathon-survey/Index.vue'

Vue.use (Router)

export default new Router ({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
    },
    {
      path: '/marathon-survey/index',
      name: 'marathon_survey_index',
      component: MarathonSurveyIndex,
    },
  ]
})
