import { IonButton, IonContent, IonRouterLink, IonText } from "@ionic/react";
import React from "react";
import AuthService from "../../auth/AuthService";
import "./index.css";

const signin = () => {
  AuthService.login();
};

export const Login: React.FC = () => {
  // if already login
  return (
    <IonContent
      scrollEvents={true}
      onIonScrollStart={() => {}}
      onIonScroll={() => {}}
      onIonScrollEnd={() => {}}
    >
      <div className="login">
        <div className="login-container">
          <h1>Join Pintar Today</h1>

          <IonButton expand="block">Create Account</IonButton>
          <IonButton expand="block" color="dark">
            Apply to be tutor
          </IonButton>
          <IonText color="dark">
            Already a member,{" "}
            <IonRouterLink onClick={signin}>sign in</IonRouterLink>{" "}
          </IonText>
        </div>
      </div>
    </IonContent>
  );
};
