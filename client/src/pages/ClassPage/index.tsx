import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonTitle,
  IonCard,
  IonItem,
  IonLabel,
  IonCardContent
} from "@ionic/react";
import React, { useEffect } from "react";
import classAPI from "../../api/classAPI";
import { Spinner } from "../../components/Spinner";
import { sleep } from "../../utils/sleep";
import ClassForm from "./ClassForm";
import "./index.css";



export const ClassPage: React.FC = () => {
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [classList, setClassList] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  useEffect(() => {
    // fetch API
    if(isModalOpen) return;

    (async function fetchClass(){
      await sleep(300);

      setIsLoading(true)
      const classes = await classAPI.getClasses();
      setClassList(classes);
      setIsLoading(false)
    }());

  },[isModalOpen]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Class List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent
        scrollEvents={true}
        onIonScrollStart={() => {}}
        onIonScroll={() => {}}
        onIonScrollEnd={() => {}}
      >
        <IonButton onClick={() => setModalOpen(true)}>Create Class</IonButton>
        {/* Class Form is modal */}
        <ClassForm isOpen={isModalOpen} setModalOpen={setModalOpen} />
    
        {/* Class list */}
        {isLoading && <Spinner />}
        {classList.map(cl => {
          return (
            <IonCard>
              <IonItem>
                <IonCardContent>
                  <img src={cl.imageQuestion} alt="question"/>
                  <IonLabel>Class opened by student: </IonLabel>
                  {cl.studentId}
                  <IonButton fill="outline" slot="end">View</IonButton>
                </IonCardContent>
              </IonItem>

             
            </IonCard>
          )
        })}

      </IonContent>
    </IonPage>
  );
};
