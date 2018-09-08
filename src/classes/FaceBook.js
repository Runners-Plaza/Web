import "../assets/FacebookAsset.js";

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
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      {
        scope: "email, public_profile",
        return_scopes: true
      }
    );
  },
  statusChangeCallback: function (response) {
    console.log("statusChangeCallback");
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === "connected") {
      // Logged into your app and Facebook.
      this.successCallback(response);
    } else {
      // The person is not logged into your app or we are unable to tell.
      this.login();
    }
  }
};

export default Facebook;