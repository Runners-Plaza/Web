import Vue from 'vue'
import moment from 'moment'

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
          Object.assign (this.me, {})
          this.me.show = false
          this.me.can = {
            manage: false,
            attend: false,
          }
          this.me.position = null
          this.backToLogin ()
        },
        hasPermission (manage = false) {
          if (this.me.show) {
            if (manage) {
              return this.me.can.manage
            } else {
              return this.me.can.attend
            }
          }
          return false
        },
        backToLogin () {
          this.$router.replace ({ name: 'login' })
        },
        convertDate (date) {
          return moment (date).format ('YYYY-MM-DD HH:mm:ss') + ' +08:00'
        },
      },
    })
  }
}

Vue.use (Global)

export default toaster
