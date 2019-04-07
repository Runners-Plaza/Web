import '@babel/polyfill'
import Vue from 'vue'
import './plugins/global'
import './plugins/vuetify'
import './plugins/facebook'
import './plugins/pagination'
import './plugins/runners-plaza'
import './plugins/oauth'
import './plugins/cookie'
import './plugins/datetimepicker'
import i18n from './plugins/i18n'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue ({
  router,
  i18n,
  render: h => h (App),
}).$mount ('#app')
