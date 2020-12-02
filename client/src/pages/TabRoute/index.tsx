import React from "react";

import { calendar, person, people } from "ionicons/icons";
import { Redirect, Route, Switch } from "react-router-dom";
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { ClassPage } from "../ClassPage";
import { ProfilePage } from "../ProfilePage";

import { TutorPage } from "../TutorList";

export const TabRoute: React.FC = () => (
  <IonTabs>
    <IonRouterOutlet>
      <Switch>
        {/*
      Using the render method prop cuts down the number of renders your components will have due to route changes.
      Use the component prop when your component depends on the RouterComponentProps passed in automatically.
    */}
        <Route path="/tabs/classes" render={() => <ClassPage />} exact={true} />

        <Route path="/tabs/tutors" render={() => <TutorPage />} exact={true} />
        {/* <Route path="/tabs/speakers/:id" component={SpeakerDetail} exact={true} />
      <Route path="/tabs/schedule/:id" component={SessionDetail} />
      <Route path="/tabs/speakers/sessions/:id" component={SessionDetail} />
      <Route path="/tabs/map" render={() => <MapView />} exact={true} />*/}
        <Route
          path="/tabs/profile"
          render={() => <ProfilePage />}
          exact={true}
        />
        <Redirect exact path="/" to="/tabs/classes" />
      </Switch>
    </IonRouterOutlet>
    <IonTabBar slot="bottom">
      <IonTabButton tab="schedule" href="/tabs/classes">
        <IonIcon icon={calendar} />
        <IonLabel>Classes</IonLabel>
      </IonTabButton>
      <IonTabButton tab="tutor" href="/tabs/tutors">
        <IonIcon icon={people} />
        <IonLabel>Tutors</IonLabel>
      </IonTabButton>
      <IonTabButton tab="profile" href="/tabs/profile">
        <IonIcon icon={person} />
        <IonLabel>Profile</IonLabel>
      </IonTabButton>
      {/* <IonTabButton tab="about" href="/tabs/about">
        <IonIcon icon={informationCircle} />
        <IonLabel>About</IonLabel>
      </IonTabButton> */}
    </IonTabBar>
  </IonTabs>
);
