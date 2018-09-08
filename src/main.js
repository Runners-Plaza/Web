import '@babel/polyfill'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './plugins/vuetify'
import './plugins/global'
import App from './App.vue'
import router from './router'

Vue.use(VueAxios, axios)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
