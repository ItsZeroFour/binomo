import React, { useCallback, useEffect, useState } from "react";
import style from "./style.module.scss";
import axios from "axios";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";

const Camera = () => {
  const [image, setImage] = useState("");
  const [completeImage, setCompleteImage] = useState("");
  const webcamRef = React.useRef(null);

  const navigate = useNavigate();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();

    if (imageSrc) {
      setImage(imageSrc);
    }
  }, [webcamRef]);

  // Функция для конвертации base64 в файл
  function base64ToFile(base64String, fileName) {
    const arr = base64String.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], fileName, { type: mime });
  }

  async function compressImage(imageFile, options) {
    const compressedFile = await imageCompression(imageFile, options);

    const reader = new FileReader();
    reader.readAsDataURL(compressedFile);
    reader.onloadend = function () {
      const base64data = reader.result;
      setCompleteImage(base64data);
    };
  }

  useEffect(() => {
    if (image) {
      const imageString = image;

      const options = {
        maxSizeMB: 1, // Максимальный размер изображения после сжатия в MB
        maxWidthOrHeight: 800, // Максимальная ширина или высота изображения
        useWebWorker: true, // Использовать Web Worker для улучшения производительности
      };

      const imageFile = base64ToFile(imageString, "screenshot.jpeg");

      console.log(imageFile);

      try {
        compressImage(imageFile, options);
      } catch (error) {
        console.error(error);
      }

      setCompleteImage(image);
    }
  }, [image]);


  const uploadImage = async () => {
    if (!image) return;
    const response = await fetch(image);
    const blob = await response.blob();

    const imageName = Date.now();

    const file = new File([blob], `${imageName}.jpeg`, {
      type: "image/jpeg",
    });

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/upload`,
        formData
      );

      if (res.data.url) {
        return navigate("/neyro-image-generate", {
          state: { file: file },
        });
      } else {
        throw new Error("Ошибка при загрузке изображения");
      }
    } catch (err) {
      console.log(err);
      alert("Ошибка при загрузке файла");
    }
  };

  return (
    <section className={style.camera}>
      <div className="container">
        <div className={`wrapper ${style.camera__wrapper}`}>
          {!image ? (
            <div className={style.camera__cam}>
              <Webcam
                audio={false}
                height={"100%"}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={340}
                style={{ objectFit: "cover" }}
              />

              <button onClick={capture}>Take a photo</button>
            </div>
          ) : (
            <div className={style.camera__result}>
              <img src={image} alt="camera image" />

              <div className={style.camera__buttons}>
                <button onClick={uploadImage}>Ok</button>
                <button onClick={() => setImage("")}>Try another photo</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Camera;
