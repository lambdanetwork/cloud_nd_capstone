import * as React from 'react';
import {
    IonButton,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonItem,
    IonLabel,
    IonButtons,
    IonModal,
    IonIcon,
    IonDatetime,
} from "@ionic/react";
import {
    CameraResultType,
    CameraSource,
    Camera,
} from "@capacitor/core";
import { camera } from "ionicons/icons";
import classAPI from '../../api/classAPI';
import { v4 as uuidv4 } from "uuid";


interface Props {
    isOpen: boolean;
    setModalOpen: (b: boolean) => void;
}
export const ClassForm = (p: Props) => {
    const [startTime, setStartTime] = React.useState<string>('');
    const [startDate, setStartDate] = React.useState<string>('');
    const [endDate, setEndDate] = React.useState<string>('');
    const [endTime, setEndTime] = React.useState<string>('');
    const [imageUrl, setImageUrl] = React.useState<string>('');
    const [classId, setClassId] = React.useState<string>('');

    React.useEffect(() => {
      const classId = uuidv4();
      setClassId(classId)
    }, [])
    console.log('classId', classId)
    return (
        <IonModal isOpen={p.isOpen}>
        <IonHeader translucent>
            <IonToolbar>
              <IonTitle>Class Detail</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => p.setModalOpen(false)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
            <IonItem>
                <IonLabel>Question Image</IonLabel>
                {
                  imageUrl ? 
                    <img style={{width: '100%'}} src={imageUrl}  alt="question"/>
                  :  
                  <IonButton onClick={() => addPhotoToGallery(classId, setImageUrl)}>
                    <IonIcon icon={camera}></IonIcon>
                  </IonButton>
                }
                
            </IonItem>
            <IonItem>
              <IonLabel>start date</IonLabel>
              <IonDatetime 
                value={startDate} 
                onIonChange={e => setStartDate(e.detail.value!)} 
                placeholder="Select Date"></IonDatetime>
            </IonItem>
            <IonItem>
              <IonLabel>start time</IonLabel>
              <IonDatetime 
                displayFormat="h:mm A" 
                minuteValues="0,15,30,45" 
                value={startTime} 
                placeholder="Select Time"
                onIonChange={e => setStartTime(e.detail.value!)}></IonDatetime>
            </IonItem>
            <IonItem>
              <IonLabel>end date</IonLabel>
              <IonDatetime 
                value={endDate} 
                onIonChange={e => setEndDate(e.detail.value!)}
                placeholder="Select Date"></IonDatetime>
            </IonItem>
            <IonItem>
              <IonLabel>end time</IonLabel>
              <IonDatetime 
                displayFormat="h:mm A" 
                minuteValues="0,15,30,45" 
                value={endTime} 
                placeholder="Select Time"
                onIonChange={e => setEndTime(e.detail.value!)}
              ></IonDatetime>
            </IonItem>
            <IonButton onClick={() => saveForm(
              classId,
              startTime, startDate, endTime, endDate, imageUrl,
              p.setModalOpen
            )}>Save</IonButton>
          </IonContent>
          </IonModal>
    )
}

export default ClassForm



const addPhotoToGallery = async (classId: string, setImageUrl: Function) => {
  try{
    const { uploadUrl } = await classAPI.generateProfileUploadUrl(classId);
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100,
    });
    console.log(' photo gallery classId', classId)

    const result = await classAPI.uploadImage(uploadUrl, capturedPhoto.base64String!!)
    if(result){
      const url= `https://pintar-class-dev.s3-ap-southeast-1.amazonaws.com/${classId}`;
      setImageUrl(url)
    }
  } catch(err){}
};
  
  const saveForm = async (
    classId: string, startTime: string, startDate: string, endTime:string, endDate: string, imageUrl: string,
    setModalOpen: Function) => {
    const startTimestamp = new Date(startDate.split('T')[0] +  'T' + startTime.split('T')[1]).getTime();
    const endTimestamp =  new Date(endDate.split('T')[0] + 'T' + endTime.split('T')[1]).getTime();
   

    // convert startDateTime and endDateTime to number
    // attach studentId to class
    const userId = localStorage.getItem('userId')
    const ClassSession = {
      classId,
      startTime: startTimestamp,
      endTime: endTimestamp,
      imageQuestion: imageUrl,
      studentId: userId,
      status: "0"
    }
    if(!imageUrl || !userId){
      return;
    }
    classAPI.createClass(ClassSession)
    setModalOpen(false)
  };
  