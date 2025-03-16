import axios from "axios";
import React, { useEffect, useState } from "react";
import imageCompression from "browser-image-compression";

const UploadScreen = () => {
  const [image, setImage] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState("");
  const [aiImageGeneratedName, setAiImageGeneratedName] = useState("");
  const [queue, setQueue] = useState({});
  const [imageIsProcessing, setImageIsProcessing] = useState(false);
  const [clientId, setClientId] = useState("");
  const [processingPosition, setProcessingPosition] = useState(-1);

  const handleChangeFile = async (event) => {
    try {
      const file = event.target.files[0];

      const options = {
        maxSizeMB: 1, // Максимальный размер изображения после сжатия в MB
        maxWidthOrHeight: 800, // Максимальная ширина или высота изображения
        useWebWorker: true, // Использовать Web Worker для улучшения производительности
      };

      const maxSizeInBytes = 5 * 1024 * 1024;

      if (file.size > maxSizeInBytes) {
        setError("Размер файла превышает 5 MB");
        return;
      }

      const compressedFile = await imageCompression(file, options);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(compressedFile);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/getQueue`
      );
      setQueue(response.data);
    } catch (err) {
      setError(err);
    }
  };

  const uploadImage = async () => {
    try {
      if (!image) return;

      const response = await fetch(image);
      const blob = await response.blob();

      const imageName = Date.now();

      const file = new File([blob], `${imageName}.jpeg`, {
        type: "image/jpeg",
      });

      setClientId(imageName);

      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/upload`,
          formData
        );

        const neyroFormData = new FormData();

        neyroFormData.append("image", file);
        neyroFormData.append("overwrite", "false");
        neyroFormData.append("subfolder", "");
        neyroFormData.append("type", "input");

        const { data } = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/aiUpload`,
          neyroFormData
        );

        if (data.error) {
          return console.log(
            "Произошла ошибка загрузки изображения на удаленный сервер"
          );
        }

        if (res.data.url) {
          alert("Изображение успешно загружено!");

          setImageIsProcessing(true);

          const uploadImageRes = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/uploadImage`,
            { filename: res.data.url }
          );

          setImageIsProcessing(false);

          if (uploadImageRes.data.images) {
            setAiImageGeneratedName(
              uploadImageRes.data.images[118][0].image.filename
            );
          }

          setIsSaved(true);
        } else {
          throw new Error("Ошибка при загрузке изображения");
        }
      } catch (err) {
        console.log(err);
      }
    } catch (err) {}
  };

  useEffect(() => {
    if (imageIsProcessing) {
      fetchData();

      const interval = setInterval(() => {
        fetchData();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [imageIsProcessing]);

  useEffect(() => {
    if (imageIsProcessing) {
      const position =
        imageIsProcessing &&
        Array.isArray(queue.queue_pending) && // Проверяем, что queue_pending существует и это массив
        queue.queue_pending.findIndex((queueItem) => {
          // Проверяем каждый элемент массива queue_pending
          const clientObject = queueItem.find(
            (item) => typeof item === "object" && item.client_id === clientId
          );
          return clientObject !== undefined;
        });

      setProcessingPosition(position);
    }
  }, [queue, imageIsProcessing]);

  useEffect(() => {
    console.log(aiImageGeneratedName);
  }, [aiImageGeneratedName]);

  return (
    <div>
      <input
        id="create-post-img"
        type="file"
        hidden
        onChange={handleChangeFile}
        accept=".jpg, .png, .jpeg"
      />
      <label
        style={{
          padding: 10,
          background: "#fff",
          display: "block",
          textAlign: "center",
        }}
        htmlFor="create-post-img"
      >
        Загрузить
      </label>

      {image && (
        <div>
          <img
            style={{ width: "200px", height: "200px", objectFit: "contain" }}
            src={image}
          />
          <button onClick={uploadImage} disabled={isSaved}>
            Норм, загрузить фотку
          </button>
        </div>
      )}

      {imageIsProcessing && (
        <p>
          {processingPosition
            ? processingPosition === -1
              ? "Ваш запрос 1 в очереди"
              : `Ваш запрос ${processingPosition} в очереди`
            : "Загрузка..."}
        </p>
      )}

      {aiImageGeneratedName && (
        <img
          style={{ width: 400, height: "auto" }}
          src={`${process.env.REACT_APP_SERVER_URL.replace(
            "/api",
            ""
          )}/aiGet/${aiImageGeneratedName}`}
          alt="ai image generated"
        />
      )}

      {error && <p>{error}</p>}
    </div>
  );
};

export default UploadScreen;
