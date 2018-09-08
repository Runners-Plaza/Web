import Vue from 'vue'

const sidebar = {
  show: true
}

const Global = {
  install (Vue) {
    Vue.mixin({
      data () {
        return {
          sidebar
        }
      }
    })
  }
}

Vue.use(Global)
