import '@babel/polyfill'
import Vue from 'vue'
import './plugins/global'
import './plugins/vuetify'
import './plugins/facebook'
import './plugins/runners-plaza'
import './plugins/OAuth'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
