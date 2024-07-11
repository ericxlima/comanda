import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonRow, IonText, IonTitle, IonToolbar, useIonAlert } from '@ionic/react';
import './Home.css';
import { useEffect, useState } from 'react';
import { options, scanOutline, stopCircleOutline } from 'ionicons/icons'
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

const Home: React.FC = () => {

  const [err, setErr] = useState<string>()
  const [hideBg, setHideBg] = useState(false)
  
  const [present] = useIonAlert()

  const prepare = () => {
    BarcodeScanner.prepare({cameraDirection:'back'});
  };
  

  const startScan = async () => {
    prepare()
    await BarcodeScanner.checkPermission({ force: true });
    BarcodeScanner.hideBackground();
    BarcodeScanner.checkPermission
    
    setHideBg(true)
    
    const result = await BarcodeScanner.startScan();
    
    if (result.hasContent) {
      stopScan()
      present({
        message: result.content,
        buttons: [
          "Cancel",
          { text: "Ok", handler: (d) => console.log("ok pressed") },
        ],
        onDidDismiss: (e) => console.log("did dismiss"),
      })
      console.log(result.content)
    }
  };

  const stopScan = () => {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    setHideBg(false)
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
      <IonContent className={hideBg ? "hideBg" : "ion-padding"}>
        {err && (
          <IonRow>
            {" "}
            <IonText color="danger">{err}</IonText>
          </IonRow>
        )}

        {!!!err && hideBg && <div className="scan-box"></div>}
        {!!!err && !!!hideBg && (
          <IonButton className="center-button" onClick={startScan}>
            <IonIcon icon={scanOutline} slot="start" />
            Start Scan
          </IonButton>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
