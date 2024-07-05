import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { CameraComponent } from '../components/CameraComponent';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Comanda</IonTitle>
          </IonToolbar>
        </IonHeader>
        <CameraComponent />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
