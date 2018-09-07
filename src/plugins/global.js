import Vue from 'vue'

const me = {
  exist: false
}

const sidebar = {
  show: true
}

const Global = {
  install (Vue) {
    Vue.mixin({
      data () {
        return {
          me,
          sidebar
        }
      }
    })
  }
}

Vue.use(Global)
