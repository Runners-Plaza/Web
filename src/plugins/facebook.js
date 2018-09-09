import Vue from 'vue'
import '@/assets/FacebookAsset.js'

const Facebook = {
  install(Vue) {
    Vue.prototype.facebook = {
      checkLoginState() {
        let self = this
        FB.getLoginStatus(function (response) {
          self.statusChangeCallback(response)
        })
      },
      login() {
        let self = this
        FB.login(
          function (response) {
            if (response.authResponse) {
              self.statusChangeCallback(response)
            }
          },
          {
            scope: "email, public_profile",
            return_scopes: true
          }
        )
      },
      statusChangeCallback(response) {
        if (response.status === "connected") {
          this.success(response)
        } else {
          this.login()
        }
      },
      success: Function,
      afterSuccess(success) {
        this.success = success
      }
    }
  }
}

Vue.use(Facebook)
