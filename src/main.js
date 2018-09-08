import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import './plugins/global'
import './plugins/runners-plaza'
import './plugins/me'
import './plugins/OAuth'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
