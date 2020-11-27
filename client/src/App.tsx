import React from "react";
import { Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import { IonApp, IonLoading } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import { Main } from "./pages/Main";
import { Login } from "./pages/Login";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import AuthService from "./auth/AuthService";

const history = createBrowserHistory();
AuthService.init(history);
const App: React.FC = () => {
  const userJWT = localStorage.getItem("isLoggedIn");
  if (
    !userJWT &&
    window.location.pathname !== "/login" &&
    window.location.pathname !== "/callback"
  ) {
    window.location.href = "/login";
    return null;
  }
  return (
    <IonApp>
      <IonReactRouter history={history}>
        <Route
          path="/callback"
          render={(props) => {
            alert("here");
            AuthService.handleAuthentication(props);

            return (
              <IonLoading
                cssClass="my-custom-class"
                isOpen={true}
                message={"Please wait..."}
                duration={5000}
              />
            );
          }}
        />
        <Route path="/login" component={Login} exact={true} />
        <Route path="/" component={Main} exact={true} />
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
