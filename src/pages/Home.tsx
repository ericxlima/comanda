import { IonButton, IonButtons, IonContent, IonHeader, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import { useEffect, useState } from 'react';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';


const Home: React.FC = () => {

  const [err, seterr] = useState<string>()

  const startScan = async () => {
    await BarcodeScanner.checkPermission({ force: true });
    BarcodeScanner.hideBackground();
  
    const result = await BarcodeScanner.startScan();

    if (result.hasContent) {
      console.log(result.content);
    }
  };

  const stopScan = () => {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
  };

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

  if (err){
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Comanda</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className='ion-padding'>
          <IonRow>
            <IonText color="danger">{err}</IonText>
          </IonRow>
        </IonContent>
      </IonPage>
    );
  }
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Comanda</IonTitle>
          <IonButtons slot='end'>
            <IonButton onClick={stopScan}> Stop Scan</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className='hideBg'>
        <IonButton onClick={startScan}>
          Start Scam
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
