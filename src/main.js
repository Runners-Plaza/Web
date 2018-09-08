import '@babel/polyfill'
import Vue from 'vue'
import VueResource from 'vue-resource'
import './plugins/vuetify'
import './plugins/global'
import App from './App.vue'
import router from './router'

Vue.use(VueResource)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  http: {
  }
}).$mount('#app')
