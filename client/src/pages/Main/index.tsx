import React from "react";

import { ellipse, square, triangle } from "ionicons/icons";
import Tab1 from "./Tab1";
import Tab2 from "./Tab2";
import Tab3 from "./Tab3";
import { Route } from "react-router-dom";
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";

export const Main: React.FC = () => (
  <IonTabs>
    <IonRouterOutlet>
      <Route path="/tab1" component={Tab1} exact={true} />
      <Route path="/tab2" component={Tab2} exact={true} />
      <Route path="/tab3" component={Tab3} />
    </IonRouterOutlet>
    <IonTabBar slot="bottom">
      <IonTabButton tab="tab1" href="/tab1">
        <IonIcon icon={triangle} />
        <IonLabel>Tab 1</IonLabel>
      </IonTabButton>
      <IonTabButton tab="tab2" href="/tab2">
        <IonIcon icon={ellipse} />
        <IonLabel>Tab 2</IonLabel>
      </IonTabButton>
      <IonTabButton tab="tab3" href="/tab3">
        <IonIcon icon={square} />
        <IonLabel>Tab 3</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);
