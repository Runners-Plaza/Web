import Vue from 'vue'
import '@/assets/FacebookAsset.js'

const Facebook = {
  install (Vue) {
    Vue.prototype.facebook = {
      success: Function,
      afterSuccess (success) {
        this.success = success
      },
      login () {
        let self = this
        FB.login ((response) => {
          if (response.authResponse) {
            self.statusChangeCallback (response)
          }
        },{
          scope: "email, public_profile",
          return_scopes: true,
        })
      },
      statusChangeCallback (response) {
        if (response.status === "connected") {
          this.success (response)
        } else {
          this.login ()
        }
      },
    }
  }
}

Vue.use (Facebook)
