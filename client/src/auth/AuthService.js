import auth0 from "auth0-js";
import { authConfig } from "../config/authConfig";

export default class AuthService {
  static accessToken;
  static idToken;
  static expiresAt;

  static auth0 = new auth0.WebAuth({
    domain: authConfig.domain,
    clientID: authConfig.clientId,
    redirectUri: authConfig.callbackUrl,
    responseType: "token id_token",
    scope: "openid",
  });

  static init(history) {
    this.history = history;
  }

  static login = () => {
    this.auth0.authorize();
  };

  static handleAuthentication = (props) => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        console.log("Access token: ", authResult.accessToken);
        console.log("id token: ", authResult.idToken);
        this.setSession(authResult);
      } else if (err) {
        this.history.replace("/");
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  };

  static getAccessToken = () => {
    return this.accessToken;
  };

  static getIdToken = () => {
    return this.idToken;
  };

  static setSession = (authResult) => {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem("isLoggedIn", "true");

    // Set the time that the access token will expire at
    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;

    // navigate to the home route
    this.history.replace("/");
  };

  static renewSession = () => {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.logout();
        console.log(err);
        alert(
          `Could not get a new token (${err.error}: ${err.error_description}).`
        );
      }
    });
  };

  static logout = () => {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem("isLoggedIn");

    this.auth0.logout({
      return_to: window.location.origin,
    });

    // navigate to the home route
    this.history.replace("/");
  };

  static isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = this.expiresAt;
    return new Date().getTime() < expiresAt;
  };
}
