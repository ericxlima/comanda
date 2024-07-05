import { IonContent, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import { useEffect, useState } from 'react';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';


const Home: React.FC = () => {

  const [err, seterr] = useState<string>()

  useEffect(() => {
    const checkPermission = async () => {
      try {
        const status = await BarcodeScanner.checkPermission({ force: true });
        if (status.granted) {
          return true;
        }
        return false;
      } catch (error) {
        seterr(error.message)
      }
    };

    checkPermission()
    
    return () => {

    }
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Comanda</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <IonRow>
          {err}
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Home;
