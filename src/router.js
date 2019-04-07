import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Profile from './views/Profile.vue'
import Users from './views/Users.vue'

import Runner from './views/runner/Index.vue'
import RunnerRegisterRecordIndex from './views/runner/RegisterRecordIndex.vue'
import RunnerRegisterRecordDetail from './views/runner/RegisterRecordDetail.vue'
import RunnerRecordCreate from './views/runner/RegisterRecord.vue'
import Runners from './views/runners/Index.vue'
import RunnersDetail from './views/runners/Detail.vue'
import Events from './views/events/Index.vue'
import EventsDetail from './views/events/Detail.vue'
import EventsCreate from './views/events/Create.vue'
import EventsUpdate from './views/events/Update.vue'

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
      path: '/runner',
      name: 'runner',
      component: Runner,
    },
    {
      path: '/runner/register_record',
      name: 'runner_register_record',
      component: RunnerRegisterRecordIndex,
    },
    {
      path: '/runner/register_record/:id',
      name: 'runner_register_record_detail',
      component: RunnerRegisterRecordDetail,
    },
    {
      path: '/runner/register_record/:id/create',
      name: 'runner_record_create',
      component: RunnerRecordCreate,
    },
    {
      path: '/runners',
      name: 'runners',
      component: Runners,
    },
    {
      path: '/runners/:id',
      name: 'runner_detail',
      component: RunnersDetail,
    },
    {
      path: '/events',
      name: 'events',
      component: Events,
    },
    {
      path: '/events/:id',
      name: 'events_detail',
      component: EventsDetail,
    },
    {
      path: '/events/create',
      name: 'events_create',
      component: EventsCreate,
    },
    {
      path: '/events/:id/update',
      name: 'events_update',
      component: EventsUpdate,
    },
  ]
})
