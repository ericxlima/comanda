import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonRow, IonText, IonTitle, IonToolbar, useIonAlert } from '@ionic/react';
import './Home.css';
import { useEffect, useState } from 'react';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { scanOutline, stopCircleOutline } from 'ionicons/icons'

const Home: React.FC = () => {

  const [err, setErr] = useState<string>()
  const [hideBg, setHideBg] = useState("")

  const startScan = async () => {
    await BarcodeScanner.checkPermission({ force: true });
    BarcodeScanner.hideBackground();
    setHideBg("hideBg")
  
    const result = await BarcodeScanner.startScan();
    stopScan()

    if (result.hasContent) {
      console.log(result.content);
      present({
        message: result.content!,
        buttons: ['Ir'],
      })
    }
  };

  const stopScan = () => {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    setHideBg("")
  };

  const [present] = useIonAlert()

  useEffect(() => {
    const checkPermission = async () => {
      try {
        const status = await BarcodeScanner.checkPermission({ force: true });
        if (status.granted) {
          return true;
        }
        return false;
      } catch (error) {
        setErr(error.message)
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
            <IonButton color='danger' hidden={!hideBg} onClick={stopScan}> 
              <IonIcon icon={stopCircleOutline} slot='start' /> Stop Scan
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className={hideBg}>
        <IonButton className='start-scan-button' hidden={!!hideBg} onClick={startScan}>
          <IonIcon icon={scanOutline} slot='start' /> Start Scam
        </IonButton>
        <div hidden={!hideBg} className='scan-box' />
      </IonContent>
    </IonPage>
  );
};

export default Home;
