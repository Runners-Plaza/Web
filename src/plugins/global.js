import Vue from 'vue'

const languages = [
  {
    id: 'en_US',
    name: 'English',
  },
  {
    id: 'zh_TW',
    name: '繁體中文',
  },
]

const me = {
  show: false,
}

const sidebar = {
  show: true,
}

const snackbar = {
  show: false,
  color: 'success',
  message: '',
  timeout: 3000,
}

const toaster = {
  dismiss () {
    snackbar.show = false
  },
  success (message) {
    Object.assign (snackbar, {
      show: true,
      color: 'success',
      message,
    })
  },
  error (message) {
    Object.assign (snackbar, {
      show: true,
      color: 'error',
      message,
    })
  },
}

const Global = {
  install (Vue) {
    Vue.mixin ({
      data () {
        return {
          me,
          languages,
          sidebar,
          snackbar,
          toaster,
        }
      },
      methods: {
        async login () {
          let me = await this.runnersPlaza.getMyself ()
          Object.assign (this.me, me)
          this.me.show = true
        },
        async logout () {
          this.oauth.clearTokenData ()
          this.me.show = false
          this.$router.replace ({ name: 'login' })
        },
      },
    })
  }
}

Vue.use (Global)

export default toaster
