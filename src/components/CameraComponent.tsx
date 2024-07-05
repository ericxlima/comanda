import { Camera, CameraResultType } from '@capacitor/camera';
import { useState } from 'react';

export function CameraComponent() {
  const [imageSrc, setImageSrc] = useState('');

  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    const imageUrl = image.webPath;
    setImageSrc(imageUrl);
  };

  return (
    <div>
      <button onClick={takePicture}>Tirar Foto</button>
      {imageSrc && <img src={imageSrc} alt="Foto tirada" />}
    </div>
  );
}
