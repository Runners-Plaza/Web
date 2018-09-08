const Facebook = function (successCallback) {
  this.successCallback = successCallback;
};
Facebook.prototype = {
  successCallback: Function,
  checkLoginState: function () {
    let self = this;
    FB.getLoginStatus(function (response) {
      self.statusChangeCallback(response);
    });
  },
  login: function () {
    let self = this;
    FB.login(
      function (response) {
        if (response.authResponse) {
          self.statusChangeCallback(response);
        } else {
        }
      },
      {
        scope: "email, public_profile",
        return_scopes: true
      }
    );
  },
  statusChangeCallback: function (response) {
    if (response.status === "connected") {
      this.successCallback(response);
    } else {
      this.login();
    }
  }
};

export default Facebook;