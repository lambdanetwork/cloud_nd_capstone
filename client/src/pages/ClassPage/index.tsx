import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import React, { useEffect } from "react";
import "./index.css";

export const ClassPage: React.FC = () => {
  useEffect(() => {
    // fetch API
  }, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Class</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent
        scrollEvents={true}
        onIonScrollStart={() => {}}
        onIonScroll={() => {}}
        onIonScrollEnd={() => {}}
      >
        <IonButton>Create Class</IonButton>
      </IonContent>
    </IonPage>
  );
};

/**
 * TODO:
 * 1. fetch class json
 * 2. render list
 * 3. each list can have join,
 *    a) if class has both student and tutor cannot join anymore
 *
 * 1. fetch tutor
 * 2. can fetch only tutor, but not student
 *
 * TODO:
 * 1. create class
 * 2. when button is click it will open upload picture
 * 3. when everything is ready,
 *    a) client will post create class
 *    b) client will post generate upload url
 *    c) client will upload the file to generate upload url
 */
