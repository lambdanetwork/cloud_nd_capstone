import { IonSpinner } from '@ionic/react';
import React from 'react';

export const Spinner = () => (
    <div style={{display: 'flex', 
    width: '100%',
    height: '100vh',
    justifyContent: 'center', alignItems: "center"}}>
        <IonSpinner />
    </div>

)