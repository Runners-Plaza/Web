import Vue from 'vue'

const snackbar = {
  show: false,
  color: 'success',
  message: '',
  timeout: 3000
}

const toaster = {
  dismiss () {
    snackbar.show = false
  },
  success (message) {
    Object.assign(snackbar, {
      show: true,
      color: 'success',
      message
    })
  },
  error (message) {
    Object.assign(snackbar, {
      show: true,
      color: 'error',
      message
    })
  }
}

const Toast = {
  install (Vue) {
    Vue.mixin({
      data () {
        return {
          snackbar
        }
      }
    })
    Vue.prototype.toast = toaster
  }
}

Vue.use(Toast)

export default toaster