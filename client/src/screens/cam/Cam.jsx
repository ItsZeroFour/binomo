import React, { useCallback, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const Cam = () => {
  const [image, setImage] = useState("");
  const webcamRef = React.useRef(null);
  const [isSaved, setIsSaved] = useState(false);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef]);

  const uploadImage = async () => {
    if (!image) return;

    const response = await fetch(image);
    const blob = await response.blob();
    const file = new File([blob], "screenshot.jpeg", { type: "image/jpeg" });

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/upload`,
        formData
      );

      if (res.data.message === "Успешно") {
        alert("Изображение успешно загружено!");
        setIsSaved(true);
      } else {
        throw new Error("Ошибка при загрузке изображения");
      }
    } catch (err) {
      console.log(err);
      alert("Ошибка при загрузке файла");
    }
  };

  return (
    <div>
      <Webcam
        audio={false}
        height={680}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={340}
        style={{ objectFit: "cover" }}
      />

      <button onClick={capture}>Сделать снимок</button>

      {image && <img src={image} alt="Снимок с веб-камеры" />}

      <div style={{ gap: 10, display: "flex" }}>
        <button onClick={uploadImage} disabled={isSaved || !image}>
          Норм, сохранить
        </button>
        <button onClick={capture}>не норм</button>
      </div>
    </div>
  );
};

export default Cam;
