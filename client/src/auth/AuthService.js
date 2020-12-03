import auth0 from "auth0-js";
import userAPI from "../api/userAPI";
import { authConfig } from "../config/authConfig";
import { decode } from 'jsonwebtoken'
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
    this.auth0.parseHash(async (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        console.log("Access token: ", authResult.accessToken);
        console.log("id token: ", authResult.idToken);
        this.setSession(authResult);

        // get user from db, if user does not exists, try to create
        try {
          const user = await userAPI.getUserByJWT();
          if(!user) {
            await userAPI.createUser({
              type: "1000"
            });
          }
        } catch(err){ 
          console.error(err)
        }

        window.location.reload();
        
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
    localStorage.setItem("idToken", authResult.idToken);
    const userId= parseUserId(authResult.idToken);
    console.log(userId)
    localStorage.setItem("userId", userId)
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
    localStorage.removeItem("idToken");

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



/**
 * Parse a JWT token and return a user id
 * @param jwtToken JWT token to parse
 * @returns a user id from the JWT token
 */
export function parseUserId(jwtToken) {
  const decodedJwt = decode(jwtToken) 
  return decodedJwt.sub
}
